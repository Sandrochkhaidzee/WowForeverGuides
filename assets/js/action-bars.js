/* =========================================================
   Action bars: which spell goes on which key, by level.
   Loaded after wow-guide.js. Draws:
     - the HUD bar pinned to the bottom of the screen
     - the full "Action bars" tab with a level slider
   ========================================================= */

/* ---------- icons (simple drawings, 24x24) ---------- */
/* ---------- icons (simple drawings, 24x24) ---------- */
const GLYPH = {
  snow:   '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" stroke-width="1.8"/>',
  flame:  '<path d="M12 22c-4 0-7-3-7-7 0-4 4-6 4-10 3 2 3 5 3 5s1-2 3-3c0 3 4 5 4 8 0 4-3 7-7 7z" fill="currentColor" stroke="none"/>',
  star:   '<path d="M12 2l2.6 6.9L22 9.3l-5.7 4.8L18 21.5 12 17.6 6 21.5l1.7-7.4L2 9.3l7.4-.4z" fill="currentColor" stroke="none"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" stroke-width="2"/>',
  drop:   '<path d="M12 2s7 8 7 13a7 7 0 01-14 0c0-5 7-13 7-13z" fill="currentColor" stroke="none"/>',
  burst:  '<path d="M12 1v6M12 17v6M1 12h6M17 12h6M4 4l4 4M16 16l4 4M20 4l-4 4M8 16l-4 4" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  arrow:  '<path d="M3 12h15M13 6l6 6-6 6" stroke-width="2.4"/><path d="M3 6v12" stroke-width="2" opacity=".6"/>',
  cube:   '<path d="M12 2l9 5v10l-9 5-9-5V7z" stroke-width="2"/><path d="M12 12l9-5M12 12L3 7M12 12v10" stroke-width="1.4"/>',
  gear:   '<circle cx="12" cy="12" r="4" stroke-width="2"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M19.8 4.2L17 7M7 17l-2.8 2.8" stroke-width="2.2"/>',
  ring:   '<ellipse cx="12" cy="12" rx="7" ry="10" stroke-width="2.2"/><ellipse cx="12" cy="12" rx="3" ry="6" stroke-width="1.4"/>',
  gem:    '<path d="M6 3h12l4 6-10 13L2 9z" stroke-width="1.8"/><path d="M2 9h20M9 3l3 6 3-6M12 9v13" stroke-width="1.2"/>',
  clock:  '<circle cx="12" cy="12" r="9" stroke-width="2"/><path d="M12 6v6l4 3" stroke-width="2"/>',
  slash:  '<circle cx="12" cy="12" r="9" stroke-width="2"/><path d="M5.5 5.5l13 13" stroke-width="2.4"/>',
  dots:   '<circle cx="5" cy="12" r="2.6" fill="currentColor"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/><circle cx="19" cy="12" r="2.6" fill="currentColor"/><path d="M2 6l3 3M9 6l3 3M16 6l3 3" stroke-width="1.4"/>',
  scroll: '<path d="M6 3h11a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5" stroke-width="2"/><path d="M9 8h7M9 12h7M9 16h5" stroke-width="1.6"/>',
  feather:'<path d="M20 4C10 4 5 10 5 19l14-14zM5 19l-2 2M9 15h6" stroke-width="2"/>',
  house:  '<path d="M3 11l9-8 9 8M5 10v11h14V10" stroke-width="2"/><path d="M10 21v-6h4v6" stroke-width="1.6"/>',
  wand:   '<path d="M4 20L16 8" stroke-width="3"/><path d="M18 2v4M16 4h4M20 9v3M18.5 10.5h3" stroke-width="1.6"/>',
  sheep:  '<path d="M7 15a4 4 0 01-1-7.8A4 4 0 0113 5a4 4 0 017 3 3.5 3.5 0 01-2 7z" fill="currentColor" stroke="none"/><path d="M9 15v4M15 15v4" stroke-width="2"/>',
  swirl:  '<path d="M12 12a2 2 0 112 2 4 4 0 11-4-4 6 6 0 116 6 8 8 0 11-8-8" stroke-width="1.8"/>',
  cross:  '<path d="M12 3v18M3 12h18" stroke-width="3.4"/>',
  bread:  '<path d="M4 12a8 6 0 0116 0v6H4z" fill="currentColor" stroke="none"/><path d="M8 10v3M12 9v4M16 10v3" stroke="#0006" stroke-width="1.4"/>',
  chain:  '<rect x="2" y="9" width="9" height="6" rx="3" stroke-width="2"/><rect x="13" y="9" width="9" height="6" rx="3" stroke-width="2"/><path d="M11 5l2 4M13 19l-2-4" stroke-width="1.6"/>',
  bulb:   '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c1 1 1 2 1 3h6c0-1 0-2 1-3A6 6 0 0012 3z" stroke-width="2"/>',
  horse:  '<circle cx="7" cy="17" r="4" stroke-width="2"/><circle cx="17" cy="17" r="4" stroke-width="2"/><path d="M7 17l5-9h4l1 9M10 8h4" stroke-width="2"/>',
  blade:  '<path d="M19 3l2 2-11 11-3-3z" fill="currentColor" stroke="none"/><path d="M7 13l4 4M4 20l4-4M5 15l4 4" stroke-width="2"/>',
  eye:    '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
};


