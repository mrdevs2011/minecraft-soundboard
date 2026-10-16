const BASE = "/sounds/";
const MODEL = "qwen/qwen3.8-27b";
let data = null, all = [], tree = {}, navPath = [];
let audio = null, cardEl = null, seeking = false, raf = null, hist = [];
let currentPlayPath = null;
let zipAbort = false;
let playGen = 0;
let playAbort = null;
let chatUIHist = []; // {role, html} persisted
let chatLoaded = 0;

const $ = id => document.getElementById(id);


function getApiKey() {
  try { return (localStorage.getItem("groq_api_key") || "").trim(); } catch (e) { return ""; }
}

function syncKeyIcon() {
  const img = document.getElementById("keyIcon");
  if (!img) return;
  const light = document.body.getAttribute("data-theme") === "light";
  // light theme = light UI bg → black key; dark theme = dark UI bg → white key
  img.src = light ? "/svg/key-light.svg" : "/svg/key-dark.svg";
}

function syncKeyUI() {
  const has = !!getApiKey();
  const conn = $("keyConnected");
  const entry = $("keyEntry");
  if (conn) conn.hidden = !has;
  if (entry) entry.hidden = has;
  const inp = $("groqKey");
  if (inp) inp.value = ""; // never show stored secret in the field
  const st = $("keyStatus");
  if (st && has) { st.textContent = ""; st.className = "key-status"; }
}
async function saveApiKeyFromInput() {
  const inp = $("groqKey");
  const st = $("keyStatus");
  const k = (inp && inp.value || "").trim();
  if (!k) {
    if (st) { st.textContent = "Paste a key first"; st.className = "key-status err"; }
    return;
  }
  if (st) { st.textContent = "Checking..."; st.className = "key-status"; }
  try {
    await validateGroqKey(k);
    localStorage.setItem("groq_api_key", k);
    if (inp) inp.value = "";
    if (st) { st.textContent = "Saved"; st.className = "key-status ok"; }
    syncKeyUI();
    const hero = $("askHero");
    if (hero) {
      const sub = hero.querySelector(".ask-sub");
      if (sub) sub.textContent = "TYPE YOUR QUESTION";
    }
  } catch (e) {
    try { localStorage.removeItem("groq_api_key"); } catch (x) {}
    if (st) { st.textContent = e.message || "Invalid key"; st.className = "key-status err"; }
    syncKeyUI();
  }
}

function showAskHero(log) {
  if (!log) log = document.getElementById("chatLog");
  if (!log) return;
  const hasKey = !!getApiKey();
  log.innerHTML = '<div class="ask-hero" id="askHero"><div class="ask-title">ASK AI</div><div class="ask-sub">' +
    (hasKey ? "TYPE YOUR QUESTION" : "ENTER API KEY TO START") + "</div></div>";
}
async function validateGroqKey(key) {
  const res = await fetch("https://api.groq.com/openai/v1/models", {
    headers: { Authorization: "Bearer " + key }
  });
  if (!res.ok) {
    let msg = "Invalid key";
    try { const j = await res.json(); msg = (j.error && j.error.message) || msg; } catch (e) {}
    throw new Error(msg);
  }
  return true;
}


function fmt(s) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return m + ":" + String(sec).padStart(2, "0");
}
function fmtSize(b) {
  if (b == null || !isFinite(b)) return "-";
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
  return (b / 1048576).toFixed(2) + " MB";
}
function fmtDur(s) {
  if (s == null || !isFinite(s) || s < 0) return "-";
  if (s < 60) return s.toFixed(1) + "s";
  return fmt(s);
}
function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML.replace(/"/g, "&" + "quot;");
}
function getMeta(path) {
  return (data && data.meta && data.meta[path]) || { size: null, dur: null };
}
function setSpin(on, pct) {
  const w = $("pSpin"), svg = $("pIcoSvg");
  if (!w) return;
  if (on) {
    w.classList.remove("hidden");
    if (svg) svg.style.opacity = "0";
    $("pPct").textContent = (pct != null ? Math.round(Math.max(0, Math.min(100, pct))) : 0) + "%";
  } else {
    w.classList.add("hidden");
    if (svg) svg.style.opacity = "1";
  }
}

function buildTree(paths) {
  const root = { folders: {}, files: [] };
  for (const path of paths) {
    const parts = path.split("/");
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const seg = parts[i];
      if (!node.folders[seg]) node.folders[seg] = { folders: {}, files: [] };
      node = node.folders[seg];
    }
    node.files.push(path);
  }
  return root;
}

function nodeAt(pathArr) {
  let node = tree;
  for (const seg of pathArr) {
    if (!node.folders[seg]) return { folders: {}, files: [] };
    node = node.folders[seg];
  }
  return node;
}

