/* =========================================================
   Quest guide engine: steps, map, word popups, tabs.
   Shared by every character. Content comes from <character>/data/*.js
   ========================================================= */

const SAVE_KEY = GUIDE_PAGE.saveKey;
let saved = { step: 0, done: {} };
try {
  const s = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (s && typeof s === "object") saved = Object.assign(saved, s);
} catch (e) {}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(saved)); } catch (e) {} }

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* Game words every beginner meets, whatever the class. A character's own WORDS
   (in its data/guide.js) win when both explain the same word. */
const COMMON_WORDS = {
  "xp": "Experience points. Quests and kills give XP. Fill the bar at the bottom of your screen to reach the next level.",
  "npc": "A character run by the game, not by a player: quest givers, trainers, vendors, guards.",
  "quest log": "Your list of quests. Press L. Click a quest to read what to do and where.",
  "spellbook": "Every ability you've learned. Press P, then drag an ability from it onto your action bar.",
  "action bar": "The row of buttons at the bottom of your screen. Each button has a key: 1 uses the first button, 2 the second, and so on.",
  "vendor": "An NPC who sells things and buys your junk. While talking to one, right-click an item in your bags to sell it.",
  "humanoid": "Enemies shaped like people: humans, trolls, furbolgs, gnolls and so on. They often drop cloth and coins.",
  "escort": "A quest where you walk with an NPC and keep them alive until they're safe. Stay close and don't run ahead.",
  "inn": "Every town's inn has an innkeeper. Make it your home for your Hearthstone, and log out there for bonus XP.",
  "graveyard": "Where you appear as a ghost when you die. Run back to your body and click Resurrect.",
  "racial": "An ability you get from your race, not your class.",
  "rank": "A stronger version of an ability you already have. Learn it at your trainer; it replaces the old one in your spellbook.",
  "zone": "A big area of the world with its own name, like Darkshore or Dun Morogh. Its name shows above your minimap.",
  "critical": "A critical hit (\"crit\") does about double damage. Its number pops up bigger.",
  "respawn": "Enemies come back a few minutes after you kill them, so don't rest too long in a camp you cleared."
};
for (const k in COMMON_WORDS) if (!(k in WORDS)) WORDS[k] = COMMON_WORDS[k];

/* Wrap known words with a clickable explanation (first match per step line only).
   Longer words go first ("rested xp" before "xp"), and a word is never looked for
   inside a word that's already wrapped. */
function explainWords(html) {
  const used = new Set();
  const terms = Object.keys(WORDS).sort((a, b) => b.length - a.length);
  // work only on text outside tags
  return html.replace(/(^|>)([^<]+)/g, (m, open, text) => {
    let parts = [text];                      // strings are plain text, objects are wrapped words
    terms.forEach((term) => {
      if (used.has(term)) return;
      const re = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s")})\\b`, "i");
      for (let k = 0; k < parts.length; k++) {
        const p = parts[k];
        if (typeof p !== "string") continue;
        const hit = re.exec(p);
        if (!hit) continue;
        used.add(term);
        parts.splice(k, 1, p.slice(0, hit.index), { key: term, shown: hit[1] }, p.slice(hit.index + hit[1].length));
        break;
      }
    });
    return open + parts.map((p) => typeof p === "string" ? p
      : `<button type="button" class="word" data-word="${p.key}">${p.shown}</button>`).join("");
  });
}

/* ---------- what kind of step is this? (badge on the parchment, icon in the step list) ---------- */

const KINDS = {
  quest:   { label: "Questing",        hint: "Take the quests, do them, hand them in." },
  train:   { label: "Trainer visit",   hint: "Learn new abilities, then put them on your bar." },
  talent:  { label: "Talent point",    hint: "Press N and click the talent named below." },
  travel:  { label: "Travel",          hint: "Head to a new place." },
  home:    { label: "New home",        hint: "Set your Hearthstone at the inn here." },
  dungeon: { label: "Group dungeon",   hint: "Find 4 other players first." },
  start:   { label: "Getting ready",   hint: "Set up before you fight anything." },
  done:    { label: "Level 60",        hint: "You made it." },
};
/* game icons for each kind of step (assets/icons/<name>.jpg) */
const KIND_ICON = {
  quest:   "inv_misc_note_01",                         // a quest note
  train:   "inv_misc_book_09",                         // the spellbook
  talent:  "spell_holy_powerinfusion",
  travel:  "inv_misc_map_01",
  home:    "inv_misc_rune_01",                         // the Hearthstone
  dungeon: "achievement_dungeon_classicdungeonmaster",
  start:   "inv_misc_gear_01",
  done:    "achievement_level_60",
};
const kindIcon = (k) => WF.icon(KIND_ICON[k], "gi");

function stepKind(i) {
  const s = STEPS[i];
  if (s.kind && KINDS[s.kind]) return s.kind;                 // a step can say it outright
  if (i === 0) return "start";
  if (i === STEPS.length - 1) return "done";
  if (/dungeon/i.test(s.title)) return "dungeon";
  if (/^Talents/i.test(s.place)) return "talent";
  if (/^Level \d+:|trainer/i.test(s.title) || /trainer|\((fly|teleport)\)/i.test(s.place)) return "train";
  if (/\bhome\b|^Settle/i.test(s.title)) return "home";
  if (/^(Visit|Fly|Move|Travel|Leave|Into)\b|→/.test(s.title + " " + s.place)) return "travel";
  return "quest";
}

