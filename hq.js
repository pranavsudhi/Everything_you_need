// "Contact the core team": the pigeon is unavailable, so a synthesized sparrow shows up instead.
const hq = $("hq");
const bird = $("bird");
const hqStatus = $("hqStatus");
const hqForm = $("hqForm");
const hqMsg = $("hqMsg");

let audio;
let hqRun = 0; // bumps on open/close so stale steps don't overwrite the dialog

// one short "cheep": a fast up-then-down frequency sweep with a sharp envelope
function chirp(t, base) {
  for (const [mult, vol] of [[1, 0.22], [2, 0.05]]) { // add a quiet harmonic for texture
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.frequency.setValueAtTime(base * mult, t);
    osc.frequency.exponentialRampToValueAtTime(base * 1.45 * mult, t + 0.035);
    osc.frequency.exponentialRampToValueAtTime(base * 1.05 * mult, t + 0.09);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    osc.connect(gain).connect(audio.destination);
    osc.start(t);
    osc.stop(t + 0.11);
  }
}

// a sparrow's song: a handful of cheeps and "chir-rups" at uneven gaps; returns its length in ms
function sparrow() {
  audio ??= new (window.AudioContext || window.webkitAudioContext)();
  audio.resume();
  const start = audio.currentTime + 0.05;
  let t = start;
  const notes = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < notes; i++) {
    const base = 3000 + Math.random() * 900;
    chirp(t, base);
    if (Math.random() < 0.5) chirp(t + 0.12, base * 0.88);
    t += 0.22 + Math.random() * 0.25;
  }
  return (t - start) * 1000;
}

function animateBird(name) {
  bird.className = "bird";
  void bird.offsetWidth; // restart the animation
  bird.className = "bird " + name;
}

async function openHQ() {
  const id = ++hqRun;
  hqForm.hidden = true;
  hqMsg.value = "";
  hq.showModal();
  animateBird("arrive");
  hqStatus.textContent = "Calling a pigeon to carry your message to HQ…";
  await wait(Math.max(sparrow(), 2200));
  if (id !== hqRun) return;
  hqStatus.textContent = pick(HQ_SUBSTITUTE);
  hqForm.hidden = false;
  hqMsg.focus();
}

hqForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!hqMsg.value.trim()) {
    hqStatus.textContent = "The sparrow refuses to carry an empty message. It has standards.";
    return;
  }
  const id = ++hqRun;
  hqForm.hidden = true;
  hqStatus.textContent = "Tying your message to the sparrow…";
  sparrow();
  animateBird("depart");
  await wait(1800);
  if (id !== hqRun) return;
  hqStatus.textContent = pick(HQ_REPLIES);
});

$("hqBtn").addEventListener("click", openHQ);
$("hqClose").addEventListener("click", () => hq.close());
hq.addEventListener("close", () => { hqRun++; });