function countFiles(node) {
  let n = node.files.length;
  for (const k of Object.keys(node.folders)) n += countFiles(node.folders[k]);
  return n;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function creeperFuseAndBoom(headEl, opts) {
  opts = opts || {};
  const duration = opts.duration || 1400; // much faster
  if (!headEl) return;

  headEl.classList.add("fusing");
  headEl.classList.remove("boom");
  headEl.style.setProperty("--flash-op", "0.2");
  const t0 = performance.now();

  // Many rapid flashes, opacity ramps 20% → 100%
  let nextFlash = 0;
  let interval = 90;
  while (performance.now() - t0 < duration - 280) {
    const elapsed = performance.now() - t0;
    const progress = Math.min(1, elapsed / duration);
    const op = 0.2 + progress * 0.8; // 0.2 → 1.0
    headEl.style.setProperty("--flash-op", op.toFixed(2));

    const fill = $("splashFill");
    if (fill) fill.style.width = Math.min(98, progress * 100) + "%";

    if (elapsed >= nextFlash) {
      headEl.classList.add("flash-white");
      const onMs = Math.max(18, 42 - progress * 20);
      await sleep(onMs);
      headEl.classList.remove("flash-white");
      nextFlash = elapsed + interval;
      interval = Math.max(22, interval * 0.82);
    }
    await sleep(12);
  }

  // Super rapid final flashes at full white
  headEl.style.setProperty("--flash-op", "1");
  for (let i = 0; i < 14; i++) {
    headEl.classList.add("flash-white");
    await sleep(16 + (i % 3) * 4);
    headEl.classList.remove("flash-white");
    await sleep(10);
  }

  // Solid white then boom
  headEl.classList.add("flash-white");
  headEl.classList.remove("fusing");
  const fill = $("splashFill");
  if (fill) fill.style.width = "100%";
  await sleep(80);

  await shatterCreeperPixels(headEl);
}


async function shatterCreeperPixels(headEl) {
  if (!headEl) return;
  const rect = headEl.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) {
    headEl.style.opacity = "0";
    return;
  }

  const N = 8; // 8x8 = 64 physical pixels
  const cellW = rect.width / N;
  const cellH = rect.height / N;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Sample colors from creeper.png into offscreen canvas
  const colors = await sampleCreeperGrid(N);

  const layer = document.createElement("div");
  layer.className = "creeper-shard-layer";
  document.body.appendChild(layer);

  const shards = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const px = rect.left + x * cellW;
      const py = rect.top + y * cellH;
      const midX = px + cellW / 2;
      const midY = py + cellH / 2;
      const dx = midX - cx;
      const dy = midY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      // outward blast + slight randomness
      const power = 1.3 + Math.random() * 2.1;
      const vx = (dx / dist) * power * (0.7 + Math.random() * 0.8) + (Math.random() - 0.5) * 1.2;
      const vy = (dy / dist) * power * (0.7 + Math.random() * 0.8) - (0.6 + Math.random() * 1.4);
      const rot = (Math.random() - 0.5) * 18;
      const vr = (Math.random() - 0.5) * 0.6;

      const el = document.createElement("div");
      el.className = "creeper-shard";
      const c = colors[y][x];
      el.style.width = Math.ceil(cellW) + "px";
      el.style.height = Math.ceil(cellH) + "px";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.background = c;
      el.style.transform = "translate(" + px + "px," + py + "px) rotate(0deg)";
      el.style.opacity = "1";
      layer.appendChild(el);
      shards.push({ el: el, x: px, y: py, vx: vx, vy: vy, rot: 0, vr: vr });
    }
  }

  // Hide original face during shatter
  headEl.style.visibility = "hidden";
  headEl.classList.remove("flash-white");

  const g = 0.14; // gravity (Minecraft-like)
  const tStart = performance.now();
  const life = 980;

  await new Promise(resolve => {
    function frame(now) {
      const t = now - tStart;
      const damp = 1 - Math.min(1, t / life);
      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];
        s.vy += g;
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.vr;
        s.vx *= 0.995;
        s.el.style.transform = "translate(" + s.x + "px," + s.y + "px) rotate(" + s.rot + "deg)";
        s.el.style.opacity = String(Math.max(0, damp * 1.05));
      }
      if (t < life) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });

  if (layer.parentNode) layer.parentNode.removeChild(layer);
  // keep head hidden until splash removed (splash flow); restore for logo reuse
  if (headEl.classList.contains("brand-mark") || (headEl.closest && headEl.closest(".brand-mark"))) {
    headEl.style.visibility = "";
    headEl.style.opacity = "1";
  }
}

function sampleCreeperGrid(n) {
  return new Promise(resolve => {
    const img = new Image();
    img.decoding = "async";
    img.onload = function () {
      try {
        const c = document.createElement("canvas");
        c.width = n; c.height = n;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, n, n);
        const data = ctx.getImageData(0, 0, n, n).data;
        const grid = [];
        for (let y = 0; y < n; y++) {
          const row = [];
          for (let x = 0; x < n; x++) {
            const i = (y * n + x) * 4;
            const a = data[i + 3];
            if (a < 20) row.push("#5d9c3f");
            else row.push("rgb(" + data[i] + "," + data[i + 1] + "," + data[i + 2] + ")");
          }
          grid.push(row);
        }
        resolve(grid);
      } catch (e) {
        resolve(fallbackCreeperGrid(n));
      }
    };
    img.onerror = function () { resolve(fallbackCreeperGrid(n)); };
    img.src = "/png/creeper.png";
  });
}

function fallbackCreeperGrid(n) {
  // Classic face mask scaled to n
  const face8 = [
    [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
    [0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],
    [0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],
    [0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0]
  ];
  const grid = [];
  for (let y = 0; y < n; y++) {
    const row = [];
    for (let x = 0; x < n; x++) {
      const fx = Math.min(7, Math.floor(x * 8 / n));
      const fy = Math.min(7, Math.floor(y * 8 / n));
      row.push(face8[fy][fx] ? "#0a0a0a" : "#5d9c3f");
    }
    grid.push(row);
  }
  return grid;
}


async function hideSplash() {
  const s = $("splash");
  const head = s ? s.querySelector(".creeper-head") : null;
  const started = window.__splashStarted || performance.now();
  const minMs = 1400;
  const left = Math.max(0, minMs - (performance.now() - started));
  // run fuse for remaining time (at least fuse sequence)
  const fuseMs = Math.max(700, left);
  try {
    await creeperFuseAndBoom(head, { duration: fuseMs, flashEl: $("splash-flash") });
  } catch (e) {}
  if (!s) return;
  s.classList.add("hide");
  s.setAttribute("aria-hidden", "true");
  const fl = $("splash-flash");
  if (fl) {
    fl.classList.add("fade");
    setTimeout(() => { if (fl.parentNode) fl.parentNode.removeChild(fl); }, 400);
  }
  setTimeout(() => { if (s.parentNode) s.parentNode.removeChild(s); }, 600);
}


async function init() {
  window.__splashStarted = window.__splashStarted || performance.now();
  const splash = $("splash");
  const head = splash ? splash.querySelector(".creeper-head") : null;
  // Fuse starts immediately (Minecraft creeper ~3s), data loads in parallel
  const fuseP = creeperFuseAndBoom(head, { duration: 1400, flashEl: $("splash-flash") });
  try {
    const sf = $("splashFill");
    if (sf) sf.style.width = "15%";
    $("loadFill").style.width = "30%";
    const res = await fetch("/sounds.json");
    if (sf) sf.style.width = "50%";
    $("loadFill").style.width = "70%";
    data = await res.json();
    all = [];
    for (const c of data.categories) for (const p of (data.sounds[c] || [])) all.push({ path: p, cat: c });
    tree = buildTree(all.map(x => x.path));
    $("stats").textContent = data.total.toLocaleString() + " FILES";
    $("loadFill").style.width = "100%";
    syncKeyUI();
    const th = localStorage.getItem("mcsnd_theme");
    if (th === "light") document.body.setAttribute("data-theme", "light");
    syncKeyIcon();
    bind();
    loadChatFromStorage();
    goNav(urlToPath(), false);
  } catch (e) {
    $("grid").innerHTML = '<div class="empty"><h2>LOAD FAILED</h2><p>' + esc(e.message) + '</p></div>';
  }
  // Wait for creeper boom to finish (~3s), then dismiss splash
  try { await fuseP; } catch (e) {}
  const s = $("splash");
  if (s) {
    s.classList.add("hide");
    s.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (s.parentNode) s.parentNode.removeChild(s); }, 600);
  }
  const fl = $("splash-flash");
  if (fl) {
    fl.classList.add("fade");
    fl.classList.remove("on");
    setTimeout(() => { if (fl.parentNode) fl.parentNode.removeChild(fl); }, 400);
  }
}