/* ---------- chapters (a step with chapter:"…" starts one) ---------- */

const lvNums = (lv) => String(lv).split(/[–-]/).map((n) => parseInt(n, 10)).filter((n) => !isNaN(n));
const CHAPTERS = [];
STEPS.forEach((s, i) => {
  if (s.chapter || !CHAPTERS.length) CHAPTERS.push({ name: s.chapter || s.place, from: i, to: i, lo: 99, hi: 0 });
  const c = CHAPTERS[CHAPTERS.length - 1];
  c.to = i;
  lvNums(s.lv).forEach((n) => { c.lo = Math.min(c.lo, n); c.hi = Math.max(c.hi, n); });
});
const chapterOf = (i) => CHAPTERS.findIndex((c) => i >= c.from && i <= c.to);
const chapterLevels = (c) => (c.lo === c.hi ? `Level ${c.lo}` : `Levels ${c.lo}–${c.hi}`);

/* ---------- step card ---------- */

/* "1–2" -> 1 */
function stepLevel(i) { return parseInt(STEPS[i].lv, 10) || 1; }
window.currentStepLevel = () => stepLevel(saved.step);
window.currentStepIndex = () => saved.step;

function showStep(i, direction) {
  i = Math.max(0, Math.min(STEPS.length - 1, i));
  const prev = saved.step;
  saved.step = i;
  persist();

  const s = STEPS[i];
  const card = $("#card");
  card.classList.remove("slide-next", "slide-back");
  void card.offsetWidth; // restart animation
  if (!document.querySelector(".mapbox.big")) card.classList.add(direction === "back" ? "slide-back" : "slide-next");

  const kind = stepKind(i);
  $("#stepmeta").innerHTML = `<span class="kind k-${kind}" title="${KINDS[kind].hint}">${kindIcon(kind)}${KINDS[kind].label}</span>`
    + `Step ${i + 1} of ${STEPS.length} <span>·</span> Level ${s.lv} <span>·</span> ${s.place}`;
  $("#steptitle").textContent = s.title;
  $("#steptodo").innerHTML = s.todo.map((t, n) =>
    `<li><button type="button" class="tick" data-tick="${n}" aria-pressed="false" aria-label="Mark objective ${n + 1} done"><span>${n + 1}</span></button><div>${explainWords(t)}</div></li>`).join("");
  /* "Done when": how to tell the step is finished, plus what to do if you're short of the level */
  $("#stepdone").innerHTML = (s.done ? `<p><b>Done when:</b> ${explainWords(s.done)}</p>` : "")
    + (s.stuck ? `<p class="stuck"><b>Still short of the level?</b> ${explainWords(s.stuck)}</p>` : "");
  $("#stepdone").hidden = !(s.done || s.stuck);
  drawMap(i);
  $("#steptip").innerHTML = s.tip ? `<b>Tip:</b> ${explainWords(s.tip)}` : "";
  $("#steptip").hidden = !s.tip;

  $("#back").disabled = i === 0;
  $("#bar").style.width = `${((i + 1) / STEPS.length) * 100}%`;
  $("#xptext").textContent = `Level ${s.lv} · Guide step ${i + 1} / ${STEPS.length}`;
  if (window.syncBarsToStep) window.syncBarsToStep(stepLevel(i), i);

  $$("#steplist li[data-i]").forEach((li) => {
    const n = +li.dataset.i;
    li.classList.toggle("current", n === i);
    li.classList.toggle("done", n < i);
  });
  syncTicks();
  drawJourney(i);
  drawFootNav(i);
  syncTalents(stepLevel(i));
  closeWord();

  /* tell the shared site layer (assets/js/site.js): progress summary, effects, landing-page "continue" */
  document.dispatchEvent(new CustomEvent("wf:step", { detail: {
    index: i, prev, total: STEPS.length, direction,
    level: stepLevel(i), prevLevel: stepLevel(Math.max(0, Math.min(STEPS.length - 1, prev))),
    title: s.title, place: s.place,
  } }));
}

/* bring the step into view, just under the sticky header */
function scrollToStep() {
  const top = $("#panel-steps .journey, #panel-steps .nav").getBoundingClientRect().top + window.scrollY - $(".top").offsetHeight - 12;
  if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
}

function buildStepList() {
  $("#steplist").innerHTML = STEPS.map((s, i) => {
    const c = CHAPTERS.find((ch) => ch.from === i);
    const head = c ? `<li class="chap"><b>${c.name}</b><small>${chapterLevels(c)} · ${c.to - c.from + 1} steps</small></li>` : "";
    const k = stepKind(i);
    return `${head}<li data-i="${i}"><button type="button"><span class="n"><span>${i + 1}</span></span><span class="sk k-${k}" title="${KINDS[k].label}">${kindIcon(k)}</span><span class="t">${s.title}</span><span class="l">Lv ${s.lv}</span></button></li>`;
  }).join("");
  $$("#steplist li[data-i]").forEach((li) => {
    li.querySelector("button").addEventListener("click", () => {
      showStep(+li.dataset.i, "next");
      $("#allsteps").open = false;
      scrollToStep();
    });
  });
}

