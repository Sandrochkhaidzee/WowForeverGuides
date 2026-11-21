/* =========================================================
   Professions page engine: step cards, progress, tabs.
   Shared by every character. Content comes from <character>/data/*.js
   ========================================================= */

const KEY = PROF_PAGE.saveKey;
function loadDone() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}
function saveDone(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
}
let done = loadDone();

function esc(s) { return String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }

const TAGS = {
  vendor: '<span class="tag vendor">buy pattern</span>',
  known: '<span class="tag known">known</span>',
  alliance: '<span class="tag alliance">Alliance</span>',
  horde: '<span class="tag horde">Horde</span>',
  alt: '<span class="tag alt">other option</span>'
};

/* ---------- turning the route data into plain instructions ---------- */

const NAME = { tailoring: "Tailoring", enchanting: "Enchanting", leatherworking: "Leatherworking", skinning: "Skinning" };
const RANK = { 75: ["Journeyman", 10], 150: ["Expert", 20], 225: ["Artisan", 35] };

// where a beginner gets each material
function source(m) {
  if (/^Bolt of/.test(m)) return "you make these yourself in an earlier step";
  if (/^Cured /.test(m)) return "you make these yourself: it's a recipe from your trainer";
  if (/^Fine Leather Belt/.test(m)) return "you made these in an earlier step";
  if (/Refined Deeprock Salt/.test(m)) return "auction house";
  if (/Cloth$|^Runecloth$/.test(m)) return "drops from humanoid enemies, or the auction house";
  if (/Thread|Dye|Salt|Bleach|Simple Wood|Crystal Vial|Mote of Magic/.test(m)) return "buy from a Trade Supplies vendor in any city";
  if (/Leather|Hide|Scale|Scraps/.test(m)) return "from Skinning, or the auction house";
  if (/^Elemental|Essence of|Living Essence/.test(m)) return "auction house (drops from elementals)";
  if (/Dust|Essence|Shard/.test(m)) return "from disenchanting green items, or the auction house";
  if (/Silk/.test(m)) return "drops from spiders, or the auction house";
  if (/Rod$/.test(m)) return "made by Blacksmiths: the auction house, or ask one";
  if (/Elixir/.test(m)) return "made by Alchemists: the auction house";
  if (/Lotus/.test(m)) return "from Herbalism, or the auction house";
  return "auction house";
}

// "3 Bolt of Linen, 1 Coarse Thread" for 33 crafts -> list of totals with where to get them
function needList(e, n) {
  return '<ul class="need">' + e.split(", ").map(part => {
    let m = part.match(/^(\d+) each (.+)$/);
    if (m) return "<li><b>" + (m[1] * n) + " each of " + esc(m[2]) + "</b> <span>(" + source("Elemental") + ")</span></li>";
    m = part.match(/^(\d+) (.+)$/);
    if (!m) return "<li><b>" + esc(part) + "</b></li>";
    return "<li><b>" + (m[1] * n) + " " + esc(m[2]) + "</b> <span>(" + source(m[2]) + ")</span></li>";
  }).join("") + "</ul>";
}

function skillEnd(r) { return parseInt(String(r.s).split("–")[1], 10); }