const ICON_URL = WF.ICON_URL;   // assets/icons/, see assets/js/characters.js
function spellIn(slot, level) {
  let id = null;
  slot[1].forEach(([from, spell]) => { if (level >= from) id = spell; });
  return id;
}
/* was it put there at this level (or the level before, since trainers are every 2 levels)? */
function isNewIn(slot, level) {
  return slot[1].some(([from]) => from === level);
}

function iconHTML(id, key, fresh) {
  if (!id) return `<div class="slot empty">${key ? `<span class="hk">${keyLabel(key)}</span>` : ""}</div>`;
  const s = SPELLBOOK[id];
  return `<button type="button" class="slot sc-${s.school}${fresh ? " fresh" : ""}" data-spell="${id}" aria-label="${s.name}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${GLYPH[s.icon]}</svg>
      ${ICONS[id] ? `<img class="ico" src="${ICON_URL}${ICONS[id]}.jpg" alt="" draggable="false" onerror="WF.iconErr(this)">` : ""}
      ${key ? `<span class="hk">${keyLabel(key)}</span>` : ""}
      <span class="cd"></span>
    </button>`;
}
function keyLabel(k) { return k.startsWith("S") ? "s" + k.slice(1) : k.startsWith("A") ? "a" + k.slice(1) : k; }

/* ---------- tooltip (WoW style) ---------- */
function showSpellTip(btn) {
  const s = SPELLBOOK[btn.dataset.spell];
  const tip = document.getElementById("spelltip");
  tip.innerHTML = `<div class="tt-name">${ICONS[btn.dataset.spell] ? `<img class="tt-ico" src="${ICON_URL}${ICONS[btn.dataset.spell]}.jpg" alt="" onerror="WF.iconErr(this)">` : ""}${s.name}</div>
    <div class="tt-sub">${s.talent ? "Talent" : s.school === "racial" ? "Racial" : s.school === "item" ? "Item" : (GUIDE_PAGE.abilityWord || "Spell")} · from level ${s.lv}</div>
    <div class="tt-text">${s.text}</div>`;
  tip.hidden = false;
  const r = btn.getBoundingClientRect();
  let left = r.left + r.width / 2 - tip.offsetWidth / 2;
  left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, left));
  let top = r.top - tip.offsetHeight - 10;
  if (top < 8) top = r.bottom + 10;
  tip.style.left = left + "px";
  tip.style.top = top + "px";
}
function hideSpellTip() { document.getElementById("spelltip").hidden = true; }