/* ---------- objectives you can tick off ---------- */

function ticksFor(i) { return Array.isArray(saved.done[i]) ? saved.done[i] : []; }

function syncTicks() {
  const i = saved.step, s = STEPS[i], got = ticksFor(i);
  $$("#steptodo .tick").forEach((b) => {
    const on = got.includes(+b.dataset.tick);
    b.setAttribute("aria-pressed", String(on));
    b.closest("li").classList.toggle("ticked", on);
  });
  const all = got.length >= s.todo.length;
  const count = $("#tickcount");
  count.textContent = got.length ? `${got.length} of ${s.todo.length} done` : "Tick each one off as you go";
  count.classList.toggle("all", all);
  const last = i === STEPS.length - 1;
  $$("#next, #next2").forEach((b) => {
    b.textContent = last ? "Finished!" : all ? "All done · Next Step ›" : "Next Step ›";
    b.classList.toggle("ready", all && !last);
  });
}

$("#steptodo").addEventListener("click", (e) => {
  const b = e.target.closest(".tick");
  if (!b) return;
  const i = saved.step, n = +b.dataset.tick;
  const got = ticksFor(i).filter((x) => x !== n);
  if (b.getAttribute("aria-pressed") !== "true") got.push(n);
  saved.done[i] = got;
  if (!got.length) delete saved.done[i];
  persist();
  const wasAll = $("#tickcount").classList.contains("all");
  syncTicks();
  if (b.getAttribute("aria-pressed") === "true" && window.WF && WF.sparksFrom) WF.sparksFrom(b, 8, { min: 14, max: 40, small: 3, big: 6 });
  if (!wasAll && $("#tickcount").classList.contains("all") && saved.step < STEPS.length - 1 && window.WF && WF.toast) {
    WF.toast("Step done!", "Press Next Step when you're ready.", "good");
  }
});

/* ---------- journey strip: every chapter, where you are, what's left ---------- */

function buildJourney() {
  const box = document.createElement("div");
  box.className = "journey";
  box.innerHTML = `<div class="j-head"><span class="j-now" id="jnow"></span><span class="j-left" id="jleft"></span></div>
    <div class="j-road" id="jroad" role="list">${CHAPTERS.map((c, n) =>
      `<button type="button" class="jc" role="listitem" data-ch="${n}" title="${attr(`${c.name}: ${chapterLevels(c)}. Click to jump to its first step.`)}">
         <span class="jc-dot" aria-hidden="true"><i>${n + 1}</i></span><b>${c.name}</b><small>${c.lo === c.hi ? `Lv ${c.lo}` : `Lv ${c.lo}–${c.hi}`}</small>
         <span class="jc-fill" aria-hidden="true"><i></i></span>
       </button>`).join("")}</div>`;
  $("#panel-steps .nav").before(box);
  box.addEventListener("click", (e) => {
    const b = e.target.closest(".jc");
    if (!b) return;
    const c = CHAPTERS[+b.dataset.ch];
    showStep(c.from, c.from >= saved.step ? "next" : "back");
  });
}

