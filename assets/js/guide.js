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

/* Shared game words live in data/words.js (COMMON_WORDS). A character's own WORDS win. */
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
const chapterLevels = (c) => (c.lo === c.hi ? `Level ${c.lo}` : `Levels ${c.lo}–${c.hi}`);

/* ---------- step card ---------- */

/* "1–2" -> 1 */
function stepLevel(i) { return parseInt(STEPS[i].lv, 10) || 1; }
window.currentStepLevel = () => stepLevel(saved.step);
window.currentStepIndex = () => saved.step;

/* Calm animations (the default in Settings): no sliding page, no smooth scrolling, no map glide.
   Only "Full" animations, on a device that doesn't ask for less motion, gets the moving version. */
const calmMotion = () => document.documentElement.dataset.motion !== "on" || matchMedia("(prefers-reduced-motion: reduce)").matches;

function showStep(i, direction) {
  i = Math.max(0, Math.min(STEPS.length - 1, i));
  const prev = saved.step;
  saved.step = i;
  persist();

  const s = STEPS[i];
  const card = $("#card");
  card.classList.remove("slide-next", "slide-back");
  void card.offsetWidth; // restart animation
  if (!document.querySelector(".mapbox.big") && !calmMotion()) card.classList.add(direction === "back" ? "slide-back" : "slide-next");

  const kind = stepKind(i);
  $("#stepmeta").innerHTML = `<span class="kind k-${kind}" title="${KINDS[kind].hint}">${kindIcon(kind)}${KINDS[kind].label}</span>`
    + `Step ${i + 1} of ${STEPS.length} <span>·</span> Level ${s.lv} <span>·</span> ${s.place}`;
  $("#steptitle").textContent = s.title;
  /* lines about a quest in the Quests list move into that quest's card; the rest stay objectives */
  const qLines = questLinesOf(i);
  let shown = 0;
  $("#steptodo").innerHTML = s.todo.map((t, n) => qLines.has(n) ? `<li hidden data-quest-line="${n}"></li>` :
    `<li><button type="button" class="tick" data-tick="${n}" aria-pressed="false" aria-label="Mark objective ${++shown} done"><span>${shown}</span></button><div>${explainWords(t)}</div></li>`).join("");
  $("#steptodo").hidden = !shown;
  $("#objhead").hidden = !shown;
  /* "Done when": how to tell the step is finished, plus what to do if you're short of the level */
  $("#stepdone").innerHTML = (s.done ? `<p><b>Done when:</b> ${explainWords(s.done)}</p>` : "")
    + (s.stuck ? `<p class="stuck"><b>Still short of the level?</b> ${explainWords(s.stuck)}</p>` : "");
  $("#stepdone").hidden = !(s.done || s.stuck);
  drawStepQuests(i);
  drawMap(i);
  $("#steptip").innerHTML = s.tip ? `<b>Tip:</b> ${explainWords(s.tip)}` : "";
  $("#steptip").hidden = !s.tip;

  $("#back").disabled = i === 0;
  if (window.syncBarsToStep) window.syncBarsToStep(stepLevel(i), i);

  $$("#steplist li[data-i]").forEach((li) => {
    const n = +li.dataset.i;
    li.classList.toggle("current", n === i);
    li.classList.toggle("done", n < i);
  });
  syncTicks();
  drawFootNav(i);
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
  const top = $("#panel-steps .sync, #panel-steps .nav").getBoundingClientRect().top + window.scrollY - $(".top").offsetHeight - 12;
  if (window.scrollY > top) window.scrollTo({ top, behavior: calmMotion() ? "auto" : "smooth" });
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
  /* count only the objectives shown; a step that is all quests is done when the game says they're handed in */
  const qLines = questLinesOf(i);
  const lines = s.todo.map((t, n) => n).filter((n) => !qLines.has(n));
  const ticked = lines.filter((n) => got.includes(n)).length;
  const qs = stepQuestList(i), g = gameState();
  const qDone = qs.filter((q) => questTicked(i, q, g)).length;
  /* Next lights up when every objective shown and every quest is ticked */
  const all = lines.length || qs.length ? ticked >= lines.length && qDone >= qs.length : got.length >= s.todo.length;
  const count = $("#tickcount");
  count.textContent = ticked ? `${ticked} of ${lines.length} done` : "Tick each one off as you go";
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
  syncTicks();
  if (b.getAttribute("aria-pressed") === "true" && window.WF && WF.sparksFrom) WF.sparksFrom(b, 8, { min: 14, max: 40, small: 3, big: 6 });
});

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
  /* a quest picked in the step's quest list shows its giver, objectives and turn-in instead of the step's places */
  if (MV.focus && MV.focus.step !== i) MV.focus = null;
  const focus = MV.focus;
  const map = focus ? focus.map : mapForStep(i);
  if (!map) { $map.box.hidden = true; toggleBigMap(false); return; }
  const key = `${i}:${focus ? focus.id : ""}`;
  if (MV.mapKey !== key) {
    MV.mapKey = key;
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

  $("#maptitle").innerHTML = focus
    ? `${focus.name} <small>${zone.name}</small><button type="button" class="map-unfocus" id="mapunfocus">‹ This step's places</button>`
    : `Where to go <small>${zone.name}</small>`;
  $map.box.classList.toggle("questmode", !!focus);
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

  $map.list.innerHTML = pins.map(([x, y, label, mark, kind], n) =>
    `<li><button type="button" data-n="${n}" class="${kind ? `q-${kind}` : ""}"><i>${mark ?? n + 1}</i>${label}<span>${Math.round(x)}, ${Math.round(y)}</span></button></li>`
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
  const own = MV.pins.map(([, , label, mark, kind], n) =>
    `<button type="button" class="pin${kind ? ` q-${kind}` : ""}" data-n="${n}" aria-label="${attr(`${mark ?? n + 1}: ${label}`)}"><i>${mark ?? n + 1}</i><span>${label}</span></button>`);
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
  const pts = MV.pins.length > 1 && !MV.focus ? MV.pins.map(([x, y]) => toScreen(x, y).join(",")).join(" ") : "";
  $map.route.querySelectorAll("polyline").forEach((p) => p.setAttribute("points", pts));
  placeTip();
}

function setView(v, animate) {
  const to = clampView(v);
  cancelAnimationFrame(MV.anim);
  if (!animate || calmMotion()) {
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
    head = MV.pins[sel.n][4] ? label : `${sel.n + 1}. ${label}`;
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
/* with a mouse, pointing at the map is enough: the wheel zooms and + / - work until the pointer leaves.
   (On a touch screen the first tap still unlocks it, so a swipe over the map can scroll the page.) */
$map.view.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && hasMap()) setActive(true); });
$map.view.addEventListener("pointerleave", (e) => {
  $("#mapcursor").textContent = "";
  if (e.pointerType === "mouse" && !isBig() && !MV.ptrs.size) setActive(false);
});
/* focusing a pin (Tab key) makes the browser scroll the window's insides; undo that, we pan ourselves */
$map.view.addEventListener("scroll", () => { $map.view.scrollLeft = 0; $map.view.scrollTop = 0; });

