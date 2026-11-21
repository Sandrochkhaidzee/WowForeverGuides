/* =========================================================
   Character registry — the one list every page reads.

   The landing page builds its cards from it, the "switch
   character" menu on every guide uses it, and the progress
   shown on the landing page comes from each entry's save key.

   Adding a character (see docs/ADDING-A-CHARACTER.md):
     1. Copy a character folder, rename the pages, edit its data/*.js.
     2. Add one entry below. That's it — every menu picks it up.
   ========================================================= */

window.WF = window.WF || {};

WF.characters = [
  {
    id: "gnome-mage",
    name: "Gnome Mage",
    cls: "Mage",
    race: "Gnome",
    faction: "Alliance",
    color: "#69ccf0",
    glow: "rgba(105, 204, 240, .22)",
    orb: "radial-gradient(circle at 40% 35%, #6aa6d8, #234a7a 60%, #0d1b33)",
    icon: "classicon_mage",
    folder: "Mage Gnome",
    style: "ranged",            // ranged | melee — used by the "which class?" helper
    difficulty: 1,              // 1 easy · 2 medium · 3 harder (for beginners)
    role: "Ranged caster",
    blurb: "Freeze enemies, blast them from afar, and conjure your own food and water.",
    perks: ["Fights from far away", "Makes free food & water", "Can teleport to cities"],
    pages: { guide: "Gnome-Mage-WoW-Guide.html" },
    saveKeys: { guide: "gnomeMageBeginner.v1" },
  },
  {
    id: "nightelf-rogue",
    name: "Night Elf Rogue",
    cls: "Rogue",
    race: "Night Elf",
    faction: "Alliance",
    color: "#fff569",
    glow: "rgba(255, 245, 105, .18)",
    orb: "radial-gradient(circle at 40% 35%, #7a6a8a, #2f2440 60%, #120c1a)",
    icon: "classicon_rogue",
    folder: "Rogue Night Elf",
    style: "melee",
    difficulty: 2,
    role: "Melee assassin",
    blurb: "Sneak in stealth, open with a big hit, and finish with combo points.",
    perks: ["Sneaks past enemies", "Never needs to drink", "Hits hard up close"],
    pages: { guide: "NightElf-Rogue-WoW-Guide.html" },
    saveKeys: { guide: "nelfRogueBeginner.v1" },
  },
];

/* Game icons are stored with the site in assets/icons/<name>.jpg, copied from the
   game's own files by tools/extract-icons.py. An icon that isn't there yet is
   loaded from Wowhead instead, and hidden if that fails too. */
WF.ICON_URL = document.currentScript ? new URL("../icons/", document.currentScript.src).href : "assets/icons/";
WF.ICON_CDN = "https://wow.zamimg.com/images/wow/icons/large/";
WF.iconErr = (img) => {
  if (img.dataset.cdn) { img.remove(); return; }
  img.dataset.cdn = "1";
  img.src = WF.ICON_CDN + img.src.split("/").pop();
};
/* <img> for a game icon by name, e.g. WF.icon("inv_misc_note_01", "gi") */
WF.icon = (name, cls) => `<img${cls ? ` class="${cls}"` : ""} src="${WF.ICON_URL}${name}.jpg" alt="" draggable="false" onerror="WF.iconErr(this)">`;

/* Page link for a character, relative to the site root. Professions and Addons are
   one page each for everyone, in the site root; ?c= says whose guide linked there. */
WF.SHARED = { professions: "professions.html", addons: "addons.html" };
WF.href = (c, page) => WF.SHARED[page]
  ? `${WF.SHARED[page]}?c=${encodeURIComponent(c.id)}`
  : encodeURI(`${c.folder}/${c.pages[page || "guide"]}`);
WF.byId = (id) => WF.characters.find((c) => c.id === id);

/* Shared pages (addons.html, professions.html) serve every character. The ?c=<id> in
   the link says whose guide the visitor came from: it becomes the page's character, so
   the Switch menu, the class glow and the "‹ Guide" tab point back there. */
(() => {
  const b = document.body;
  if (!b || b.dataset.character) return;
  const id = new URLSearchParams(location.search).get("c");
  if (id && WF.byId(id)) b.dataset.character = id;
})();

/* On a shared page: the tab with id="backlink" goes back to that character's guide,
   or to the landing page when the visitor didn't come from one. Links marked
   data-carry (to the other shared page) keep the ?c=. Shared pages sit in the site root. */
WF.backLink = () => {
  const c = WF.byId(document.body.dataset.character);
  const a = document.getElementById("backlink");
  if (a) {
    a.href = c ? WF.href(c, "guide") : "index.html";
    a.textContent = c ? `‹ ${c.cls} Guide` : "‹ All guides";
  }
  if (c) document.querySelectorAll("a[data-carry]").forEach((l) => { l.href = l.getAttribute("href") + "?c=" + encodeURIComponent(c.id); });
};

/* Did this visitor use this character's pages before? Checked here, before the
   page engines run, because the guide engine saves its state as soon as it starts. */
WF.returning = (() => {
  try {
    const c = WF.byId(document.body && document.body.dataset.character);
    return !!c && Object.values(c.saveKeys).some((k) => localStorage.getItem(k) !== null);
  } catch (e) { return false; }
})();