function drawJourney(i) {
  const at = chapterOf(i), c = CHAPTERS[at];
  $$("#jroad .jc").forEach((b, n) => {
    b.classList.toggle("done", n < at);
    b.classList.toggle("now", n === at);
    b.setAttribute("aria-current", n === at ? "step" : "false");
    const ch = CHAPTERS[n];
    const part = n < at ? 1 : n > at ? 0 : (i - ch.from + 1) / (ch.to - ch.from + 1);
    b.querySelector(".jc-fill i").style.width = `${part * 100}%`;
  });
  $("#jnow").innerHTML = `Chapter ${at + 1} of ${CHAPTERS.length}: <b>${c.name}</b> <small>· step ${i - c.from + 1} of ${c.to - c.from + 1} here</small>`;
  const left = STEPS.length - 1 - i;
  $("#jleft").textContent = left ? `${Math.round((i / (STEPS.length - 1)) * 100)}% of the way to 60` : "Journey complete!";
  // keep the current chapter in view inside the strip (without moving the page)
  const road = $("#jroad"), cur = road.querySelector(".jc.now");
  if (cur && road.scrollWidth > road.clientWidth) {
    const want = cur.offsetLeft - road.clientWidth / 2 + cur.offsetWidth / 2;
    road.scrollTo({ left: want, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
}

/* ---------- Back / Next again under the step, with a peek at what's next ---------- */

function buildFootNav() {
  const nav = document.createElement("div");
  nav.className = "footnav";
  nav.innerHTML = `<button type="button" id="back2" class="wowbtn">‹ Back</button>
    <div class="upnext" id="upnext"></div>
    <button type="button" id="next2" class="wowbtn">Next Step ›</button>`;
  $("#card").after(nav);
  $("#back2").addEventListener("click", () => { showStep(saved.step - 1, "back"); scrollToStep(); });
  $("#next2").addEventListener("click", () => { showStep(saved.step + 1, "next"); scrollToStep(); });
  $("#upnext").addEventListener("click", (e) => {
    if (!e.target.closest("button")) return;
    showStep(saved.step + 1, "next");
    scrollToStep();
  });
}

function drawFootNav(i) {
  $("#back2").disabled = i === 0;
  const n = STEPS[i + 1];
  if (!n) { $("#upnext").innerHTML = `<small>That's the last step.</small><span>Well played, champion!</span>`; return; }
  const k = stepKind(i + 1);
  $("#upnext").innerHTML = `<small>Up next</small><button type="button" class="k-${k}">${kindIcon(k)}<span>${n.title}</span><em>Lv ${n.lv} · ${n.place}</em></button>`;
}

/* ---------- "Where to go" map: drag, zoom, clickable pins ---------- */

/* Zone maps are stored with the site in assets/maps/<id>.jpg (tools/get-maps.py saves them).
   If one is missing, numeric ids fall back to Wowhead's classic map server. id: null = no map exists. */
const MAP_URL = document.currentScript ? new URL("../maps/", document.currentScript.src).href : "assets/maps/";
const MAP_CDN = "https://wow.zamimg.com/images/wow/classic/maps/enus/original/";
const TOMTOM_URL = "https://www.curseforge.com/wow/addons/tomtom";
/* ZONES comes from the character's data/guide.js */

const $map = {
  box: $("#mapbox"), view: $("#mapview"), img: $("#mapimg"), pins: $("#mappins"),
  tip: $("#maptip"), list: $("#maplist"), route: $("#maproute")
};

/* map state. s = zoom, tx/ty = where the map's top-left corner sits in the window (px) */
const MV = {
  step: -1, zone: 0, zoneKey: null, preferZone: null, pins: [], ghosts: [], sel: null, showAll: false,
  s: 1, tx: 0, ty: 0, W: 0, H: 0, A: 1022 / 668, minS: 1, maxS: 6,
  active: false, ptrs: new Map(), moved: 0, touchIdle: false, anim: 0
};

const clampN = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const isBig = () => $map.box.classList.contains("big");
const hasMap = () => !$map.box.hidden && !$map.box.classList.contains("nomap");
const attr = (t) => String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/* steps with no map of their own (talent points, training) keep the last map */
function mapForStep(i) {
  for (let k = i; k >= 0; k--) if (STEPS[k].map) return STEPS[k].map;
  return null;
}

function drawMap(i) {
  const map = mapForStep(i);
  if (!map) { $map.box.hidden = true; toggleBigMap(false); return; }
  if (MV.step !== i) {
    MV.step = i;
    const want = MV.preferZone ? map.findIndex((m) => m[0] === MV.preferZone) : -1;
    MV.zone = Math.max(0, want);
    MV.preferZone = null;
  }
  if (MV.zone >= map.length) MV.zone = 0;
  $map.box.hidden = false;

  const [zoneKey, ...pins] = map[MV.zone];
  const zone = ZONES[zoneKey];
  const sameZone = MV.zoneKey === zoneKey;
  MV.zoneKey = zoneKey;
  MV.pins = pins;

  $("#maptitle").innerHTML = `Where to go <small>${zone.name}</small>`;
  $("#mapzones").innerHTML = map.length > 1
    ? map.map((m, n) => `<button type="button" data-zone="${n}" class="${n === MV.zone ? "on" : ""}">${ZONES[m[0]].name}</button>`).join("")
    : "";

  $map.box.classList.toggle("nomap", !zone.id);
  const none = $("#mapnone");
  if (!zone.id) {
    none.textContent = zone.none;
    none.hidden = false;
    $map.img.removeAttribute("src");
  } else {
    none.hidden = true;
    const src = `${MAP_URL}${zone.id}.jpg`;
    if ($map.img.getAttribute("src") !== src) $map.img.src = src;
    $map.img.alt = `Map of ${zone.name}`;
  }

  $map.list.innerHTML = pins.map(([x, y, label], n) =>
    `<li><button type="button" data-n="${n}"><i>${n + 1}</i>${label}<span>${Math.round(x)}, ${Math.round(y)}</span></button></li>`
  ).join("");

  hideTip();
  buildPins();
  measureMap();
  fitMap(sameZone);
}

/* places from other steps in the same zone (when the box is ticked) */
function ghostPins() {
  if (!MV.showAll) return [];
  const seen = new Set();
  const out = [];
  STEPS.forEach((s, k) => (s.map || []).forEach(([zk, ...ps]) => {
    if (zk !== MV.zoneKey) return;
    ps.forEach(([x, y, label]) => {
      if (MV.pins.some(([ox, oy]) => Math.hypot(ox - x, oy - y) < 1.5)) return;
      const key = `${Math.round(x)},${Math.round(y)}`;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ x, y, label, step: k });
    });
  }));
  return out;
}

function buildPins() {
  MV.ghosts = ghostPins();
  const ghosts = MV.ghosts.map((p, k) =>
    `<button type="button" class="pin ghost" data-ghost="${k}" aria-label="${attr(`${p.label}, step ${p.step + 1}`)}"><i></i><span>${p.label}</span></button>`);
  const own = MV.pins.map(([, , label], n) =>
    `<button type="button" class="pin" data-n="${n}" aria-label="${attr(`${n + 1}: ${label}`)}"><i>${n + 1}</i><span>${label}</span></button>`);
  $map.pins.innerHTML = ghosts.join("") + own.join("");   // this step's pins on top
}

function measureMap() {
  const W = $map.view.clientWidth, H = $map.view.clientHeight;
  if (!W) return;
  MV.W = W;
  MV.H = H;
  MV.minS = Math.min(1, (H * MV.A) / W);                   // small enough to see the whole zone
  $map.img.style.width = `${W}px`;
  $map.img.style.height = `${W / MV.A}px`;
}

/* map % <-> pixels in the window */
const toScreen = (x, y) => [MV.tx + (x / 100) * MV.W * MV.s, MV.ty + (y / 100) * (MV.W / MV.A) * MV.s];
const toMap = (px, py) => [((px - MV.tx) / (MV.W * MV.s)) * 100, ((py - MV.ty) / ((MV.W / MV.A) * MV.s)) * 100];

/* keep the map covering the window (or centred when zoomed all the way out) */
function clampView({ s, tx, ty }) {
  s = clampN(s, MV.minS, MV.maxS);
  const mw = MV.W * s, mh = (MV.W / MV.A) * s;
  tx = mw <= MV.W ? (MV.W - mw) / 2 : clampN(tx, MV.W - mw, 0);
  ty = mh <= MV.H ? (MV.H - mh) / 2 : clampN(ty, MV.H - mh, 0);
  return { s, tx, ty };
}

function renderMap() {
  $map.img.style.transform = `translate(${MV.tx}px, ${MV.ty}px) scale(${MV.s})`;
  const spots = [...MV.ghosts.map((p) => [p.x, p.y]), ...MV.pins];
  $map.pins.querySelectorAll(".pin").forEach((el, k) => {
    const [px, py] = toScreen(spots[k][0], spots[k][1]);
    el.style.left = `${px}px`;
    el.style.top = `${py}px`;
    el.classList.toggle("flip", px > MV.W - 170);          // keep labels inside the window
  });
  const pts = MV.pins.length > 1 ? MV.pins.map(([x, y]) => toScreen(x, y).join(",")).join(" ") : "";
  $map.route.querySelectorAll("polyline").forEach((p) => p.setAttribute("points", pts));
  placeTip();
}

function setView(v, animate) {
  const to = clampView(v);
  cancelAnimationFrame(MV.anim);
  if (!animate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Object.assign(MV, to);
    renderMap();
    return;
  }
  const from = { s: MV.s, tx: MV.tx, ty: MV.ty }, t0 = performance.now();
  const frame = (t) => {
    const k = Math.min(1, (t - t0) / 420), e = 1 - Math.pow(1 - k, 3);
    MV.s = from.s + (to.s - from.s) * e;
    MV.tx = from.tx + (to.tx - from.tx) * e;
    MV.ty = from.ty + (to.ty - from.ty) * e;
    renderMap();
    if (k < 1) MV.anim = requestAnimationFrame(frame);
  };
  MV.anim = requestAnimationFrame(frame);
}

/* zoom and pan so this step's pins fill the window */
function fitMap(animate) {
  if (!MV.W) return;
  if (!MV.pins.length) { setView({ s: MV.minS, tx: 0, ty: 0 }, animate); return; }
  const xs = MV.pins.map((p) => (p[0] / 100) * MV.W), ys = MV.pins.map((p) => (p[1] / 100) * (MV.W / MV.A));
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const padX = Math.min(130, MV.W * 0.22), padY = Math.min(60, MV.H * 0.18);
  let s = Math.min((MV.W - 2 * padX) / Math.max(maxX - minX, 1), (MV.H - 2 * padY) / Math.max(maxY - minY, 1));
  s = clampN(s, MV.minS, 2.8);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  setView({ s, tx: MV.W / 2 - cx * s, ty: MV.H / 2 - cy * s }, animate);
}

function zoomAt(f, px, py, animate) {
  const s = clampN(MV.s * f, MV.minS, MV.maxS), k = s / MV.s;
  setView({ s, tx: px - (px - MV.tx) * k, ty: py - (py - MV.ty) * k }, animate);
}

function flyTo(x, y) {
  const s = Math.max(MV.s, 2.2);
  setView({ s, tx: MV.W / 2 - (x / 100) * MV.W * s, ty: MV.H / 2 - (y / 100) * (MV.W / MV.A) * s }, true);
}

/* ---------- pin tooltip with a /way command ---------- */

function tipSpot() {
  if (!MV.sel) return null;
  if (MV.sel.kind === "pin") return MV.pins[MV.sel.n];
  const g = MV.ghosts[MV.sel.n];
  return g ? [g.x, g.y] : null;
}

function showTip(sel) {
  MV.sel = sel;
  const zone = ZONES[MV.zoneKey];
  let x, y, label, head, extra = "";
  if (sel.kind === "pin") {
    [x, y, label] = MV.pins[sel.n];
    head = `${sel.n + 1}. ${label}`;
  } else {
    ({ x, y, label } = MV.ghosts[sel.n]);
    const k = MV.ghosts[sel.n].step;
    head = label;
    extra = `<button type="button" data-tip="go" data-step="${k}">Go to step ${k + 1}</button>`;
    label = `${label} (step ${k + 1}: ${STEPS[k].title})`;
  }
  const way = `/way ${zone.name} ${x.toFixed(1)} ${y.toFixed(1)} ${sel.kind === "pin" ? label : head}`;
  $map.tip.innerHTML = `<div class="tt-name">${head}</div>
    <div class="tt-sub">${sel.kind === "ghost" ? `Step ${MV.ghosts[sel.n].step + 1}: ${STEPS[MV.ghosts[sel.n].step].title}<br>` : ""}${zone.name} ${x.toFixed(1)}, ${y.toFixed(1)}</div>
    <input type="text" readonly value="${attr(way)}" aria-label="Waypoint command">
    <div class="row"><button type="button" data-tip="copy">Copy /way</button>${extra}</div>
    <small>Paste it in game chat. Needs the free <a href="${TOMTOM_URL}" target="_blank" rel="noopener">TomTom addon</a> · <a href="${GUIDE_PAGE.addonsHref}#install">how to install</a></small>`;
  $map.tip.hidden = false;
  $map.pins.querySelectorAll(".pin.sel").forEach((p) => p.classList.remove("sel"));
  $map.list.querySelectorAll("button.sel").forEach((b) => b.classList.remove("sel"));
  const pinEl = sel.kind === "pin" ? $map.pins.querySelector(`.pin[data-n="${sel.n}"]`) : $map.pins.querySelector(`.pin[data-ghost="${sel.n}"]`);
  if (pinEl) pinEl.classList.add("sel");
  if (sel.kind === "pin") $map.list.querySelector(`button[data-n="${sel.n}"]`)?.classList.add("sel");
  placeTip();
}

function placeTip() {
  const spot = tipSpot();
  if (!spot || $map.tip.hidden) return;
  const [px, py] = toScreen(spot[0], spot[1]);
  const tw = $map.tip.offsetWidth, th = $map.tip.offsetHeight;
  let top = py - th - 22;
  if (top < 6) top = py + 22;
  $map.tip.style.left = `${clampN(px - tw / 2, 6, Math.max(6, MV.W - tw - 6))}px`;
  $map.tip.style.top = `${clampN(top, 6, Math.max(6, MV.H - th - 6))}px`;
}

function hideTip() {
  MV.sel = null;
  $map.tip.hidden = true;
  $map.pins.querySelectorAll(".pin.sel").forEach((p) => p.classList.remove("sel"));
  $map.list.querySelectorAll("button.sel").forEach((b) => b.classList.remove("sel"));
}


$map.tip.addEventListener("click", async (e) => {
  const b = e.target.closest("button[data-tip]");
  if (!b) return;
  if (b.dataset.tip === "copy") {
    const input = $map.tip.querySelector("input");
    try {
      await navigator.clipboard.writeText(input.value);
      b.textContent = "Copied!";
    } catch (err) {
      input.focus();
      input.select();
      b.textContent = "Press Ctrl+C";
    }
  }
  if (b.dataset.tip === "go") {
    const k = +b.dataset.step;
    MV.preferZone = MV.zoneKey;
    showStep(k, k > saved.step ? "next" : "back");
  }
});

/* ---------- mouse, touch and keys ---------- */

let hintTimer = 0;
function hint(text) {
  const h = $("#maphint");
  h.textContent = text;
  h.hidden = false;
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { h.hidden = true; }, 1700);
}