function pathToUrl(arr) {
  if (!arr || !arr.length) return "/";
  return "/" + arr.map(encodeURIComponent).join("/");
}
function urlToPath() {
  // Prefer clean pathname; migrate legacy hash routes once
  let path = location.pathname || "/";
  if (path === "/index.html") path = "/";
  path = path.replace(/\/+$/, "") || "/";
  if (path === "/") {
    const h = (location.hash || "").replace(/^#\/?/, "");
    if (h) {
      const fromHash = h.split("/").filter(Boolean).map(s => {
        try { return decodeURIComponent(s); } catch (e) { return s; }
      });
      if (fromHash.length) {
        history.replaceState(null, "", pathToUrl(fromHash));
        return fromHash;
      }
    }
    return [];
  }
  return path.slice(1).split("/").filter(Boolean).map(s => {
    try { return decodeURIComponent(s); } catch (e) { return s; }
  });
}
function goNav(pathArr, push) {
  if (push === undefined) push = true;
  navPath = (pathArr || []).slice();
  if ($("search")) $("search").value = "";
  renderNav();
  renderStage();
  const bb = $("btnBack");
  if (bb) bb.classList.toggle("show", navPath.length > 0);
  const next = pathToUrl(navPath);
  const cur = (location.pathname.replace(/\/+$/, "") || "/");
  if (push) {
    if (cur !== next) history.pushState({ path: navPath.slice() }, "", next);
  } else {
    if (cur !== next) history.replaceState({ path: navPath.slice() }, "", next);
  }
  document.title = (navPath.length ? navPath.join(" / ") + " - " : "") + "MCSOUNDS";
}


function renderNav() {
  const crumb = $("crumb");
  let ch = "<button type=\"button\" data-i=\"-1\">root</button>";
  navPath.forEach((seg, i) => {
    ch += "<span class=\"sep\">/</span><button type=\"button\" data-i=\"" + i + "\">" + esc(seg) + "</button>";
  });
  crumb.innerHTML = ch;
  crumb.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      goNav(i < 0 ? [] : navPath.slice(0, i + 1));
    });
  });

  const node = nodeAt(navPath);
  const folders = Object.keys(node.folders).sort();
  let h = "";
  folders.forEach(name => {
    const sub = node.folders[name];
    const n = countFiles(sub);
    h += "<button class=\"folder\" type=\"button\" data-folder=\"" + esc(name) + "\">" +
      "<img class=\"icon\" src=\"/svg/folder.svg\" alt=\"\">" +
      "<span>" + esc(name) + "</span><span class=\"n\">" + n + "</span></button>";
  });
  $("navList").innerHTML = h || "<div style=\"padding:12px;color:var(--dim);font-size:11px;font-family:IBM Plex Mono,monospace\">No subfolders</div>";
  $("navList").querySelectorAll(".folder").forEach(btn => {
    btn.addEventListener("click", () => goNav(navPath.concat([btn.dataset.folder])));
  });
}

function renderStage(query) {
  query = (query || "").trim().toLowerCase();
  const folderGrid = $("folderGrid");
  const grid = $("grid");

  if (query) {
    $("stageTitle").textContent = "SEARCH  -  " + query;
    folderGrid.innerHTML = "";
    folderGrid.classList.remove("show");
    const list = all.filter(s => s.path.toLowerCase().includes(query));
    renderCards(list.slice(0, 400), list.length);
    return;
  }

  const node = nodeAt(navPath);
  const folders = Object.keys(node.folders).sort();
  $("stageTitle").textContent = navPath.length ? navPath.join(" / ") : "ROOT";
  const bb = $("btnBack");
  if (bb) bb.classList.toggle("show", navPath.length > 0);

  // Folder cards in main stage (especially useful on mobile where sidebar is hidden)
  if (folders.length) {
    let fh = "";
    folders.forEach(name => {
      const sub = node.folders[name];
      const n = countFiles(sub);
      fh += '<button class="folder-card" type="button" data-folder="' + esc(name) + '">' +
        '<img class=\"icon\" src=\"/svg/folder.svg\" alt=\"\">' +
        '<div class="fn">' + esc(name) + '</div>' +
        '<div class="fc">' + n + ' files</div></button>';
    });
    folderGrid.innerHTML = fh;
    folderGrid.classList.add("show");
    folderGrid.querySelectorAll(".folder-card").forEach(btn => {
      btn.addEventListener("click", () => goNav(navPath.concat([btn.dataset.folder])));
    });
  } else {
    folderGrid.innerHTML = "";
    folderGrid.classList.remove("show");
  }

  const files = node.files.map(p => ({ path: p, cat: p.split("/")[0] }));
  renderCards(files, files.length);
}