// build the card for one step: { meta, title, todo[], tip }
function card(prof, i) {
  const P = PROFS[prof], r = P.steps[i], name = NAME[prof];

  if (r.m) {
    const mm = r.m.match(/stopped at (\d+)/);
    if (mm) {
      const [rank, lv] = RANK[mm[1]];
      return {
        meta: "Trainer visit", title: "Learn " + rank + " " + name,
        todo: [
          "Your skill stops at <b>" + mm[1] + "</b>. That's the ceiling for your current rank.",
          "Go to " + (/^[AEIOU]/.test(name) ? "an " : "a ") + name + " trainer in a big city. Ask a guard if you can't find one.",
          "Learn <b>" + rank + " " + name + "</b>. You must be <b>level " + lv + "</b> or higher. If you're not, keep questing and come back.",
          "Press <b>Done, next</b>."
        ],
        tip: "Now your skill can go up to " + (+mm[1] + 75) + "."
      };
    }
    return {
      meta: "Getting started", title: "Learn " + name,
      todo: [
        "Go to a big city (" + PROF_PAGE.city + "). Ask any guard to show you the <b>" + name + " trainer</b>.",
        "Talk to the trainer and learn <b>" + name + "</b>.",
        prof === "skinning"
          ? "Buy a <b>Skinning Knife</b> from a General Goods or Leatherworking Supplies vendor. Keep it in your bags."
          : "Open your spellbook (<kbd>P</kbd>) and drag the " + name + " icon to your action bar, so it's easy to open.",
        "Press <b>Done, next</b> to see your first job."
      ],
      tip: "Each card tells you exactly what to make and how many. Do what it says, then press Done, next."
    };
  }

  const tag = r.t === "horde" ? '<span class="badge horde">Horde only</span>'
    : r.t === "alliance" ? '<span class="badge alliance">Alliance only</span>'
    : r.t === "alt" ? '<span class="badge alt">other option</span>'
    : r.t === "vendor" ? '<span class="badge vendor">recipe from a vendor</span>' : "";
  const meta = "Skill " + esc(r.s) + tag;

  if (prof === "skinning") {
    const todo = [];
    if (r.t === "horde") todo.push("<b>Horde players only.</b> If you're Alliance, skip this: press <b>Done, next</b>.");
    if (r.t === "alliance") todo.push("<b>Alliance players only.</b> If you're Horde, skip this: press <b>Done, next</b>.");
    if (r.t === "alt") todo.push("This is <b>another place</b> for about the same skill range as the step before. You only need one. If you already did that one, press <b>Done, next</b>.");
    todo.push("Go to <b>" + esc(r.c) + "</b>" + (r.w ? ": " + esc(r.w) : "") + ".");
    todo.push("Kill <b>" + esc(r.e) + "</b>. They're level " + esc(r.n) + ".");
    todo.push("After you loot a dead beast, <b>right-click it again</b> to skin it. You need a Skinning Knife in your bags.");
    todo.push("Keep going until your skill shows <b>" + skillEnd(r) + "</b>, then press <b>Done, next</b>.");
    return { meta, title: "Skin beasts in " + esc(r.c), todo, tip: r.note ? esc(r.note) : "" };
  }

  if (/^Disenchant/.test(r.c)) {
    return {
      meta, title: "Disenchant green items",
      todo: [
        "Collect <b>green</b> (or blue) items. They drop from enemies, and you can make them with Tailoring.",
        "Open your spellbook (<kbd>P</kbd>) and click <b>Disenchant</b>. Then click a green item in your bags. It turns into enchanting materials.",
        "Keep the dust and essences. Later steps use them.",
        "Keep going until your skill shows <b>" + skillEnd(r) + "</b>, then press <b>Done, next</b>."
      ],
      tip: r.note ? esc(r.note) : ""
    };
  }

  // a normal crafting step
  const firstTime = P.steps.findIndex(x => x.c === r.c) === i;
  const todo = [];
  if (r.t === "vendor" && firstTime) {
    todo.push("First buy the recipe from <b>" + esc(r.w) + "</b>. Right-click it in your bags to learn it.");
  } else if (r.t !== "known" && firstTime) {
    todo.push("Learn the recipe <b>" + esc(r.c) + "</b> from your " + name + " trainer.");
  }
  todo.push("Get these materials:" + needList(r.e, r.n));
  todo.push("Open " + name + " (press <kbd>P</kbd>, then click the " + name + " icon). Click <b>" + esc(r.c) + "</b> and press <b>Create</b>.");
  todo.push("Keep making them until your skill shows <b>" + skillEnd(r) + "</b> (about " + r.n + (r.n === 1 ? " craft" : " crafts") + "). Then press <b>Done, next</b>.");
  return { meta, title: "Make " + r.n + " × " + esc(r.c), todo, tip: r.note ? esc(r.note) : "" };
}

/* ---------- one profession tab ---------- */

const cur = {};
function curKey(p) { return KEY + ".cur." + p; }
function firstOpen(p) {
  const i = PROFS[p].steps.findIndex((r, k) => !done[p + ":" + k]);
  return i < 0 ? PROFS[p].steps.length - 1 : i;
}
function loadCur(p) {
  let v = NaN;
  try { v = parseInt(localStorage.getItem(curKey(p)), 10); } catch (e) {}
  cur[p] = isNaN(v) || v < 0 || v >= PROFS[p].steps.length ? firstOpen(p) : v;
}
function setCur(p, i) {
  cur[p] = i;
  try { localStorage.setItem(curKey(p), i); } catch (e) {}
}

