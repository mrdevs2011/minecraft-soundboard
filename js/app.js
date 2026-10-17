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
    more: "More",
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
    clear_q_title: "CLEAR CHAT?",
    clear_q_text: "All AI messages will be deleted permanently. This cannot be undone.",
    yes: "Yes",
    no: "No",
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
    more: "Yana",
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
    clear_q_title: "CHATNI TOZALASH?",
    clear_q_text: "Barcha AI xabarlari butunlay o\u2018chiriladi. Buni qaytarib bo\u2018lmaydi.",
    yes: "Ha",
    no: "Yo\u2018q",
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
    more: "Ещё",
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
    clear_q_title: "ОЧИСТИТЬ ЧАТ?",
    clear_q_text: "Все сообщения ИИ будут удалены безвозвратно. Это нельзя отменить.",
    yes: "Да",
    no: "Нет",
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
  const btnMore = $("btnMore");
  if (btnMore) { btnMore.title = t("more"); btnMore.setAttribute("aria-label", t("more")); }
  const btnClearEl = $("btnClear");
  if (btnClearEl) { btnClearEl.title = t("clear_chat"); btnClearEl.setAttribute("aria-label", t("clear_chat")); }
  if ($("clearModalTitle")) $("clearModalTitle").textContent = t("clear_q_title");
  if ($("clearModalText")) $("clearModalText").textContent = t("clear_q_text");
  if ($("clearYes")) $("clearYes").textContent = t("yes");
  if ($("clearNo")) $("clearNo").textContent = t("no");
  const chatInput = $("chatInput");
  if (chatInput) chatInput.placeholder = t("what_sound");
  const groqKey = $("groqKey");
  if (groqKey) groqKey.placeholder = t("paste_key");
  const keySave = $("keySave");
  if (keySave) keySave.textContent = t("save");
  const keyLabel = document.querySelector('label[for="groqKey"]');
  if (keyLabel) keyLabel.textContent = t("groq_key");
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

const MODEL = "openai/gpt-oss-20b";
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
    document.querySelectorAll(".key-hint").forEach(el => el.remove());   // key is valid: stop talking about the key
    setTimeout(() => { const kp = $("keyPop"); if (kp) kp.classList.remove("open"); }, 350);   // auto-close modal
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
  await sleep(instant ? 20 : 40);

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

let _ac = null;
const VOL_BOOST = 4;   // Minecraft .ogg files are quiet: boost, limiter prevents clipping
function attachBoost(a) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!_ac) _ac = new AC();
    if (_ac.state === "suspended") _ac.resume();
    const node = _ac.createMediaElementSource(a);
    const g = _ac.createGain();
    g.gain.value = VOL_BOOST;
    const lim = _ac.createDynamicsCompressor();
    lim.threshold.value = -6; lim.knee.value = 0; lim.ratio.value = 20;
    lim.attack.value = 0.003; lim.release.value = 0.1;
    node.connect(g); g.connect(lim); lim.connect(_ac.destination);
  } catch (e) {}
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
    attachBoost(a);
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

/* Close player: instant stop (0 ms) + hide. Used by the X button, Esc, and page reload/unload. */
function closePlayer() {
  try { if (audio) { audio.muted = true; audio.volume = 0; } } catch (e) {}
  stop(true);
  try { currentPlayPath = null; } catch (e) {}
}
function killAudioNow() {
  try { if (audio) { audio.muted = true; audio.pause(); } } catch (e) {}
  stop(false);
  try { if (_ac && _ac.state !== "closed") _ac.suspend(); } catch (e) {}
}
document.addEventListener("click", e => {
  if (e.target && e.target.closest && e.target.closest("#pClose")) closePlayer();
});
document.addEventListener("keydown", e => {
  // Esc closes the player (unless a popup/modal is handling it)
  if (e.key === "Escape") {
    const pl = $("player");
    const kp = $("keyPop");
    if (pl && pl.classList.contains("show") && !(kp && kp.classList.contains("open"))) closePlayer();
    return;
  }
  // Ctrl+R / Ctrl+Shift+R / Cmd+R / F5: silence immediately, before the reload starts
  const k = (e.key || "").toLowerCase();
  if (((e.ctrlKey || e.metaKey) && k === "r") || e.key === "F5") killAudioNow();
}, true);
window.addEventListener("pagehide", killAudioNow);
window.addEventListener("beforeunload", killAudioNow);

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
const Q_STOP = new Set(("menga bizga senga ni ning ga dan bilan va yoki ham kerak yana bitta boshqa qil qilib topchi topib topish topsin bersin bering bersang bersangiz berdemoqchi demoqchi iltimos " +
  "the an of for me my us give show find play get sound sounds all every some more another other please can you do have what which with and or to " +
  "дай дайте мне звук звуки звука звуков все всех всё найди найти покажи еще ещё другой другие пожалуйста").split(/\s+/));
const Q_STOP_RE = /^(ovoz|tovush|ber|top|topchi|topib|topish|qidir|korsat|barcha|hamma|звук)/;
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


/* The "[played: ...]" tag is OUR note, never the model's: keep it out of the text the model sees (it copies it and
   then writes it instead of really playing). Played paths live in h.played and go to the system prompt instead. */
function stripPlayedTag(t) { return String(t || "").replace(/\s*\[played:[^\]]*\]/gi, "").trim(); }
function playedNames(plays) { return (plays || []).slice(0, 3).map(x => String(x).replace(/\.ogg$/, "")); }

