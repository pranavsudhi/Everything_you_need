const $ = (id) => document.getElementById(id);
const q = $("q");
const mirror = $("mirror");
const entry = $("entry");
const loading = $("loading");

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let current = "";
let run = 0; // bumps on every new request so old typewriters stop
let lastTips = [];

// --- input ---------------------------------------------------------------

q.addEventListener("input", () => { mirror.textContent = q.value; });

document.addEventListener("keydown", (e) => {
  if (e.target === q || e.target.closest("button, textarea, dialog")) return;
  q.focus();
});

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = q.value.trim();
  if (!text) return;
  current = text;
  q.value = "";
  mirror.textContent = "";
  consult();
});

document.querySelectorAll("[data-try]").forEach((btn) =>
  btn.addEventListener("click", () => { current = btn.dataset.try; consult(); })
);

// --- advice engine -------------------------------------------------------

function findSituation(text) {
  const t = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const s of SITUATIONS) {
    let score = 0;
    for (const k of s.keys) {
      if (new RegExp("\\b" + escapeRe(k)).test(t)) score += k.length;
    }
    if (score > bestScore) { best = s; bestScore = score; }
  }
  return best;
}

// the main word of the input: first word that isn't filler, preferring nouns over "-ing"/"-ed" words
function mainThing(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9'\s-]/g, " ").split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
  // skip verbs and possessives ("neighbour's dog" -> "dog")
  return words.find((w) => !/(ing|ed|'s)$/.test(w)) ?? words[0]?.replace(/'s$/, "") ?? "situation";
}

function generate(thing) {
  return `${pick(GEN.verbs)} the ${thing} ${pick(GEN.adverbs)}, then ${pick(GEN.outcomes)}.`;
}

const matches = (text, keys) => keys.some((k) => new RegExp("\\b" + escapeRe(k)).test(text.toLowerCase()));

const findStandby = (text) => Object.values(STANDBY).find((st) => matches(text, st.keys)) ?? null;

// the English tip that follows the Malayalam line: from the situation, a matching standby
// dialogue, or (for inputs we don't know) built from the user's own words; the sticker's
// character can chip in too. Avoids the last few tips so a second opinion is different.
function getTip(text, s, sticker) {
  const thing = mainThing(text);
  const fill = (t) => t.replaceAll("{x}", text.toLowerCase()).replaceAll("{thing}", thing);
  const standby = findStandby(text);
  const options = s ? s.advice.map(fill) : [];
  if (standby) options.push(fill(standby.advice));
  if (!s && !standby) options.push(fill(pick(GENERIC)), fill(pick(GENERIC)), generate(thing));
  if (sticker.advice && Math.random() < 0.4) options.push(fill(sticker.advice));
  const fresh = options.filter((t) => !lastTips.includes(t));
  const tip = pick(fresh.length ? fresh : options);
  lastTips = [tip, ...lastTips].slice(0, 4);
  return tip;
}

// the Malayalam line that opens every answer: best keyword match, else one that suits the
// input's mood, else a general-purpose one. A second opinion moves on to the next candidate.
let lastLine = null;
function pickLine(text, s) {
  const score = (l) => l.keys.filter((k) => matches(text, [k])).reduce((sum, k) => sum + k.length, 0);
  let options = ML_LINES.filter((l) => score(l) > 0).sort((a, b) => score(b) - score(a));
  const moodName = Object.keys(MOODS).find((k) => MOODS[k] === findMood(text))
    ?? (!s && looksLazy(text) ? "mock" : null);
  if (!options.length && moodName) options = shuffle(ML_LINES.filter((l) => l.moods?.includes(moodName)));
  if (!options.length) options = shuffle(ML_LINES.filter((l) => l.fallback));
  const fresh = options.filter((l) => l !== lastLine);
  lastLine = fresh[0] ?? options[0];
  return lastLine;
}

function findMood(text) {
  return Object.values(MOODS).find((m) => matches(text, m.keys)) ?? null;
}

// lazy input: very short, or no vowels at all ("asdfg", "?")
const looksLazy = (text) => text.length < 5 || !/[aeiou]/i.test(text);

// turns a mood into a sticker, avoiding the file shown last time when it can
function moodSticker(mood) {
  const files = mood.files.filter((f) => `stickers/mood-${f}.webp` !== lastSticker?.img);
  return { img: `stickers/mood-${pick(files.length ? files : mood.files)}.webp`,
           emoji: "🙂", ml: mood.ml, mg: mood.mg, advice: pick(mood.advice) };
}

// mood GIF if the input has a mood, else the situation's dialogue sticker, else a standby
// dialogue whose keys match, else "impossible". A second opinion sometimes mocks the user,
// otherwise gets a different sticker.
let lastSticker = null;
let lastWord = null;
function chooseSticker(text, s) {
  const again = text === lastWord;
  const mood = findMood(text);
  const mapped = s && STICKERS[s.sticker];
  const standby = findStandby(text);
  let st;
  if (again && Math.random() < 0.3) st = moodSticker(MOCK);
  else if (mood && !(again && mood.files.length === 1)) st = moodSticker(mood);
  else if (mapped && !again) st = mapped;
  else if (standby && standby !== lastSticker) st = standby;
  else if (!s && !mood && looksLazy(text)) st = moodSticker(MOCK);
  else if (!s && !again) st = moodSticker(MOODS.impossible);
  else st = pick(Object.values(STICKERS).filter((x) => x !== lastSticker));
  lastSticker = st;
  lastWord = text;
  return st;
}

// mood stickers have an exact file; dialogue stickers try stickers/<id>.webp|png|jpg
// and keep the emoji card if none exist
function showSticker(st) {
  const img = $("stickerImg");
  const face = $("stickerFace");
  const exts = ["webp", "png", "jpg"];
  let i = 0;
  img.hidden = true;
  face.hidden = false;
  face.textContent = st.emoji;
  img.alt = st.who ? `${st.who} sticker` : `${st.mg} sticker`;
  img.onload = () => { img.hidden = false; face.hidden = true; };
  img.onerror = () => { if (!st.img && ++i < exts.length) img.src = `stickers/${st.id}.${exts[i]}`; };
  img.src = st.img ?? `stickers/${st.id}.${exts[0]}`;
  $("stickerMl").textContent = st.ml || st.mg; // no Malayalam script: the Manglish line takes its place
  $("stickerMg").textContent = st.ml ? `"${st.mg}"` : "";
  $("stickerSrc").textContent = [st.who, st.from].filter(Boolean).join(", ");
  const box = $("sticker");
  box.style.animation = "none";
  void box.offsetWidth; // replay the slap-on animation
  box.style.animation = "";
}

// fake IPA: swap letters for official-looking symbols
function pronounce(text) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/).filter(Boolean).slice(0, 6);
  if (!words.length) return "/ˈhʌh/";
  const map = [["th", "θ"], ["sh", "ʃ"], ["ch", "tʃ"], ["ng", "ŋ"], ["ee", "iː"], ["oo", "uː"],
               ["a", "æ"], ["e", "ɛ"], ["i", "ɪ"], ["o", "ɒ"], ["u", "ʌ"], ["y", "j"]];
  return "/" + words.map((w, i) => {
    for (const [from, to] of map) w = w.split(from).join(to);
    return (i === 0 ? "ˈ" : "") + w;
  }).join(" ") + "/";
}