$map.view.addEventListener("wheel", (e) => {
  if (!hasMap()) return;
  e.preventDefault();                                 // over the map, the wheel zooms the map, never the page
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

$("#maptitle").addEventListener("click", (e) => {
  if (e.target.closest("#mapunfocus")) focusQuest(null);
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
  $("#mapside")?.classList.toggle("big", on);     // the side frame has to sit above the header while big
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

/* ---------- glossary ---------- */
/* (the Talents tab is drawn by assets/js/talents.js and follows the step through "wf:step") */

function buildGlossary() {
  const skip = new Set(["elites"]);
  const label = { pvp: "PvP", "rested xp": "Rested XP", xp: "XP", npc: "NPC" };
  $("#glossary").innerHTML = Object.keys(WORDS).filter((w) => !skip.has(w)).sort().map((w) =>
    `<div><dt>${label[w] || w.charAt(0).toUpperCase() + w.slice(1)}</dt><dd>${WORDS[w]}</dd></div>`
  ).join("");
}

/* ---------- find my step from the game ----------
   The game can't talk to a website, so the player runs two chat commands. The first reads the character into W:
   level, every quest handed in, and every quest in the quest log ("!" after one whose objectives are done).
   The second shows W in a box to copy, with the zone you're standing in and where your Hearthstone is set:
     "18-9,12,22-31,45!,0,/Darkshore/Auberdine"   (0 is a quest log header)
   The older one-command line "18-9,12,22" still works.

   Steps list the quests handed in on them (quests:{id:"name"}) and the ones only picked up there
   (pickup:{id:"name"}). Laid end to end, they make one long list of things the guide has you do, in order.
   The guide finds where in that list "done" turns into "not done yet", allowing for quests you skipped or did
   early, then steps over trainer, talent and travel steps the rest of what the game says shows you've done. */

/* Chat lines stop at 255 characters, which is why it takes two. The box opens with the text already selected and
   hides itself as soon as it loses focus: Esc, Enter or a click anywhere closes it. WoW doesn't let scripts write
   to the clipboard, so Ctrl + C is the one thing the player has to do. GetNumQuestLogEntries returns two numbers;
   the brackets stop the second one from becoming the loop's step. */
const SYNC_COMMANDS = [
  '/run L=C_QuestLog W=UnitLevel"player".."-"..table.concat(L.GetAllCompletedQuestIDs(),",").."-"for i=1,(L.GetNumQuestLogEntries())do q=L.GetInfo(i).questID or 0 W=W..q..(L.IsComplete(q)and"!,"or",")end',
  '/run f=CreateFrame("EditBox",nil,UIParent,"InputBoxTemplate")f:SetSize(400,32)f:SetPoint"CENTER"f:SetText((W or"").."/"..GetZoneText().."/"..(GetBindLocation()or""))f:SetFocus()f:HighlightText()f:SetScript("OnEditFocusLost",f.Hide)',
];
const stepQuestIds = (i) => Object.keys(STEPS[i].quests || {}).map(Number);
const stepPickupIds = (i) => Object.keys(STEPS[i].pickup || {}).map(Number);

/* what the last import said: have = handed in, log = quest log (id -> true once its objectives are done) */
function gameState() {
  const log = saved.qlog && typeof saved.qlog === "object" ? saved.qlog : {};
  return {
    have: new Set(Array.isArray(saved.quests) ? saved.quests : []),
    log: new Map(Object.entries(log).map(([id, c]) => [+id, !!c])),
  };
}
/* "in" = handed in, "ready" = in the log with its objectives done, "log" = in the log, "" = none of those */
function gameSays(id, g) { return g.have.has(id) ? "in" : g.log.has(id) ? (g.log.get(id) ? "ready" : "log") : ""; }
/* a pickup is done once the quest is in your log (or already handed in); a hand-in only once it's handed in */
function gameDone(q, g) { const s = gameSays(q.id, g); return q.role === "pickup" ? !!s : s === "in"; }

/* "18-9,12-31,45!,/Darkshore/Auberdine" -> { level, ids, log, zone, home }. A bare list of ids works too.
   { missing: true } when only the second command ran. */
function parseGameExport(text) {
  const [main = "", zone = "", home = ""] = String(text).trim().split("/");
  const parts = main.replace(/\s+/g, "").split("-");
  if (!parts.join("") && zone) return { missing: true };
  if (parts.length > 3) return null;
  const [level, ids, log] = parts.length === 1 ? [null, parts[0], null] : parts;
  if (level !== null && !/^\d{1,2}$/.test(level)) return null;
  if (!/^[\d,]*$/.test(ids) || (log != null && !/^[\d!,]*$/.test(log))) return null;
  const list = ids.split(",").filter(Boolean).map(Number).filter((n) => n > 0);
  const qlog = log == null ? null : new Map(log.split(",").filter((x) => x && x !== "0" && x !== "0!")
    .map((x) => [parseInt(x, 10), x.endsWith("!")]));
  if (!list.length && !level && !(qlog && qlog.size)) return null;
  return { level: level ? +level : null, ids: list, log: qlog, zone: zone.trim(), home: home.trim() };
}

/* Everything the guide has you do with quests, in order: { step, id, role }. A quest handed in on a step
   without being picked up on an earlier one is picked up there too, so having it in your log counts. */
let GUIDE_EVENTS = null;
function guideEvents() {
  if (GUIDE_EVENTS) return GUIDE_EVENTS;
  const picked = new Set(), out = [];
  STEPS.forEach((s, i) => {
    const take = (id) => { if (!picked.has(id)) { picked.add(id); out.push({ step: i, id, role: "pickup" }); } };
    stepQuestIds(i).forEach(take);
    stepQuestIds(i).forEach((id) => out.push({ step: i, id, role: "turnin" }));
    stepPickupIds(i).forEach(take);
  });
  return (GUIDE_EVENTS = out);
}

/* how much one quest counts when deciding where you are */
function eventWeight(e, done, level) {
  if (!level) return 1;
  const lv = lvNums(STEPS[e.step].lv)[0] || 1;
  if (done && lv > level + 3) return 0.2;     // done long before the guide gets there: it shouldn't pull you ahead
  if (!done && lv + 6 < level) return 0.5;    // left on a step far below your level: most likely skipped on purpose
  return 1;
}

/* the zone names a step is in: its map, plus where its quests are given and handed in */
function stepZones(i) {
  const names = new Set();
  (STEPS[i].map || []).forEach(([k]) => { if (ZONES[k]) names.add(ZONES[k].name); });
  if (typeof QUEST_DATA !== "undefined" && typeof QUEST_ZONES !== "undefined")
    [...stepQuestIds(i), ...stepPickupIds(i)].forEach((id) => {
      const d = QUEST_DATA[id];
      [d && d.from, d && d.to].forEach((p) => { if (p && QUEST_ZONES[p[0]]) names.add(QUEST_ZONES[p[0]]); });
    });
  return [...names];
}
const sameZone = (a, b) => { a = a.toLowerCase(); b = b.toLowerCase(); return !!a && !!b && (a.startsWith(b) || b.startsWith(a)); };
const inZone = (zone, i) => !!zone && stepZones(i).some((z) => sameZone(zone, z));

/* a step's line about making an inn your home is done when your Hearthstone is set there */
const HOME_LINE = /\byour home\b/i;
function homeLineDone(t, i, home) {
  if (!home || !HOME_LINE.test(t)) return false;
  const h = home.toLowerCase(), place = STEPS[i].place.toLowerCase();
  return t.replace(/<[^>]+>/g, "").toLowerCase().includes(h) || place.includes(h) || h.includes(place);
}

/* A step with no quests can't be checked against the quest list. Step over it when the rest of the import
   says you're past it: a trainer or talent visit below your level, a step for levels you've outgrown, travel
   to the zone you're standing in, or making the inn your home where your Hearthstone already is. */
function skippable(i, got, until) {
  const s = STEPS[i], k = stepKind(i), lv = lvNums(s.lv), lo = lv[0] || 1, hi = lv[lv.length - 1] || lo;
  const why = (text) => ({ i, why: text });
  if (got.level && ["train", "talent"].includes(k) && lo < got.level) return why("you're past that level");
  if (k === "home" && got.home && s.todo.some((t) => homeLineDone(t, i, got.home))) return why(`your Hearthstone is set in ${got.home}`);
  if (k === "travel" && inZone(got.zone, until)) return why(`you're already in ${got.zone}`);
  if (got.level && !["start", "done"].includes(k) && hi < got.level) return why("you're past that level");
  if (k === "start" && got.level > 1) return why("you've already started");
  return null;
}

function findStepFromGame(got, g) {
  /* without the quest log (the older one-line export) a pickup can't be checked, so only hand-ins count */
  const ev = got.log ? guideEvents() : guideEvents().filter((e) => e.role === "turnin");
  const done = ev.map((e) => gameDone(e, g));
  const w = ev.map((e, k) => eventWeight(e, done[k], got.level));
  /* put the line between "done" and "not yet" where the fewest quests disagree: the ones not done before it
     plus the ones done after it. On a tie, the later place (you skipped one rather than did one early). */
  let after = 0, before = 0, best, b = 0;
  done.forEach((d, k) => { if (d) after += w[k]; });
  best = after;
  for (let k = 0; k < ev.length; k++) {
    if (done[k]) after -= w[k]; else before += w[k];
    if (before + after <= best + 1e-9) { best = before + after; b = k + 1; }
  }
  const prev = b > 0 ? ev[b - 1].step : -1;
  const open = b < ev.length ? ev[b].step : STEPS.length - 1;
  let at = prev === open ? open : prev + 1;
  const skipped = [];
  for (let why; at < open && (why = skippable(at, got, open)); at++) skipped.push(why);

  const doneEv = ev.filter((e, k) => done[k]);
  const behind = ev.slice(0, b).filter((e, k) => !done[k]);
  const ahead = ev.slice(b).filter((e, k) => done[b + k]);
  return {
    at, skipped, none: !doneEv.length,
    /* quests the guide hands in on an earlier step that are still in your log */
    stillInLog: ev.filter((e) => e.role === "turnin" && e.step < at && g.log.has(e.id)),
    /* hand-ins you left behind that are still worth doing at your level */
    missed: behind.filter((e) => e.role === "turnin" && e.step < at && !g.log.has(e.id)
      && (!got.level || (lvNums(STEPS[e.step].lv)[0] || 1) + 4 >= got.level)),
    ahead: ahead.filter((e) => e.role === "turnin" && e.step > at),
  };
}

/* The import decides the ticks: every objective behind you is ticked, and from your step on, a line that names
   quests is ticked once the game says they're all done (picked up, for the quests the step only picks up), and a
   "make the inn your home" line once your Hearthstone is set there. If the import lands on the step you were
   already on, your own ticks on its other lines stay; every other step starts clean. */
function tickFromGame(at, g, home) {
  STEPS.forEach((s, i) => {
    if (i < at) { saved.done[i] = s.todo.map((t, n) => n); return; }
    const list = stepQuestList(i);
    const got = new Set(i === at && at === saved.step ? ticksFor(i) : []);
    s.todo.forEach((t, n) => {
      const bold = [...t.matchAll(/<b>(.*?)<\/b>/g)].map((m) => m[1].replace(/<[^>]+>/g, ""));
      const qs = list.filter((q) => bold.includes(q.name));
      if (qs.length) { if (qs.every((q) => gameDone(q, g))) got.add(n); else got.delete(n); }
      else if (homeLineDone(t, i, home)) got.add(n);
    });
    if (got.size) saved.done[i] = [...got].sort((a, b) => a - b);
    else delete saved.done[i];
  });
}

/* ---------- the step's quest log: every quest it picks up or hands in, checked against the game ---------- */

/* in the order the step talks about them; pickup = take it here, quests = hand it in here */
function stepQuestList(i) {
  const s = STEPS[i], text = [...s.todo, s.done || ""].join(" ");
  const list = [
    ...Object.entries(s.pickup || {}).map(([id, name]) => ({ id: +id, name, role: "pickup" })),
    ...Object.entries(s.quests || {}).map(([id, name]) => ({ id: +id, name, role: "turnin" })),
  ];
  const at = (q) => { const k = text.indexOf(`<b>${q.name}</b>`); return k < 0 ? 1e9 : k; };
  return list.sort((a, b) => at(a) - at(b) || (a.role === "pickup" ? -1 : 1));
}

/* objective lines that talk about a listed quest: line number -> the first listed quest it names */
function questLinesOf(i) {
  const list = stepQuestList(i), out = new Map();
  STEPS[i].todo.forEach((t, n) => {
    const q = list.find((x) => t.includes(`<b>${x.name}</b>`));
    if (q) out.set(n, q.id);
  });
  return out;
}

/* a guide line shown inside a quest card (which is a button): no links or word popups in there, and no
   "<b>Quest name</b>:" at the start, since the card already says it */
function plainLine(t, name) {
  t = t.replace(/<\/?a\b[^>]*>/g, "");
  const lead = `<b>${name}</b>:`;
  if (t.startsWith(lead)) { t = t.slice(lead.length).trim(); t = t.charAt(0).toUpperCase() + t.slice(1); }
  return t;
}

/* a quest on a step is done when the game says so (handed in; or in your log, for a quest the step only picks
   up), or when you ticked it yourself (saved.qdone["step:id"]) */
function questTicked(i, q, g = gameState()) {
  return gameDone(q, g) || !!(saved.qdone && saved.qdone[`${i}:${q.id}`]);
}

const GAME_SAYS = { in: "Handed in", ready: "Ready to hand in", log: "In your quest log" };

function drawStepQuests(i) {
  const box = $("#questlog");
  if (!box) return;
  const list = stepQuestList(i);
  const tips = new Map();
  questLinesOf(i).forEach((id, n) => tips.set(id, [...(tips.get(id) || []), STEPS[i].todo[n]]));
  box.hidden = !list.length;
  if (!list.length) return;
  const synced = !!saved.sync, g = gameState();
  const done = list.filter((q) => questTicked(i, q, g)).length;
  box.innerHTML = `<h4>Quests <span class="ql-count${done === list.length ? " all" : ""}">${done
      ? `${done} of ${list.length} done${synced ? ` · read from your game ${syncAge()}` : ""}`
      : "Click ! or ? when you've done one · click a quest for the map"}</span></h4>
    <ul>${list.map((q) => {
      const d = (typeof QUEST_DATA !== "undefined" && QUEST_DATA[q.id]) || {};
      const says = gameSays(q.id, g), fromGame = gameDone(q, g), ticked = questTicked(i, q, g);
      const how = q.role === "pickup" ? "picked up" : "handed in";
      const who = q.role === "pickup" ? (d.from ? `From ${d.from[3]}` : "") : (d.to ? `Hand in to ${d.to[3]}` : "");
      const on = MV.focus && MV.focus.step === i && MV.focus.id === q.id;
      /* the mark is WoW's yellow ! (pick up) or ? (hand in) until it's done, then a green tick */
      return `<li class="ql-row">
        <button type="button" class="ql-mark" data-check="${q.id}" aria-pressed="${ticked}"${fromGame ? ' aria-disabled="true"' : ""}
          aria-label="${attr(`${q.name}: ${ticked ? `${how}, click to untick` : `mark as ${how}`}`)}"
          title="${fromGame ? `${GAME_SAYS[says]}, says your game` : ticked ? `Ticked as ${how}. Click to untick.` : `Click when you've ${how} it`}">${ticked ? "✓" : q.role === "pickup" ? "!" : "?"}</button>
        <button type="button" class="ql-q ql-${ticked ? "done" : "open"}${on ? " on" : ""}" data-q="${q.id}" aria-pressed="${on}">
        <span class="ql-main"><b>${q.name}</b>${d.lv ? `<em>Lv ${d.lv}</em>` : ""}<span class="ql-role">${q.role === "pickup" ? "Pick up" : "Hand in"}</span>
          ${says ? `<span class="ql-game ql-g-${says}">${GAME_SAYS[says]}</span>` : ""}
          ${d.text ? `<span class="ql-text">${d.text}</span>` : ""}
          ${(tips.get(q.id) || []).map((t) => `<span class="ql-guide">${plainLine(t, q.name)}</span>`).join("")}
          ${who ? `<span class="ql-who">${who}</span>` : ""}</span>
        <span class="ql-map" aria-hidden="true">${on ? "On the map" : "Map ›"}</span>
      </button></li>`;
    }).join("")}</ul>`;
}

/* QUEST_DATA places are game zone ids; find (or add) the site zone that shows that map */
function zoneKeyFor(area) {
  const name = (typeof QUEST_ZONES !== "undefined" && QUEST_ZONES[area]) || "Map";
  for (const [k, z] of Object.entries(ZONES)) if (z.id === area) return k;
  for (const [k, z] of Object.entries(ZONES)) if (z.name === name) return k;
  const k = `z${area}`;
  ZONES[k] = { name, id: area };
  return k;
}

/* the map for one quest: giver (!), objectives (1, 2…) and turn-in (?), grouped by zone */
function questMap(id) {
  const d = typeof QUEST_DATA !== "undefined" && QUEST_DATA[id];
  if (!d) return null;
  const places = [];
  if (d.from) places.push([...d.from, "!", "from", `Quest giver: ${d.from[3]}`]);
  (d.goals || []).forEach((g, n) => places.push([...g, String(n + 1), "goal", g[3]]));
  if (d.to) {
    const same = d.from && d.from[0] === d.to[0] && Math.hypot(d.from[1] - d.to[1], d.from[2] - d.to[2]) < 1;
    if (same) { places[0][4] = "!?"; places[0][6] = `Quest giver and hand in: ${d.to[3]}`; }
    else places.push([...d.to, "?", "to", `Hand in: ${d.to[3]}`]);
  }
  if (!places.length) return null;
  const byZone = new Map();
  places.forEach(([z, x, y, , mark, kind, label]) => {
    const k = zoneKeyFor(z);
    if (!byZone.has(k)) byZone.set(k, [k]);
    byZone.get(k).push([x, y, label, mark, kind]);
  });
  return [...byZone.values()];
}

function focusQuest(id) {
  const i = saved.step;
  const q = id && stepQuestList(i).find((x) => x.id === id);
  const map = q && questMap(id);
  MV.focus = map && !(MV.focus && MV.focus.id === id) ? { step: i, id, name: q.name, map } : null;
  drawMap(i);
  drawStepQuests(i);
  if (MV.focus) {
    const r = $map.box.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight) $map.box.scrollIntoView({ block: "center", behavior: calmMotion() ? "auto" : "smooth" });
  }
}

function syncAge() {
  const ms = Date.now() - ((saved.sync && saved.sync.at) || 0);
  const min = Math.round(ms / 60000);
  if (min < 2) return "just now";
  if (min < 90) return `${min} minutes ago`;
  const h = Math.round(min / 60);
  return h < 36 ? `${h} hours ago` : `${Math.round(h / 24)} days ago`;
}

/* "a", "a and b", "a, b and c"; names after the first few become "and 3 more" */
function namesList(names, max = 4) {
  names = [...new Set(names)];
  const shown = names.slice(0, max).map((n) => `<b>${n}</b>`);
  if (names.length > max) shown.push(`${names.length - max} more`);
  return shown.length < 2 ? shown.join("") : `${shown.slice(0, -1).join(", ")} and ${shown[shown.length - 1]}`;
}
const questName = (e) => (STEPS[e.step][e.role === "turnin" ? "quests" : "pickup"] || {})[e.id]
  || (STEPS[e.step].quests || {})[e.id] || (STEPS[e.step].pickup || {})[e.id] || `quest ${e.id}`;

/* what the import found, in a few short lines under the button */
function syncReport(got, g, r) {
  const s = STEPS[r.at], lines = [];
  const ready = got.log ? [...got.log.values()].filter(Boolean).length : 0;
  const read = [got.level ? `level ${got.level}` : "", `${g.have.size} handed-in quests`,
    got.log ? `${got.log.size} in your quest log${ready ? ` (${ready} ready to hand in)` : ""}` : ""].filter(Boolean);
  let head = `Read ${read.length > 1 ? `${read.slice(0, -1).join(", ")} and ${read[read.length - 1]}` : read[0]}.`;
  head += r.none ? " None of them are in this guide yet, so you're at the start." : ` You're on <b>step ${r.at + 1}: ${s.title}</b>.`;

  const here = stepQuestList(r.at).map((q) => ({ q, says: gameSays(q.id, g) }));
  const readyHere = here.filter((x) => x.q.role === "turnin" && x.says === "ready").map((x) => x.q.name);
  const doHere = here.filter((x) => x.q.role === "turnin" && (x.says === "log" || (!x.says && !got.log))).map((x) => x.q.name);
  const takeHere = here.filter((x) => !x.says && (x.q.role === "pickup" || got.log)).map((x) => x.q.name);
  if (readyHere.length) lines.push(`Ready to hand in here: ${namesList(readyHere)}.`);
  if (doHere.length) lines.push(`Still to finish here: ${namesList(doHere)}.`);
  if (takeHere.length && got.log) lines.push(`Still to pick up here: ${namesList(takeHere.filter((n) => !doHere.includes(n)))}.`);

  if (r.skipped.length) {
    const why = [...new Set(r.skipped.map((x) => x.why))];
    lines.push(`Stepped over ${namesList(r.skipped.map((x) => STEPS[x.i].title), 3)}, since ${why.join(" and ")}. Go back if you haven't done ${r.skipped.length > 1 ? "them" : "it"}.`);
  }
  if (r.stillInLog.length) lines.push(`Still in your quest log from earlier steps: ${namesList(r.stillInLog.map(questName))}. Hand ${r.stillInLog.length > 1 ? "them" : "it"} in when you pass by.`);
  if (r.missed.length) lines.push(`Skipped earlier and still worth doing at your level: ${namesList(r.missed.map(questName), 3)}.`);
  if (r.ahead.length) lines.push(`You've already handed in ${r.ahead.length} quest${r.ahead.length > 1 ? "s" : ""} from later steps. They're ticked for when you get there.`);

  const zones = stepZones(r.at);
  if (got.zone && zones.length && !inZone(got.zone, r.at)) lines.push(`This step is in <b>${zones[0]}</b>, and you're in <b>${got.zone}</b>.`);
  const lo = lvNums(s.lv)[0] || 1;
  if (got.level && lo + 3 < got.level) {
    const j = STEPS.findIndex((x, n) => n > r.at && (lvNums(x.lv)[0] || 1) >= got.level - 1);
    if (j > r.at) lines.push(`You're level ${got.level}, well above this step (level ${s.lv}). The quests here will be easy and give little XP. <button type="button" class="wowbtn small" data-jump="${j}">Go to step ${j + 1}, level ${STEPS[j].lv}</button>`);
  }
  if (!r.none && ["train", "talent"].includes(stepKind(r.at))) lines.push("The game doesn't share trainer visits or talents, so if you've already done this step, press Next.");
  if (!got.log) lines.push("This was the older one-line export. Run both commands above and the guide reads your quest log too: what you've picked up and what's ready to hand in.");
  return `${head}${lines.length ? `<ul>${lines.map((l) => `<li>${l}</li>`).join("")}</ul>` : ""}`;
}

function buildSync() {
  const box = document.createElement("details");
  box.className = "sync";
  box.id = "sync";
  box.innerHTML = `<summary>Find my step from the game</summary>
    <ol class="sync-how">
      <li>Copy this command, paste it into the chat box in game and press <kbd>Enter</kbd>. Nothing shows yet: it reads your quests.
        <div class="sync-cmd"><code data-cmd="0"></code><button type="button" class="wowbtn small" data-copy="0">Copy</button></div></li>
      <li>Then this one. A box opens with a line of text, already selected. Press <kbd>Ctrl</kbd> + <kbd>C</kbd>, then <kbd>Esc</kbd> to close it. Clicking anywhere else closes it too.
        <div class="sync-cmd"><code data-cmd="1"></code><button type="button" class="wowbtn small" data-copy="1">Copy</button></div></li>
      <li>Paste it here:
        <textarea id="syncpaste" rows="3" spellcheck="false" placeholder="18-179,3114,170-3116,3117!,/Teldrassil/Dolanaar"></textarea></li>
    </ol>
    <p class="sync-what">It reads your level, every quest you've handed in, what's in your quest log and what's ready to hand in, the zone you're in and where your Hearthstone is set. Then it finds your step and ticks off everything you've done.</p>
    <div class="sync-go"><button type="button" class="wowbtn" id="syncgo">Find my step</button></div>
    <div class="sync-out" id="syncout" aria-live="polite"></div>`;
  $("#panel-steps .nav").before(box);
  box.querySelectorAll("code[data-cmd]").forEach((c) => { c.textContent = SYNC_COMMANDS[+c.dataset.cmd]; });

  box.addEventListener("click", async (e) => {
    const b = e.target.closest("button[data-copy]");
    if (!b) return;
    const n = +b.dataset.copy;
    try { await navigator.clipboard.writeText(SYNC_COMMANDS[n]); b.textContent = "Copied!"; }
    catch (err) {
      const r = document.createRange(); r.selectNodeContents(box.querySelector(`code[data-cmd="${n}"]`));
      getSelection().removeAllRanges(); getSelection().addRange(r);
      b.textContent = "Press Ctrl + C";
    }
    setTimeout(() => { b.textContent = "Copy"; }, 2000);
  });

  $("#syncout").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-jump]");
    if (!b) return;
    const j = +b.dataset.jump;
    showStep(j, j >= saved.step ? "next" : "back");
    scrollToStep();
  });

  $("#syncgo").addEventListener("click", () => {
    const out = $("#syncout");
    const got = parseGameExport($("#syncpaste").value);
    if (!got || got.missing) {
      out.className = "sync-out bad";
      out.innerHTML = got ? "Only the second command's part came through. Run the <b>first</b> command in game, then the second one again, and paste the new line."
        : "That doesn't look like the line from the game. It should start with your level, a dash, then numbers with commas, like <b>18-179,3114,170-…</b>.";
      return;
    }
    saved.quests = got.ids;
    if (got.log) saved.qlog = Object.fromEntries([...got.log].map(([id, c]) => [id, c ? 1 : 0]));
    else delete saved.qlog;
    saved.sync = { at: Date.now(), level: got.level, zone: got.zone || null, home: got.home || null };
    const g = gameState();
    const r = findStepFromGame(got, g);
    tickFromGame(r.at, g, got.home);
    persist();
    showStep(r.at, r.at >= saved.step ? "next" : "back");
    out.className = "sync-out good";
    out.innerHTML = syncReport(got, g, r);
    $("#syncpaste").value = "";
  });
}

