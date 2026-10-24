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

// --- understanding the question ------------------------------------------

// lowercase words only, padded so "\b" key matches work at both ends
const normalise = (text) => " " + text.toLowerCase().replace(/[^a-z0-9%'\s-]/g, " ").replace(/\s+/g, " ") + " ";
// single words match as prefixes ("exam" -> "exams"); phrases, and words ending in "!", must match
// whole ("my plan" isn't "my plant", "work!" isn't "working")
const hasKey = (t, k) => {
  const exact = k.endsWith("!") || k.includes(" ");
  return new RegExp("\\b" + escapeRe(k.replace(/!$/, "")) + (exact ? "\\b" : "")).test(t);
};
const matches = (text, keys) => keys.some((k) => hasKey(normalise(text), k));

// every category the question touches, best first. Keys match as word prefixes
// ("exam" matches "exams"); longer keys and phrases count for more.
function classify(text) {
  const t = normalise(text);
  return CATEGORIES
    .map((c) => ({ c, score: c.keys.reduce((s, k) => s + (hasKey(t, k) ? k.length + (k.includes(" ") ? 4 : 0) : 0), 0) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.c);
}

// lazy input: very short, or no vowels at all ("asdfg", "?")
const looksLazy = (text) => text.length < 5 || !/[aeiou]/i.test(text);

// --- no-repeat decks -----------------------------------------------------

// each pool is dealt like a shuffled deck, so nothing repeats until the pool runs out;
// anything shown in the last few answers is skipped too, even if it sits in another pool
const decks = {};
const recent = [];
function draw(key, items) {
  if (!decks[key]?.length) decks[key] = shuffle(items);
  const d = decks[key];
  const i = Math.max(0, d.findIndex((x) => !recent.includes(x)));
  const [item] = d.splice(i, 1);
  recent.unshift(item);
  recent.length = Math.min(recent.length, 18);
  return item;
}

// Lines and tips can carry `when` keys: they only show when the question mentions one of them
// (a lift tip for lifts, not for bears). Those specific ones win; on a second opinion the
// category's other ones join in. Only a category with almost nothing left borrows from "general".
function choose(cat, kind, text, again) {
  const items = cat[kind];
  const specific = items.filter((x) => x.when && matches(text, x.when));
  const general = items.filter((x) => !x.when);
  let options = specific.length ? (again ? specific.concat(general) : specific) : general;
  if (!specific.length && options.length < 2 && cat !== CAT.general) options = options.concat(CAT.general[kind]);
  return draw(`${cat.id}:${kind}:${specific.length ? normalise(text) : ""}:${again}`, options);
}

let lastWord = null;
function buildReply(text) {
  const again = text === lastWord;
  lastWord = text;
  const found = classify(text);
  let cat = found[0] ?? (looksLazy(text) ? CAT.mock : CAT.general);
  const roast = again && Math.random() < 0.2; // asking twice sometimes earns a little roast
  if (roast) cat = CAT.mock;
  return {
    cat,
    line: choose(cat, "lines", text, again),
    tip: roast ? draw("again", AGAIN_TIPS) : choose(cat, "tips", text, again).t,
    gif: draw(cat.id + ":gif", cat.gifs.length ? cat.gifs : CAT.general.gifs),
  };
}

// GIPHY ids load from GIPHY's CDN; "mood-N" means one of the WhatsApp stickers in stickers/
function showGif(ref, cat) {
  const img = $("stickerImg");
  const face = $("stickerFace");
  const local = ref.startsWith("mood-");
  const srcs = local ? [`stickers/${ref}.webp`]
    : [`https://media.giphy.com/media/${ref}/200.webp`, `https://media.giphy.com/media/${ref}/200.gif`];
  let i = 0;
  img.hidden = true;
  face.hidden = false;
  face.textContent = "🎬";
  img.alt = `${cat.tag.mg} reaction GIF`;
  img.onload = () => { img.hidden = false; face.hidden = true; };
  img.onerror = () => { if (++i < srcs.length) img.src = srcs[i]; };
  img.src = srcs[0];
  $("stickerMl").textContent = cat.tag.ml;
  $("stickerMg").textContent = `"${cat.tag.mg}"`;
  $("stickerSrc").textContent = local ? "" : "via GIPHY";
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

// too difficult for us: a real question we don't recognise at all (first ask only)
const isHard = (text) => text !== lastWord && !matches(text, CRISIS_KEYS) && !classify(text).length && !looksLazy(text);

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
  $("toast").textContent = "";
  const crisis = matches(current, CRISIS_KEYS);
  $("sticker").hidden = crisis;
  if (crisis) {
    entry.hidden = false;
    $("defs").innerHTML = `<li class="crisis">This one isn't a joke. If you're thinking about hurting yourself, please talk to someone right now. In India you can call <strong>Tele-MANAS at 14416</strong> (free, 24/7), or reach out to someone you trust.</li>`;
    return;
  }
  const reply = hard ? null : buildReply(current);
  showGif(reply?.gif ?? "mood-6", reply?.cat ?? CAT.general);
  // "Try also" comes from the answer's category, loosely on topic
  $("see").textContent = reply ? draw(reply.cat.id + ":also", reply.cat.also) : pick(TRY_ALSO);
  entry.hidden = false;

  const ol = $("defs");
  ol.innerHTML = "";
  let tips = [TARA];
  if (!hard) {
    // Malayalam line first, shown whole (typing it letter by letter breaks the script's joined letters)
    const li = document.createElement("li");
    li.className = "ml-line";
    li.innerHTML = `<span class="ml" lang="ml"></span><span class="meaning"></span>`;
    li.firstChild.textContent = reply.line.ml;
    // "Kalyanaraman (2002)" reads as "— Kalyanaraman, 2002"
    li.lastChild.textContent = reply.line.en + (reply.line.film ? ` — ${reply.line.film.replace(/ \((\d{4})\)$/, ", $1")}` : "");
    ol.appendChild(li);
    await wait(500);
    tips = [reply.tip];
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