function renderCards(list, total) {
  const grid = $("grid");
  if (!list.length) {
    grid.innerHTML = "";
    return;
  }
  let h = "";
  for (const s of list) {
    const name = s.path.split("/").pop().replace(/\.ogg$/i, "");
    const mt = getMeta(s.path);
    h += "<div class=\"card\" data-path=\"" + esc(s.path) + "\" data-cat=\"" + esc(s.cat) + "\">" +
      "<div class=\"card-play\"><img class=\"icon\" src=\"/svg/play.svg\" alt=\"\"></div>" +
      "<div class=\"card-body\"><div class=\"card-name\">" + esc(name) + "</div>" +
      "<div class=\"card-path\">" + esc(s.path) + "</div>" +
      "<div class=\"card-meta\">" + fmtDur(mt.dur) + "   -   " + fmtSize(mt.size) + "</div></div></div>";
  }
  if (total > list.length) h += "<div class=\"empty\"><p>Showing " + list.length + " / " + total + "</p></div>";
  grid.innerHTML = h;
  grid.querySelectorAll(".card").forEach(el => {
    el.addEventListener("click", () => play(el.dataset.path, el.dataset.cat, el));
  });
}

function setThumb(pct) {
  const t = $("thumb");
  if (t) t.style.left = Math.max(0, Math.min(100, pct)) + "%";
}
function tick() {
  if (!audio) return;
  // While seeking, keep the loop alive but don't overwrite the scrub position
  if (!seeking && isFinite(audio.duration) && audio.duration > 0) {
    const pct = (audio.currentTime / audio.duration) * 100;
    $("fill").style.width = pct + "%";
    setThumb(pct);
    $("tCur").textContent = fmt(audio.currentTime);
    $("tTot").textContent = fmt(audio.duration);
  }
  raf = requestAnimationFrame(tick);
}

function play(path, c, el) {
  // Single-instance playback: invalidate any in-flight load/play
  const myGen = ++playGen;
  if (playAbort) { try { playAbort.abort(); } catch (e) {} }
  playAbort = typeof AbortController !== "undefined" ? new AbortController() : null;
  const signal = playAbort ? playAbort.signal : undefined;

  currentPlayPath = path;

  // Hard-stop previous audio immediately
  if (audio) {
    try { audio.pause(); audio.removeAttribute("src"); audio.load(); } catch (e) {}
    audio = null;
  }
  cancelAnimationFrame(raf);
  if (cardEl) cardEl.classList.remove("playing");
  cardEl = el || null;
  if (el) el.classList.add("playing");

  const mt = getMeta(path);
  const sizeStr = fmtSize(mt.size);
  $("player").classList.add("show");
  $("pName").textContent = path.split("/").pop();
  $("pPath").textContent = "LOADING  -  " + sizeStr + "  -  " + path;
  $("fill").style.width = "0%";
  setThumb(0);
  $("tCur").textContent = "0:00";
  $("tTot").textContent = mt.dur != null ? fmt(mt.dur) : "...";
  $("pIcoSvg").src = "/svg/pause.svg";
  setSpin(true, 0);

  const url = BASE + path.split("/").map(encodeURIComponent).join("/");
  const knownSize = mt.size || 0;
  const useProgress = knownSize > 50000 || (mt.dur != null && mt.dur > 3);

  function start(src) {
    if (myGen !== playGen) {
      try { if (src && String(src).indexOf("blob:") === 0) URL.revokeObjectURL(src); } catch (e) {}
      return;
    }
    // Ensure nothing else is playing
    if (audio) {
      try { audio.pause(); audio.removeAttribute("src"); audio.load(); } catch (e) {}
      audio = null;
    }
    const a = new Audio();
    a.preload = "auto";
    a.volume = parseFloat($("vol").value);
    // Always resolve against site origin (SPA deep links)
    try {
      if (src && !/^https?:|blob:|data:/i.test(src)) {
        src = new URL(src, location.origin).href;
      }
    } catch (e) {}
    a.src = src;
    audio = a;
    a.addEventListener("loadedmetadata", () => {
      if (myGen !== playGen || audio !== a) return;
      setSpin(false, 100);
      $("tTot").textContent = fmt(a.duration);
      $("pPath").textContent = (c || "") + "  -  " + fmtDur(a.duration) + "  -  " + sizeStr + "  -  " + path;
    });
    a.addEventListener("canplay", () => { if (myGen === playGen && audio === a) setSpin(false, 100); });
    a.addEventListener("waiting", () => { if (myGen === playGen && audio === a) setSpin(true, null); });
    a.addEventListener("playing", () => {
      if (myGen !== playGen || audio !== a) return;
      setSpin(false, 100);
      $("pIcoSvg").src = "/svg/pause.svg";
    });
    a.addEventListener("ended", () => {
      if (myGen !== playGen || audio !== a) return;
      if (el) el.classList.remove("playing");
      a.currentTime = 0;
      $("fill").style.width = "0%";
      setThumb(0);
      $("tCur").textContent = "0:00";
      $("pIcoSvg").src = "/svg/play.svg";
      cancelAnimationFrame(raf);
      setSpin(false, 0);
    });
    a.addEventListener("error", () => {
      if (myGen !== playGen || audio !== a) return;
      setSpin(false, 0);
      $("pPath").textContent = "FAILED  -  " + path;
      if (el) el.classList.remove("playing");
    });
    const p = a.play();
    if (p && p.catch) p.catch(() => {
      if (myGen !== playGen || audio !== a) return;
      setSpin(false, 0);
      $("pIcoSvg").src = "/svg/play.svg";
    });
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  if (!useProgress) { start(url); return; }

  fetch(url, { cache: "force-cache", signal: signal }).then(async res => {
    if (myGen !== playGen) return;
    if (!res.ok) throw new Error("HTTP " + res.status);
    const total = Number(res.headers.get("content-length")) || knownSize || 0;
    if (!res.body || !res.body.getReader) {
      const blob = await res.blob();
      if (myGen !== playGen) return;
      start(URL.createObjectURL(blob));
      return;
    }
    const reader = res.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      if (myGen !== playGen) { try { reader.cancel(); } catch (e) {} return; }
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      const pct = total ? (received / total) * 100 : Math.min(95, received / 5000);
      if (myGen === playGen) {
        setSpin(true, pct);
        $("pPath").textContent = "LOADING " + Math.round(pct) + "%  -  " + sizeStr + "  -  " + path;
      }
    }
    if (myGen !== playGen) return;
    setSpin(true, 100);
    start(URL.createObjectURL(new Blob(chunks, { type: "audio/ogg" })));
  }).catch(err => {
    if (myGen !== playGen) return;
    if (err && err.name === "AbortError") return;
    start(url);
  });
}

