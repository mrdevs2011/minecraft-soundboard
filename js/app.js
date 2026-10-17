const BASE = "/sounds/";

/* ===== i18n EN / UZ ===== */
let lang = (function(){
  try {
    const v = localStorage.getItem("mcsnd_lang");
    if (v === "uz" || v === "ru" || v === "en") return v;
  } catch(e) {}
  return "en";
})();
const LANG_CYCLE = ["en", "uz", "ru"];
const LANG_NEXT_LABEL = { en: "UZ", uz: "RU", ru: "EN" };

const I18N = {
  en: {
    search: "Search sounds...",
    sounds: "sounds",
    root: "ROOT",
    search_title: "SEARCH",
    loading: "LOADING",
    failed: "FAILED",
    load_failed: "LOAD FAILED",
    load_error: "Something went wrong",
    no_subfolders: "No subfolders",
    showing: "Showing",
    folders: "Folders",
    download_all: "Download all sounds",
    theme: "Theme",
    language: "Language",
    ai: "AI",
    ask_ai: "ASK AI",
    enter_key: "ENTER API KEY TO START",
    type_q: "TYPE YOUR QUESTION",
    what_sound: "What sound?",
    paste_key: "Paste key (gsk_...)",
    groq_key: "Groq API key",
    save: "Save",
    checking: "Checking...",
    saved: "Saved",
    paste_first: "Paste a key first",
    invalid_key: "Invalid key",
    api_connected: "API key connected",
    change: "Change",
    remove: "Remove",
    clear_chat: "Clear chat",
    dl_title: "Download all?",
    dl_text: "Download all sounds?<br>Only .ogg files ({n} files, ~370 MB). No code included.",
    yes_dl: "Yes, download",
    cancel: "Cancel",
    close: "Close",
    stop: "Stop",
    downloading: "Downloading...",
    building_zip: "Building ZIP...",
    done_dl: "Done! Downloaded",
    retry: "Retry",
    download_again: "Download again",
    list_empty: "List is empty",
    jszip_fail: "JSZip failed to load - check network",
    stopped: "Stopped",
    zip_err: "ZIP error",
    splash_sub: "LOADING SOUNDS...",
    splash_tag: "Find all the sounds in Minecraft – 100%",
    nav_root: "root",
    key_help: "Get a free key at console.groq.com/keys",
    key_help_html: 'Get a free key at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">console.groq.com/keys</a>',
    files: "files",
  },
  uz: {
    search: "Tovushlarni qidirish...",
    sounds: "tovush",
    root: "BOSH",
    search_title: "QIDIRUV",
    loading: "YUKLANMOQDA",
    failed: "XATO",
    load_failed: "YUKLASH XATOSI",
    load_error: "Nimadir xato ketdi",
    no_subfolders: "Ichki papka yo\u2018q",
    showing: "Ko\u2018rsatilmoqda",
    folders: "Papkalar",
    download_all: "Barcha tovushlarni yuklab olish",
    theme: "Mavzu",
    language: "Til",
    ai: "AI",
    ask_ai: "AI SO\u2018RASH",
    enter_key: "BOSHLASH UCHUN API KALIT KIRITING",
    type_q: "SAVOLINGIZNI YOZING",
    what_sound: "Qanday tovush?",
    paste_key: "Kalitni joylashtiring (gsk_...)",
    groq_key: "Groq API kaliti",
    save: "Saqlash",
    checking: "Tekshirilmoqda...",
    saved: "Saqlandi",
    paste_first: "Avval kalitni kiriting",
    invalid_key: "Noto\u2018g\u2018ri kalit",
    api_connected: "API kalit ulangan",
    change: "O\u2018zgartirish",
    remove: "O\u2018chirish",
    clear_chat: "Chatni tozalash",
    dl_title: "Hammasi yuklab olinsinmi?",
    dl_text: "Barcha tovushlar yuklab olinsinmi?<br>Faqat .ogg fayllar ({n} ta, ~370 MB). Kod kiritilmaydi.",
    yes_dl: "Ha, yuklab olish",
    cancel: "Bekor",
    close: "Yopish",
    stop: "To\u2018xtatish",
    downloading: "Yuklanmoqda...",
    building_zip: "ZIP yig\u2018ilmoqda...",
    done_dl: "Tayyor! Yuklab olindi",
    retry: "Qayta",
    download_again: "Yana yuklab olish",
    list_empty: "Ro\u2018yxat bo\u2018sh",
    jszip_fail: "JSZip yuklanmadi - tarmoqni tekshiring",
    stopped: "To\u2018xtatildi",
    zip_err: "ZIP xatosi",
    splash_sub: "TOVUSHLAR YUKLANMOQDA...",
    splash_tag: "Minecraft dagi barcha tovushlar – 100%",
    nav_root: "ildiz",
    key_help: "Bepul kalit: console.groq.com/keys",
    key_help_html: 'Bepul kalitni <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">console.groq.com/keys</a> dan oling',
    files: "fayl",
  }  ,
  ru: {
    search: "Поиск звуков...",
    sounds: "звуков",
    root: "КОРЕНЬ",
    search_title: "ПОИСК",
    loading: "ЗАГРУЗКА",
    failed: "ОШИБКА",
    load_failed: "ОШИБКА ЗАГРУЗКИ",
    load_error: "Что-то пошло не так",
    no_subfolders: "Нет подпапок",
    showing: "Показано",
    folders: "Папки",
    download_all: "Скачать все звуки",
    theme: "Тема",
    language: "Язык",
    ai: "AI",
    ask_ai: "СПРОСИТЬ AI",
    enter_key: "ВВЕДИТЕ API КЛЮЧ ДЛЯ СТАРТА",
    type_q: "ВВЕДИТЕ ВОПРОС",
    what_sound: "Какой звук?",
    paste_key: "Вставьте ключ (gsk_...)",
    groq_key: "Groq API ключ",
    save: "Сохранить",
    checking: "Проверка...",
    saved: "Сохранено",
    paste_first: "Сначала вставьте ключ",
    invalid_key: "Неверный ключ",
    api_connected: "API ключ подключён",
    change: "Изменить",
    remove: "Удалить",
    clear_chat: "Очистить чат",
    dl_title: "Скачать всё?",
    dl_text: "Скачать все звуки?<br>Только .ogg файлы ({n} шт., ~370 МБ). Код не включён.",
    yes_dl: "Да, скачать",
    cancel: "Отмена",
    close: "Закрыть",
    stop: "Стоп",
    downloading: "Скачивание...",
    building_zip: "Сборка ZIP...",
    done_dl: "Готово! Скачано",
    retry: "Повтор",
    download_again: "Скачать снова",
    list_empty: "Список пуст",
    jszip_fail: "JSZip не загрузился — проверьте сеть",
    stopped: "Остановлено",
    zip_err: "Ошибка ZIP",
    splash_sub: "ЗАГРУЗКА ЗВУКОВ...",
    splash_tag: "Все звуки Minecraft – 100%",
    nav_root: "корень",
    key_help: "Бесплатный ключ: console.groq.com/keys",
    key_help_html: 'Бесплатный ключ на <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer">console.groq.com/keys</a>',
    files: "файлов",
  }
};

function t(key) {
  const pack = I18N[lang] || I18N.en;
  return (pack[key] != null ? pack[key] : (I18N.en[key] || key));
}