function build(prof) {
  const P = PROFS[prof];
  const sec = document.getElementById("panel-" + prof);
  sec.innerHTML =
    '<div class="frame"><div class="frame-title">' + esc(P.title) + '</div><div class="frame-body">' +
      '<p class="lead">' + esc(P.intro) + '</p>' +
      '<p class="hint">Follow one card at a time. Do what it says, then press <b>Done, next</b>. The page remembers where you are.</p>' +
      '<div class="progress"><div class="xp"><i id="bar-' + prof + '"></i><span id="txt-' + prof + '"></span></div></div>' +
      '<div class="nav"><button class="wowbtn" data-back>‹ Back</button><button class="wowbtn" data-next>Done, next ›</button></div>' +
      '<article class="questpaper" id="card-' + prof + '"></article>' +
      '<details><summary>All steps (click one to jump to it)</summary><ol class="steplist" id="list-' + prof + '"></ol>' +
        '<p class="hint" style="text-align:right;margin-top:8px"><button class="wowbtn small" data-reset>Start over</button></p></details>' +
      (P.mats
        ? '<h3>Everything you\'ll need</h3><p class="hint">For the whole route from 1 to 300. ' + esc(P.matsIntro) + '</p><div class="mats">' +
          P.mats.map(([name, n]) => "<div><span>" + esc(name) + "</span><b>" + n + "</b></div>").join("") + "</div>"
        : "") +
      (P.tips || "") +
    "</div></div>";

  sec.querySelector("[data-back]").addEventListener("click", () => {
    if (cur[prof] > 0) { setCur(prof, cur[prof] - 1); render(prof, "back"); }
  });
  sec.querySelector("[data-next]").addEventListener("click", () => {
    done[prof + ":" + cur[prof]] = 1;
    saveDone(done);
    if (cur[prof] < P.steps.length - 1) setCur(prof, cur[prof] + 1);
    render(prof, "next");
    const count = P.steps.filter((r, k) => done[prof + ":" + k]).length;
    document.dispatchEvent(new CustomEvent("wf:progress", { detail: {
      prof, name: P.title || prof, count, total: P.steps.length, finished: count === P.steps.length,
      source: sec.querySelector("[data-next]"),
    } }));
  });
  sec.querySelector("[data-reset]").addEventListener("click", () => {
    Object.keys(done).forEach(k => { if (k.startsWith(prof + ":")) delete done[k]; });
    saveDone(done);
    setCur(prof, 0);
    render(prof, "back");
  });

  loadCur(prof);
  render(prof);
}

function render(prof, dir) {
  const P = PROFS[prof], i = cur[prof], c = card(prof, i);
  const paper = document.getElementById("card-" + prof);
  const allDone = P.steps.every((r, k) => done[prof + ":" + k]);
  paper.innerHTML =
    '<p class="meta">Step ' + (i + 1) + " of " + P.steps.length + "<span>·</span>" + c.meta + "</p>" +
    "<h2>" + c.title + "</h2>" +
    '<ol class="todo">' + c.todo.map(t => "<li>" + t + "</li>").join("") + "</ol>" +
    '<p class="tip">' + (allDone && i === P.steps.length - 1 ? "<b>You reached 300. Well done!</b>" : c.tip) + "</p>";
  if (dir) {
    paper.classList.remove("slide-next", "slide-back");
    void paper.offsetWidth;
    paper.classList.add("slide-" + dir);
  }
  const sec = document.getElementById("panel-" + prof);
  sec.querySelector("[data-back]").disabled = i === 0;
  sec.querySelector("[data-next]").textContent = i === P.steps.length - 1 ? "Done ✓" : "Done, next ›";

  const list = document.getElementById("list-" + prof);
  list.innerHTML = P.steps.map((r, k) => {
    const t = card(prof, k).title;
    const cls = [done[prof + ":" + k] ? "done" : "", k === i ? "current" : ""].join(" ");
    return '<li class="' + cls + '"><button type="button" data-jump="' + k + '"><span class="n"><span>' + (k + 1) + '</span></span><span class="t">' + t + '</span><span class="l">' + (r.s ? "Skill " + esc(r.s) : "Trainer") + "</span></button></li>";
  }).join("");
  list.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => {
    setCur(prof, +b.dataset.jump);
    render(prof, "next");
    paper.scrollIntoView({ behavior: "smooth", block: "center" });
  }));

  progress(prof);
}

function progress(prof) {
  const steps = PROFS[prof].steps;
  const count = steps.filter((r, k) => done[prof + ":" + k]).length;
  let top = 1;
  steps.forEach((r, k) => {
    if (r.s && done[prof + ":" + k]) top = Math.max(top, skillEnd(r));
  });
  document.getElementById("bar-" + prof).style.width = (top / 300 * 100) + "%";
  document.getElementById("txt-" + prof).textContent = "Skill " + top + " / 300 · step " + (cur[prof] + 1) + " of " + steps.length;
}

/* ---------- tabs ---------- */
const tabs = document.querySelectorAll(".tabs button");
function showTab(name) {
  tabs.forEach(t => { const on = t.dataset.tab === name; t.classList.toggle("on", on); t.setAttribute("aria-selected", on); });
  document.querySelectorAll("main > .panel").forEach(s => s.classList.toggle("on", s.id === "panel-" + name));
  try { localStorage.setItem(KEY + ".tab", name); } catch (e) {}
  document.dispatchEvent(new CustomEvent("wf:tab", { detail: { name } }));
}
tabs.forEach(t => t.addEventListener("click", () => { showTab(t.dataset.tab); window.scrollTo(0, 0); }));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => { showTab(b.dataset.go); window.scrollTo(0, 0); }));

Object.keys(PROFS).forEach(build);
let startTab = "overview";
try { startTab = localStorage.getItem(KEY + ".tab") || "overview"; } catch (e) {}
showTab(document.getElementById("panel-" + startTab) ? startTab : "overview");