function stop(hide) {
  if (hide === undefined) hide = false;
  playGen++; // cancel any in-flight play/fetch
  if (playAbort) { try { playAbort.abort(); } catch (e) {} playAbort = null; }
  setSpin(false, 0);
  if (audio) {
    try { audio.pause(); audio.removeAttribute("src"); audio.load(); } catch (e) {}
    audio = null;
  }
  if (cardEl) cardEl.classList.remove("playing");
  cardEl = null;
  cancelAnimationFrame(raf);
  $("fill").style.width = "0%";
  setThumb(0);
  $("tCur").textContent = "0:00";
  const ico = $("pIcoSvg");
  if (ico) ico.src = "/svg/play.svg";
  if (hide) $("player").classList.remove("show");
}

function togglePause() {
  if (!audio) return;
  if (audio.paused) {
    if (audio.ended || (audio.duration && audio.currentTime >= audio.duration - 0.05)) audio.currentTime = 0;
    audio.play();
    $("pIcoSvg").src = "/svg/pause.svg";
    raf = requestAnimationFrame(tick);
  } else {
    audio.pause();
    $("pIcoSvg").src = "/svg/play.svg";
    cancelAnimationFrame(raf);
  }
}

function seek(e) {
  if (!audio || !isFinite(audio.duration) || audio.duration <= 0) return;
  const clientX = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);
  if (clientX == null) return;
  const r = $("track").getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
  const wasPlaying = !audio.paused;
  try { audio.currentTime = ratio * audio.duration; } catch (err) {}
  const pct = ratio * 100;
  $("fill").style.width = pct + "%";
  setThumb(pct);
  $("tCur").textContent = fmt(audio.currentTime);
  // Some browsers pause on seek - resume if it was playing
  if (wasPlaying && audio.paused) {
    const p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }
}

function searchLib(query, limit) {
  limit = limit || 50;
  const aliases = {
    mol:"cow", sigir:"cow", cow:"cow", moo:"say", muu:"say", maarashi:"say", marashi:"say",
    sut:"milk", milk:"milk", tovuq:"chicken", chicken:"chicken", chochqa:"pig", pig:"pig",
    qoy:"sheep", sheep:"sheep", ot:"horse", horse:"horse", it:"wolf", wolf:"wolf",
    mushuk:"cat", cat:"cat", zombi:"zombie", zombie:"zombie", skelet:"skeleton",
    kriper:"creeper", creeper:"creeper", orgimchak:"spider", spider:"spider",
    musiqa:"music", qoshiq:"music", song:"music", music:"music", yomgir:"rain", eshik:"door", suv:"water", otash:"fire",
    qilich:"sword", yurish:"step", olim:"death", zarar:"hurt"
  };
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-zA-Z0-9_\u0400-\u04FF]+/).filter(t => t.length > 1);
  const terms = new Set();
  tokens.forEach(t => { terms.add(t); if (aliases[t]) terms.add(aliases[t]); });
  if (!terms.size) terms.add(q);
  const scored = [];
  for (const s of all) {
    const p = s.path.toLowerCase();
    let score = 0;
    for (const t of terms) if (p.includes(t)) score += t.length + (p.split("/").pop().includes(t) ? 5 : 0);
    if (q.includes("qoshiq") || q.includes("musiqa") || q.includes("song") || q.includes("music")) {
      if (p.startsWith("music/")) score += 40;
      if (p.startsWith("note/")) score += 15;
    }
    if (score) scored.push(Object.assign({}, s, { score }));
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}


function saveChatUI() {
  try { localStorage.setItem("mcsnd_chat_ui", JSON.stringify(chatUIHist)); } catch (e) {}
}
function updateClearBtn() {
  const btn = $("btnClear");
  if (!btn) return;
  const has = chatUIHist.some(x => x.role === "user");
  btn.classList.toggle("hidden", !has);
}
function renderChatSlice(from, to) {
  const log = $("chatLog");
  const slice = chatUIHist.slice(from, to);
  const frag = document.createDocumentFragment();
  slice.forEach(item => {
    const d = document.createElement("div");
    d.className = "bubble " + item.role + (item.hasCards ? " has-cards" : "");
    d.innerHTML = item.html;
    if (item.hasCards) {
      d.querySelectorAll(".chip").forEach(c => {
        c.addEventListener("click", () => {
          const path = c.dataset.path;
          const meta = all.find(x => x.path === path);
          play(path, meta ? meta.cat : "", null);
        });
      });
    }
    frag.appendChild(d);
  });
  return frag;
}
function loadChatFromStorage() {
  try {
    chatUIHist = JSON.parse(localStorage.getItem("mcsnd_chat_ui") || "[]");
    if (!Array.isArray(chatUIHist)) chatUIHist = [];
  } catch (e) { chatUIHist = []; }
  const log = $("chatLog");
  log.innerHTML = "";
  if (!chatUIHist.length) {
    showAskHero(log);
    updateClearBtn();
    return;
  }
  // load last 20 bubbles (~10 turns)
  const start = Math.max(0, chatUIHist.length - 20);
  chatLoaded = start;
  log.appendChild(renderChatSlice(start, chatUIHist.length));
  log.scrollTop = log.scrollHeight;
  updateClearBtn();
}
function clearChat() {
  chatUIHist = [];
  hist = [];
  chatLoaded = 0;
  saveChatUI();
  showAskHero($("chatLog"));
  updateClearBtn();
}
function appendBubble(role, html, hasCards) {
  hasCards = !!hasCards;
  const d = document.createElement("div");
  d.className = "bubble " + role + (hasCards ? " has-cards" : "");
  d.innerHTML = html;
  $("chatLog").appendChild(d);
  $("chatLog").scrollTop = $("chatLog").scrollHeight;
  if (role !== "sys" || html.indexOf("...") === -1) {
    if (!(role === "sys" && (html === "..." || html.indexOf("Network:") === 0 || html.indexOf("Error:") === 0 || html.indexOf("Enter your API") === 0))) {
      if (role === "user" || role === "ai") {
        chatUIHist.push({ role: role, html: html, hasCards: hasCards });
        saveChatUI();
        updateClearBtn();
      }
    }
  }
  return d;
}