/* Path segment dictionary for display names only (not URLs/paths) */
const SEG_UZ = {
  ambient:"atrof muhit", block:"blok", damage:"zarar", dig:"qazish", enchant:"sehr",
  entity:"mavjudot", event:"hodisa", fire:"olov", fireworks:"feyerverk", firework:"feyerverk",
  item:"buyum", liquid:"suyuqlik", minecart:"vagoncha", mob:"mavjudot", music:"musiqa",
  note:"nota", portal:"portal", random:"tasodifiy", records:"plastinkalar", record:"plastinka",
  step:"qadam", tile:"kafel", ui:"interfeys", weather:"ob-havo",
  mob_effects:"mavjudot effektlari", entity_effects:"mavjudot effektlari",
  status_effects:"status effektlari", music_disc:"musiqa diski", note_block:"nota bloki",
  sculk_sensor:"skalk sensor", goat_horn:"echki shoxi", underwater_ambience:"suv osti atrof",
  nether_wastes:"neter cho\u2018li", soul_sand_valley:"ruh qumi vodiyi",
  crimson_forest:"qirmizi o\u2018rmon", warped_forest:"egri o\u2018rmon", basalt_deltas:"bazalt deltalari",
  break:"sindirish", place:"qo\u2018yish", hit:"zarba", fall:"tushish", hurt:"jarohat",
  death:"o\u2018lim", say:"ovoz", open:"ochish", close:"yopish", click:"bosish",
  attack:"hujum", shoot:"otish", throw:"otish", teleport:"teleport", walk:"yurish",
  run:"yugurish", jump:"sakrash", land:"qo\u2018nish", swim:"suzish", splash:"sachrash",
  mine:"qazish", eat:"yemoq", drink:"ichmoq", sleep:"uyqu", wake:"uyg\u2018onish", breed:"nasl",
  idle:"tinch", explode:"portlash", ignite:"yoqish", extinguish:"o\u2018chirish", fuse:"fitil",
  charge:"zaryad", discharge:"bo\u2018shatish", activate:"yoqish", deactivate:"o\u2018chirish",
  insert:"kiritish", take:"olish", pop:"pop", fizz:"shivir", roar:"bo\u2018kirish",
  growl:"xirillash", howl:"uvlash", purr:"mirillash", hiss:"xishlash",
  scream:"qichqiriq", laugh:"kulgi", cry:"yig\u2018i", flap:"qanot", breath:"nafas",
  harvest:"yig\u2018im", plant:"o\u2018simlik", crop:"hosil", till:"haydash",
  shear:"qirqish", milk:"sog\u2018ish", fish:"baliq", reel:"o\u2018rash",
  craft:"yasash", smith:"temirchilik", smelt:"eritish", brew:"qaynash",
  levelup:"daraja", experience:"tajriba", orb:"shar", equip:"kiymoq", unequip:"yechmoq",
  crossbow:"arbalet", bow:"kamon", shield:"qalqon", trident:"uch tish",
  axe:"bolta", pickaxe:"kaysa", shovel:"belkurak", hoe:"ketmon", sword:"qilich", armor:"zirh",
  wood:"yog\u2018och", stone:"tosh", grass:"o\u2018t", dirt:"tuproq", sand:"qum",
  gravel:"shag\u2018al", snow:"qor", ice:"muz", metal:"metall", glass:"oyna",
  cloth:"mato", wool:"jun", ladder:"narvon", anvil:"anvil", furnace:"pech",
  chest:"sandiq", door:"eshik", button:"tugma", lever:"richag", fence:"panjara",
  gate:"darvoza", trapdoor:"lyuk", pressure:"bosim", plate:"plastinka",
  amethyst:"ametist", cluster:"klaster", deepslate:"chuqur tosh", netherite:"neterit",
  copper:"mis", bamboo:"bambuk", cherry:"gilos", sculk:"skalk", basalt:"bazalt",
  netherrack:"neter tosh", soul:"ruh", soil:"tuproq", leaves:"barg", log:"yog\u2018och",
  plank:"taxta", slab:"plita", stairs:"zinapoya", wall:"devor", carpet:"gilam",
  bed:"karavot", sign:"belgi", banner:"bayroq", torch:"mash\u2018al", lantern:"fonar",
  candle:"sham", campfire:"o\u2018choq", water:"suv", lava:"lava", rain:"yomg\u2018ir",
  thunder:"momaqaldiroq", cave:"g\u2018or", nether:"neter", end:"oxir", overworld:"oddiy dunyo",
  cow:"sigir", pig:"cho\u2018chqa", sheep:"qo\u2018y", chicken:"tovuq", horse:"ot",
  wolf:"bo\u2018ri", cat:"mushuk", villager:"qishloq aholisi", zombie:"zombi",
  skeleton:"skelet", creeper:"kriper", spider:"o\u2018rgimchak", enderman:"enderman",
  slime:"shilimshiq", ghast:"ghast", blaze:"blaze", wither:"wither", dragon:"ajdar",
  player:"o\u2018yinchi", frog:"qurbaqa", allay:"allay", sniffer:"sniffer", camel:"tuya",
  goat:"echki", axolotl:"aksolotl", bee:"ari", fox:"tulki", panda:"panda",
  parrot:"to\u2018ti", dolphin:"delfin", squid:"kalmar", glow:"yorug\u2018", berry:"meva",
  bat:"ko\u2018rshapalak", witch:"jodugar", iron:"temir", golem:"golem",
  guardian:"qo\u2018riqchi", elder:"keksa", phantom:"fantom", drowned:"cho\u2018kib ketgan",
  husk:"husk", stray:"adashgan", pillager:"talonchi", vindicator:"himoyachi",
  evoker:"chorlovchi", vex:"vex", ravager:"vayronkor", hoglin:"hoglin", piglin:"piglin",
  zoglin:"zoglin", strider:"strider", warden:"warden", breeze:"shamol", bogged:"botqoq",
  armadillo:"armadillo", menu:"menyu", toast:"bildirishnoma", hover:"ustiga",
  select:"tanlash", confirm:"tasdiqlash", back:"orqaga", forward:"oldinga",
  left:"chap", right:"o\u2018ng", up:"yuqori", down:"past", small:"kichik", big:"katta",
  large:"katta", soft:"yumshoq", hard:"qattiq", heavy:"og\u2018ir", light:"yorug\u2018",
  dark:"qorong\u2018u", high:"yuqori", low:"past", short:"qisqa", long:"uzun",
  quick:"tez", slow:"sekin", generic:"umumiy", normal:"oddiy", special:"maxsus",
  effects:"effektlar", effect:"effekt", raid:"reyd", boss:"bos", horn:"shox",
  disc:"disk", creative:"ijodiy", jukebox:"pleyer", beacon:"mayoq", conduit:"kanal",
  piston:"piston", redstone:"redstone", power:"quvvat", book:"kitob", bottle:"shisha",
  bucket:"chelak", arrow:"o\u2018q", tool:"asbob", underwater:"suv osti",
};