// --- rendering -----------------------------------------------------------

// too difficult for us: impossible asks, or anything we don't recognise (first ask only)
function isHard(text) {
  if (text === lastWord || matches(text, CRISIS_KEYS)) return false;
  const mood = findMood(text);
  return mood === MOODS.impossible || (!mood && !findSituation(text) && !findStandby(text) && !looksLazy(text));
}

const TARA = "Asking Tara robot KMCT for help…";
const TARA_EVERY = 10; // Tara only answers a hard question after at least this many prompts since last time
let promptsSinceTara = 0;

async function consult() {
  const id = ++run;
  promptsSinceTara++;
  const hard = promptsSinceTara >= TARA_EVERY && isHard(current);
  if (hard) promptsSinceTara = 0;
  entry.hidden = true;
  loading.hidden = false;
  const lines = shuffle(LOADING).slice(0, hard ? 2 : 3);
  if (hard) lines.push("This one is too difficult…");
  for (const line of lines) {
    loading.textContent = line;
    await wait(550);
    if (id !== run) return;
  }
  loading.hidden = true;
  render(id, hard);
}

async function render(id, hard) {
  $("word").textContent = current.toLowerCase();
  $("pron").textContent = pronounce(current);
  $("pos").textContent = pick(POS);
  $("see").textContent = pick(TRY_ALSO);
  $("toast").textContent = "";
  const crisis = matches(current, CRISIS_KEYS);
  $("sticker").hidden = crisis;
  if (crisis) {
    entry.hidden = false;
    $("defs").innerHTML = `<li class="crisis">This one isn't a joke. If you're thinking about hurting yourself, please talk to someone right now. In India you can call <strong>Tele-MANAS at 14416</strong> (free, 24/7), or reach out to someone you trust.</li>`;
    return;
  }
  const situation = findSituation(current);
  const sticker = chooseSticker(current, situation);
  showSticker(sticker);
  entry.hidden = false;

  const ol = $("defs");
  ol.innerHTML = "";
  let tips = [TARA];
  if (!hard) {
    // Malayalam line first, shown whole (typing it letter by letter breaks the script's joined letters)
    const line = pickLine(current, situation);
    const li = document.createElement("li");
    li.className = "ml-line";
    li.innerHTML = `<span class="ml" lang="ml"></span><span class="meaning"></span>`;
    li.firstChild.textContent = line.ml;
    li.lastChild.textContent = line.en;
    ol.appendChild(li);
    await wait(500);
    tips = [getTip(current, situation, sticker)];
  }
  for (const tip of tips) {
    const li = document.createElement("li");
    ol.appendChild(li);
    for (const ch of tip) {
      if (id !== run) return;
      li.textContent += ch;
      await wait(16);
    }
    await wait(250);
  }
}

function toast(msg) { $("toast").textContent = msg; }

$("again").addEventListener("click", consult);
$("yes").addEventListener("click", () => toast("Thank you. Your feedback has been ignored."));
$("no").addEventListener("click", () => toast("Damn."));
$("copy").addEventListener("click", async () => {
  const defs = [...$("defs").children].map((li, i) => `${i + 1}. ${li.innerText}`).join("\n");
  const text = `${$("word").textContent} ${$("pron").textContent} ${$("pos").textContent}\n\n${defs}\n\n${$("stickerMg").textContent} (${$("stickerSrc").textContent})\n— Everything You Need*`;
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied. Use irresponsibly.");
  } catch {
    toast("Could not copy. Consider memorising it instead.");
  }
});
