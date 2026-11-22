/* =========================================================
   Addons page engine: list, filters, folder scan, tabs.
   Shared by every character. Content comes from <character>/data/*.js
   ========================================================= */

/* =========================================================
   Folder scan: which addons are in Interface\AddOns.
   DIRS = the addon's folder names. A folder that starts with
   one of them plus _ or - (BigWigs_Core, DBM-GUI) belongs to it.
   "+Name" = an extra part: any folder starting with Name belongs
   to the addon but doesn't count as installed on its own.
   ========================================================= */

const ADDONS_PATH = "E:\\World of Warcraft\\_forever_\\Interface\\AddOns";

const DIRS = {
  "questie": ["Questie", "+QuestieTrace"],
  "tomtom": ["TomTom"],
  "leatrix-plus": ["Leatrix_Plus"],
  "whats-training": ["WhatsTraining"],
  "pawn": ["Pawn"],
  "leatrix-maps": ["Leatrix_Maps"],
  "auctionator": ["Auctionator"],
  "threatclassic2": ["ThreatClassic2"],
  "dungeonjournal": ["DungeonJournal"],
  "deadly-boss-mods": ["DBM-Core", "+DBM-"],
  "baganator": ["Baganator"],
  "details": ["Details"],
  "gtfo": ["GTFO"],
  "atlasloot-forever": ["AtlasLootClassic", "AtlasLoot", "+AtlasBIStooltips"],
  "decursive": ["Decursive"],
  "restedxp-guide": ["RXPGuides"],
  "rarescanner": ["RareScanner"],
  "openmap": ["OpenMap"],
  "handynotes": ["HandyNotes"],
  "spoken": ["Spoken"],
  "minimapbuttonbutton": ["MinimapButtonButton"],
  "bartender4": ["Bartender4"],
  "gathermate2": ["GatherMate2"],
  "foreverauras": ["ForeverAuras"],
  "tradeskill-master": ["TradeSkillMaster"],
  "nova-instance-tracker": ["NovaInstanceTracker"],
  "lfg-forever": ["LFGForever", "LFG_Forever"],
  "plater-nameplates": ["Plater"],
  "gearquest-forever": ["GearQuest", "GearQuestForever"],
  "talents-forever": ["TalentsForever"],
  "glowing-bars": ["GlowingBars"],
  "shortest-path-forever": ["ShortestPath", "ShortestPathForever"],
  "bugsack": ["BugSack"],
  "forever-quest-tint": ["ForeverQuestTint"],
  "forever-loot-sparkles": ["ForeverLootSparkles"],
  "skillup-forever": ["SkillUp", "SkillUpForever"],
  "blizzmove": ["BlizzMove"]
};

// helper addons that other addons use; they're expected, not "other folders"
const HELPERS = { QuestieDB: "questiedb", Syndicator: "syndicator",
  "!BugGrabber": "bug-grabber", BugGrabber: "bug-grabber", ForeverCore: "forevercore" };

const CHARS = (window.WF && WF.characters) || [];

// tiers that belong to a group (e.g. Dungeons) are drawn under that group's heading
const tierOf = (id) => TIERS.find((t) => t.id === id);
const GROUPS = [...new Set(TIERS.filter((t) => t.group).map((t) => t.group))];

// addons in the same pick group count as one: installing either one is enough
function units(tierIds) {
  const out = [], byPick = {};
  for (const a of ADDONS.filter((x) => tierIds.includes(x.tier))) {
    if (!a.pick) { out.push([a]); continue; }
    if (!byPick[a.pick]) out.push(byPick[a.pick] = []);
    byPick[a.pick].push(a);
  }
  return out;
}
const mustIds = (group) => TIERS.filter((t) => (t.group || "") === group && t.quality === "legendary").map((t) => t.id);
const missingUnits = (group) => units(mustIds(group)).filter((u) => !u.some((a) => got[a.slug]));