/* ---------- wide screens: the map in its own frame, right of the guide ----------
   On a screen with room beside the 860px page, the map leaves the parchment and stays in view on the
   right while you scroll the step. Narrower screens keep it under the step. */

function buildMapSide() {
  const home = document.createComment("the map sits here on narrow screens");
  $map.box.before(home);
  const side = document.createElement("aside");
  side.className = "frame mapside";
  side.id = "mapside";
  side.setAttribute("aria-label", "Map");
  side.innerHTML = `<div class="frame-title">Map</div><div class="frame-body"></div>`;
  document.body.append(side);
  if (!document.body.dataset.tab) document.body.dataset.tab = "steps";

  const wide = matchMedia("(min-width: 1600px)");
  const place = () => {
    document.documentElement.style.setProperty("--toph", `${$(".top").offsetHeight}px`);
    const inSide = $map.box.parentElement === side.lastElementChild;
    if (wide.matches && !inSide) side.lastElementChild.append($map.box);
    else if (!wide.matches && inSide) { toggleBigMap(false); home.after($map.box); }
  };
  /* the side frame stays put while the page scrolls, so the wheel anywhere on it (title, place list)
     shouldn't scroll the page underneath either */
  side.addEventListener("wheel", (e) => { if (!e.target.closest(".mapview")) e.preventDefault(); }, { passive: false });
  /* the frame's top lines up with the Quest Guide frame; once that scrolls away, it stops under the header */
  const guideFrame = $("#panel-steps > .frame");
  let alignQueued = false;
  const align = () => {
    alignQueued = false;
    if (!wide.matches || !guideFrame) return;
    const toph = $(".top").offsetHeight;
    side.style.top = `${Math.max(toph + 22, guideFrame.getBoundingClientRect().top)}px`;
  };
  const queueAlign = () => { if (!alignQueued) { alignQueued = true; requestAnimationFrame(align); } };
  wide.addEventListener("change", () => { place(); queueAlign(); });
  window.addEventListener("scroll", queueAlign, { passive: true });
  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty("--toph", `${$(".top").offsetHeight}px`);
    queueAlign();
  }, { passive: true });
  document.addEventListener("wf:tab", queueAlign);
  place();
  align();
  setTimeout(align, 700);   // again once the page's fade-in has settled
}