const SEG_RU = {
  ambient:"окружение", block:"блок", damage:"урон", dig:"копание", enchant:"зачарование",
  entity:"существо", event:"событие", fire:"огонь", fireworks:"фейерверк", firework:"фейерверк",
  item:"предмет", liquid:"жидкость", minecart:"вагонетка", mob:"моб", music:"музыка",
  note:"нота", portal:"портал", random:"случайный", records:"пластинки", record:"пластинка",
  step:"шаг", tile:"плитка", ui:"интерфейс", weather:"погода",
  mob_effects:"эффекты существ", entity_effects:"эффекты существ",
  status_effects:"статус-эффекты", music_disc:"музыкальный диск", note_block:"нотный блок",
  sculk_sensor:"скалк-сенсор", goat_horn:"рог козы", underwater_ambience:"подводная атмосфера",
  nether_wastes:"пустыни Незера", soul_sand_valley:"долина песка душ",
  crimson_forest:"багровый лес", warped_forest:"искажённый лес", basalt_deltas:"базальтовые дельты",
  break:"разрушение", place:"установка", hit:"удар", fall:"падение", hurt:"боль",
  death:"смерть", say:"голос", open:"открытие", close:"закрытие", click:"клик",
  attack:"атака", shoot:"выстрел", throw:"бросок", teleport:"телепорт", walk:"ходьба",
  run:"бег", jump:"прыжок", land:"приземление", swim:"плавание", splash:"всплеск",
  mine:"добыча", eat:"еда", drink:"питьё", sleep:"сон", wake:"пробуждение", breed:"разведение",
  idle:"покой", explode:"взрыв", ignite:"поджог", extinguish:"тушение", fuse:"фитиль",
  charge:"заряд", discharge:"разряд", activate:"включение", deactivate:"выключение",
  insert:"вставка", take:"взятие", pop:"хлопок", fizz:"шипение", roar:"рёв",
  growl:"рычание", howl:"вой", purr:"мурлыканье", hiss:"шипение",
  scream:"крик", laugh:"смех", cry:"плач", flap:"взмах", breath:"дыхание",
  harvest:"сбор", plant:"растение", crop:"урожай", till:"вспашка",
  shear:"стрижка", milk:"доение", fish:"рыба", reel:"сматывание",
  craft:"крафт", smith:"ковка", smelt:"плавка", brew:"варка",
  levelup:"уровень", experience:"опыт", orb:"сфера", equip:"экипировка", unequip:"снятие",
  crossbow:"арбалет", bow:"лук", shield:"щит", trident:"трезубец",
  axe:"топор", pickaxe:"кирка", shovel:"лопата", hoe:"мотыга", sword:"меч", armor:"броня",
  wood:"дерево", stone:"камень", grass:"трава", dirt:"земля", sand:"песок",
  gravel:"гравий", snow:"снег", ice:"лёд", metal:"металл", glass:"стекло",
  cloth:"ткань", wool:"шерсть", ladder:"лестница", anvil:"наковальня", furnace:"печь",
  chest:"сундук", door:"дверь", button:"кнопка", lever:"рычаг", fence:"забор",
  gate:"калитка", trapdoor:"люк", pressure:"давление", plate:"плита",
  amethyst:"аметист", cluster:"кластер", deepslate:"глубинный сланец", netherite:"незерит",
  copper:"медь", bamboo:"бамбук", cherry:"вишня", sculk:"скалк", basalt:"базальт",
  netherrack:"незерак", soul:"душа", soil:"почва", leaves:"листва", log:"бревно",
  plank:"доска", slab:"плита", stairs:"ступеньки", wall:"стена", carpet:"ковёр",
  bed:"кровать", sign:"табличка", banner:"флаг", torch:"факел", lantern:"фонарь",
  candle:"свеча", campfire:"костёр", water:"вода", lava:"лава", rain:"дождь",
  thunder:"гром", cave:"пещера", nether:"Незер", end:"Энд", overworld:"Верхний мир",
  cow:"корова", pig:"свинья", sheep:"овца", chicken:"курица", horse:"лошадь",
  wolf:"волк", cat:"кот", villager:"житель", zombie:"зомби",
  skeleton:"скелет", creeper:"крипер", spider:"паук", enderman:"эндермен",
  slime:"слизь", ghast:"гаст", blaze:"ифрит", wither:"иссушитель", dragon:"дракон",
  player:"игрок", frog:"лягушка", allay:"аллай", sniffer:"нюхач", camel:"верблюд",
  goat:"коза", axolotl:"аксолотль", bee:"пчела", fox:"лиса", panda:"панда",
  parrot:"попугай", dolphin:"дельфин", squid:"кальмар", glow:"свечение", berry:"ягода",
  bat:"летучая мышь", witch:"ведьма", iron:"железо", golem:"голем",
  guardian:"страж", elder:"древний", phantom:"фантом", drowned:"утопленник",
  husk:"кадавр", stray:"зимний скелет", pillager:"разбойник", vindicator:"поборник",
  evoker:"заклинатель", vex:"вредина", ravager:"разоритель", hoglin:"хоглин", piglin:"пиглин",
  zoglin:"зоглин", strider:"страйдер", warden:"хранитель", breeze:"бриз", bogged:"болотный",
  armadillo:"броненосец", menu:"меню", toast:"уведомление", hover:"наведение",
  select:"выбор", confirm:"подтверждение", back:"назад", forward:"вперёд",
  left:"лево", right:"право", up:"верх", down:"низ", small:"малый", big:"большой",
  large:"крупный", soft:"мягкий", hard:"твёрдый", heavy:"тяжёлый", light:"светлый",
  dark:"тёмный", high:"высокий", low:"низкий", short:"короткий", long:"длинный",
  quick:"быстрый", slow:"медленный", generic:"общий", normal:"обычный", special:"особый",
  effects:"эффекты", effect:"эффект", raid:"рейд", boss:"босс", horn:"рог",
  disc:"диск", creative:"творческий", jukebox:"проигрыватель", beacon:"маяк", conduit:"провод",
  piston:"поршень", redstone:"редстоун", power:"энергия", book:"книга", bottle:"бутылка",
  bucket:"ведро", arrow:"стрела", tool:"инструмент", underwater:"под водой",
};



function activeSegMap() {
  if (lang === "uz") return SEG_UZ;
  if (lang === "ru") return SEG_RU;
  return null;
}

function trSeg(seg) {
  const SEG = activeSegMap();
  if (!SEG || !seg) return seg;
  const key = String(seg).toLowerCase();
  if (SEG[key]) return SEG[key];
  var one = key.match(/^([a-z]+)(\d+)$/);
  if (one && key.indexOf("_") < 0) {
    return (SEG[one[1]] || one[1]) + " " + one[2];
  }
  if (key.indexOf("_") >= 0) {
    const parts = key.split("_");
    const out = [];
    let i = 0;
    while (i < parts.length) {
      let matched = false;
      for (let len = Math.min(3, parts.length - i); len >= 2; len--) {
        const compound = parts.slice(i, i + len).join("_");
        if (SEG[compound]) {
          out.push(SEG[compound]);
          i += len;
          matched = true;
          break;
        }
      }
      if (!matched) {
        var tok = parts[i];
        var nm = tok.match(/^([a-zA-Z]+)(\d+)$/);
        if (nm) {
          out.push((SEG[nm[1]] || nm[1]) + " " + nm[2]);
        } else {
          out.push(SEG[tok] || tok);
        }
        i++;
      }
    }
    return out.join(" ");
  }
  return seg;
}

function displayFileName(path) {
  const base = path.split("/").pop().replace(/\.ogg$/i, "");
  if (lang === "en") return base;
  return trSeg(base);
}

function displayPathSegs(segs) {
  if (lang === "en") return segs.join(" / ");
  return segs.map(trSeg).join(" / ");
}

function applyStaticLang() {
  const search = $("search");
  if (search) search.placeholder = t("search");
  const stats = $("stats");
  if (stats && window.__soundTotal != null) {
    stats.textContent = window.__soundTotal.toLocaleString() + " " + t("sounds");
  }
  const btnMenu = $("btnMenu");
  if (btnMenu) btnMenu.title = t("folders");
  const btnDl = $("btnDlAll");
  if (btnDl) btnDl.title = t("download_all");
  const btnTheme = $("btnTheme");
  if (btnTheme) btnTheme.title = t("theme");
  const btnLang = $("btnLang");
  if (btnLang) {
    btnLang.title = t("language");
    const lab = $("langLabel");
    if (lab) lab.textContent = LANG_NEXT_LABEL[lang] || "UZ";
  }
  const btnChat = $("btnChat");
  if (btnChat) btnChat.title = t("ai");
  const chatInput = $("chatInput");
  if (chatInput) chatInput.placeholder = t("what_sound");
  const groqKey = $("groqKey");
  if (groqKey) groqKey.placeholder = t("paste_key");
  const keySave = $("keySave");
  if (keySave) keySave.textContent = t("save");
  const keyLabel = document.querySelector('label[for="groqKey"]');
  if (keyLabel) keyLabel.textContent = t("groq_key");
  const keyChange = $("keyChange");
  if (keyChange) keyChange.textContent = t("change");
  const keyRemove = $("keyRemove");
  if (keyRemove) keyRemove.textContent = t("remove");
  const keyConn = document.querySelector("#keyConnected .key-connected-row span:last-child");
  if (keyConn) keyConn.textContent = t("api_connected");
  const btnClear = $("btnClear");
  if (btnClear) btnClear.title = t("clear_chat");
  const keyHelp = $("keyHelp");
  if (keyHelp) keyHelp.innerHTML = t("key_help_html");
  const splashSub = document.querySelector(".splash-sub");
  if (splashSub) splashSub.textContent = t("splash_sub");
  const splashTag = document.querySelector(".splash-tag");
  if (splashTag) splashTag.textContent = t("splash_tag");
  const askTitle = document.querySelector(".ask-title");
  if (askTitle) askTitle.textContent = t("ask_ai");
  const askSub = document.querySelector(".ask-sub");
  if (askSub) askSub.textContent = t("enter_key");
  document.documentElement.lang = lang === "uz" ? "uz" : (lang === "ru" ? "ru" : "en");
}

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
  const light = document.body.getAttribute("data-theme") === "light";
  const key = document.getElementById("keyIcon");
  if (key) key.src = light ? "/svg/key-light.svg" : "/svg/key-dark.svg";
}

function maskKeyInInput(showSuccess) {
  const inp = $("groqKey");
  const key = getApiKey();
  if (!inp) return;
  if (key) {
    inp.type = "password";
    inp.value = key; // browser shows as dots
    inp.readOnly = true;
    inp.autocomplete = "off";
  } else {
    inp.type = "text";
    inp.value = "";
    inp.readOnly = false;
  }
  if (showSuccess) {
    const st = $("keyStatus");
    if (st) { st.textContent = t("saved"); st.className = "key-status ok"; }
  }
}