const SCAN_KEY = ADDONS_PAGE.scanKey;
let scan = null;      // { at, folders, found: {slug: true}, helpers: {slug: true}, extra: [{dir, title}] }
try {
  // a scan saved by the old per-character addons pages still counts
  for (const k of [SCAN_KEY, ...(ADDONS_PAGE.oldScanKeys || [])]) { scan = JSON.parse(localStorage.getItem(k)); if (scan) break; }
} catch (e) { scan = null; }
let got = (scan && scan.found) || {};
const hasPicker = "showDirectoryPicker" in window;

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const cleanTitle = (t) => String(t || "").replace(/\|T.*?\|t/g, "").replace(/\|c[0-9a-f]{8}/gi, "").replace(/\|r/g, "").trim();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// folders = [{ dir, title }] → which addons, helpers and unknown folders
function classify(folders) {
  const found = {}, helpers = {}, extra = [];
  for (const f of folders) {
    const low = f.dir.toLowerCase();
    let owner = null, main = false;
    for (const a of ADDONS) {
      for (const d of DIRS[a.slug] || []) {
        if (d[0] === "+") { if (low.startsWith(d.slice(1).toLowerCase())) owner = owner || a; continue; }
        const dl = d.toLowerCase();
        if (low === dl) { owner = a; main = true; }
        else if (low.startsWith(dl + "_") || low.startsWith(dl + "-")) owner = owner || a;
      }
      if (main) break;
    }
    if (!owner) {   // unknown folder name: try the addon's name against the folder and its .toc title
      const t = norm(cleanTitle(f.title)), n = norm(f.dir);
      owner = ADDONS.find((a) => [a.name, a.name.replace(/\s*\(.*?\)/g, "")].some((x) => norm(x) === t || norm(x) === n)) || null;
      main = !!owner;
    }
    if (owner) { if (main) found[owner.slug] = true; continue; }
    const h = Object.keys(HELPERS).find((k) => low === k.toLowerCase() || low.startsWith(k.toLowerCase() + "_"));
    if (h) { helpers[HELPERS[h]] = true; continue; }
    if (!low.startsWith("blizzard_")) extra.push({ dir: f.dir, title: cleanTitle(f.title) });
  }
  return { found, helpers, extra };
}