document.addEventListener("mouseover", (e) => { const b = e.target.closest(".slot[data-spell]"); if (b) showSpellTip(b); });
document.addEventListener("mouseout", (e) => { if (e.target.closest(".slot[data-spell]")) hideSpellTip(); });
document.addEventListener("click", (e) => {
  const b = e.target.closest(".slot[data-spell]");
  if (!b) return;
  showSpellTip(b);
  const cd = b.querySelector(".cd");            // play a cooldown sweep for fun
  cd.classList.remove("run"); void cd.offsetWidth; cd.classList.add("run");
});
window.addEventListener("scroll", hideSpellTip, { passive: true });

/* ---------- HUD bar at the bottom of the screen ---------- */
function drawHud(level) {
  const main = BARS[0];
  document.getElementById("hudbar").innerHTML =
    main.slots.map((slot) => iconHTML(spellIn(slot, level), slot[0], isNewIn(slot, level))).join("");
  const portrait = document.querySelector(".portrait span");
  if (portrait) portrait.textContent = level;
}

/* ---------- full Action bars tab ---------- */
function drawBars(level) {
  document.getElementById("barslevel").textContent = level;
  document.getElementById("bars").innerHTML = BARS.map((bar) => `
    <div class="barblock">
      <div class="barhead"><span>${bar.title}</span><small>${bar.how}</small></div>
      <div class="bar ${bar.id === "main" ? "main mb-frame" : "multi"}">
        ${bar.slots.map((slot) => iconHTML(spellIn(slot, level), slot[0], isNewIn(slot, level))).join("")}
      </div>
    </div>`).join("");

  // what changed at this level
  const changes = [];
  BARS.forEach((bar) => bar.slots.forEach((slot) => {
    slot[1].forEach(([from, id], n) => {
      if (from !== level) return;
      const where = whereText(findPlace(id, level));
      const replaced = n > 0 ? ` (replaces ${SPELLBOOK[slot[1][n - 1][1]].name})` : "";
      changes.push(`Put <b>${SPELLBOOK[id].name}</b> on ${where}${replaced}.`);
    });
  }));
  document.getElementById("barchanges").innerHTML = changes.length
    ? changes.map((c) => `<li>${c}</li>`).join("")
    : `<li class="none">Nothing new for your bars at level ${level}. ${level % 2 === 0 ? "Still visit the trainer for new ranks." : ""}</li>`;
}

function setupBarsTab() {
  const slider = document.getElementById("barslider");
  const update = () => drawBars(+slider.value);
  slider.addEventListener("input", update);
  document.getElementById("barsminus").addEventListener("click", () => { slider.value = Math.max(1, +slider.value - 1); update(); });
  document.getElementById("barsplus").addEventListener("click", () => { slider.value = Math.min(60, +slider.value + 1); update(); });
  update();
}

/* ---------- "Action bar" box on each quest step ---------- */
/* where a spell sits at a given level: { bar, slot, n, replaced } */
function findPlace(id, level) {
  for (const bar of BARS) {
    for (let n = 0; n < bar.slots.length; n++) {
      const slot = bar.slots[n];
      if (spellIn(slot, level) !== id) continue;
      const k = slot[1].findIndex(([, sp]) => sp === id);
      return { bar, slot, n, replaced: k > 0 ? slot[1][k - 1][1] : null };
    }
  }
  return null;
}
function whereText(p) {
  const key = p.slot[0];
  if (p.bar.id === "main") return `Key <kbd>${key}</kbd> <small>main bar</small>`;
  if (p.bar.id === "shift") return `<kbd>Shift</kbd> + <kbd>${key.slice(1)}</kbd> <small>bottom left bar</small>`;
  if (p.bar.id === "alt") return `<kbd>Alt</kbd> + <kbd>${key.slice(1)}</kbd> <small>bottom right bar</small>`;
  return `Right bar, button <b>${p.n + 1}</b> <small>counting from the top</small>`;
}
/* Upgrades that no step lists by hand (better water, food and gems) are shown
   on the first step whose level range reaches them. */