function syncKeyUI(opts) {
  opts = opts || {};
  const has = !!getApiKey();
  const conn = $("keyConnected");
  const entry = $("keyEntry");
  if (conn) conn.hidden = !has;
  if (entry) entry.hidden = false; // always show entry so masked key + status visible
  maskKeyInInput(!!opts.success);
  if (!opts.success) {
    const st = $("keyStatus");
    if (st && !opts.keepStatus) {
      if (has) { st.textContent = t("saved"); st.className = "key-status ok"; }
      else if (!st.classList.contains("err")) { st.textContent = ""; st.className = "key-status"; }
    }
  }
}
async function saveApiKeyFromInput() {
  const inp = $("groqKey");
  const st = $("keyStatus");
  // if readonly masked, ignore re-save of same
  if (inp && inp.readOnly) return;
  const k = (inp && inp.value || "").trim();
  if (!k) {
    if (st) { st.textContent = t("paste_first"); st.className = "key-status err"; }
    return;
  }
  if (st) { st.textContent = t("checking"); st.className = "key-status"; }
  try {
    await validateGroqKey(k);
    localStorage.setItem("groq_api_key", k);
    if (st) { st.textContent = t("saved"); st.className = "key-status ok"; }
    syncKeyUI({ success: true });
    const hero = $("askHero");
    if (hero) {
      const sub = hero.querySelector(".ask-sub");
      if (sub) sub.textContent = t("type_q");
    }
  } catch (e) {
    try { localStorage.removeItem("groq_api_key"); } catch (x) {}
    if (inp) { inp.type = "text"; inp.readOnly = false; }
    if (st) { st.textContent = e.message || t("invalid_key"); st.className = "key-status err"; }
    syncKeyUI({ keepStatus: true });
  }
}

function showAskHero(log) {
  if (!log) log = document.getElementById("chatLog");
  if (!log) return;
  const hasKey = !!getApiKey();
  log.innerHTML = '<div class="ask-hero" id="askHero"><div class="ask-title">' + t("ask_ai") + '</div><div class="ask-sub">' +
    (hasKey ? t("type_q") : t("enter_key")) + "</div></div>";
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
  try { applyStaticLang(); } catch (e) {}
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
    window.__soundTotal = data.total; $("stats").textContent = data.total.toLocaleString() + " " + t("sounds"); applyStaticLang();
    $("loadFill").style.width = "100%";
    syncKeyUI();
    const th = localStorage.getItem("mcsnd_theme");
    if (th === "light") document.body.setAttribute("data-theme", "light");
    syncKeyIcon();
    applyStaticLang();
    try { bind(); } catch (be) { console.error(be); }
    loadChatFromStorage();
    if (window.matchMedia("(min-width:1101px)").matches && $("shell")) {   // desktop: AI chat open by default
      $("shell").classList.add("chat-on");
      if ($("btnChat")) $("btnChat").classList.add("on");
      scrollChatBottom();
    }
    goNav(urlToPath(), false);
  } catch (e) {
    $("grid").innerHTML = '<div class="empty"><h2>' + t("load_failed") + '</h2><p>' + esc(e.message) + '</p></div>';
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
  let ch = "<button type=\"button\" data-i=\"-1\">" + t("nav_root") + "</button>";
  navPath.forEach((seg, i) => {
    ch += "<span class=\"sep\">/</span><button type=\"button\" data-i=\"" + i + "\">" + esc(trSeg(seg)) + "</button>";
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
      "<span>" + esc(trSeg(name)) + "</span><span class=\"n\">" + n + "</span></button>";
  });
  $("navList").innerHTML = h || "<div style=\"padding:12px;color:var(--dim);font-size:11px;font-family:IBM Plex Mono,monospace\">" + t("no_subfolders") + "</div>";
  $("navList").querySelectorAll(".folder").forEach(btn => {
    btn.addEventListener("click", () => goNav(navPath.concat([btn.dataset.folder])));
  });
}

function renderStage(query) {
  query = (query || "").trim().toLowerCase();
  const folderGrid = $("folderGrid");
  const grid = $("grid");

  if (query) {
    $("stageTitle").textContent = t("search_title") + "  -  " + query;
    folderGrid.innerHTML = "";
    folderGrid.classList.remove("show");
    const list = all.filter(s => s.path.toLowerCase().includes(query));
    renderCards(list.slice(0, 400), list.length);
    return;
  }

  const node = nodeAt(navPath);
  const folders = Object.keys(node.folders).sort();
  $("stageTitle").textContent = navPath.length ? displayPathSegs(navPath) : t("root");
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
        '<div class="fn">' + esc(trSeg(name)) + '</div>' +
        '<div class="fc">' + n + ' ' + t("files") + '</div></button>';
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
    const name = displayFileName(s.path);
    const mt = getMeta(s.path);
    h += "<div class=\"card\" data-path=\"" + esc(s.path) + "\" data-cat=\"" + esc(s.cat) + "\">" +
      "<div class=\"card-play\"><img class=\"icon\" src=\"/svg/play.svg\" alt=\"\"></div>" +
      "<div class=\"card-body\"><div class=\"card-name\">" + esc(name) + "</div>" +
      "<div class=\"card-path\">" + esc(s.path) + "</div>" +
      "<div class=\"card-meta\">" + fmtDur(mt.dur) + "   -   " + fmtSize(mt.size) + "</div></div></div>";
  }
  if (total > list.length) h += "<div class=\"empty\"><p>" + t("showing") + " " + list.length + " / " + total + "</p></div>";
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
  $("pName").textContent = displayFileName(path);
  $("pPath").textContent = t("loading") + "  -  " + sizeStr + "  -  " + path;
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
      // Keep card highlighted as the last selected sound
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
      $("pPath").textContent = t("failed") + "  -  " + path;
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
        $("pPath").textContent = t("loading") + " " + Math.round(pct) + "%  -  " + sizeStr + "  -  " + path;
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
  try { audio.currentTime = ratio * audio.duration; } catch (err) {}
  const pct = ratio * 100;
  $("fill").style.width = pct + "%";
  setThumb(pct);
  $("tCur").textContent = fmt(audio.currentTime);
  // Do NOT auto-play here — pause stays pause until user hits play
}

/* ===== Smart sound retrieval: multilingual (uz/ru/en), folder-aware, diverse ===== */
const Q_STOP = new Set(("menga bizga senga ni ning ga dan bilan va yoki ham kerak yana bitta boshqa qil qilib " +
  "the an of for me my us give show find play get sound sounds all every some more another other please can you do have what which with and or to " +
  "дай дайте мне звук звуки звука звуков все всех всё найди найти покажи еще ещё другой другие пожалуйста").split(/\s+/));