/* ---------- start ---------- */

if (!saved.done || typeof saved.done !== "object" || Array.isArray(saved.done)) saved.done = {};
$("#steptodo").insertAdjacentHTML("afterend", '<section class="questlog" id="questlog" hidden></section>');
$("#questlog").addEventListener("click", (e) => {
  const m = e.target.closest(".ql-mark");
  if (m) {
    if (m.getAttribute("aria-disabled") === "true") return;      // the game already says it's handed in
    const i = saved.step, key = `${i}:${m.dataset.check}`;
    if (!saved.qdone || typeof saved.qdone !== "object") saved.qdone = {};
    const on = !saved.qdone[key];
    if (on) saved.qdone[key] = 1; else delete saved.qdone[key];
    persist();
    drawStepQuests(i);
    syncTicks();
    const nm = $(`#questlog .ql-mark[data-check="${m.dataset.check}"]`);
    if (on && nm && window.WF && WF.sparksFrom) WF.sparksFrom(nm, 8, { min: 14, max: 40, small: 3, big: 6 });
    return;
  }
  const b = e.target.closest(".ql-q");
  if (b) focusQuest(+b.dataset.q);
});
$("#card h4").id = "objhead";
$("#objhead").insertAdjacentHTML("beforeend", ' <span class="tickcount" id="tickcount" aria-live="polite"></span>');
buildStepList();
buildGlossary();
buildSync();
buildFootNav();
buildMapSide();
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