function setActive(on) {
  MV.active = on;
  $map.view.classList.toggle("active", on);
}

function showCursor(e) {
  const out = $("#mapcursor");
  if (e.pointerType !== "mouse" || !hasMap()) { out.textContent = ""; return; }
  const r = $map.view.getBoundingClientRect();
  const [x, y] = toMap(e.clientX - r.left, e.clientY - r.top);
  out.textContent = x >= 0 && x <= 100 && y >= 0 && y <= 100 ? `${x.toFixed(1)}, ${y.toFixed(1)}` : "";
}

$map.view.addEventListener("pointerdown", (e) => {
  if (!hasMap() || e.target.closest(".map-ctrls, .map-tip, .pin")) return;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  cancelAnimationFrame(MV.anim);
  // on a phone, the first touch only unlocks the map so a swipe can still scroll the page
  MV.touchIdle = e.pointerType !== "mouse" && !MV.active && !isBig();
  if (e.pointerType === "mouse") setActive(true);
  MV.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  MV.moved = 0;
  if (!MV.touchIdle) {
    try { $map.view.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
    $map.view.classList.add("dragging");
  }
});

$map.view.addEventListener("pointermove", (e) => {
  showCursor(e);
  const p = MV.ptrs.get(e.pointerId);
  if (!p) return;
  const nx = e.clientX, ny = e.clientY;
  MV.moved += Math.abs(nx - p.x) + Math.abs(ny - p.y);
  if (!MV.touchIdle) {
    if (MV.ptrs.size === 1) {
      setView({ s: MV.s, tx: MV.tx + nx - p.x, ty: MV.ty + ny - p.y }, false);
    } else if (MV.ptrs.size === 2) {
      // pinch: follow the two fingers' midpoint and zoom by how far they spread
      const other = [...MV.ptrs.values()].find((q) => q !== p);
      const r = $map.view.getBoundingClientRect();
      const before = Math.hypot(p.x - other.x, p.y - other.y);
      const after = Math.hypot(nx - other.x, ny - other.y);
      const mx = (nx + other.x) / 2 - r.left, my = (ny + other.y) / 2 - r.top;
      MV.tx += mx - ((p.x + other.x) / 2 - r.left);
      MV.ty += my - ((p.y + other.y) / 2 - r.top);
      zoomAt(before > 0 ? after / before : 1, mx, my, false);
    }
  }
  p.x = nx;
  p.y = ny;
});

function endPointer(e) {
  if (!MV.ptrs.has(e.pointerId)) return;
  MV.ptrs.delete(e.pointerId);
  if (!MV.ptrs.size) $map.view.classList.remove("dragging");
  if (e.type === "pointerup" && MV.moved < 6 && !MV.ptrs.size) {     // a click or tap, not a drag
    if (MV.touchIdle) { setActive(true); hint("Map unlocked: drag to move, pinch to zoom"); }
    hideTip();
  }
}
$map.view.addEventListener("pointerup", endPointer);
$map.view.addEventListener("pointercancel", endPointer);
$map.view.addEventListener("pointerleave", () => { $("#mapcursor").textContent = ""; });
/* focusing a pin (Tab key) makes the browser scroll the window's insides; undo that, we pan ourselves */
$map.view.addEventListener("scroll", () => { $map.view.scrollLeft = 0; $map.view.scrollTop = 0; });

$map.view.addEventListener("wheel", (e) => {
  if (!hasMap()) return;
  if (!MV.active && !isBig() && !e.ctrlKey) { hint("Click the map first, then scroll to zoom"); return; }
  e.preventDefault();
  const r = $map.view.getBoundingClientRect();
  zoomAt(Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0018)), e.clientX - r.left, e.clientY - r.top, false);
}, { passive: false });