const Q_STOP_RE = /^(ovoz|tovush|ber|top|qidir|korsat|barcha|hamma|звук)/;
const Q_TYPES = new Set(["say", "hurt", "death", "step", "milk", "idle", "hit", "ambient"]);
const Q_ALIAS = {
  mol:"cow", sigir:"cow", korova:"cow", "корова":"cow", cow:"cow", moo:"cow", muu:"cow", mooshroom:"mooshroom",
  tovuq:"chicken", jujja:"chicken", chicken:"chicken", "курица":"chicken", "цыплёнок":"chicken", "цыпленок":"chicken",
  chochqa:"pig", tongiz:"pig", pig:"pig", "свинья":"pig",
  qoy:"sheep", sheep:"sheep", "овца":"sheep",
  echki:"goat", goat:"goat", "коза":"goat",
  ot:"horse", horse:"horse", eshak:"horse", donkey:"horse", "лошадь":"horse", "конь":"horse", "осёл":"horse",
  bori:"wolf", kuchuk:"wolf", wolf:"wolf", dog:"wolf", "волк":"wolf", "собака":"wolf",
  mushuk:"cat", cat:"cat", "кошка":"cat", "кот":"cat",
  quyon:"rabbit", rabbit:"rabbit", "кролик":"rabbit",
  ari:"bee", bee:"bee", "пчела":"bee",
  zombi:"zombie", zombie:"zombie", "зомби":"zombie",
  skelet:"skeleton", skeleton:"skeleton", "скелет":"skeleton",
  kriper:"creeper", creeper:"creeper", "крипер":"creeper",
  orgimchak:"spider", spider:"spider", "паук":"spider",
  enderman:"endermen", endermen:"endermen", ender:"endermen", "эндермен":"endermen",
  ghast:"ghast", gast:"ghast", "гаст":"ghast",
  blaze:"blaze", "блейз":"blaze",
  slime:"slime", shilimshiq:"slime", "слизень":"slime", "слайм":"slime",
  villager:"villager", qishloqlik:"villager", "житель":"villager", "селянин":"villager",
  wither:"wither", "иссушитель":"wither",
  dragon:"enderdragon", ajdaho:"enderdragon", "дракон":"enderdragon",
  warden:"warden", "варден":"warden",
  squid:"squid", kalmar:"squid", "кальмар":"squid",
  dolphin:"dolphin", delfin:"dolphin", "дельфин":"dolphin",
  turtle:"turtle", toshbaqa:"turtle", "черепаха":"turtle",
  panda:"panda", "панда":"panda",
  parrot:"parrot", toti:"parrot", "попугай":"parrot",
  fox:"fox", tulki:"fox", "лиса":"fox",
  frog:"frog", baqa:"frog", "лягушка":"frog",
  bat:"bat", korshapalak:"bat", "летучая":"bat",
  llama:"llama", lama:"llama", "лама":"llama",
  bear:"polarbear", ayiq:"polarbear", "медведь":"polarbear",
  phantom:"phantom", "фантом":"phantom",
  witch:"witch", jodugar:"witch", "ведьма":"witch",
  golem:"irongolem", "голем":"irongolem",
  piglin:"piglin", hoglin:"hoglin", strider:"strider", axolotl:"axolotl", aksolotl:"axolotl",
  camel:"camel", tuya:"camel", "верблюд":"camel",
  zarar:"hurt", jarohat:"hurt", ogriq:"hurt", hurt:"hurt", damage:"hurt", "урон":"hurt", "боль":"hurt",
  olim:"death", death:"death", die:"death", "смерть":"death",
  qadam:"step", yurish:"step", step:"step", "шаг":"step", "шаги":"step",
  sut:"milk", milk:"milk", "молоко":"milk",
  qongiroq:"bell", bell:"bell", "колокол":"bell",
  yomgir:"rain", rain:"rain", "дождь":"rain",
  momaqaldiroq:"thunder", thunder:"thunder", "гром":"thunder",
  eshik:"door", door:"door", "дверь":"door",
  suv:"water", water:"water", "вода":"water",
  otash:"fire", olov:"fire", fire:"fire", "огонь":"fire",
  lava:"lava", "лава":"lava",
  qilich:"sword", sword:"sword", "меч":"sword",
  portlash:"explode", explosion:"explode", explode:"explode", "взрыв":"explode",
  musiqa:"music", qoshiq:"music", song:"music", music:"music", "музыка":"music", "песня":"music",
  sandiq:"chest", chest:"chest", "сундук":"chest"
};
const Q_KIND_ORDER = ["say", "idle", "ambient", "moody-ambient", "hurt", "hit", "moody-hit", "death", "moody-death", "milk", "eat", "drink", "step"];
let _qIdx = null, _lastQ = null;