// pick the .toc WoW Forever would load: Name_Forever.toc, else Name.toc, else any
function pickToc(dir, names) {
  const l = names.map((n) => n.toLowerCase()), d = dir.toLowerCase();
  const i = [`${d}_forever.toc`, `${d}-forever.toc`, `${d}.toc`].map((n) => l.indexOf(n)).find((x) => x >= 0);
  return i !== undefined ? i : 0;
}
const tocTitle = (text) => ((text.match(/^##\s*Title:\s*(.+)$/m) || [])[1] || "").trim();

/* ----- remembering the picked folder (Chrome / Edge) ----- */

function idb(mode, fn) {
  return new Promise((res, rej) => {
    const r = indexedDB.open(ADDONS_PAGE.dbName, 1);
    r.onupgradeneeded = () => r.result.createObjectStore("h");
    r.onerror = () => rej(r.error);
    r.onsuccess = () => {
      const tx = r.result.transaction("h", mode);
      const q = fn(tx.objectStore("h"));
      tx.oncomplete = () => res(q.result);
      tx.onerror = () => rej(tx.error);
    };
  });
}
const loadHandle = () => idb("readonly", (s) => s.get("addons")).catch(() => null);
const saveHandle = (h) => idb("readwrite", (s) => s.put(h, "addons")).catch(() => {});

// accept the AddOns folder itself, or the game folder / Interface folder above it
async function findAddOns(h) {
  if (h.name.toLowerCase() === "addons") return h;
  for (const path of [["AddOns"], ["Interface", "AddOns"], ["_forever_", "Interface", "AddOns"]]) {
    try {
      let d = h;
      for (const p of path) d = await d.getDirectoryHandle(p);
      return d;
    } catch (e) {}
  }
  return null;
}

async function readFolder(dir) {
  const subs = [];
  for await (const [name, e] of dir.entries()) if (e.kind === "directory") subs.push([name, e]);
  return Promise.all(subs.map(async ([name, e]) => {
    const tocs = [];
    for await (const [n, f] of e.entries()) if (f.kind === "file" && /\.toc$/i.test(n)) tocs.push([n, f]);
    let title = "";
    if (tocs.length) {
      try { title = tocTitle(await (await tocs[pickToc(name, tocs.map((t) => t[0]))][1].getFile()).text()); } catch (err) {}
    }
    return { dir: name, title };
  }));
}

async function scanWithPicker(pickNew) {
  let h = pickNew ? null : await loadHandle();
  if (h) {
    let p = await h.queryPermission({ mode: "read" });
    if (p !== "granted") p = await h.requestPermission({ mode: "read" });
    if (p !== "granted") h = null;
  }
  if (!h) {
    try { h = await window.showDirectoryPicker({ id: "wow-addons", mode: "read" }); }
    catch (e) { if (e.name === "AbortError") return null; throw e; }
    const d = await findAddOns(h);
    if (!d) throw new Error(`"${h.name}" isn't the AddOns folder. Pick the folder called AddOns inside Interface.`);
    h = d;
    saveHandle(h);
  }
  return readFolder(h);
}

// browsers without the folder picker: a folder <input> hands us every file in it
async function scanFromFiles(files) {
  if (!files.length) return null;
  const first = files[0].webkitRelativePath.split("/");
  const at = first.findIndex((p) => p.toLowerCase() === "addons");
  const depth = at >= 0 ? at + 1 : 1;      // where the addon folders sit in the path
  const map = new Map();
  for (const f of files) {
    const parts = f.webkitRelativePath.split("/");
    if (at >= 0 && (parts[at] || "").toLowerCase() !== "addons") continue;
    const dir = parts[depth];
    if (!dir || parts.length < depth + 2) continue;
    if (!map.has(dir)) map.set(dir, []);
    if (parts.length === depth + 2 && /\.toc$/i.test(parts[depth + 1])) map.get(dir).push(f);
  }
  return Promise.all(Array.from(map, async ([dir, tocs]) => {
    let title = "";
    if (tocs.length) { try { title = tocTitle(await tocs[pickToc(dir, tocs.map((t) => t.name))].text()); } catch (e) {} }
    return { dir, title };
  }));
}

function applyScan(folders) {
  const r = classify(folders);
  scan = { at: Date.now(), folders: folders.length, ...r };
  got = scan.found;
  try { localStorage.setItem(SCAN_KEY, JSON.stringify(scan)); } catch (e) {}
  draw();
  drawScan();
}

async function runScan(pickNew) {
  const btn = $("#scanbtn");
  if (!hasPicker) { $("#scanpick").click(); return; }
  btn.disabled = true;
  btn.textContent = "Scanning…";
  try {
    const folders = await scanWithPicker(pickNew);
    if (folders) applyScan(folders);
  } catch (e) {
    drawScan(e.message || String(e));
  } finally {
    btn.disabled = false;
    btn.textContent = "Scan my AddOns folder";
  }
}

/* ----- what the scan found ----- */

function status(a) {
  if (!scan) return "";
  return got[a.slug] ? `<span class="got yes">✓ Installed</span>` : `<span class="got no">Not installed</span>`;
}

function missingHelpers(a) {
  if (!scan || !got[a.slug]) return [];
  return [...(a.needs || []), ...(a.plugins || [])].filter(([s]) => Object.values(HELPERS).includes(s) && !scan.helpers[s]);
}

function scanWarn(a) {
  if (!scan || !got[a.slug]) return "";
  return missingHelpers(a).map(([, n]) => `<p class="awarn">${n} isn't in your AddOns folder. Install it too.</p>`).join("");
}

function drawScan(error) {
  const el = $("#scaninfo");
  const where = `<code class="path">${esc(ADDONS_PATH)}</code>`;
  let html;
  if (!scan) {
    html = `<p>Press <b>Scan</b> and pick your AddOns folder: ${where}.</p>
      <p>${hasPicker ? "You only pick it once. After that, one click checks it again." : "Your browser will ask to <b>upload</b> the folder. Nothing is sent anywhere; the page only reads the folder names."} Nothing leaves your computer.</p>`;
  } else {
    const list = ADDONS;
    const have = list.filter((a) => got[a.slug]).length;
    const when = new Date(scan.at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    const notes = [];
    const uname = (u) => u.map((a) => a.name).join(" or ");
    for (const g of ["", ...GROUPS]) {
      const label = g ? `${g.toLowerCase().replace(/s$/, "")} must-haves` : "must-haves";
      const miss = missingUnits(g);
      if (miss.length) notes.push(`<li class="warn">Still missing ${label}: <b>${miss.map(uname).join(", ")}</b></li>`);
      else notes.push(`<li class="ok">All ${label} installed.</li>`);
    }
    for (const a of ADDONS) for (const [, n] of missingHelpers(a)) notes.push(`<li class="warn">${a.name} needs <b>${n.replace(/\s*\(.*\)/, "")}</b>, which isn't in the folder.</li>`);
    const groups = {};
    for (const a of ADDONS) if (a.pick && got[a.slug]) (groups[a.pick] = groups[a.pick] || []).push(a.name);
    for (const names of Object.values(groups)) if (names.length > 1) notes.push(`<li class="warn">You have both <b>${names.join("</b> and <b>")}</b>. They do the same job, so keep one.</li>`);
    if (scan.extra.length) notes.push(`<li>Not on this list: ${scan.extra.map((x) => `<b>${esc(x.title && norm(x.title) !== norm(x.dir) ? `${x.title} (${x.dir})` : x.dir)}</b>`).join(", ")}</li>`);
    html = `<p>Last scan: <b>${when}</b>. <b>${have} of ${list.length}</b> addons from this list are installed (${scan.folders} folders in AddOns).</p>
      <ul>${notes.join("")}</ul>
      ${hasPicker ? `<p style="margin-top:6px"><button type="button" class="linkish" id="scanother">Pick a different folder</button></p>` : ""}`;
  }
  if (error) html = `<p class="warn">${esc(error)}</p>` + html;
  el.innerHTML = html;
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
let filter = "all";

// one line per class that has a tip, in that class's color
function tips(a) {
  if (!a.tips) return "";
  return CHARS.filter((c) => a.tips[c.cls])
    .filter((c, i, all) => all.findIndex((x) => x.cls === c.cls) === i)
    .map((c) => `<p class="atip" style="--c:${c.color}"><b>${c.cls}:</b> ${a.tips[c.cls]}</p>`).join("");
}

function card(a) {
  const q = tierOf(a.tier).quality;
  const icon = a.icon
    ? `<img src="${ICON(a.icon.replace("/256/256/", "/64/64/"))}" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode('⚙'))">`
    : "⚙";
  const link = ([s, n]) => `<a href="${CF}${s}" target="_blank" rel="noopener">${n}</a>`;
  // needs = required by the addon (the CurseForge app adds them); plugins = separate add-ons you install yourself
  const needs = (a.needs
    ? `<p class="aneeds">Also install: ${a.needs.map(link).join(", ")}. It won't work without it. The CurseForge app adds it by itself.</p>`
    : "") + (a.plugins
    ? `<p class="aneeds">Also install: ${a.plugins.map(link).join(", ")}. These hold the actual fights, so install them yourself.</p>`
    : "");
  return `<article class="addon ${q}${got[a.slug] ? " done" : ""}" data-slug="${a.slug}">
    <div class="aicon">${icon}</div>
    <div>
      <div class="ahead"><b class="aname">${a.name}</b><span class="atag">${a.tag} · ${a.dl} downloads</span>${a.pick ? `<span class="apick">${a.pick}</span>` : ""}${a.only ? `<span class="apick">${a.only.join(", ")} only</span>` : ""}</div>
      <p class="awhat">${a.what}</p>
      <p class="awhy">${a.why}</p>
      ${tips(a)}
      ${needs}
      ${a.warn ? `<p class="awarn">${a.warn}</p>` : ""}
      ${scanWarn(a)}
      <div class="aactions">
        <a class="wowbtn small" href="${CF}${a.slug}" target="_blank" rel="noopener">CurseForge ›</a>
        ${status(a)}
      </div>
    </div>
  </article>`;
}

// a tier shows for "all", for its own id, or for its group's name
const shown = (t) => filter === "all" || filter === t.id || filter === t.group;
const countIn = (ids) => ADDONS.filter((a) => ids.includes(a.tier)).length;

function draw() {
  let last = "";
  $("#tiers").innerHTML = TIERS.map((t) => {
    const list = ADDONS.filter((a) => a.tier === t.id);
    let head = "";
    if (t.group && t.group !== last) {
      head = `<div class="tgroup" data-group="${t.group}"${shown(t) ? "" : " hidden"}>
        <h2>${t.group}</h2>${t.groupNote ? `<p>${t.groupNote}</p>` : ""}</div>`;
    }
    last = t.group || "";
    return head + `<section class="tier" data-tier="${t.id}"${shown(t) ? "" : " hidden"}>
      <h3 style="color: var(--q-${t.quality})">${t.title} <small>${list.length} addon${list.length === 1 ? "" : "s"}</small></h3>
      <p class="tier-note">${t.note}</p>
      <div class="addons">${list.map(card).join("")}</div>
    </section>`;
  }).join("");
  drawFilters();
}

function drawFilters() {
  const btn = (f, label, n) => `<button type="button" data-f="${f}" class="${filter === f ? "on" : ""}">${label}<small>${n}</small></button>`;
  const progress = ["", ...GROUPS].map((g) => {
    const all = units(mustIds(g));
    const done = scan ? all.length - missingUnits(g).length : "?";
    return `${g || "Must-haves"}: <b>${done} / ${all.length}</b>`;
  }).join(" · ");
  $("#filters").innerHTML =
    `<button type="button" data-f="all" class="${filter === "all" ? "on" : ""}">All</button>` +
    TIERS.filter((t) => !t.group).map((t) => btn(t.id, t.title, countIn([t.id]))).join("") +
    GROUPS.map((g) => btn(g, g, countIn(TIERS.filter((t) => t.group === g).map((t) => t.id)))).join("") +
    `<span class="progress">${progress}</span>`;
}

$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-f]");
  if (!b) return;
  filter = b.dataset.f;
  $$(".tier").forEach((s) => { s.hidden = !shown(tierOf(s.dataset.tier)); });
  $$(".tgroup").forEach((s) => { s.hidden = filter !== "all" && filter !== s.dataset.group; });
  drawFilters();
});

$("#scanbtn").addEventListener("click", () => runScan(false));
$("#scaninfo").addEventListener("click", (e) => { if (e.target.closest("#scanother")) runScan(true); });
$("#scanpick").addEventListener("change", async (e) => {
  const folders = await scanFromFiles(Array.from(e.target.files || []));
  e.target.value = "";
  if (folders) applyScan(folders);
});

/* ---------- tabs (#install opens the install tab) ---------- */

function showTab(name) {
  if (!$(`#panel-${name}`)) name = "list";
  $$(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === name));
  $$(".panel").forEach((p) => p.classList.toggle("on", p.id === `panel-${name}`));
  window.scrollTo({ top: 0 });
  document.dispatchEvent(new CustomEvent("wf:tab", { detail: { name } }));
}
$$(".tabs button").forEach((b) => b.addEventListener("click", () => {
  showTab(b.dataset.tab);
  history.replaceState(null, "", b.dataset.tab === "list" ? location.pathname : `#${b.dataset.tab}`);
}));
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-tab-link]");
  if (!a) return;
  e.preventDefault();
  showTab(a.dataset.tabLink);
  history.replaceState(null, "", `#${a.dataset.tabLink}`);
});
window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));

WF.backLink();
draw();
drawScan();
if (location.hash) showTab(location.hash.slice(1));