function parseAI(text) {
  let plays = [];
  const clean = [];
  text.split("\n").forEach(line => {
    const p = line.match(/^PLAY:\s*(.+)$/i);
    if (p) {
      p[1].split(",").map(x => x.trim()).filter(Boolean).forEach(path => {
        let pp = path.replace(/^sounds\//, "").replace(/^\//, "");
        if (!pp.endsWith(".ogg")) {
          const hit = all.find(x => x.path.includes(pp) || x.path.endsWith(pp + ".ogg"));
          if (hit) pp = hit.path;
        }
        if (all.some(x => x.path === pp) && !plays.includes(pp)) plays.push(pp);
      });
      return;
    }
    if (/^SEARCH:/i.test(line)) return;
    clean.push(line);
  });
  return { text: clean.join("\n").trim(), plays };
}

async function sendChat() {
  const key = getApiKey() || ($("groqKey") && $("groqKey").value.trim()) || "";
  const msg = $("chatInput").value.trim();
  if (!msg) return;
  if (!key) {
    appendBubble("sys", "Enter your API key using the key icon above");
    $("keyPop").classList.add("open");
    return;
  }
  localStorage.setItem("groq_api_key", key);
  $("chatInput").value = "";
  appendBubble("user", esc(msg));
  const wait = appendBubble("sys", "...");
  wait.classList.add("typing");
  $("chatSend").disabled = true;

  const matches = searchLib(msg, 28);
  const matchList = matches.map(m => m.path).join("\n");

  const system = "You are a Minecraft sound finder for MCSOUNDS. " +
    "Always reply in the same language the user writes in (Uzbek, Russian, English, or any other). Match their language exactly for the short sentence. " +
    "For song/music requests prefer music/* first. Multi-topic: cover each word. " +
    "Reply with 1 short sentence in the user's language, then lines starting with PLAY: path (max 8 paths from Candidates only). No SEARCH. " +
    (navPath.length ? "Current folder: " + navPath.join("/") + ". " : "") +
    "Candidates:\n" + (matchList || "(none)");

  hist.push({ role: "user", content: msg });
  if (hist.length > 10) hist = hist.slice(-10);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 400,
        messages: [{ role: "system", content: system }].concat(hist)
      })
    });
    const json = await res.json();
    wait.remove();
    if (!res.ok) {
      const em = (json.error && json.error.message) || String(res.status);
      if (/invalid|revoked|expired|auth/i.test(em)) {
        localStorage.removeItem("groq_api_key");
        syncKeyUI();
      }
      appendBubble("sys", "Error: " + em);
      $("chatSend").disabled = false;
      return;
    }
    const raw = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || "";
    hist.push({ role: "assistant", content: raw });
    const parsed = parseAI(raw);

    const low = msg.toLowerCase();
    const wantSong = /\b(music|song|track|melody)\b/.test(low);
    const topicMap = [
      { re: /\b(cow|moo)\b/, test: p => p.includes("cow") && /say|moody\/ambient/.test(p) },
      { re: /\b(chicken)\b/, test: p => /\/chicken/.test(p) },
      { re: /\b(lava)\b/, test: p => p.includes("lava") },
      { re: /\b(music|song|track|melody)\b/, test: p => p.startsWith("music/") }
    ];
    for (const t of topicMap) {
      if (!t.re.test(low)) continue;
      all.filter(x => t.test(x.path)).slice(0, 6).forEach(x => {
        if (!parsed.plays.includes(x.path)) parsed.plays.push(x.path);
      });
    }
    if (wantSong) {
      const music = parsed.plays.filter(p => p.startsWith("music/"));
      const rest = parsed.plays.filter(p => !p.startsWith("music/"));
      if (!music.length) {
        all.filter(x => x.path.startsWith("music/")).slice(0, 6).forEach(x => music.push(x.path));
      }
      parsed.plays = music.concat(rest);
    }
    parsed.plays = parsed.plays.slice(0, 8);

    const textPlain = (parsed.text || raw || "").trim();
    await typeAIResponse(textPlain, parsed.plays);
  } catch (e) {
    wait.remove();
    appendBubble("sys", "Network: " + e.message);
  }
  $("chatSend").disabled = false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeAIResponse(textPlain, plays) {
  plays = plays || [];
  const hero = $("askHero");
  if (hero) hero.remove();

  const d = document.createElement("div");
  d.className = "bubble ai" + (plays.length ? " has-cards" : "");
  const textEl = document.createElement("div");
  textEl.className = "ai-text";
  d.appendChild(textEl);
  $("chatLog").appendChild(d);
  $("chatLog").scrollTop = $("chatLog").scrollHeight;

  const chars = Array.from(textPlain);
  let shown = "";
  for (let i = 0; i < chars.length; i++) {
    shown += chars[i];
    textEl.innerHTML = esc(shown).replace(/\n/g, "<br>") + '<span class="cursor"></span>';
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
    await sleep(chars[i] === " " ? 12 : 18);
  }
  textEl.innerHTML = esc(shown).replace(/\n/g, "<br>");

  if (plays.length) {
    const chips = document.createElement("div");
    chips.className = "chips";
    d.appendChild(chips);
    for (let i = 0; i < plays.length; i++) {
      const p = plays[i];
      const mt = getMeta(p);
      const nm = p.split("/").pop();
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.dataset.path = p;
      chip.style.animationDelay = (i * 0.06) + "s";
      chip.innerHTML = '<span class="chip-ico"><img class=\"icon\" src=\"/svg/play.svg\" alt=\"\"></span>' +
        '<span class="chip-body"><div class="chip-name">' + esc(nm) + '</div><div class="chip-path">' + esc(p) + '</div>' +
        '<div class="chip-meta">' + fmtDur(mt.dur) + '   -   ' + fmtSize(mt.size) + '</div></span>';
      chip.addEventListener("click", () => {
        const meta = all.find(x => x.path === p);
        play(p, meta ? meta.cat : "", null);
      });
      chips.appendChild(chip);
      $("chatLog").scrollTop = $("chatLog").scrollHeight;
      await sleep(80);
    }
    const path0 = plays[0];
    const meta0 = all.find(x => x.path === path0);
    play(path0, meta0 ? meta0.cat : "", null);
  }

  // persist
  let html = '<div class="ai-text">' + esc(shown).replace(/\n/g, "<br>") + '</div>';
  if (plays.length) {
    html += '<div class="chips">';
    plays.forEach(p => {
      const mt = getMeta(p);
      const nm = p.split("/").pop();
      html += '<span class="chip" data-path="' + esc(p) + '"><span class="chip-ico"><img class=\"icon\" src=\"/svg/play.svg\" alt=\"\"></span>' +
        '<span class="chip-body"><div class="chip-name">' + esc(nm) + '</div><div class="chip-path">' + esc(p) + '</div>' +
        '<div class="chip-meta">' + fmtDur(mt.dur) + '   -   ' + fmtSize(mt.size) + '</div></span></span>';
    });
    html += '</div>';
  }
  chatUIHist.push({ role: "ai", html: html, hasCards: plays.length > 0 });
  saveChatUI();
  updateClearBtn();
}