function qNorm(s) {
  return String(s || "").toLowerCase().replace(/[\u02bb\u02bc\u2018\u2019'`\u2032]/g, "");
}
function qKindRank(k) {
  const i = Q_KIND_ORDER.indexOf(String(k || "").replace(/^[^|]*\|/, ""));
  return i < 0 ? 50 : i;
}
function qIndex() {
  if (_qIdx && _qIdx.src === all) return _qIdx.rows;
  const rows = all.map(s => {
    const p = s.path.toLowerCase();
    const parts = p.replace(/\.ogg$/, "").split("/");
    const file = parts.pop();
    const dirs = parts;
    const dirWords = [];
    dirs.forEach(d => { d.split("_").forEach(w => dirWords.push(w)); });
    const words = file.split(/[_\-.]+/).map(w => w.replace(/\d+$/, "")).filter(Boolean);
    const kind = (dirs.includes("moody") ? "moody-" : "") + (words[0] || file);
    return { s: s, p: p, dirs: dirs, dirWords: dirWords, words: words, kind: kind };
  });
  _qIdx = { src: all, rows: rows };
  return rows;
}
function qAliasOf(tok) {
  if (Q_ALIAS[tok]) return Q_ALIAS[tok];
  if (tok.length < 4) return "";
  let best = "";
  for (const k in Q_ALIAS) {
    if (k.length < 3 || k.length <= best.length || !tok.startsWith(k)) continue;
    const suf = tok.slice(k.length);
    const cyr = /[\u0400-\u04ff]/.test(k);
    if (cyr ? suf.length <= 3 : /^(s|es|i|si|ni|ning|ga|da|dan|ini|lar|lari|larni|larini|larning|nikini)$/.test(suf)) best = k;
  }
  return best ? Q_ALIAS[best] : "";
}
function qParse(query) {
  const q = qNorm(query);
  const wantAll = /(^|[^a-z])(barcha|hamma|hammasi|hammasini|all|every|everything)([^a-z]|$)/.test(q) || /(все|всех|всё)/.test(q);
  const terms = [];
  q.split(/[^a-z0-9_\u0400-\u04ff]+/).filter(t => t.length > 1).forEach(tok => {
    if (Q_STOP.has(tok) || Q_STOP_RE.test(tok)) return;
    const al = qAliasOf(tok);
    const t = al || (tok.length >= 3 ? tok : "");
    if (t && !terms.includes(t)) terms.push(t);
  });
  return { terms: terms, wantAll: wantAll };
}

function searchLib(query, limit) {
  limit = limit || 50;
  const parsed = qParse(query);
  let terms = parsed.terms;
  const out = [];
  out.wantAll = parsed.wantAll;
  out.strong = false;
  if (!terms.length && _lastQ) terms = _lastQ.slice();        // follow-up like "yana boshqasini"
  else if (terms.length) _lastQ = terms.slice();
  out.terms = terms;
  if (!terms.length) return out;

  const rows = qIndex();
  const music = terms.includes("music");
  const scored = [];
  let hasEnt = false;
  for (const r of rows) {
    let score = 0, hits = 0, ent = 0, g = "";
    for (const t of terms) {
      const isType = Q_TYPES.has(t);
      let sc = 0, isEnt = false;
      if (r.dirs.includes(t)) { sc = isType ? 10 : 40; isEnt = !isType; }
      else if (r.dirWords.includes(t)) { sc = isType ? 8 : 25; isEnt = !isType; }
      else if (r.words.includes(t)) sc = 14;
      else if (t.length >= 4 && r.p.includes(t)) sc = 4;
      if (!sc) continue;
      hits++; score += sc;
      if (isEnt) { ent++; if (!g) g = t; }
    }
    if (music) {
      if (r.p.startsWith("music/")) score += 40;
      else if (r.p.startsWith("records/")) score += 20;
    }
    if (!score) continue;
    if (hits > 1) score += 20 * (hits - 1);
    if (ent) hasEnt = true;
    scored.push({ path: r.s.path, cat: r.s.cat, score: score, ent: ent, hits: hits, kind: r.kind, g: g });
  }
  // If a real mob/block/folder matched, drop accidental filename-only hits (e.g. note/cow_bell for "cow")
  const pool = hasEnt ? scored.filter(x => x.ent > 0 || x.hits > 1) : scored;
  pool.sort((a, b) => (b.score - a.score) || (qKindRank(a.kind) - qKindRank(b.kind)) ||
    a.path.localeCompare(b.path, undefined, { numeric: true }));
  const res = pool.slice(0, limit);
  res.wantAll = parsed.wantAll;
  res.strong = hasEnt;
  res.terms = terms;
  return res;
}

// Pick up to n results spread across entities and sound types (voice, hurt, death, steps, ambient...)
function pickDiverse(list, n) {
  const groups = new Map();
  list.forEach(x => {
    const k = (x.g || "") + "|" + (x.kind || "x");
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(x);
  });
  const bySubj = new Map();
  Array.from(groups.keys()).forEach(k => { const sj = k.split("|")[0]; if (!bySubj.has(sj)) bySubj.set(sj, []); bySubj.get(sj).push(k); });
  bySubj.forEach(arr => arr.sort((a, b) => qKindRank(a) - qKindRank(b)));
  const lists = Array.from(bySubj.values());
  const keys = [];
  for (let i = 0; keys.length < groups.size; i++) lists.forEach(arr => { if (i < arr.length) keys.push(arr[i]); });
  const out = [];
  for (let round = 0; out.length < n; round++) {
    let added = false;
    for (const k of keys) {
      const g = groups.get(k);
      if (round < g.length && out.length < n) { out.push(g[round]); added = true; }
    }
    if (!added) break;
  }
  return out;
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
  if (role !== "sys" || (html.indexOf("...") === -1 && html.indexOf("mc-dots") === -1)) {
    if (!(role === "sys" && (html === "..." || html.indexOf("mc-dots") !== -1 || html.indexOf("Network:") === 0 || html.indexOf("Error:") === 0 || html.indexOf("Enter your API") === 0))) {
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

/* ===== AI planner: understands ANY request in ANY language, grounded in the library's real folder names ===== */
let _vocab = null, _lastPlan = null, _lastPlanKey = "";
const _shown = new Set();
const Q_KIND_SYN = { voice: "say", speak: "say", talk: "say", pain: "hurt", damage: "hurt", die: "death", dying: "death",
  footstep: "step", footsteps: "step", steps: "step", walk: "step", walking: "step" };

function qVocab() {
  if (_vocab && _vocab.src === all) return _vocab;
  const rows = qIndex();
  const areas = {}, names = new Set(), loose = new Set(), kindN = {}, looseN = {};
  rows.forEach(r => {
    const top = r.dirs[0];
    if (!top) return;
    if (r.dirs.length === 1) {
      loose.add(top); names.add(top);
      r.words.forEach(w => { if (w.length > 2 && !/\d/.test(w)) looseN[w] = (looseN[w] || 0) + 1; });
    } else {
      const n = r.dirs[1];
      if (n === "moody") return;
      (areas[top] = areas[top] || new Set()).add(n);
      names.add(n);
      const k = r.words[0];
      if (k && k.length > 2 && !/\d/.test(k)) kindN[k] = (kindN[k] || 0) + 1;
    }
  });
  const top = (o, n) => Object.keys(o).sort((a, b) => o[b] - o[a]).slice(0, n);
  const text = Object.keys(areas).sort().map(a => a + "/: " + Array.from(areas[a]).sort().join(" ")).join("\n") +
    "\nloose categories (sounds directly inside): " + Array.from(loose).sort().join(" ");
  _vocab = { src: all, names: names, loose: loose, text: text, kinds: top(kindN, 40), words: top(looseN, 120) };
  return _vocab;
}

function qResolveSubject(s) {
  const V = qVocab();
  const x = String(s || "").toLowerCase().trim().replace(/^(mob|entity|block|item|ambient)\//, "").replace(/[\s\-]+/g, "_");
  if (V.names.has(x)) return x;
  const flat = x.replace(/_/g, "");
  if (!flat) return "";
  for (const n of V.names) if (n.replace(/_/g, "") === flat) return n;
  if (flat.endsWith("s")) for (const n of V.names) if (n.replace(/_/g, "") === flat.slice(0, -1)) return n;
  return "";
}

function parsePlan(raw) {
  const txt = String(raw || "").replace(/<think>[\s\S]*?<\/think>/g, "");
  const m = txt.match(/\{[\s\S]*\}/);
  if (!m) return null;
  let j;
  try { j = JSON.parse(m[0]); } catch (e) { return null; }
  const arr = x => (Array.isArray(x) ? x : []).map(v => String(v).toLowerCase().trim()).filter(Boolean);
  const subjects = [];
  arr(j.subjects).forEach(s => { const r = qResolveSubject(s); if (r && !subjects.includes(r)) subjects.push(r); });
  return {
    subjects: subjects.slice(0, 6),
    kinds: arr(j.kinds).map(k => Q_KIND_SYN[k] || k).slice(0, 6),
    words: arr(j.words).map(w => w.replace(/\d+$/, "")).filter(w => w.length > 1).slice(0, 6),
    all: !!j.all, more: !!j.more, chat: !!j.chat
  };
}

async function aiPlan(msg, key) {
  const V = qVocab();
  const sys = "You turn a user's request about Minecraft sounds into a search plan. The user may write in ANY language (Uzbek, Russian, English, ...). " +
    "Reply with ONLY one JSON object, no prose, no markdown: {\"subjects\":[],\"kinds\":[],\"words\":[],\"all\":false,\"more\":false,\"chat\":false}. " +
    "subjects = up to 6 EXACT folder names from the folder list below that the user means. Translate the meaning, not the letters " +
    "(a creature, block or item named in Uzbek or Russian -> its English folder name). " +
    "For vague, mood or comparison requests (scary, calm, funny, epic, loud...) pick several fitting folders. " +
    "kinds = wanted sound types, ONLY if the user specified one, from: " + V.kinds.join(" ") +
    " (say = a creature's normal voice). Leave empty if unspecified. " +
    "words = extra English filename words for loose sounds, preferably from: " + V.words.join(" ") + ". " +
    "all = true if the user wants every/all sounds. " +
    "more = true if the user asks for another/more/different ones, or continues the previous topic without naming a new subject; then repeat the previous subjects. " +
    "chat = true if the message is NOT about finding, playing or listing Minecraft sounds (greetings, small talk, general questions, facts, news, advice, code, translation, anything else); then leave the other fields empty. " +
    "If nothing in the library fits, return empty arrays.\nFolders:\n" + V.text;
  const prev = hist.filter(h => h.role === "user").slice(-3).map(h => h.content);
  const user = (prev.length ? "Earlier requests: " + prev.join(" | ") + "\n" : "") +
    (_lastPlan ? "Previous plan: " + JSON.stringify({ subjects: _lastPlan.subjects, kinds: _lastPlan.kinds }) + "\n" : "") +
    "New request: " + msg;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 9000);
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({ model: MODEL, temperature: 0, max_tokens: 500,
        messages: [{ role: "system", content: sys }, { role: "user", content: user }] }),
      signal: ctl.signal
    });
    if (!res.ok) return null;
    const json = await res.json();
    return parsePlan(json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content);
  } finally { clearTimeout(timer); }
}

function searchByPlan(plan, limit) {
  limit = limit || 80;
  const rows = qIndex();
  const subs = plan.subjects, words = plan.words, kinds = plan.kinds;
  const V = qVocab();
  const K = kinds.reduce((a, k) => a.concat(k === "hurt" || k === "hit" ? ["hurt", "hit"] : [k]), []);
  let pool = [];
  for (const r of rows) {
    let score = 0, g = "", ent = 0;
    for (const s of subs) {
      const top = V.loose.has(s) && r.dirs[0] === s;
      if (top || r.dirs[1] === s) { score = 50; ent = 1; g = s; break; }
      if (r.dirs[1] && r.dirs[1].startsWith(s + "_")) { score = 30; ent = 1; g = s; break; }
    }
    let wh = 0;
    for (const w of words) {
      if (r.words.includes(w)) wh += 1;
      else if (r.dirWords.includes(w)) wh += 0.7;
    }
    if (subs.length && !ent) continue;
    if (!subs.length && !wh) continue;
    score += wh * (ent ? 6 : 16);
    const km = K.length ? K.some(k => r.words.includes(k) || r.kind.endsWith(k)) : false;
    pool.push({ path: r.s.path, cat: r.s.cat, score: score + (km ? 25 : 0), ent: ent, hits: 1 + wh, kind: r.kind, g: g, km: km });
  }
  if (K.length) {   // user asked for a specific sound type: filter per subject, keep subjects that have no such type
    const has = new Set(pool.filter(x => x.km).map(x => x.g));
    pool = pool.filter(x => x.km || !has.has(x.g));
  }
  if (plan.more) {
    const fresh = pool.filter(x => !_shown.has(x.path));
    if (fresh.length >= 3) pool = fresh; else _shown.clear();
  }
  pool.sort((a, b) => (b.score - a.score) || (qKindRank(a.kind) - qKindRank(b.kind)) ||
    a.path.localeCompare(b.path, undefined, { numeric: true }));
  const res = pool.slice(0, limit);
  res.wantAll = !!plan.all;
  res.strong = subs.length > 0 && pool.some(x => x.ent);
  res.terms = subs.concat(words);
  return res;
}

async function smartSearch(msg, key, limit) {
  let plan = null;
  try { plan = await aiPlan(msg, key); } catch (e) { plan = null; }
  if (plan && plan.chat) { const c = []; c.chat = true; return c; }
  if (plan) {
    const k = plan.subjects.join(",") + "|" + plan.kinds.join(",");
    if (!plan.more && k !== _lastPlanKey) _shown.clear();
    const res = searchByPlan(plan, limit);
    if (res.length) {
      _lastPlan = plan; _lastPlanKey = k;
      if (/(^|[^a-z])(barcha|hamma|hammasi|hammasini|all|every)([^a-z]|$)|(все|всех|всё)/.test(qNorm(msg))) res.wantAll = true;
      return res;
    }
  }
  const fb = searchLib(msg, limit);   // offline / planner-failed fallback
  if (!fb.length) fb.chat = true;
  return fb;
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
  const wait = appendBubble("sys", '<span class="mc-dots" aria-label="thinking"><span></span><span></span><span></span></span>');
  wait.classList.add("typing");
  $("chatSend").disabled = true;

  const matches = await smartSearch(msg, key, 90);
  const maxPlays = matches.wantAll ? 48 : 12;
  const matchList = matches.map(m => m.path).join("\n");
  const mobList = matches.length ? "" : Array.from(new Set(all.filter(x => x.path.startsWith("mob/")).map(x => x.path.split("/")[1]))).join(", ");

  const chatMode = !!matches.chat;
  const sysGeneral = "You are MCAI, a very smart, warm and friendly AI assistant inside MCSOUNDS (a library of about 5000 official Minecraft sounds). " +
    "You are a general-purpose assistant: chat like a close friend, and answer any question well (facts, news, advice, study, code, translation, ideas, math, anything). " +
    "Always reply in the exact language the user writes in (Uzbek, Russian, English, or any other). " +
    "Be natural, helpful and accurate. Keep answers short when the question is simple and complete when it is deep. " +
    "Use web search when you need current or unknown facts, and never make things up; say honestly when you are not sure. " +
    "Plain text only, no markdown symbols like ** or #; use short lines or simple dashes for lists. " +
    "Today is " + new Date().toISOString().slice(0, 10) + ". " +
    "If the user wanted a Minecraft sound and nothing was found, say so kindly and suggest how to describe it. Never output PLAY: lines.";
  const sysSound = "You are MCAI, an expert Minecraft sound designer inside MCSOUNDS, a library of about 5000 official Minecraft .ogg sounds. " +
    "Always reply in the exact language the user writes in (Uzbek, Russian, English, or any other). " +
    "Library hints: mob/<mob>/say* = the mob's normal voice, hurt* = pain, death* = dying, step* = footsteps, idle*/ambient* = idle noises, moody/* = newer variant sounds; " +
    "entity/cow/milk* = milking; note/* = note-block instruments (instrument names such as cow_bell are NOT animals); music/* = songs. " +
    "Task: choose the best and most varied matches from Candidates ONLY, covering different sound types (voice, hurt, death, steps, ambient) and several variants. The candidates were pre-selected by a search planner and are real matches, so trust them; for vague or mood-based requests briefly say why the picks fit. " +
    (matches.wantAll ? "The user wants ALL of them, so list as many as fit. " : "") +
    "Never pick a candidate that matches only by a coincidence of name. Never invent paths. " +
    "Format: 1-2 short sentences saying what you found and what the sound types are, then ONE line: PLAY: path1, path2, ... (up to " + maxPlays + " paths, best first). No markdown, no SEARCH. " +
    (navPath.length ? "Current folder: " + navPath.join("/") + ". " : "") +
    "Candidates:\n" + (matchList || "(none)") +
    (mobList ? "\nAvailable mob folders under mob/: " + mobList : "");
  const system = chatMode ? sysGeneral : sysSound;

  hist.push({ role: "user", content: msg });
  if (hist.length > 10) hist = hist.slice(-10);

  try {
    const callGroq = (model, temp, maxTok) => fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({
        model: model,
        temperature: temp,
        max_tokens: maxTok,
        messages: [{ role: "system", content: system }].concat(hist)
      })
    });
    let res = null, json = null;
    if (chatMode) {   // general questions: Groq compound model has built-in web search
      try {
        res = await callGroq("groq/compound-mini", 0.6, 1500);
        json = await res.json();
        if (!res.ok) res = null;
      } catch (e) { res = null; }
    }
    if (!res) {
      res = await callGroq(MODEL, chatMode ? 0.6 : 0.3, chatMode ? 1500 : 900);
      json = await res.json();
    }
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
    let raw = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || "";
    raw = raw.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    hist.push({ role: "assistant", content: raw });
    const parsed = parseAI(raw);

    const cand = new Set(matches.map(m => m.path));
    let plays = cand.size ? parsed.plays.filter(p => cand.has(p)) : parsed.plays;
    if (matches.strong) {
      const eng = pickDiverse(matches, maxPlays).map(x => x.path);
      plays = eng.concat(plays.filter(p => !eng.includes(p)));
    }
    parsed.plays = chatMode ? [] : plays.slice(0, maxPlays);
    parsed.plays.forEach(p => _shown.add(p));

    const textPlain = (parsed.text || raw || "").trim();
    await typeAIResponse(textPlain, parsed.plays);
  } catch (e) {
    wait.remove();
    appendBubble("sys", "Network: " + e.message);
  }
  $("chatSend").disabled = false;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function scrollChatBottom() {
  const go = () => { const l = document.getElementById("chatLog"); if (l) l.scrollTop = l.scrollHeight; };
  go();
  requestAnimationFrame(go);
  setTimeout(go, 60);
  setTimeout(go, 300);
}

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
  const step = Math.max(1, Math.ceil(chars.length / 220));
  for (let i = 0; i < chars.length; i += step) {
    shown = chars.slice(0, i + step).join("");
    textEl.innerHTML = esc(shown).replace(/\n/g, "<br>") + '<span class="cursor"></span>';
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
    await sleep(16);
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

const soundSizeMap = new Map(); // path -> size in bytes (filled once, reused)
function tt(key, fallback) { const v = t(key); return v && v !== key ? v : fallback; }
function setDlPct(p) {
  const v = Math.max(0, Math.min(100, p));
  $("dlBar").style.width = v + "%";
  $("dlPct").textContent = v + "%";
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
  setDlPct(0);
  $("dlStatus").textContent = "";
  $("dlConfirm").disabled = false;
  $("dlConfirm").textContent = t("yes_dl");
  $("dlCancel").textContent = t("cancel");
  const n = (data && data.total) || (all && all.length) || "?";
  $("dlModalText").innerHTML = t("dl_text").replace("{n}", String(n));
  $("dlModal").classList.add("open");
}
function closeDlModal() {
  $("dlModal").classList.remove("open");
}

async function downloadAllSoundsZip() {
  if (typeof JSZip === "undefined") {
    $("dlStatus").textContent = t("jszip_fail");
    return;
  }
  const paths = all.map(x => x.path);
  if (!paths.length) {
    $("dlStatus").textContent = t("list_empty");
    return;
  }
  zipAbort = false;
  $("dlProgress").classList.add("show");
  $("dlConfirm").disabled = true;
  $("dlConfirm").textContent = t("downloading");
  $("dlCancel").textContent = t("stop");

  const zip = new JSZip();
  const folder = zip.folder("mcsnd-sounds");
  const total = paths.length;
  let done = 0;
  let failed = 0;
  const concurrency = 6;
  const urlOf = p => BASE + p.split("/").map(encodeURIComponent).join("/");

  // Step 1: learn each file's size in bytes (HEAD requests, cached across runs).
  let sizeDone = 0;
  let si = 0;
  async function sizeOne(p) {
    if (soundSizeMap.has(p)) return;
    try {
      const res = await fetch(urlOf(p), { method: "HEAD", cache: "force-cache" });
      const len = Number(res.headers.get("content-length"));
      if (res.ok && len > 0) soundSizeMap.set(p, len);
    } catch (e) { /* size unknown: estimated below */ }
  }
  async function sizeWorker() {
    while (si < total && !zipAbort) {
      const p = paths[si++];
      await sizeOne(p);
      sizeDone++;
      $("dlStatus").textContent = tt("calc_size", "Calculating size") + " " + sizeDone + " / " + total;
    }
  }
  setDlPct(0);
  await Promise.all(Array.from({ length: 16 }, () => sizeWorker()));

  // Files whose size the server did not report are estimated with the average size.
  let knownSum = 0;
  let knownCount = 0;
  for (const p of paths) {
    const s = soundSizeMap.get(p);
    if (s) { knownSum += s; knownCount++; }
  }
  const avgSize = knownCount ? knownSum / knownCount : 1;
  const sizeOf = p => soundSizeMap.get(p) || avgSize;
  const totalBytes = paths.reduce((sum, p) => sum + sizeOf(p), 0) || 1;
  let doneBytes = 0;
  const addBytes = n => {
    doneBytes += n;
    setDlPct(Math.floor((doneBytes / totalBytes) * 100));
  };

  $("dlStatus").textContent = "0 / " + total;

  async function fetchOne(p) {
    if (zipAbort) return;
    try {
      const res = await fetch(urlOf(p), { cache: "force-cache" });
      if (!res.ok) throw new Error(String(res.status));
      const buf = await res.arrayBuffer();
      folder.file(p, buf);
      addBytes(buf.byteLength);
    } catch (e) {
      failed++;
      addBytes(sizeOf(p));
    } finally {
      done++;
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
    $("dlStatus").textContent = t("stopped") + " (" + done + " / " + total + ")";
    $("dlConfirm").disabled = false;
    $("dlConfirm").textContent = t("retry");
    $("dlCancel").textContent = t("close");
    return;
  }

  $("dlStatus").textContent = t("building_zip");
  try {
    const blob = await zip.generateAsync(
      { type: "blob", compression: "STORE" },
      meta => {
        if (meta && meta.percent != null) {
          setDlPct(Math.round(meta.percent));
        }
      }
    );
    triggerBlobDownload(blob, "mcsnd-sounds.zip");
    $("dlStatus").textContent = t("done_dl") + (failed ? " (" + failed + ")" : "");
    setDlPct(100);
    $("dlConfirm").textContent = t("download_again");
    $("dlConfirm").disabled = false;
    $("dlCancel").textContent = t("close");
  } catch (e) {
    $("dlStatus").textContent = t("zip_err") + ": " + (e.message || e);
    $("dlConfirm").disabled = false;
    $("dlConfirm").textContent = t("retry");
    $("dlCancel").textContent = t("close");
  }
}


function on(id, evt, fn, opts) {
  const el = typeof id === "string" ? $(id) : id;
  if (el && el.addEventListener) el.addEventListener(evt, fn, opts);
}

function bind() {
  let searchTimer = null;
  on("btnBack", "click", () => {
    if (navPath.length) goNav(navPath.slice(0, -1));
  });
  on("btnDlAll", "click", openDlModal);
  on("dlCancel", "click", () => {
    if ($("dlConfirm") && $("dlConfirm").disabled) {
      zipAbort = true;
      if ($("dlStatus")) $("dlStatus").textContent = t("stop");
    } else {
      zipAbort = true;
      closeDlModal();
    }
  });
  on("dlConfirm", "click", () => downloadAllSoundsZip());
  on("dlModal", "click", e => {
    if (e.target === $("dlModal") && $("dlConfirm") && !$("dlConfirm").disabled) closeDlModal();
  });

  on("search", "input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderStage(e.target.value), 150);
  });
  on("pIco", "click", togglePause);
  on("vol", "input", e => {
    const v = parseFloat(e.target.value);
    if (audio) audio.volume = v;
    e.target.style.setProperty("--vol-pct", (v * 100) + "%");
  });
  (function () {
    const v = $("vol");
    if (v) v.style.setProperty("--vol-pct", (parseFloat(v.value) * 100) + "%");
  })();

  const onScrubStart = e => {
    if (!audio) return;
    e.preventDefault();
    seeking = true;
    const wasPlayingBeforeScrub = !audio.paused;
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
      if (wasPlayingBeforeScrub && audio && !audio.ended) {
        if (audio.paused) {
          const p = audio.play();
          if (p && p.catch) p.catch(function () {});
        }
        if ($("pIcoSvg")) $("pIcoSvg").src = "/svg/pause.svg";
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      } else {
        if (audio) audio.pause();
        if ($("pIcoSvg")) $("pIcoSvg").src = "/svg/play.svg";
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", end);
    document.addEventListener("touchcancel", end);
  };
  on("track", "mousedown", onScrubStart);
  on("track", "touchstart", onScrubStart, { passive: false });

  on("btnTheme", "click", () => {
    const next = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", next);
    document.documentElement.setAttribute("data-theme-early", next);
    try { localStorage.setItem("mcsnd_theme", next); } catch (e) {}
    syncKeyIcon();
  });
  on("btnLang", "click", () => {
    const i = LANG_CYCLE.indexOf(lang);
    lang = LANG_CYCLE[(i < 0 ? 0 : i + 1) % LANG_CYCLE.length];
    try { localStorage.setItem("mcsnd_lang", lang); } catch (e) {}
    applyStaticLang();
    try { renderNav(); } catch (e) {}
    try { renderStage(($("search") && $("search").value) || ""); } catch (e) {}
  });

  const toggleNav = () => {
    if (!$("nav") || !$("shell")) return;
    const open = $("nav").classList.toggle("open");
    $("shell").classList.toggle("nav-on", open);
    if ($("btnMenu")) $("btnMenu").classList.toggle("on", open);
    if (open && $("shell").classList.contains("chat-on")) {
      $("shell").classList.remove("chat-on");
      if ($("btnChat")) $("btnChat").classList.remove("on");
    }
  };
  on("btnMenu", "click", toggleNav);

  const toggleChat = () => {
    if (!$("shell")) return;
    $("shell").classList.toggle("chat-on");
    if ($("btnChat")) $("btnChat").classList.toggle("on", $("shell").classList.contains("chat-on"));
    if ($("shell").classList.contains("chat-on")) scrollChatBottom();
  };
  on("btnChat", "click", toggleChat);
  on("backdrop", "click", () => {
    if ($("shell") && $("shell").classList.contains("nav-on")) {
      if ($("nav")) $("nav").classList.remove("open");
      $("shell").classList.remove("nav-on");
      if ($("btnMenu")) $("btnMenu").classList.remove("on");
    } else {
      toggleChat();
    }
  });
  on("btnKey", "click", () => { if ($("keyPop")) $("keyPop").classList.toggle("open"); });
  on("btnClear", "click", clearChat);
  on("chatLog", "scroll", () => {
    const log = $("chatLog");
    if (!log || log.scrollTop > 40 || chatLoaded <= 0) return;
    const prevH = log.scrollHeight;
    const more = Math.max(0, chatLoaded - 20);
    if (more === chatLoaded) return;
    const frag = renderChatSlice(more, chatLoaded);
    log.insertBefore(frag, log.firstChild);
    chatLoaded = more;
    log.scrollTop = log.scrollHeight - prevH;
  });

  on("keySave", "click", () => saveApiKeyFromInput());
  on("groqKey", "keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); saveApiKeyFromInput(); }
  });
  on("keyChange", "click", () => {
    const conn = $("keyConnected");
    if (conn) conn.hidden = true;
    const inp = $("groqKey");
    if (inp) {
      inp.type = "text";
      inp.readOnly = false;
      inp.value = "";
      inp.focus();
    }
    const st = $("keyStatus");
    if (st) { st.textContent = ""; st.className = "key-status"; }
  });
  on("keyRemove", "click", () => {
    try { localStorage.removeItem("groq_api_key"); } catch (e) {}
    const inp = $("groqKey");
    if (inp) { inp.type = "text"; inp.readOnly = false; inp.value = ""; }
    const st = $("keyStatus");
    if (st) { st.textContent = ""; st.className = "key-status"; }
    syncKeyUI();
    const hero = $("askHero");
    if (hero) {
      const sub = hero.querySelector(".ask-sub");
      if (sub) sub.textContent = t("enter_key");
    }
  });
  try { syncKeyUI(); } catch (e) {}

  on("chatSend", "click", sendChat);
  on("chatInput", "keydown", e => { if (e.key === "Enter") sendChat(); });

  document.addEventListener("keydown", e => {
    if (e.code !== "Space" && e.key !== " ") return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || (e.target && e.target.isContentEditable)) return;
    e.preventDefault();
    togglePause();
  });
}

init();