function saveHist() {
  try { localStorage.setItem("mcsnd_hist", JSON.stringify(hist.slice(-4))); } catch (e) {}
}
function loadHist() {
  try {
    const h = JSON.parse(localStorage.getItem("mcsnd_hist") || "[]");
    hist = Array.isArray(h) ? h.filter(x => x && (x.role === "user" || x.role === "assistant") && typeof x.content === "string")
      .map(x => ({ role: x.role, content: stripPlayedTag(x.content), played: Array.isArray(x.played) ? x.played.slice(0, 3) : undefined })).slice(-4) : [];
  } catch (e) { hist = []; }
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
  loadHist();
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
  hist = []; saveHist();
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
    const p = line.match(/(?:^|\s)PLAY:\s*(.+)$/i);
    if (p) {
      const before = line.slice(0, p.index).trim();
      if (before) clean.push(before);
      p[1].split(",").map(x => x.trim().replace(/[.\s]+$/, "")).filter(Boolean).forEach(path => {
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
      body: JSON.stringify({ model: MODEL, temperature: 0, max_tokens: 220,
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

/* ===== MCAI agent: works like grep. Local only (no internet): library tools + the model's own Minecraft knowledge ===== */
const AGENT_TOOLS = [
  { type: "function", function: { name: "search_sounds",
    description: "Find .ogg paths. words=EN game terms. folder optional. Prefer limit 6.",
    parameters: { type: "object", properties: {
      words: { type: "string", description: "EN words e.g. creeper hurt" },
      folder: { type: "string", description: "prefix e.g. mob/creeper" },
      limit: { type: "integer", description: "1-8" } }, required: ["words"] } } }
];

const AGENT_ALIAS = {
  bomb: ["explode", "blast", "tnt"], bombs: ["explode", "blast", "tnt"], explosion: ["explode", "blast"], explosions: ["explode", "blast"],
  explosive: ["explode", "tnt"], detonate: ["explode"], detonation: ["explode"], dynamite: ["tnt", "explode"], tnt: ["tnt", "explode"],
  boom: ["boom", "explode"], blast: ["blast", "explode"], firecracker: ["firework"], fireworks: ["firework"]
};

/* uz / ru everyday words -> words used in Minecraft file names (MCAI never gives up on a language barrier) */
const AGENT_TR = {
  portlash:["explode"], portlat:["explode"], portlovchi:["explode","tnt"], bomba:["explode","tnt"], bombalar:["explode","tnt"], "взрыв":["explode"], "бомба":["explode","tnt"], "динамит":["tnt","explode"], "тнт":["tnt"],
  qadam:["step"], qadamlar:["step"], "шаг":["step"], "шаги":["step"],
  olov:["fire"], "огонь":["fire"], "пожар":["fire"], "yong'in":["fire"],
  tovuq:["chicken"], "курица":["chicken"], "цыпленок":["chicken"], sigir:["cow"], "корова":["cow"], "cho'chqa":["pig"], "свинья":["pig"],
  echki:["goat"], "коза":["goat"], "овца":["sheep"], ot:["horse"], "лошадь":["horse"], "конь":["horse"], eshak:["donkey"],
  it:["wolf"], "собака":["wolf"], "bo'ri":["wolf"], "волк":["wolf"], mushuk:["cat"], "кошка":["cat"], "кот":["cat"],
  zombi:["zombie"], "зомби":["zombie"], skelet:["skeleton"], "скелет":["skeleton"], kreeper:["creeper"], krepper:["creeper"], creper:["creeper"], "крипер":["creeper"],
  ajdar:["enderdragon","dragon"], "дракон":["enderdragon","dragon"], ender:["ender"], "эндер":["ender"], "qo'riqchi":["warden"],
  "yomg'ir":["rain"], "дождь":["rain"], momaqaldiroq:["thunder"], "гром":["thunder"], chaqmoq:["lightning","thunder"], "молния":["lightning","thunder"],
  shamol:["wind"], "ветер":["wind"], suv:["water"], "вода":["water"], "лава":["lava"],
  musiqa:["music"], muzika:["music"], "музыка":["music"], plastinka:["records"], "пластинка":["records"], disk:["records"], "диск":["records"],
  eshik:["door"], "дверь":["door"], sandiq:["chest"], "сундук":["chest"],
  zarba:["hit","hurt","damage"], "удар":["hit","hurt","damage"], "o'lim":["death"], "смерть":["death"], "og'riq":["hurt"], "боль":["hurt"],
  kamon:["bow"], "лук":["bow"], "o'q":["arrow"], "стрела":["arrow"], qilich:["sweep","crit","knockback"], "меч":["sweep","crit"], sword:["sweep","crit"],
  "qo'ng'iroq":["bell"], "колокол":["bell"], tugma:["button","click"], "кнопка":["button","click"], bosish:["click"],
  suzish:["swim","splash"], "плавать":["swim","splash"], ovqat:["eat"], "еда":["eat"], sakrash:["jump"], "прыжок":["jump"],
  "портал":["portal"], kema:["boat"], "лодка":["boat"], poyezd:["minecart"], "вагонетка":["minecart"], "алмаз":["diamond"],
  tosh:["stone"], "камень":["stone"], "yog'och":["wood"], "дерево":["wood"], shisha:["glass"], "стекло":["glass"], qum:["sand"], "песок":["sand"], qor:["snow"], "снег":["snow"],
  asalari:["bee"], "пчела":["bee"], "ko'rshapalak":["bat"], "o'rgimchak":["spider"], "паук":["spider"], baliq:["fish","cod","salmon"], "рыба":["fish","cod","salmon"],
  delfin:["dolphin"], "дельфин":["dolphin"], qishloqi:["villager"], "житель":["villager"], qichqiriq:["scream"], "крик":["scream"]
};
const AGENT_STOP = new Set(("top topib ber berchi qoy qo'y chal chalib eshit eshitay eshitaman ovoz ovozi ovozini ovozlar ovozlarini tovush tovushi sound sounds play find give me the an of for to please " +
  "minecraft mc mcai uchun va bilan menga manga iltimos bor bormi find hear need want " +
  "найди включи дай звук звуки звука майнкрафт майнкрафта пожалуйста мне про").split(" "));
const AGENT_WANT = /(^|[^a-z])(top|topib|ber|qo'?y|qoy|chal|eshit\w*|play|find|give|hear)([^a-z]|$)|(включи|найди|дай|поставь|послуш|сыграй)/i;
const AGENT_GIVEUP = /(nothing (found|matched)|no results|topa olmad|topilmad|topib bo'?lmad|yo'?q\b|mavjud emas|not found|couldn'?t find|could not find|can'?t find|cannot find|no (such|matching|exact)|does ?n'?t (exist|have)|not in (the )?library|не наш|не могу найти|нет (такого|в библиотеке|файл|звук)|отсутств|не существ)/i;

function _msgTokens(msg) {
  return String(msg || "").toLowerCase().replace(/[\u2018\u2019\u02bb\u02bc`]/g, "'").split(/[^a-z0-9'а-яё]+/i)
    .map(t => t.replace(/^'+|'+$/g, "")).filter(t => t.length > 1 && !AGENT_STOP.has(t)).slice(0, 6);
}

let _vocabC = null;
function _agVocab() {
  const rows = qIndex();
  if (_vocabC && _vocabC.rows === rows) return _vocabC.list;
  const set = new Set();
  rows.forEach(r => r.p.replace(/\.ogg$/, "").split(/[\/_\-.]+/).forEach(w => { w = w.replace(/\d+$/, ""); if (w.length > 2) set.add(w); }));
  _vocabC = { rows: rows, list: Array.from(set) };
  return _vocabC.list;
}
function _lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = [];
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
/* every way a word can be written in the library: plural, synonyms, uz/ru translation, (fuzzy) typos and prefixes */
function _alts(t0, fuzzy) {
  const t = String(t0).replace(/[\u2018\u2019\u02bb\u02bc`]/g, "'");
  const out = new Set([t]);
  if (t.length > 3 && t.endsWith("s")) out.add(t.slice(0, -1));
  const add = k => { (AGENT_ALIAS[k] || []).forEach(x => out.add(x)); (AGENT_TR[k] || []).forEach(x => out.add(x)); };
  add(t);
  if (t.length > 3 && t.endsWith("s")) add(t.slice(0, -1));
  ["larni", "lari", "lar", "ning", "ni", "ga", "dan", "da", "si", "ler", "и", "ы", "а", "у", "ов", "ы", "i"].forEach(suf => {
    if (t.length > suf.length + 2 && t.endsWith(suf)) add(t.slice(0, -suf.length));
  });
  if (fuzzy) {
    const max = t.length >= 8 ? 2 : 1;
    _agVocab().forEach(w => {
      if (w === t) return;
      if ((t.length >= 3 && w.startsWith(t)) || (t.length >= 5 && w.length >= 4 && t.startsWith(w))) { out.add(w); return; }
      if (t.length >= 4 && _lev(t, w, max) <= max) out.add(w);
    });
  }
  return Array.from(out).slice(0, 80);
}
/* short words (cat, ox, tnt) must match whole words, not "catalyst" */
function _has(r, x) {
  if (x.length > 4) return r.p.includes(x);
  let i = r.p.indexOf(x);
  while (i >= 0) {
    const b = i === 0 ? "" : r.p[i - 1], a = r.p[i + x.length] || "";
    if (!/[a-z]/.test(b) && !/[a-z]/.test(a)) return true;
    i = r.p.indexOf(x, i + 1);
  }
  return false;
}
/* keep the best-ranked synonyms first: explode before blast before tnt */
function _rankRows(rows, lists) {
  const sc = r => lists.reduce((sum, al) => { const k = al.findIndex(x => _has(r, x)); return sum + (k < 0 ? 99 : k); }, 0);
  const tagged = rows.map(r => ({ r: r, p: sc(r) })).sort((a, b) => a.p - b.p);
  const out = [];
  let lastP = -1;
  for (const x of tagged) {
    if (out.length >= 3 && x.p !== lastP) break;
    out.push(x.r);
    lastP = x.p;
  }
  return out;
}
/* the cascade: exact -> synonyms/translation -> fuzzy -> partial (rarest word wins). It always returns the best it can. */
function agentFind(toks, folder) {
  const base = qIndex().filter(r => !folder || r.p.startsWith(folder));
  const run = (lists, strict) => base.filter(r => lists.every(al => al.some(x => strict ? _has(r, x) : r.p.includes(x))));
  let rows = run(toks.map(t => [t]), false);
  if (rows.length) return { rows: rows, mode: "exact" };
  let al = toks.map(t => _alts(t, false));
  rows = run(al, true);
  if (rows.length) return { rows: _rankRows(rows, al), mode: "synonyms/plural/translation" };
  al = toks.map(t => _alts(t, true));
  rows = run(al, true);
  if (rows.length) return { rows: _rankRows(rows, al), mode: "fuzzy (typos / partial words)" };
  if (toks.length > 1) {
    const w = al.map(a => { const d = base.filter(r => a.some(x => _has(r, x))).length; return d ? 1 / d : 0; });
    const scored = base.map(r => { let sc = 0; al.forEach((a, i) => { if (w[i] && a.some(x => _has(r, x))) sc += w[i]; }); return { r: r, sc: sc }; }).filter(x => x.sc > 0);
    if (scored.length) {
      let best = 0;
      scored.forEach(x => { if (x.sc > best) best = x.sc; });
      const hitW = toks.filter((t, i) => w[i] && scored.some(x => x.sc === best && al[i].some(y => _has(x.r, y))));
      return { rows: scored.filter(x => x.sc >= best - 1e-12).map(x => x.r), mode: "partial: closest by the rarest word(s): " + (hitW.join(", ") || toks.join(", ")) };
    }
  }
  if (folder) {
    const r2 = agentFind(toks, "");
    if (r2.rows.length) { r2.mode += " (folder filter dropped: nothing there)"; return r2; }
  }
  return { rows: [], mode: "none" };
}

function agentReport(found, toks, a, seen) {
  let rows = found.rows;
  const total = rows.length;
  const byF = {};
  rows.forEach(r => { const f = r.dirs.slice(0, 2).join("/") || "(root)"; byF[f] = (byF[f] || 0) + 1; });
  const out = { total: total, mode: found.mode, folders: Object.keys(byF).sort((x, y) => byF[y] - byF[x]).slice(0, 8).map(f => f + ": " + byF[f]) };
  if (!total && toks.length) {
    out.per_word = toks.map(t => t + ": " + qIndex().filter(r => r.p.includes(t)).length);
    out.did_you_mean = toks.map(t => ({ word: t, close: _agVocab().filter(w => _lev(t, w, 2) <= 2 || (t.length >= 3 && w.startsWith(t))).slice(0, 6) })).filter(x => x.close.length);
    out.hint = "nothing matched even after typo/synonym/partial matching: use grep_sounds with a regex of alternatives, or list_folder on a likely folder (mob, entity, block, item, ambient, random, records, music, ui)";
  }
  if (!a.count_only && total) {
    const fresh = rows.filter(r => !_shown.has(r.s.path));
    if (fresh.length) rows = fresh;
    const lim = Math.max(1, Math.min(12, parseInt(a.limit, 10) || 8));
    const items = rows.map(r => ({ path: r.s.path, g: r.dirs.slice(0, 2).join("/"), kind: r.kind }));
    out.files = pickDiverse(items, lim).map(x => x.path);
    out.files.forEach(f => seen.add(f));
  }
  return out;
}

function agentSearch(a, seen) {
  const toks = String(a.words || "").toLowerCase().split(/[\s,]+/).filter(t => t.length > 1);
  const folder = String(a.folder || "").toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^sounds\//, "");
  if (!toks.length && !folder) return { error: "give words or folder" };
  const found = toks.length ? agentFind(toks, folder) : { rows: qIndex().filter(r => r.p.startsWith(folder)), mode: "folder" };
  return agentReport(found, toks, a, seen);
}

function agentGrep(a, seen) {
  const pat = String(a.pattern || "").trim();
  if (!pat) return { error: "give a pattern" };
  let re;
  try { re = new RegExp(pat, "i"); } catch (e) { return { error: "bad regex: " + e.message }; }
  const folder = String(a.folder || "").toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^sounds\//, "");
  const rows = qIndex().filter(r => (!folder || r.p.startsWith(folder)) && re.test(r.p));
  return agentReport({ rows: rows, mode: "regex" }, [], a, seen);
}

/* last line of defence: the model gave up, the code itself searches the user's words and plays the closest files */
function agentAutoPick(msg, seen, maxPlays, trace) {
  const toks = _msgTokens(msg);
  if (!toks.length) return [];
  const f = agentFind(toks, "");
  trace.push({ type: "tool", name: "search_sounds", args: { words: toks.join(" "), auto: true }, result: { total: f.rows.length, mode: f.mode } });
  if (!f.rows.length) return [];
  const fresh = f.rows.filter(r => !_shown.has(r.s.path));
  const base = fresh.length ? fresh : f.rows;
  const picks = pickDiverse(base.map(r => ({ path: r.s.path, g: r.dirs.slice(0, 2).join("/"), kind: r.kind })), Math.min(6, maxPlays)).map(x => x.path);
  picks.forEach(x => seen.add(x));
  return picks;
}
function agentClosestText(msg) {
  if (/[а-яё]/i.test(msg)) return "Точного совпадения нет — вот самые близкие звуки:";
  if (/(^|[^a-z])(the|play|find|give|sound|sounds|me)([^a-z]|$)/i.test(msg)) return "No exact match — here are the closest sounds:";
  return "Aniq mos ovoz topilmadi — eng yaqinlari:";
}

function agentList(a, seen) {
  const pth = String(a.path || "").toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^sounds\//, "");
  const depth = pth ? pth.split("/").length : 0;
  const rows = qIndex().filter(r => !pth || r.p.startsWith(pth + "/"));
  if (!rows.length) return { error: "no such folder" };
  const subs = {}, kinds = {};
  let direct = [];
  rows.forEach(r => {
    if (r.dirs.length > depth) subs[r.dirs[depth]] = (subs[r.dirs[depth]] || 0) + 1;
    else { direct.push(r); kinds[r.kind] = (kinds[r.kind] || 0) + 1; }
  });
  const out = { path: pth || "/", subfolders: Object.keys(subs).sort((x, y) => subs[y] - subs[x]).slice(0, 25).map(f => f + ": " + subs[f]) };
  if (direct.length) {
    out.direct_files = direct.length;
    out.kinds = Object.keys(kinds).sort((x, y) => kinds[y] - kinds[x]).slice(0, 8);
    out.samples = direct.slice(0, 5).map(r => r.s.path);
    out.samples.forEach(f => seen.add(f));
  }
  return out;
}

/* ===== agent trace panel (like Claude: collapsible steps, request/response code boxes, sources) ===== */
function renderTrace(trace, live) {
  if (!trace || !trace.length) {
    if (live) return '<details class="trace" open><summary>Working...</summary><div class="trace-body"><div class="trace-think">Thinking...</div></div></details>';
    return "";   // no thinking or tools: hide the box
  }
  const hasThink = trace.some(x => x.type === "think" && x.text && x.text.trim());
  const hasTools = trace.some(x => x.type === "tool");
  if (!live && !hasThink && !hasTools) return "";
  const tools = trace.filter(x => x.type === "tool");
  const totalTok = trace.reduce((s, x) => s + (x.tokens || 0), 0);
  const baseTitle = live
    ? (tt("trace_working", "Working...") + (tools.length ? " (" + tools.length + ")" : ""))
    : (tt("trace_used", "Used sound library") + " (" + tools.length + " " + (tools.length === 1 ? tt("trace_step", "step") : tt("trace_steps", "steps")) + ")");
  const tokSpan = totalTok ? '<span class="trace-hdr-tok"> · ' + totalTok + ' tok</span>' : '';
  const title = esc(baseTitle) + tokSpan;
  const code = o => {
    let t = JSON.stringify(o, null, 2) || "";
    if (t.length > 900) t = t.slice(0, 900) + "\n...";
    return esc(t);
  };
  let body = "";
  const dirs = [];
  trace.forEach(x => {
    if (x.type === "think") {
      body += '<div class="trace-think">' + esc(x.text).replace(/\n/g, "<br>") + '</div>';
      return;
    }
    const a = x.args || {}, r = x.result || {};
    let label = x.name;
    if (x.name === "list_folder") label += " \u00b7 " + (a.path || "/");
    else if (x.name === "search_sounds") label += " \u00b7 \"" + (a.words || "") + "\"" + (a.folder ? " in " + a.folder : "") + (a.count_only ? " (count)" : "");
    if (r.error) label += " \u00b7 " + r.error;
    else if (typeof r.total === "number") label += " \u00b7 " + r.total;
    (r.files || []).concat(r.samples || []).forEach(f => {
      const d = f.split("/").slice(0, -1).join("/") || "(root)";
      if (!dirs.includes(d)) dirs.push(d);
    });
    body += '<details class="trace-step"><summary>' + esc(label) + '</summary>' +
      '<div class="trace-lbl">Request</div><pre class="trace-code">' + code(a) + '</pre>' +
      '<div class="trace-lbl">Response</div><pre class="trace-code">' + code(r) + '</pre></details>';
  });
  if (!live && tools.length) {
    body += '<div class="trace-src"><b>' + tt("trace_sources", "Sources") + ':</b> sounds.json (' + (all ? all.length : 0) + ')' +
      dirs.slice(0, 8).map(d => ' \u00b7 ' + esc(d)).join("") + '</div>';
  }
  return '<details class="trace"' + (live ? " open" : "") + '><summary>' + title + '</summary><div class="trace-body">' + body + '</div></details>';
}

function histForModel() {
  const slice = hist.slice(-2);
  return slice.map((h, i) => {
    const lim = i === slice.length - 1 ? 160 : 80;
    const c = stripPlayedTag(h.content);
    return { role: h.role, content: c.length > lim ? c.slice(0, lim) + "..." : c };
  });
}

function recentPlayedNote() {
  const last = hist.filter(h => h.role === "assistant" && h.played && h.played.length).slice(-1)[0];
  return last ? "Last played in this chat: " + last.played.join(", ") + ". " : "";
}


/* Zero-API: intent map + token expand — instant, accurate, no TPM */
const LOCAL_INTENT = [
  { re: /(qilich|sword|меч|sweep)/i, folder: "entity/player/attack", words: ["sweep"] },
  { re: /(krit|crit|critical)/i, folder: "entity/player/attack", words: ["crit"] },
  { re: /(knockback|ortga\s*ite)/i, folder: "entity/player/attack", words: ["knockback"] },
  { re: /(tnt|dinamit|bomb|portla|portlash|взрыв|бомб|explode)/i, folder: "random", words: ["explode"] },
  { re: /(fuse|fitil)/i, folder: "random", words: ["fuse"] },
  { re: /(mushuk|cat|кошка|кот)/i, folder: "mob/cat", words: ["cat"] },
  { re: /(tovuq|chicken|курица)/i, folder: "mob/chicken", words: ["chicken"] },
  { re: /(sigir|cow|корова)/i, folder: "mob/cow", words: ["cow"] },
  { re: /(cho'?chqa|pig|свинья)/i, folder: "mob/pig", words: ["pig"] },
  { re: /(kreeper|creeper|krepper|крипер)/i, folder: "mob/creeper", words: ["creeper"] },
  { re: /(zombi|zombie|зомби)/i, folder: "mob/zombie", words: ["zombie"] },
  { re: /(skelet|skeleton|скелет)/i, folder: "mob/skeleton", words: ["skeleton"] },
  { re: /(enderman|ender\s*man)/i, folder: "mob/endermen", words: ["endermen"] },
  { re: /(warden|qo'?riqchi)/i, folder: "mob/warden", words: ["warden"] },
  { re: /(villager|qishloqi|житель)/i, folder: "mob/villager", words: ["villager"] },
  { re: /(kamon|bow|лук)/i, folder: "random", words: ["bow"] },
  { re: /(trident)/i, folder: "item/trident", words: ["trident"] },
  { re: /(shield|qalqon)/i, folder: "item/shield", words: ["shield"] },
  { re: /(crossbow|arbalet)/i, folder: "item/crossbow", words: ["crossbow"] },
  { re: /(level\s*up|levelup)/i, folder: "random", words: ["levelup"] },
  { re: /\banvil\b|anvil/i, folder: "random", words: ["anvil"] },
  { re: /(chest|sandiq|сундук)/i, folder: "random", words: ["chest"] },
  { re: /(door|eshik|дверь)/i, folder: "random", words: ["door"] },
  { re: /(burp|kesirish)/i, folder: "random", words: ["burp"] },
  { re: /(splash|sepish)/i, folder: "random", words: ["splash"] },
  { re: /(portal|портал)/i, folder: "portal", words: ["portal"] },
  { re: /(note\s*block|nota)/i, folder: "note", words: ["note"] },
  { re: /(pigstep|otherside|records?|plastinka|диск)/i, folder: "records", words: [""] },
  { re: /(musiqa|music|музыка)/i, folder: "music", words: [""] },
  { re: /(ghast|gast)/i, folder: "mob/ghast", words: ["ghast"] },
  { re: /(spider|o'?rgimchak|паук)/i, folder: "mob/spider", words: ["spider"] },
  { re: /(wolf|sobaka|собака|bo'?ri|it\s+ovozi|it(?=\s|$))/i, folder: "mob/wolf", words: ["wolf"] },
  { re: /(horse|лошадь|ot\s+ovozi)/i, folder: "mob/horse", words: ["horse"] },
  { re: /(bee|asalari|пчела)/i, folder: "mob/bee", words: ["bee"] },
  { re: /(axolotl)/i, folder: "mob/axolotl", words: ["axolotl"] },
  { re: /(dolphin|delfin)/i, folder: "mob/dolphin", words: ["dolphin"] },
  { re: /(phantom)/i, folder: "mob/phantom", words: ["phantom"] },
  { re: /(ravager)/i, folder: "mob/ravager", words: ["ravager"] },
  { re: /(pillager)/i, folder: "mob/pillager", words: ["pillager"] },
  { re: /(witch|jodugar)/i, folder: "mob/witch", words: ["witch"] },
  { re: /(slime|shilimshi)/i, folder: "mob/slime", words: ["slime"] },
  { re: /(blaze)/i, folder: "mob/blaze", words: ["blaze"] },
  { re: /(wither)/i, folder: "mob/wither", words: ["wither"] },
  { re: /(dragon|ajdar|дракон)/i, folder: "mob/enderdragon", words: ["enderdragon"] },
  { re: /(lava|лава)/i, folder: "liquid", words: ["lava"] },
  { re: /(water|suv|вода)/i, folder: "liquid", words: ["water"] },
  { re: /(thunder|momaqaldiroq|гром)/i, folder: "ambient/weather", words: ["thunder"] },
  { re: /(rain|yomg'?ir|дождь)/i, folder: "ambient/weather", words: ["rain"] },
];

function _replyFound(msg, picks, rows, meta) {
  const name = picks[0].split("/").pop();
  const text = /[а-яё]/i.test(msg) ? ("Нашёл: " + name)
    : (/[a-züʻ'‘]/i.test(msg) && !/\b(the|play|find|sound|what|how)\b/i.test(msg)
      ? ("Topildi: " + name) : ("Found: " + name));
  return {
    text: text,
    plays: picks,
    trace: [{ type: "tool", name: "search_sounds", args: meta, result: { total: rows.length, files: picks, mode: meta.mode || "local" } }]
  };
}

function isSoundAsk(msg) {
  const m = String(msg || "");
  if (AGENT_WANT.test(m)) return true;
  if (LOCAL_INTENT.some(x => x.re.test(m))) return true;
  if (m.length <= 56 && _msgTokens(m).length && !/[?]/.test(m) && !/^(nima|what|how|why|kim|qanday|расскажи|объясни)/i.test(m.trim())) return true;
  return false;
}

function localFastIntent(msg, maxPlays) {
  const m = String(msg || "");
  const lim = Math.min(8, maxPlays || 8);
  for (let i = 0; i < LOCAL_INTENT.length; i++) {
    const it = LOCAL_INTENT[i];
    if (!it.re.test(m)) continue;
    let rows;
    if (it.words.length === 1 && it.words[0] === "") {
      rows = qIndex().filter(r => r.p.startsWith(it.folder));
    } else {
      let found = agentFind(it.words, it.folder);
      rows = found.rows;
      if (!rows.length) rows = agentFind(it.words, "").rows;
    }
    if (!rows.length) continue;
    const picks = pickDiverse(rows.map(r => ({ path: r.s.path, g: r.dirs.slice(0, 2).join("/"), kind: r.kind })), lim).map(x => x.path);
    if (!picks.length) continue;
    return _replyFound(m, picks, rows, { words: (it.words || []).join(" "), folder: it.folder, local: true, mode: "intent" });
  }
  return null;
}

/** Expand user tokens → library search without API (fast + accurate) */
function localSmartSearch(msg, maxPlays) {
  const m = String(msg || "");
  const toks = _msgTokens(m);
  if (!toks.length) return null;
  const lim = Math.min(8, maxPlays || 8);
  // try full token set
  let found = agentFind(toks, "");
  if (!found.rows.length && toks.length > 1) {
    // rarest single-token wins
    let best = { rows: [], n: 0 };
    toks.forEach(t => {
      const f = agentFind([t], "");
      if (f.rows.length && (!best.n || f.rows.length < best.n)) best = { rows: f.rows, n: f.rows.length, mode: f.mode, t: t };
    });
    if (best.rows.length) found = { rows: best.rows, mode: "token:" + (best.t || "") };
  }
  if (!found.rows.length) return null;
  // only skip API when match is strong enough or message looks like a sound ask
  const soundy = AGENT_WANT.test(m) || m.length < 48 || LOCAL_INTENT.some(x => x.re.test(m));
  const strong = /exact|synonym|translation|intent|token:/i.test(found.mode || "") || found.rows.length <= 40;
  if (!soundy && !strong) return null;
  if (!soundy && found.rows.length > 80) return null;
  const picks = pickDiverse(found.rows.map(r => ({ path: r.s.path, g: r.dirs.slice(0, 2).join("/"), kind: r.kind })), lim).map(x => x.path);
  if (!picks.length) return null;
  return _replyFound(m, picks, found.rows, { words: toks.join(" "), local: true, mode: found.mode || "smart" });
}

async function runSoundAgent(msg, key, onStep) {
  const maxPlays = /(^|[^a-z])(barcha|hamma|hammasi|hammasini|all|every)([^a-z]|$)|(все|всех|всё)/i.test(msg) ? 48 : 12;
  const local = localFastIntent(msg, maxPlays) || localSmartSearch(msg, maxPlays);
  if (local && local.plays && local.plays.length) {
    if (onStep) try { onStep(local.trace || []); } catch (e) {}
    return local;
  }
  /* Sound ask with weak local miss → still try pure library before spending TPM */
  if (isSoundAsk(msg)) {
    const seen0 = new Set();
    const tr0 = [];
    const auto0 = agentAutoPick(msg, seen0, maxPlays, tr0);
    if (auto0.length) {
      if (onStep) try { onStep(tr0); } catch (e) {}
      return { text: agentClosestText(msg), plays: auto0, trace: tr0, local: true };
    }
  }
  const sys = "MCAI. User language. Short plain text. " +
    (isSoundAsk(msg)
      ? ("Sound: search_sounds EN terms → 1 line + PLAY: real paths only (≤" + maxPlays + "). Never invent paths.")
      : "Chat only — no tools, no PLAY.") +
    (currentPlayPath ? " Playing: " + currentPlayPath + "." : "");
  const msgs = [{ role: "system", content: sys }].concat(histForModel()).concat([{ role: "user", content: msg }]);
  const seen = new Set();
  const trace = [];
  const note = () => { if (onStep) { try { onStep(trace); } catch (e) {} } };
  let nudges = 0;
  for (let step = 0; step < 4; step++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 30000);
    let json;
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
        body: JSON.stringify({ model: MODEL, temperature: isSoundAsk(msg) ? 0.2 : 0.5,
          max_tokens: isSoundAsk(msg) ? (step >= 2 ? 180 : 140) : 280,
          tools: isSoundAsk(msg) ? AGENT_TOOLS : undefined,
          tool_choice: isSoundAsk(msg) ? (step >= 2 ? "none" : "auto") : undefined,
          messages: msgs }),
        signal: ctl.signal
      });
      if (!res.ok) {
        if (res.status === 429 && step === 0) {
          await new Promise(r => setTimeout(r, 1100));
          continue;
        }
        // Rate limit / error → local library search, no invented paths
        const picks = agentAutoPick(msg, seen, maxPlays, trace);
        if (picks.length) {
          note();
          return { text: agentClosestText(msg), plays: picks, trace: trace };
        }
        return null;
      }
      json = await res.json();
    } catch (e) { return null; } finally { clearTimeout(timer); }
    const usage = (json && json.usage) || {};
    const stepTokens = (usage.total_tokens || 0) || ((usage.prompt_tokens || 0) + (usage.completion_tokens || 0));
    const m = json.choices && json.choices[0] && json.choices[0].message;
    if (!m) return null;
    const rawC = String(m.content || "");
    const thinkParts = [];
    if (m.reasoning) thinkParts.push(String(m.reasoning));
    if (m.reasoning_content) thinkParts.push(String(m.reasoning_content));
    rawC.replace(/<think>([\s\S]*?)<\/think>/g, (_, t) => { thinkParts.push(t); return ""; });
    const visible = rawC.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    const th = thinkParts.join("\n").trim();
    if (th) { trace.push({ type: "think", text: th.slice(0, 900), tokens: stepTokens || 0 }); note(); }
    if (m.tool_calls && m.tool_calls.length && step < 2) {
      msgs.push({ role: "assistant", content: visible, tool_calls: m.tool_calls });
      m.tool_calls.forEach(tc => {
        let args = {};
        try { args = JSON.parse(tc.function.arguments || "{}"); } catch (e) {}
        const out = tc.function.name === "search_sounds" ? agentSearch(args, seen)
          : tc.function.name === "list_folder" ? agentList(args, seen)
          : tc.function.name === "grep_sounds" ? agentGrep(args, seen) : { error: "unknown tool" };
        msgs.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify(out).slice(0, 700) });
        trace.push({ type: "tool", name: tc.function.name, args: args, result: out });
        note();
      });
      continue;
    }
    const raw = visible;
    if (!raw) return null;
    const parsed = parseAI(raw);
    let plays = parsed.plays.filter(p => seen.has(p)).slice(0, maxPlays);
    let text = stripPlayedTag(parsed.text || raw);
    const soundy = trace.some(x => x.type === "tool") || AGENT_WANT.test(msg);
    if (!plays.length && soundy && AGENT_GIVEUP.test(text)) {
      if (nudges < 1 && step < 5) {   // one retry only — save tokens
        nudges++;
        msgs.push({ role: "assistant", content: raw });
        msgs.push({ role: "user", content: "Try search_sounds with ONE English root (synonym). Then PLAY: closest real paths." });
        continue;
      }
      const auto = agentAutoPick(msg, seen, maxPlays, trace);
      if (auto.length) { plays = auto; text = agentClosestText(msg); note(); }
    }
    plays.forEach(p => _shown.add(p));
    return { text: text, plays: plays, trace: trace };
  }
  return null;
}

async function sendChat() {
  const key = getApiKey() || ($("groqKey") && $("groqKey").value.trim()) || "";
  const msg = $("chatInput").value.trim();
  if (!msg) { $("chatInput").value = ""; return; }
  const maxPlays0 = /(^|[^a-z])(barcha|hamma|hammasi|hammasini|all|every)([^a-z]|$)|(все|всех|всё)/i.test(msg) ? 48 : 12;
  /* Instant local path — no API key, no TPM */
  const local0 = localFastIntent(msg, maxPlays0) || localSmartSearch(msg, maxPlays0);
  if (local0 && local0.plays && local0.plays.length) {
    $("chatInput").value = "";
    const hero0 = $("askHero"); if (hero0) hero0.remove();
    appendBubble("user", esc(msg));
    hist.push({ role: "user", content: msg });
    hist.push({ role: "assistant", content: stripPlayedTag(local0.text).slice(0, 200), played: playedNames(local0.plays) });
    if (hist.length > 4) hist = hist.slice(-4);
    saveHist();
    await typeAIResponse(local0.text, local0.plays, renderTrace(local0.trace || [], false), true);
    return;
  }
  if (!key) {
    const kb = appendBubble("sys", "Enter your API key using the key icon above");
    if (kb && kb.classList) kb.classList.add("key-hint");
    $("keyPop").classList.add("open");
    setTimeout(() => { const inp = $("groqKey"); if (inp) { inp.focus(); inp.select(); } }, 50);
    return;
  }
  localStorage.setItem("groq_api_key", key);
  $("chatInput").value = "";
  const hero = $("askHero");
  if (hero) hero.remove();
  appendBubble("user", esc(msg));
  const wait = appendBubble("sys", '<span class="mc-dots" aria-label="thinking"><span></span><span></span><span></span></span>');
  wait.classList.add("typing");
  $("chatSend").disabled = true;

  let ag = null;
  const dotsHtml = wait.innerHTML;
  const onStep = tr => {   // live panel: steps appear while the agent works
    const st = Array.from(wait.querySelectorAll("details")).map(d => d.open);
    wait.classList.add("has-trace");
    wait.innerHTML = dotsHtml + renderTrace(tr, true);
    wait.querySelectorAll("details").forEach((d, i) => { if (i < st.length) d.open = st[i]; });
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
  };
  try { ag = await runSoundAgent(msg, key, onStep); } catch (e) { ag = null; }
  if (ag) {
    wait.remove();
    hist.push({ role: "user", content: msg });
    hist.push({ role: "assistant", content: stripPlayedTag(ag.text).slice(0, 280), played: playedNames(ag.plays) });
    if (hist.length > 6) hist = hist.slice(-6);
    if (hist.length && hist[0].role === "assistant") hist.shift();
    saveHist();
    await typeAIResponse(ag.text, ag.plays, renderTrace(ag.trace || [], false), !!ag.local || (ag.trace || []).some(t => t.args && t.args.local));
    $("chatSend").disabled = false;
    return;
  }

  const matches = await smartSearch(msg, key, 90);
  const maxPlays = matches.wantAll ? 48 : 12;
  const matchList = matches.slice(0, 40).map(m => m.path + (m.kind ? "  [" + m.kind + "]" : "")).join("\n");
  const mobList = matches.length ? "" : Array.from(new Set(all.filter(x => x.path.startsWith("mob/")).map(x => x.path.split("/")[1]))).join(", ");

  const chatMode = !!matches.chat;
  const preset = matches.strong ? pickDiverse(matches, maxPlays) : [];
  const sysGeneral = "MCAI in MCSOUNDS. User language. Helpful, accurate, concise. Plain text, no markdown. Minecraft knowledge OK; no live internet. No PLAY: lines.";
  const sysSound = "MCAI sound picker. User language. 1 short line then PLAY: paths from Candidates only (≤" + maxPlays + "). Never invent paths.\nCandidates:\n" + (matchList || "(none)");
  const system = chatMode ? sysGeneral : sysSound;

  hist.push({ role: "user", content: msg });
  if (hist.length > 6) hist = hist.slice(-6);
  saveHist();

  try {
    const callGroq = (model, temp, maxTok) => fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({
        model: model,
        temperature: temp,
        max_tokens: maxTok,
        messages: [{ role: "system", content: system }].concat(hist.slice(-3).map((h, i, arr) => {
          const lim = i === arr.length - 1 ? 220 : 100;
          return { role: h.role, content: h.content.length > lim ? h.content.slice(0, lim) + "..." : h.content };
        }))
      })
    });
    let res = null, json = null;
    if (!res) {
      res = await callGroq(MODEL, chatMode ? 0.55 : 0.25, chatMode ? 350 : 220);
      json = await res.json();
    }
    wait.remove();
    if (!res.ok) {
      const em = (json.error && json.error.message) || String(res.status);
      if (/invalid|revoked|expired|auth/i.test(em)) {
        localStorage.removeItem("groq_api_key");
        syncKeyUI();
      }
      // TPM / rate limit: still try local library instead of raw API error
      if (/rate limit|tpm|tokens per minute/i.test(em) || res.status === 429) {
        const seen = new Set();
        const tr = [];
        const picks = agentAutoPick(msg, seen, maxPlays, tr);
        if (picks.length) {
          hist.push({ role: "assistant", content: agentClosestText(msg).slice(0, 200), played: playedNames(picks) });
          saveHist();
          await typeAIResponse(agentClosestText(msg), picks, renderTrace(tr, false));
          $("chatSend").disabled = false;
          return;
        }
      }
      appendBubble("sys", "Error: " + em);
      $("chatSend").disabled = false;
      return;
    }
    let raw = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || "";
    raw = raw.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    const parsed = parseAI(raw);

    const cand = new Set(matches.map(m => m.path));
    parsed.plays = parsed.plays.map(p => p.replace(/\s*\[.*$/, "").trim());
    let plays = cand.size ? parsed.plays.filter(p => cand.has(p)) : parsed.plays;
    if (matches.strong) {
      const eng = pickDiverse(matches, maxPlays).map(x => x.path);
      plays = eng.concat(plays.filter(p => !eng.includes(p)));
    }
    parsed.plays = chatMode ? [] : plays.slice(0, maxPlays);
    parsed.plays.forEach(p => _shown.add(p));

    const textPlain = stripPlayedTag(parsed.text || raw || "");
    hist.push({ role: "assistant", content: stripPlayedTag(textPlain).slice(0, 280), played: playedNames(parsed.plays) });
    if (hist.length > 6) hist = hist.slice(-6);
    if (hist.length && hist[0].role === "assistant") hist.shift();
    saveHist();
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

async function typeAIResponse(textPlain, plays, traceHtml, instant) {
  plays = plays || [];
  const hero = $("askHero");
  if (hero) hero.remove();

  const d = document.createElement("div");
  d.className = "bubble ai" + (plays.length ? " has-cards" : "");
  const textEl = document.createElement("div");
  textEl.className = "ai-text";
  d.appendChild(textEl);
  if (traceHtml) {
    const tr = document.createElement("div");
    tr.className = "trace-wrap";
    tr.innerHTML = traceHtml;
    d.insertBefore(tr, textEl);
  }
  $("chatLog").appendChild(d);
  $("chatLog").scrollTop = $("chatLog").scrollHeight;

  const chars = Array.from(textPlain || "");
  let shown = "";
  if (instant || chars.length < 40) {
    shown = chars.join("");
    textEl.innerHTML = esc(shown).replace(/\n/g, "<br>");
  } else {
    const step = Math.max(1, Math.ceil(chars.length / 120));
    for (let i = 0; i < chars.length; i += step) {
      shown = chars.slice(0, i + step).join("");
      textEl.innerHTML = esc(shown).replace(/\n/g, "<br>") + '<span class="cursor"></span>';
      $("chatLog").scrollTop = $("chatLog").scrollHeight;
      await sleep(8);
    }
    textEl.innerHTML = esc(shown).replace(/\n/g, "<br>");
  }
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
  let html = (traceHtml ? '<div class="trace-wrap">' + traceHtml + '</div>' : '') + '<div class="ai-text">' + esc(shown).replace(/\n/g, "<br>") + '</div>';
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

/* Phones/tablets: while the AI panel is open the player is docked inside it (under the header, above the input) */
function setupPlayerDock() {
  const player = $("player"), chat = $("chat"), shell = $("shell"), log = $("chatLog");
  if (!player || !chat || !shell || !log) return;
  const home = { parent: player.parentNode, next: player.nextSibling };
  const mq = window.matchMedia("(max-width: 1100px)");
  const sync = () => {
    const want = shell.classList.contains("chat-on") && mq.matches;
    const docked = player.parentNode === chat;
    if (want && !docked) chat.insertBefore(player, log);
    else if (!want && docked) {
      if (home.next && home.next.parentNode === home.parent) home.parent.insertBefore(player, home.next);
      else home.parent.appendChild(player);
    }
  };
  new MutationObserver(sync).observe(shell, { attributes: true, attributeFilter: ["class"] });
  if (mq.addEventListener) mq.addEventListener("change", sync); else if (mq.addListener) mq.addListener(sync);
  sync();
}

/* Touch has no hover: the player's X shows for a moment when the player appears or is touched */
function setupPlayerCloseReveal() {
  const player = $("player");
  if (!player) return;
  let timer = null, was = false;
  const reveal = () => {
    player.classList.add("x-on");
    clearTimeout(timer);
    timer = setTimeout(() => player.classList.remove("x-on"), 3500);
  };
  player.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") reveal(); });
  new MutationObserver(() => {
    const now = player.classList.contains("show");
    if (now && !was) reveal();
    was = now;
  }).observe(player, { attributes: true, attributeFilter: ["class"] });
}

/* Real header height -> --hdr-h (chat panel / backdrop start exactly below the header) */
function syncHeaderHeight() {
  const h = document.querySelector("header.top");
  if (!h) return;
  const set = () => document.documentElement.style.setProperty("--hdr-h", Math.round(h.getBoundingClientRect().height) + "px");
  set();
  if (window.ResizeObserver) new ResizeObserver(set).observe(h);
  window.addEventListener("resize", set);
}

function bind() {
  let searchTimer = null;
  syncHeaderHeight();
  setupPlayerDock();
  setupPlayerCloseReveal();
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

  /* Phones: rarely used header buttons live in the "⋮" menu; items proxy-click the real (hidden) buttons */
  const moreBtn = $("btnMore"), moreMenu = $("moreMenu");
  const closeMore = () => {
    if (!moreMenu) return;
    moreMenu.classList.remove("open");
    if (moreBtn) { moreBtn.classList.remove("on"); moreBtn.setAttribute("aria-expanded", "false"); }
  };
  const buildMore = () => {
    moreMenu.textContent = "";
    ["btnDlAll", "btnLang", "btnTheme", "btnDesktop"].forEach((id) => {
      const src = $(id);
      if (!src || src.style.display === "none") return;
      const item = document.createElement("button");
      item.type = "button";
      item.className = "more-item";
      item.setAttribute("role", "menuitem");
      const ico = document.createElement("span");
      ico.className = "mi";
      const img = src.querySelector("img.icon");
      if (img) ico.appendChild(img.cloneNode());
      else ico.textContent = id === "btnLang" ? (($("langLabel") && $("langLabel").textContent) || "") : "APP";
      const lab = document.createElement("span");
      lab.textContent = src.title || id;
      item.appendChild(ico);
      item.appendChild(lab);
      item.addEventListener("click", () => { closeMore(); src.click(); });
      moreMenu.appendChild(item);
    });
  };
  if (moreBtn && moreMenu) {
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (moreMenu.classList.contains("open")) { closeMore(); return; }
      buildMore();
      moreMenu.classList.add("open");
      moreBtn.classList.add("on");
      moreBtn.setAttribute("aria-expanded", "true");
    });
    document.addEventListener("click", (e) => {
      if (moreMenu.classList.contains("open") && !moreMenu.contains(e.target) && !moreBtn.contains(e.target)) closeMore();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMore(); });
    window.addEventListener("resize", closeMore);
  }
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
  /* Clear chat: bucket button -> confirm modal (Yes/No, 3 languages) -> wipe everything */
  const clearModal = $("clearModal");
  const closeClear = () => { if (clearModal) clearModal.classList.remove("open"); };
  on("btnClear", "click", () => {
    if (!clearModal) { clearChat(); return; }
    clearModal.classList.add("open");
    if ($("clearNo")) $("clearNo").focus();
  });
  on("clearNo", "click", closeClear);
  on("clearYes", "click", () => {
    closeClear();
    try { localStorage.removeItem("mcsnd_hist"); localStorage.removeItem("mcsnd_chat_ui"); } catch (e) {}
    clearChat();
  });
  on("clearModal", "click", (e) => { if (e.target === clearModal) closeClear(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && clearModal && clearModal.classList.contains("open")) { e.stopImmediatePropagation(); closeClear(); }
  }, true);
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
  // No separate "Change" button: clicking the masked key field unlocks it so a new key can be pasted.
  on("groqKey", "focus", () => {
    const inp = $("groqKey");
    if (!inp || !inp.readOnly) return;
    inp.type = "text";
    inp.readOnly = false;
    inp.value = "";
    const st = $("keyStatus");
    if (st) { st.textContent = ""; st.className = "key-status"; }
  });
  on("groqKey", "blur", () => {
    const inp = $("groqKey");
    // left empty while a key is saved: show the masked key again
    if (inp && !inp.readOnly && !inp.value.trim() && getApiKey()) syncKeyUI();
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