$map.view.addEventListener("dblclick", (e) => {
  if (!hasMap() || e.target.closest(".map-ctrls, .map-tip, .pin")) return;
  const r = $map.view.getBoundingClientRect();
  zoomAt(2, e.clientX - r.left, e.clientY - r.top, true);
});

/* clicking anywhere else on the page lets the mouse wheel scroll the page again */
document.addEventListener("pointerdown", (e) => {
  if (!e.target.closest("#mapbox") && !isBig()) setActive(false);
});

$map.box.querySelector(".map-ctrls").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const act = b.dataset.act;
  if (act === "in") zoomAt(1.6, MV.W / 2, MV.H / 2, true);
  if (act === "out") zoomAt(1 / 1.6, MV.W / 2, MV.H / 2, true);
  if (act === "fit") fitMap(true);
  if (act === "zone") setView({ s: MV.minS, tx: 0, ty: 0 }, true);
  if (act === "big") toggleBigMap();
});

$map.pins.addEventListener("click", (e) => {
  const el = e.target.closest(".pin");
  if (!el) return;
  if (el.dataset.n !== undefined) showTip({ kind: "pin", n: +el.dataset.n });
  else showTip({ kind: "ghost", n: +el.dataset.ghost });
});

/* list under the map: click to fly to a place, hover to light up its pin */
$map.list.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-n]");
  if (!b) return;
  const n = +b.dataset.n;
  flyTo(MV.pins[n][0], MV.pins[n][1]);
  showTip({ kind: "pin", n });
});
$map.list.addEventListener("mouseover", (e) => {
  const b = e.target.closest("button[data-n]");
  $map.pins.querySelectorAll(".pin.hot").forEach((p) => p.classList.remove("hot"));
  if (b) $map.pins.querySelector(`.pin[data-n="${b.dataset.n}"]`)?.classList.add("hot");
});
$map.list.addEventListener("mouseleave", () => {
  $map.pins.querySelectorAll(".pin.hot").forEach((p) => p.classList.remove("hot"));
});