function triggerBlobDownload(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
}

async function downloadOneSound(path) {
  if (!path) return;
  const url = BASE + path.split("/").map(encodeURIComponent).join("/");
  const name = path.split("/").pop() || "sound.ogg";
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const blob = await res.blob();
    triggerBlobDownload(blob, name);
  } catch (e) {
    // fallback: open in new tab
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

function openDlModal() {
  zipAbort = false;
  $("dlProgress").classList.remove("show");
  $("dlBar").style.width = "0%";
  $("dlStatus").textContent = "";
  $("dlConfirm").disabled = false;
  $("dlConfirm").textContent = "Yes, download";
  $("dlCancel").textContent = "Cancel";
  const n = (data && data.total) || (all && all.length) || "?";
  $("dlModalText").innerHTML = "Download all sounds?<br>Only .ogg files (" + n + " files, ~370 MB). No code included.";
  $("dlModal").classList.add("open");
}
function closeDlModal() {
  $("dlModal").classList.remove("open");
}

async function downloadAllSoundsZip() {
  if (typeof JSZip === "undefined") {
    $("dlStatus").textContent = "JSZip failed to load - check network";
    return;
  }
  const paths = all.map(x => x.path);
  if (!paths.length) {
    $("dlStatus").textContent = "List is empty";
    return;
  }
  zipAbort = false;
  $("dlProgress").classList.add("show");
  $("dlConfirm").disabled = true;
  $("dlConfirm").textContent = "Downloading...";
  $("dlCancel").textContent = "Stop";

  const zip = new JSZip();
  const folder = zip.folder("mcsnd-sounds");
  const total = paths.length;
  let done = 0;
  let failed = 0;
  const concurrency = 6;

  async function fetchOne(p) {
    if (zipAbort) return;
    const url = BASE + p.split("/").map(encodeURIComponent).join("/");
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) throw new Error(String(res.status));
      const buf = await res.arrayBuffer();
      folder.file(p, buf);
    } catch (e) {
      failed++;
    } finally {
      done++;
      const pct = Math.round((done / total) * 100);
      $("dlBar").style.width = pct + "%";
      $("dlStatus").textContent = done + " / " + total + (failed ? "  -  failed: " + failed : "");
    }
  }

  // pool
  let i = 0;
  async function worker() {
    while (i < total && !zipAbort) {
      const idx = i++;
      await fetchOne(paths[idx]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  if (zipAbort) {
    $("dlStatus").textContent = "Stopped (" + done + " / " + total + ")";
    $("dlConfirm").disabled = false;
    $("dlConfirm").textContent = "Retry";
    $("dlCancel").textContent = "Close";
    return;
  }

  $("dlStatus").textContent = "Building ZIP...";
  try {
    const blob = await zip.generateAsync(
      { type: "blob", compression: "STORE" },
      meta => {
        if (meta && meta.percent != null) {
          $("dlBar").style.width = Math.round(meta.percent) + "%";
          $("dlStatus").textContent = "ZIP: " + Math.round(meta.percent) + "%";
        }
      }
    );
    triggerBlobDownload(blob, "mcsnd-sounds.zip");
    $("dlStatus").textContent = "Done! Downloaded" + (failed ? " (" + failed + " skipped)" : "");
    $("dlBar").style.width = "100%";
    $("dlConfirm").textContent = "Download again";
    $("dlConfirm").disabled = false;
    $("dlCancel").textContent = "Close";
  } catch (e) {
    $("dlStatus").textContent = "ZIP error: " + (e.message || e);
    $("dlConfirm").disabled = false;
    $("dlConfirm").textContent = "Retry";
    $("dlCancel").textContent = "Close";
  }
}


function bind() {
  let t;
  
  // Triple-click logo creeper → fuse + pixel shatter
  (function () {
    const mark = document.querySelector(".brand-mark");
    if (!mark) return;
    let clicks = 0, timer = null, busy = false;
    mark.style.cursor = "pointer";
    mark.addEventListener("click", async e => {
      if (busy) { e.preventDefault(); e.stopPropagation(); return; }
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => { clicks = 0; }, 450);
      if (clicks < 3) return;
      e.preventDefault();
      e.stopPropagation();
      clicks = 0;
      busy = true;
      try {
        await creeperFuseAndBoom(mark, { duration: 1200 });
      } catch (err) {}
      mark.style.visibility = "";
      mark.style.opacity = "1";
      mark.classList.remove("flash-white", "fusing", "boom");
      busy = false;
    });
  })();

window.addEventListener("popstate", () => goNav(urlToPath(), false));

  if ($("pDl")) $("pDl").addEventListener("click", e => {
    e.stopPropagation();
    downloadOneSound(currentPlayPath);
  });
  if ($("btnDlAll")) $("btnDlAll").addEventListener("click", openDlModal);
  if ($("dlCancel")) $("dlCancel").addEventListener("click", () => {
    if ($("dlConfirm").disabled && $("dlConfirm").textContent.indexOf("Yuklan") >= 0) {
      zipAbort = true;
      $("dlStatus").textContent = "Stopping...";
    } else {
      zipAbort = true;
      closeDlModal();
    }
  });
  if ($("dlConfirm")) $("dlConfirm").addEventListener("click", () => downloadAllSoundsZip());
  if ($("dlModal")) $("dlModal").addEventListener("click", e => {
    if (e.target === $("dlModal") && !$("dlConfirm").disabled) closeDlModal();
  });

  $("search").addEventListener("input", e => {
    clearTimeout(t);
    t = setTimeout(() => renderStage(e.target.value), 150);
  });
  $("pIco").addEventListener("click", togglePause);
  $("vol").addEventListener("input", e => {
    const v = parseFloat(e.target.value);
    if (audio) audio.volume = v;
    e.target.style.setProperty("--vol-pct", (v * 100) + "%");
  });
  // init vol fill
  (function(){ const v = $("vol"); if (v) v.style.setProperty("--vol-pct", (parseFloat(v.value) * 100) + "%"); })();
  const onScrubStart = e => {
    if (!audio) return;
    e.preventDefault();
    seeking = true;
    const tr = $("track");
    if (tr) tr.classList.add("scrubbing");
    seek(e);
    const move = ev => { if (seeking) seek(ev); };
    const end = () => {
      seeking = false;
      if (tr) tr.classList.remove("scrubbing");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("touchend", end);
      document.removeEventListener("touchcancel", end);
      // ensure progress loop is running and playback continues
      if (audio && audio.paused && !audio.ended) {
        const p = audio.play();
        if (p && p.catch) p.catch(function () {});
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", end);
    document.addEventListener("touchcancel", end);
  };
  $("track").addEventListener("mousedown", onScrubStart);
  $("track").addEventListener("touchstart", onScrubStart, { passive: false });
  $("btnTheme").addEventListener("click", () => {
    const next = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", next);
    document.documentElement.setAttribute("data-theme-early", next);
    localStorage.setItem("mcsnd_theme", next);
    syncKeyIcon();
  });

  const toggleNav = () => {
    const open = $("nav").classList.toggle("open");
    $("shell").classList.toggle("nav-on", open);
    $("btnMenu").classList.toggle("on", open);
    // close chat if opening nav
    if (open && $("shell").classList.contains("chat-on")) {
      $("shell").classList.remove("chat-on");
      $("btnChat").classList.remove("on");
    }
  };
  if ($("btnMenu")) $("btnMenu").addEventListener("click", toggleNav);

  const toggleChat = () => {
    $("shell").classList.toggle("chat-on");
    $("btnChat").classList.toggle("on", $("shell").classList.contains("chat-on"));
  };
  $("btnChat").addEventListener("click", toggleChat);
  $("chatClose").addEventListener("click", toggleChat);
  $("backdrop").addEventListener("click", () => {
    if ($("shell").classList.contains("nav-on")) {
      $("nav").classList.remove("open");
      $("shell").classList.remove("nav-on");
      $("btnMenu") && $("btnMenu").classList.remove("on");
    } else {
      toggleChat();
    }
  });
  $("btnKey").addEventListener("click", () => $("keyPop").classList.toggle("open"));
  $("btnClear").addEventListener("click", clearChat);
  $("chatLog").addEventListener("scroll", () => {
    const log = $("chatLog");
    if (log.scrollTop > 40 || chatLoaded <= 0) return;
    const prevH = log.scrollHeight;
    const more = Math.max(0, chatLoaded - 20);
    if (more === chatLoaded) return;
    const frag = renderChatSlice(more, chatLoaded);
    log.insertBefore(frag, log.firstChild);
    chatLoaded = more;
    log.scrollTop = log.scrollHeight - prevH;
  });
  
  if ($("keySave")) $("keySave").addEventListener("click", () => saveApiKeyFromInput());
  if ($("groqKey")) $("groqKey").addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); saveApiKeyFromInput(); }
  });
  if ($("keyChange")) $("keyChange").addEventListener("click", () => {
    const conn = $("keyConnected");
    const entry = $("keyEntry");
    if (conn) conn.hidden = true;
    if (entry) entry.hidden = false;
    if ($("groqKey")) { $("groqKey").value = ""; $("groqKey").focus(); }
  });
  if ($("keyRemove")) $("keyRemove").addEventListener("click", () => {
    try { localStorage.removeItem("groq_api_key"); } catch (e) {}
    syncKeyUI();
    const hero = $("askHero");
    if (hero) {
      const sub = hero.querySelector(".ask-sub");
      if (sub) sub.textContent = "ENTER API KEY TO START";
    }
  });
  syncKeyUI();

  $("chatSend").addEventListener("click", sendChat);
  $("chatInput").addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });

  document.addEventListener("keydown", e => {
    if (e.code !== "Space" && e.key !== " ") return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
    e.preventDefault();
    togglePause();
  });
}

init();
