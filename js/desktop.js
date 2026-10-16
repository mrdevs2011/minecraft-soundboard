// "APP" button: points the visitor to the installer for their own OS.
// Falls back to the GitHub Releases page whenever anything is unknown or offline.
(function () {
  "use strict";
  var REPO = "mrdevs2011/minecraft-soundboard";
  var btn = document.getElementById("btnDesktop");
  if (!btn) return;

  // Already running inside the desktop app: nothing to download.
  if (/Electron\//.test(navigator.userAgent)) {
    btn.style.display = "none";
    return;
  }

  var ua = navigator.userAgent || "";
  var plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  var probe = plat + " " + ua;
  if (/android|iphone|ipad|ipod/i.test(probe)) return; // phones/tablets: keep the generic link

  var os = /win/i.test(plat) || /windows/i.test(ua) ? "win"
    : /mac/i.test(plat) || /macintosh|mac os x/i.test(ua) ? "mac"
    : /linux|x11|cros/i.test(probe) ? "linux" : "";
  if (!os) return;

  var LABEL = { win: "Windows", mac: "macOS", linux: "Linux" };

  function pick(assets, arch) {
    var rx = os === "win" ? /-Setup\.exe$/i
      : os === "linux" ? /\.AppImage$/i
      : arch === "arm" ? /-arm64\.dmg$/i
      : arch === "x86" ? /-x64\.dmg$/i : null;
    if (!rx) return null;
    for (var i = 0; i < assets.length; i++) {
      if (rx.test(assets[i].name)) return assets[i].browser_download_url;
    }
    return null;
  }

  function apply(rel, arch) {
    if (!rel || !rel.assets) return;
    var url = pick(rel.assets, arch);
    if (!url) return;
    btn.href = url;
    btn.removeAttribute("target");
    btn.title = "Download for " + LABEL[os] + (rel.tag_name ? " (" + rel.tag_name + ")" : "");
  }

  function getArch() {
    if (os !== "mac") return Promise.resolve("");
    var uad = navigator.userAgentData;
    if (uad && uad.getHighEntropyValues) {
      return uad.getHighEntropyValues(["architecture"]).then(function (v) {
        return /arm/i.test(v.architecture || "") ? "arm" : v.architecture ? "x86" : "";
      }).catch(function () { return ""; });
    }
    return Promise.resolve(""); // Safari etc.: Intel vs Apple Silicon unknown -> Releases page
  }

  function getRelease() {
    var KEY = "mcsnd_latest_release";
    try {
      var c = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (c && Date.now() - c.t < 10 * 60 * 1000) return Promise.resolve(c.d);
    } catch (e) {}
    return fetch("https://api.github.com/repos/" + REPO + "/releases/latest", {
      headers: { Accept: "application/vnd.github+json" }
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      if (d) { try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} }
      return d;
    });
  }

  Promise.all([getRelease(), getArch()]).then(function (r) { apply(r[0], r[1]); }).catch(function () {});
})();