$("#mapzones").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-zone]");
  if (!b) return;
  MV.zone = +b.dataset.zone;
  drawMap(saved.step);
});

$("#mapall").addEventListener("change", (e) => {
  MV.showAll = e.target.checked;
  hideTip();
  buildPins();
  renderMap();
});

/* ---------- big map (M), like the in-game world map ---------- */

function toggleBigMap(force) {
  const on = force === undefined ? !isBig() : force;
  if (on === isBig()) return;
  $map.box.classList.toggle("big", on);
  $("#mapveil").hidden = !on;
  document.body.style.overflow = on ? "hidden" : "";
  setActive(on);
  measureMap();
  fitMap(false);
  if (on) $map.view.focus({ preventScroll: true });
}
$("#mapclose").addEventListener("click", () => toggleBigMap(false));
$("#mapveil").addEventListener("click", () => toggleBigMap(false));

document.addEventListener("keydown", (e) => {
  if ((e.target instanceof Element && e.target.matches("input, textarea")) || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "Escape" && isBig()) { toggleBigMap(false); return; }
  if ((e.key === "m" || e.key === "M") && $("#panel-steps").classList.contains("on") && hasMap()) toggleBigMap();
  if (!(MV.active || isBig()) || !hasMap()) return;
  if (e.key === "+" || e.key === "=") zoomAt(1.6, MV.W / 2, MV.H / 2, true);
  if (e.key === "-") zoomAt(1 / 1.6, MV.W / 2, MV.H / 2, true);
});