let AUTO = null;
function stepRange(s) {
  const m = String(s.lv).match(/\d+/g) || ["1"];
  return [+m[0], +m[m.length - 1]];
}
function autoUpgradesFor(i) {
  if (!AUTO) {
    AUTO = STEPS.map(() => []);
    const named = new Set();
    STEPS.forEach((s) => (s.learn || []).forEach((id) => named.add(id)));
    BARS.forEach((bar) => bar.slots.forEach((slot) => slot[1].forEach(([from, id]) => {
      if (named.has(id)) return;
      let at = STEPS.findIndex((s) => stepRange(s)[0] === from && /^Level \d+/.test(s.title));
      if (at < 0) at = STEPS.findIndex((s) => stepRange(s)[0] === from);
      if (at < 0) at = STEPS.findIndex((s) => { const [lo, hi] = stepRange(s); return lo <= from && from <= hi; });
      if (at < 0) at = STEPS.findIndex((s) => stepRange(s)[0] >= from);
      if (at < 0) at = STEPS.length - 1;
      AUTO[at].push(id);
    })));
  }
  return AUTO[i] || [];
}

function drawStepBars(i) {
  const box = document.getElementById("stepbars");
  if (!box || typeof STEPS === "undefined" || !STEPS[i]) return;
  const step = STEPS[i];
  const level = parseInt(step.lv, 10) || 1;
  const learn = (step.learn || []).concat(autoUpgradesFor(i));
  const isTraining = learn.length || /^Level \d+/.test(step.title);
  if (!isTraining) { box.hidden = true; box.innerHTML = ""; return; }

  const rows = learn.map((id) => {
    const p = findPlace(id, Math.max(level, SPELLBOOK[id].lv));
    if (!p) return "";
    const rep = p.replaced && p.replaced !== id ? `<em>replaces ${SPELLBOOK[p.replaced].name}</em>` : "";
    const lv = SPELLBOOK[id].lv;
    const when = lv > level ? `<i class="sb-lv">at level ${lv}</i>` : "";
    return `<li>${iconHTML(id, "", false)}<span class="sb-name">${SPELLBOOK[id].name}${when}</span><span class="sb-where">${whereText(p)}${rep}</span></li>`;
  }).join("");

  const notes = [];
  if (GUIDE_PAGE.itemNote && learn.some((id) => GUIDE_PAGE.itemNote.test.test(id))) notes.push(GUIDE_PAGE.itemNote.text);
  if (i === 0) notes.push(`First time? Turn on the extra bars first: <a href="#" data-goto="bars">Action Bars tab</a> → <i>How to set this up in game</i>.`);
  notes.push(learn.length
    ? `New ranks of ${GUIDE_PAGE.abilitiesWord || "spells"} you already have stay on the same key. If a button still shows the old rank, drag the new one from your spellbook (<kbd>P</kbd>) onto it.`
    : "Nothing new to place this time. New ranks stay on the same keys. If a button still shows the old rank, drag the new one from your spellbook (<kbd>P</kbd>) onto it.");

  const head = /^Level \d+/.test(step.title) || i === 0 ? "Action bar" : "Action bar · when you next visit the trainer";
  box.innerHTML = `<div class="sb-head">${head}</div>${rows ? `<ul>${rows}</ul>` : ""}${notes.map((n) => `<p class="sb-note">${n}</p>`).join("")}`;
  box.hidden = false;
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("#stepbars [data-goto]");
  if (!a) return;
  e.preventDefault();
  if (typeof showTab === "function") showTab(a.dataset.goto);
});

/* the step guide tells us the level of the current step */
window.syncBarsToStep = function (level, stepIndex) {
  drawHud(level);
  drawStepBars(stepIndex !== undefined ? stepIndex : (window.currentStepIndex ? window.currentStepIndex() : 0));
  const slider = document.getElementById("barslider");
  if (slider && !slider.dataset.touched) { slider.value = level; drawBars(level); }
};
document.getElementById("barslider").addEventListener("input", (e) => { e.target.dataset.touched = "1"; });

setupBarsTab();
window.syncBarsToStep(window.currentStepLevel ? window.currentStepLevel() : 1, window.currentStepIndex ? window.currentStepIndex() : 0);