/* no picture (offline): say so instead of an empty box */
$map.img.addEventListener("error", () => {
  const src = $map.img.getAttribute("src");
  if (!src) return;
  const id = src.startsWith(MAP_URL) && src.slice(MAP_URL.length).replace(/\.jpg$/, "");
  if (id && /^\d+$/.test(id)) { $map.img.src = `${MAP_CDN}${id}.jpg`; return; }   // not saved locally yet
  $map.img.removeAttribute("src");
  $("#mapnone").textContent = "The map needs an internet connection. The places and coordinates below still work.";
  $("#mapnone").hidden = false;
});

/* re-fit whenever the map window changes size (window resize, big map, coming back to this tab) */
new ResizeObserver(() => {
  const W = $map.view.clientWidth, H = $map.view.clientHeight;
  if (!W || (W === MV.W && H === MV.H)) return;
  measureMap();
  fitMap(false);
}).observe($map.view);

/* ---------- word popup ---------- */

function openWord(btn) {
  const pop = $("#wordpop");
  pop.innerHTML = `<b>${btn.textContent}</b>${WORDS[btn.dataset.word]}`;
  pop.hidden = false;
  const r = btn.getBoundingClientRect();
  const left = Math.min(window.innerWidth - pop.offsetWidth - 12, Math.max(12, r.left + window.scrollX));
  pop.style.left = `${left}px`;
  pop.style.top = `${r.bottom + window.scrollY + 8}px`;
  pop.classList.remove("show"); void pop.offsetWidth; pop.classList.add("show");
}
function closeWord() { $("#wordpop").hidden = true; }

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".word");
  if (btn) { openWord(btn); return; }
  if (!e.target.closest("#wordpop")) closeWord();
});

/* ---------- tabs ---------- */

function showTab(name) {
  $$(".tabs button").forEach((b) => {
    const on = b.dataset.tab === name;
    b.classList.toggle("on", on);
    // on phones the tab row scrolls sideways; keep the chosen tab in view
    if (on) b.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
  $$(".panel").forEach((p) => p.classList.toggle("on", p.id === `panel-${name}`));
  document.body.dataset.tab = name;
  window.scrollTo({ top: 0 });
  closeWord();
  document.dispatchEvent(new CustomEvent("wf:tab", { detail: { name } }));
}

/* ---------- talents and glossary ---------- */

function buildTalents() {
  $("#talentrows").innerHTML = TALENTS.map((t) => {
    const [lo, hi] = lvNums(t[0]);
    return `<tr data-lo="${lo}" data-hi="${hi || lo}"><td class="lv">${t[0]}</td><td><b>${t[1]}</b><div class="how">${t[2]}</div></td><td>${t[3]}</td></tr>`;
  }).join("");
  const note = document.createElement("p");
  note.className = "talentnow";
  note.id = "talentnow";
  $("table.talents").before(note);
}

/* light up the talent for the level of the step you're on */
function syncTalents(level) {
  let now = null;
  $$("#talentrows tr").forEach((tr) => {
    const lo = +tr.dataset.lo, hi = +tr.dataset.hi;
    tr.classList.toggle("past", hi < level);
    const isNow = lo <= level && level <= hi;
    tr.classList.toggle("now", isNow);
    if (isNow) now = tr;
  });
  const first = TALENTS.length ? lvNums(TALENTS[0][0])[0] : 10;
  $("#talentnow").innerHTML = level < first
    ? `<b>You're level ${level}</b> on the Quest Guide. Your first talent point comes at level ${first}: come back then.`
    : now ? `<b>You're level ${level}</b> on the Quest Guide. Your talent right now: <b class="gold">${now.querySelector("b").textContent}</b> (highlighted below). Ticked rows are already done.`
    : `<b>You're level ${level}</b> on the Quest Guide. Ticked rows are already done.`;
}

function buildGlossary() {
  const skip = new Set(["elites"]);
  const label = { pvp: "PvP", "rested xp": "Rested XP", xp: "XP", npc: "NPC" };
  $("#glossary").innerHTML = Object.keys(WORDS).filter((w) => !skip.has(w)).sort().map((w) =>
    `<div><dt>${label[w] || w.charAt(0).toUpperCase() + w.slice(1)}</dt><dd>${WORDS[w]}</dd></div>`
  ).join("");
}

/* ---------- start ---------- */

if (!saved.done || typeof saved.done !== "object" || Array.isArray(saved.done)) saved.done = {};
$("#card h4").insertAdjacentHTML("beforeend", ' <span class="tickcount" id="tickcount" aria-live="polite"></span>');
buildStepList();
buildTalents();
buildGlossary();
buildJourney();
buildFootNav();
showStep(saved.step, "next");

$("#next").addEventListener("click", () => showStep(saved.step + 1, "next"));
$("#back").addEventListener("click", () => showStep(saved.step - 1, "back"));
$$(".tabs button").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
$$("[data-goto]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); showTab(a.dataset.goto); }));

document.addEventListener("keydown", (e) => {
  if (!$("#panel-steps").classList.contains("on")) return;
  if (e.target.matches("input, textarea")) return;
  if (e.key === "ArrowRight") showStep(saved.step + 1, "next");
  if (e.key === "ArrowLeft") showStep(saved.step - 1, "back");
});
