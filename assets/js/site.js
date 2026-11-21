/* =========================================================
   site.js — the shared layer on top of every page.

   Loaded last on every page. It never changes what a guide
   says; it adds comfort and polish around it:

     · comfort settings (bigger text, high contrast, easy font, less motion)
     · Help window per page: how it works, keys, "I'm stuck" answers
     · first-visit welcome + a short guided tour
     · "switch character" menu built from assets/js/characters.js
     · celebrations: step complete, level up, profession done
     · scroll reveal, drifting embers, ripples, page fades, card tilt
     · progress summary the landing page uses for "Continue"

   Engines talk to it with DOM events:
     wf:step      { index, prev, total, level, prevLevel, title, place, direction }
     wf:tab       { name }
     wf:progress  { prof, name, count, total, finished, source }
   Everything is also on window.WF for new pages to reuse.
   ========================================================= */

(function () {
  "use strict";

  const WF = (window.WF = window.WF || {});
  const doc = document;
  const html = doc.documentElement;
  const body = doc.body;
  const PAGE = body.dataset.page || "home";
  const CHAR = body.dataset.character || null;
  const ME = WF.byId ? WF.byId(CHAR) : null;
  const SCRIPT = doc.currentScript && doc.currentScript.src;
  const ROOT = SCRIPT ? new URL("../../", SCRIPT).href : "./";

  /* ---------- small helpers ---------- */

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const $ = (s, r) => (r || doc).querySelector(s);
  const $$ = (s, r) => Array.from((r || doc).querySelectorAll(s));
  function make(tag, cls, inner) {
    const n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (inner !== undefined) n.innerHTML = inner;
    return n;
  }
  const rand = (a, b) => a + Math.random() * (b - a);
  const isTyping = (e) => e.target instanceof Element && e.target.matches("input, textarea, select, [contenteditable]");
  const pageHref = (c, p) => ROOT + WF.href(c, p);

  WF.store = store;
  WF.root = ROOT;

  /* ---------- tidy up saved data left by older versions of the site ----------
     Keys nothing reads any more are removed. Keys the shared pages still carry over
     (old professions ticks, old addon scans) are only removed once their new key exists. */
  (function cleanOldKeys() {
    try {
      const ls = localStorage;
      const has = (k) => ls.getItem(k) !== null;
      const drop = (k) => ls.removeItem(k);
      ["gnomeMageAddons.v1", "nelfRogueAddons.v1", "gnomeMageForever.v1", "nelfRogueForever.v1"].forEach(drop);
      if (has("wfAddons.scan.v1")) ["gnomeMageAddons.scan.v1", "nelfRogueAddons.scan.v1"].forEach(drop);
      if (has("wfProfessions.v1")) {
        const olds = ["mageProfessions.v1", "nelfRogueProfessions.v1"];
        Object.keys(ls).filter((k) => olds.some((o) => k === o || k.startsWith(o + "."))).forEach(drop);
      }
    } catch (e) {}
  })();

  const ICON = {
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 9a3 3 0 115 2.2c-1.2.8-2 1.5-2 3"/><circle cx="12" cy="18.5" r=".6" fill="currentColor"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.4"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14l6-6 6 6"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M17 5l3 3-3 3M20 8h-5"/></svg>',
    caret: '<svg class="wf-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>',
  };

  /* =========================================================
     1. Comfort settings
     ========================================================= */

  const SETTINGS_KEY = "wf.settings.v1";
  /* motion "calm" by default: short fades only, nothing that pulses, glows, spins, sparks or floats.
     Visitors can pick Full (every effect) or Off (no animation at all) in Settings. */
  const DEFAULTS = { text: "1", contrast: "normal", font: "classic", motion: "calm", fx: "off", simple: "off", v: 2 };
  const saved = store.get(SETTINGS_KEY, {});
  // settings saved before v2 stored the old flashy defaults (motion "on", embers on): start those calm
  if (saved.v !== 2) { delete saved.motion; delete saved.fx; }
  const settings = Object.assign({}, DEFAULTS, saved, { v: 2 });
  if (!["calm", "on", "off"].includes(settings.motion)) settings.motion = "calm";
  const osReduced = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  /* calm: fades only. on: full effects (calmer if the device asks for less motion). off: nothing moves.
     reduced(): no big movement (embers, sparks, tilt). motionOff(): no animation at all. */
  const reduced = () => settings.motion !== "on" || osReduced();
  const motionOff = () => settings.motion === "off";

  function applySettings() {
    html.dataset.text = settings.text;
    html.dataset.contrast = settings.contrast;
    html.dataset.font = settings.font;
    html.dataset.motion = settings.motion;
    html.dataset.simple = settings.simple;   // Quest Guide shows just the step (see fx.css)
    $$(".wf-simple-toggle").forEach((b) => {
      b.setAttribute("aria-pressed", String(settings.simple === "on"));
      b.querySelector("b").textContent = settings.simple === "on" ? "On" : "Off";
    });
    embers.toggle(settings.fx === "on" && !reduced() && settings.contrast !== "high");
    // the guide map measures itself; let it re-measure after a text-size change
    window.dispatchEvent(new Event("resize"));
  }
  WF.settings = settings;

  if (ME) body.style.setProperty("--class-glow", ME.glow);

  /* =========================================================
     2. Drifting embers (canvas behind the page)
     ========================================================= */

  const embers = (() => {
    let canvas = null, ctx = null, parts = [], raf = 0, W = 0, H = 0, dpr = 1;
    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = innerWidth; H = innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = Math.round(Math.min(70, Math.max(18, (W * H) / 26000)));
      while (parts.length < want) parts.push(spawn(true));
      parts.length = want;
    }
    function spawn(anywhere) {
      const warm = Math.random();
      return {
        x: rand(0, W), y: anywhere ? rand(0, H) : H + 10,
        r: rand(.6, 2.1), vy: rand(.12, .5), vx: rand(-.15, .15),
        sway: rand(.002, .012), ph: rand(0, Math.PI * 2),
        a: rand(.25, .8), tw: rand(.01, .04),
        c: warm < .6 ? [255, 196, 70] : warm < .85 ? [255, 140, 40] : [255, 240, 200],
      };
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.ph += p.sway * 6;
        p.x += p.vx + Math.sin(p.ph) * .25;
        p.y -= p.vy;
        const flick = p.a * (.65 + .35 * Math.sin(p.ph * p.tw * 80));
        if (p.y < -20 || p.x < -20 || p.x > W + 20) Object.assign(p, spawn(false));
        const [r, g, b] = p.c;
        ctx.fillStyle = `rgba(${r},${g},${b},${flick * .14})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4.5, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${flick})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    function start() {
      if (!canvas) {
        canvas = make("canvas");
        canvas.id = "wf-embers";
        canvas.setAttribute("aria-hidden", "true");
        body.prepend(canvas);
        ctx = canvas.getContext("2d");
        addEventListener("resize", () => canvas && canvas.isConnected && size());
      }
      canvas.hidden = false;
      size();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }
    function stop() { cancelAnimationFrame(raf); raf = 0; if (canvas) canvas.hidden = true; }
    doc.addEventListener("visibilitychange", () => {
      if (!canvas || canvas.hidden) return;
      if (doc.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(tick);
    });
    return { toggle: (on) => (on ? start() : stop()) };
  })();

  /* =========================================================
     3. Sparks
     ========================================================= */

  let sparkBox = null;
  function sparks(x, y, n, opt) {
    if (reduced()) return;
    opt = opt || {};
    if (!sparkBox) { sparkBox = make("div", "wf-sparks"); sparkBox.setAttribute("aria-hidden", "true"); body.append(sparkBox); }
    const colors = opt.colors || ["#ffd100", "#fff3a0", "#ff9a2a", "#ffffff"];
    for (let i = 0; i < (n || 18); i++) {
      const s = make("i", "wf-spark" + (opt.square && Math.random() < .6 ? " sq" : ""));
      const ang = opt.angle !== undefined ? opt.angle + rand(-opt.spread, opt.spread) : rand(0, Math.PI * 2);
      const dist = rand(opt.min || 40, opt.max || 120);
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + (opt.gravity || 0) + "px");
      s.style.setProperty("--s", rand(opt.small || 4, opt.big || 9) + "px");
      s.style.setProperty("--c", colors[(Math.random() * colors.length) | 0]);
      s.style.setProperty("--t", rand(.7, opt.slow || 1.2) + "s");
      s.style.setProperty("--r", rand(-360, 360) + "deg");
      sparkBox.append(s);
      setTimeout(() => s.remove(), 1700);
    }
  }
  function sparksFrom(elm, n, opt) {
    if (!elm) return;
    const r = elm.getBoundingClientRect();
    sparks(r.left + r.width / 2, r.top + r.height / 2, n, opt);
  }
  Object.assign(WF, { sparks, sparksFrom });

  /* =========================================================
     4. Dialog windows (settings, help, welcome)
     ========================================================= */

  function dialog(title, inner, cls) {
    const d = make("dialog", "wf-dialog" + (cls ? " " + cls : ""));
    d.innerHTML = `<div class="frame-title">${esc(title)}</div><button type="button" class="wf-x" aria-label="Close">✕</button><div class="wf-dlg-body">${inner}</div>`;
    d.querySelector(".wf-x").addEventListener("click", () => d.close());
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });     // click outside the window
    d.addEventListener("keydown", (e) => { if (e.key !== "Escape") e.stopPropagation(); }); // guide's arrow keys stay out
    body.append(d);
    return d;
  }
  function openDialog(d) {
    $$("dialog.wf-dialog[open]").forEach((o) => o !== d && o.close());
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }

  /* ---------- settings window ---------- */

  const SET_ROWS = [
    ["text", "Text size", "Makes the guide text bigger.", [["1", "A"], ["2", "A+"], ["3", "A++"]]],
    ["contrast", "High contrast", "Brighter text on a plain black background.", [["normal", "Off"], ["high", "On"]]],
    ["font", "Easy-read font", "A plain font instead of the fancy game-style one.", [["classic", "Off"], ["readable", "On"]]],
    ["motion", "Animations", "Calm: gentle fades only. Full: glows, sparks and sliding pages. Off: nothing moves.", [["calm", "Calm"], ["on", "Full"], ["off", "Off"]]],
    ["fx", "Floating embers", "The little sparks drifting behind the page.", [["on", "On"], ["off", "Off"]]],
    ["simple", "Simple view", "Quest Guide shows only the step: what to do, when it's done, and Back / Next. Hides the chapter strip, map and action bar.", [["off", "Off"], ["on", "On"]]],
  ];
  let setDlg = null;
  function openSettings() {
    if (!setDlg) {
      setDlg = dialog("Settings",
        SET_ROWS.map(([k, t, sub, opts]) => `
          <div class="wf-set">
            <div><b>${t}</b><small>${sub}</small></div>
            <div class="wf-seg" role="group" aria-label="${t}">
              ${opts.map(([v, l]) => `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="false">${l}</button>`).join("")}
            </div>
          </div>`).join("") +
        `<p class="hint" style="margin-top:14px">Saved in this browser. </p>
         <div class="wf-dlg-foot"><button type="button" class="wowbtn small" data-reset>Reset</button><button type="button" class="wowbtn small" data-done>Done</button></div>`);
      setDlg.addEventListener("click", (e) => {
        const b = e.target.closest("[data-k]");
        if (b) { settings[b.dataset.k] = b.dataset.v; store.set(SETTINGS_KEY, settings); applySettings(); syncSettings(); }
        if (e.target.closest("[data-reset]")) { Object.assign(settings, DEFAULTS); store.set(SETTINGS_KEY, settings); applySettings(); syncSettings(); }
        if (e.target.closest("[data-done]")) setDlg.close();
      });
    }
    syncSettings();
    openDialog(setDlg);
  }
  function syncSettings() {
    $$("[data-k]", setDlg).forEach((b) => b.setAttribute("aria-pressed", String(settings[b.dataset.k] === b.dataset.v)));
  }

  /* ---------- help window (content per page type) ---------- */

  const KEYS_COMMON = [["?", "Open this help"], ["Esc", "Close a window"]];
  const HELP = {
    home: {
      how: [
        "Pick a character below. Each one has three pages: a <b>Leveling Guide</b>, <b>Professions</b> and <b>Addons</b>.",
        "Never played? Start with the <b>Leveling Guide</b>. It explains everything as you go.",
        "Your progress is saved in this browser, and the cards show where you stopped.",
      ],
      keys: [],
      faq: [
        ["I've never played World of Warcraft. Is this for me?", "Yes. The guides are written for complete beginners: every step says exactly where to go and what to press, and game words explain themselves when you click them."],
        ["Which character should I pick?", "Use <b>Help me choose</b> on this page. Short version: Mage if you like fighting from far away, Rogue if you like sneaking up close."],
        ["Do I need addons?", "No. The game works fine without them. A few make leveling easier, and the Addons page lists them."],
        ["Does it work on my phone?", "Yes. Keep the guide open on your phone next to the game. Your progress is saved separately on each device and browser."],
      ],
    },
    guide: {
      how: [
        "The <b>parchment</b> is your current step: where to go and what to do.",
        "Do it in game, then press <b>Next Step</b>. Your place is saved automatically.",
        "Words with a <b>dotted line</b> explain themselves when you click them.",
        "The <b>map</b> shows where to go. Gold pins are numbered in the order you visit them.",
        "The <b>bar at the bottom</b> shows which buttons to have on your action bar at this level.",
      ],
      keys: [["← →", "Previous / next step"], ["M", "Big map"], ["+ −", "Zoom the map (after clicking it)"]],
      faq: [
        ["I can't find the person or place.", "Look at the map on the step: the gold pins show each place in order. Press <kbd>M</kbd> for a big map. With the TomTom addon, click a pin and press <b>Copy /way</b> to get an arrow in game."],
        ["The enemies are too strong.", "Check the colour of their level. Orange or red means come back later: do the next step first, or kill a few easier enemies nearby. Always eat to full health before a fight."],
        ["I died. Now what?", "You appear as a ghost at a graveyard. Run back to your body and click <b>Resurrect</b>. Nothing is lost except a little time and some repair cost."],
        ["I'm a level behind the guide.", "That's normal. Do every quest you see. If you're 2 or more levels behind, kill enemies near the next quest area for a few minutes."],
        ["I pressed Next by accident.", "Press <b>Back</b>, or open <b>All steps</b> under the parchment and click any step."],
        ["Where are my new abilities?", "Open your spellbook with <kbd>P</kbd>. The <b>Action Bars</b> tab shows which key each one goes on."],
        ["Is my progress saved?", "Yes, in this browser on this device. Another browser or device starts from step 1."],
      ],
    },
    professions: {
      how: [
        "Start with the <b>Basics</b> tab: which two professions to pick and why.",
        "Each profession tab is a list of small steps. Do one in game, then press <b>Done, next</b>.",
        "Your progress is saved for each profession separately.",
      ],
      keys: [],
      faq: [
        ["When should I start professions?", "Any time from level 1, though most players start around level 5 to 10 once they reach a big city."],
        ["Can I change my professions later?", "Yes. You can drop one and learn another, but you lose all the skill points you had in the one you drop."],
        ["I don't have enough materials.", "Gathering professions collect them as you level. The rest you can buy at the auction house in any big city."],
      ],
    },
    addons: {
      how: [
        "Addons are free extras that improve the game's interface. You don't need any to play.",
        "Install the <b>orange (must-have)</b> ones first, then blue, then green. Skip the grey ones.",
        "<b>How to Install</b> walks you through it, with or without the CurseForge app.",
        "Press <b>Scan</b> and the list ticks off what you already have. Nothing is uploaded: it only reads folder names on your computer.",
      ],
      keys: [],
      faq: [
        ["Can addons get me banned?", "No. Addons from CurseForge only change the interface, and Blizzard allows them."],
        ["An addon says Out of date.", "Update it first. If there's no update yet, tick <b>Load out of date AddOns</b> on the AddOns screen. It usually still works."],
        ["My game got slow or messy.", "Turn addons off one at a time on the character screen (AddOns button) to find the one causing it."],
      ],
    },
  };
  let helpDlg = null;
  function openHelp() {
    const h = HELP[PAGE] || HELP.home;
    if (!helpDlg) {
      const keys = h.keys.concat(KEYS_COMMON);
      helpDlg = dialog("Help",
        `<h3>How this page works</h3><ul>${h.how.map((x) => `<li>${x}</li>`).join("")}</ul>
         ${h.faq.length ? `<h3>I'm stuck…</h3><div class="wf-faq">${h.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>` : ""}
         <h3>Keyboard</h3><dl class="wf-keys">${keys.map(([k, t]) => `<dt>${k.split(" ").map((x) => `<kbd>${x}</kbd>`).join(" ")}</dt><dd>${t}</dd>`).join("")}</dl>
         <div class="wf-dlg-foot">
           ${TOURS[PAGE] ? '<button type="button" class="wowbtn small" data-tour>Show me around</button>' : ""}
           <button type="button" class="wowbtn small" data-settings>Bigger text &amp; settings</button>
         </div>`);
      helpDlg.addEventListener("click", (e) => {
        if (e.target.closest("[data-tour]")) { helpDlg.close(); startTour(); }
        if (e.target.closest("[data-settings]")) openSettings();
      });
    }
    $(".wf-orb.wf-nudge") && $(".wf-orb.wf-nudge").classList.remove("wf-nudge");
    store.set("wf.helped", 1);
    openDialog(helpDlg);
  }
  WF.openHelp = openHelp;
  WF.openSettings = openSettings;

  /* =========================================================
     5. Guided tour (spotlight on one thing at a time)
     ========================================================= */

  const TOURS = {
    guide: [
      [".tabs", "The chapters", "These tabs are the guide's chapters. You're on <b>Quest Guide</b>. Brand new? <b>How to Play</b> explains the basics in two minutes."],
      ["#card", "Your current step", "This parchment says where to go and what to do. Do it in game, one line at a time."],
      ["#mapbox:not([hidden]) .mapview", "Where to go", "Gold pins show this step's places, in order. Drag to move the map; press <kbd>M</kbd> for a big one."],
      ["#next", "Done? Press Next Step", "Your place is saved automatically, so you can close the page and come back later."],
      [".hud .mainbar", "Your action bar", "The buttons to have on your bar at this level. Point at one to read what it does. Glowing ones are new."],
      [".wf-dock", "Help is always here", "Questions, bigger text, and this tour again."],
    ],
    addons: [
      [".tabs", "Three tabs", "The addon list, how to install them, and notes."],
      [".quality", "What the colours mean", "Like loot in game: orange first, then blue, then green. Grey ones you can skip."],
      ["#filters", "Show only some", "Filter the list, and see how many you have."],
      [".scanbar", "Already have some?", "Scan your AddOns folder and the list ticks off what's installed. Nothing is uploaded."],
      [".wf-dock", "Help is always here", "Questions, bigger text, and this tour again."],
    ],
    professions: [
      [".tabs", "One tab per profession", "Start with <b>Basics</b>, then open the profession you picked."],
      ["#panel-overview .frame", "Start here", "Which two professions fit your character, and why."],
      [".wf-dock", "Help is always here", "Questions, bigger text, and this tour again."],
    ],
  };

  let tour = null;
  function startTour() {
    const steps = (TOURS[PAGE] || []).filter(([sel]) => {
      const n = $(sel);
      return n && n.getClientRects().length && getComputedStyle(n).visibility !== "hidden";
    });
    if (!steps.length) return;
    endTour();
    scrollTo(0, 0);
    const block = make("div", "wf-tour-block");
    const spot = make("div", "wf-spot");
    const note = make("div", "wf-note");
    note.setAttribute("role", "dialog");
    note.setAttribute("aria-live", "polite");
    body.append(block, spot, note);
    tour = { steps, i: 0, block, spot, note };
    block.addEventListener("click", () => moveTour(1));
    note.addEventListener("click", (e) => {
      if (e.target.closest("[data-n]")) moveTour(1);
      if (e.target.closest("[data-p]")) moveTour(-1);
      if (e.target.closest("[data-x]")) endTour();
    });
    addEventListener("resize", placeTour);
    addEventListener("scroll", placeTour, { passive: true });
    showTourStep();
  }
  function moveTour(d) {
    if (!tour) return;
    tour.i += d;
    if (tour.i >= tour.steps.length) { endTour(); return; }
    tour.i = Math.max(0, tour.i);
    showTourStep();
  }
  function showTourStep() {
    const [sel, title, text] = tour.steps[tour.i];
    const n = $(sel);
    n.scrollIntoView({ block: "center", behavior: "auto" });
    const last = tour.i === tour.steps.length - 1;
    tour.note.innerHTML = `<b class="t">${title}</b><p>${text}</p>
      <div class="row"><small>${tour.i + 1} of ${tour.steps.length}</small>
      ${tour.i ? '<button type="button" class="wowbtn" data-p>‹</button>' : '<button type="button" class="wowbtn" data-x>Skip</button>'}
      <button type="button" class="wowbtn" data-n>${last ? "Got it!" : "Next ›"}</button></div>`;
    placeTour();
    tour.note.querySelector("[data-n]").focus({ preventScroll: true });
  }
  function placeTour() {
    if (!tour) return;
    const n = $(tour.steps[tour.i][0]);
    if (!n) return;
    const r = n.getBoundingClientRect(), pad = 6;
    Object.assign(tour.spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
    const nw = tour.note.offsetWidth, nh = tour.note.offsetHeight;
    let top = r.bottom + 16;
    if (top + nh > innerHeight - 10) top = r.top - nh - 16;
    if (top < 10) top = Math.max(10, Math.min(innerHeight - nh - 10, r.top + 20));
    const left = Math.min(innerWidth - nw - 12, Math.max(12, r.left + r.width / 2 - nw / 2));
    Object.assign(tour.note.style, { left: left + "px", top: top + "px" });
  }
  function endTour() {
    if (!tour) return;
    tour.block.remove(); tour.spot.remove(); tour.note.remove();
    removeEventListener("resize", placeTour);
    removeEventListener("scroll", placeTour);
    tour = null;
    store.set("wf.toured." + PAGE, 1);
  }
  doc.addEventListener("keydown", (e) => {
    if (!tour) return;
    if (e.key === "Escape") { endTour(); e.stopImmediatePropagation(); }
    else if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); moveTour(1); e.stopImmediatePropagation(); }
    else if (e.key === "ArrowLeft") { moveTour(-1); e.stopImmediatePropagation(); }
  }, true);
  WF.startTour = startTour;

  /* ---------- first-visit welcome ---------- */

  const WELCOME = {
    guide: ["Welcome, adventurer!", "inv_misc_note_01", "inv_misc_map_01", "ability_dualwield",
      `<p>This guide takes your ${esc(ME ? ME.name : "character")} from level 1 to 60, one small step at a time.</p>
       <ol><li>Read the step on the parchment and do it in game.</li>
       <li>Press <b>Next Step</b> when it's done. Your place is saved.</li>
       <li>Click any word with a <b>dotted line</b> to see what it means.</li></ol>`],
    professions: ["Professions made easy", "trade_blacksmithing", "trade_tailoring", "inv_misc_coin_01",
      `<p>Professions let you make your own gear and earn gold. This page shows the cheapest way from skill 1 to 300.</p>
       <ol><li>Read <b>Basics</b> to see which two to pick.</li><li>Open a profession tab and follow the steps.</li></ol>`],
    addons: ["What are addons?", "trade_engineering", "inv_gizmo_01", "inv_misc_spyglass_03",
      `<p>Addons are free extras that make the game's interface easier. You don't need any to play.</p>
       <ol><li>Start with the <b>must-have</b> (orange) ones.</li><li><b>How to Install</b> shows you how, step by step.</li></ol>`],
  };
  function maybeWelcome() {
    const w = WELCOME[PAGE];
    if (!w || store.get("wf.seen." + PAGE, 0)) return;
    store.set("wf.seen." + PAGE, 1);
    // people who already used this page before the update just get a nudge on the Help button
    if (WF.returning) { nudgeHelp(); return; }
    const d = dialog(w[0],
      `<div class="wf-welcome"><div class="wf-welcome-ico" aria-hidden="true"><span>${WF.icon(w[1])}</span><span>${WF.icon(w[2])}</span><span>${WF.icon(w[3])}</span></div>${w[4]}
       <p class="hint">Stuck at any point? The <b>?</b> button at the bottom right has answers.</p>
       <div class="wf-dlg-foot">${TOURS[PAGE] ? '<button type="button" class="wowbtn" data-tour>Show me around</button>' : ""}<button type="button" class="wowbtn" data-go>Let's go!</button></div></div>`);
    d.addEventListener("click", (e) => {
      if (e.target.closest("[data-tour]")) { d.close(); setTimeout(startTour, 200); }
      if (e.target.closest("[data-go]")) d.close();
    });
    setTimeout(() => openDialog(d), 500);
  }
  function nudgeHelp() {
    if (store.get("wf.helped", 0)) return;
    const b = $(".wf-orb[data-act=help]");
    if (b) b.classList.add("wf-nudge");
  }

  /* =========================================================
     6. Dock (help / settings / top)
     ========================================================= */

  function buildDock() {
    const dock = make("div", "wf-dock");
    dock.innerHTML =
      `<button type="button" class="wf-orb wf-top" data-act="top" data-tip="Back to top" aria-label="Back to top">${ICON.up}</button>
       <button type="button" class="wf-orb" data-act="settings" data-tip="Settings · bigger text" aria-label="Settings">${ICON.gear}</button>
       <button type="button" class="wf-orb" data-act="help" data-tip="Help (?)" aria-label="Help">${ICON.help}</button>`;
    dock.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      if (b.dataset.act === "help") openHelp();
      if (b.dataset.act === "settings") openSettings();
      if (b.dataset.act === "top") scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
    });
    body.append(dock);

    const top = dock.querySelector(".wf-top");
    let ticking = false;
    const update = () => {
      ticking = false;
      top.classList.toggle("show", scrollY > 500);
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }

  /* tab row: when it's wider than the screen, fade the edge that hides more
     tabs (classes more-l / more-r, styled in core.css), and keep the open tab in view */
  function setupTabEdges() {
    $$(".tabs").forEach((row) => {
      const edges = () => {
        const max = row.scrollWidth - row.clientWidth;
        row.classList.toggle("more-l", max > 1 && row.scrollLeft > 1);
        row.classList.toggle("more-r", max > 1 && row.scrollLeft < max - 1);
      };
      row.addEventListener("scroll", edges, { passive: true });
      if (window.ResizeObserver) new ResizeObserver(edges).observe(row);
      else addEventListener("resize", edges);
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(edges);
      row.addEventListener("click", (e) => {
        const tab = e.target.closest("button");
        if (tab && row.scrollWidth > row.clientWidth) tab.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
      edges();
    });
  }

  doc.addEventListener("keydown", (e) => {
    if (isTyping(e) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "?") { e.preventDefault(); openHelp(); }
  });

  /* =========================================================
     7. "Switch character" menu in the top frame
     ========================================================= */

  function buildSwitcher() {
    const inner = $(".top .top-inner");
    if (!inner || !WF.characters) return;
    const PAGE_NAMES = { guide: "Leveling Guide", professions: "Professions", addons: "Addons" };
    const nav = make("div", "wf-nav");
    nav.innerHTML =
      `<a class="wf-navbtn" href="${ROOT}index.html" title="All guides">${ICON.home}<span>All guides</span></a>
       <button type="button" class="wf-navbtn" aria-expanded="false" aria-haspopup="true">${ICON.swap}<span>Switch</span>${ICON.caret}</button>
       <div class="wf-menu" hidden role="menu"></div>`;
    const btn = nav.querySelector("button"), menu = nav.querySelector(".wf-menu");
    const mini = (c) => `<span class="wf-mini" style="--orb:${c.orb}"><img src="${WF.ICON_URL}${c.icon}.jpg" alt="" onerror="WF.iconErr(this)"></span>`;
    let h = "";
    if (ME) {
      h += `<h4>${esc(ME.name)}</h4>`;
      h += Object.keys(PAGE_NAMES).map((p) =>
        `<a role="menuitem" href="${pageHref(ME, p)}"${p === PAGE ? ' aria-current="page"' : ""} style="--c:${ME.color}">
           <span><b>${PAGE_NAMES[p]}</b><small>${p === "guide" ? "Level 1 to 60, step by step" : p === "professions" ? "Skill 1 to 300, cheapest route" : "Which ones to get and how"}</small></span></a>`).join("");
    }
    const others = WF.characters.filter((c) => c !== ME);
    if (others.length) {
      h += `<div class="wf-sep"></div><h4>Other characters</h4>`;
      h += others.map((c) =>
        `<a role="menuitem" href="${pageHref(c, PAGE_NAMES[PAGE] ? PAGE : "guide")}" style="--c:${c.color}">${mini(c)}
           <span><b>${esc(c.name)}</b><small>${esc(c.role)} · ${PAGE_NAMES[PAGE] || "Guide"}</small></span></a>`).join("");
    }
    menu.innerHTML = h;
    const open = (on) => { menu.hidden = !on; btn.setAttribute("aria-expanded", String(on)); };
    btn.addEventListener("click", (e) => { e.stopPropagation(); open(menu.hidden); });
    doc.addEventListener("click", (e) => { if (!nav.contains(e.target)) open(false); });
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { open(false); btn.focus(); } });
    inner.append(nav);
  }

  /* =========================================================
     8. Scroll reveal
     ========================================================= */

  const REVEAL = [
    ".glossary > div", ".addon", ".steps-big > li", ".talents tbody tr", ".barblock", ".changes",
    "main .frame-body > h3", ".howcard", ".tier", ".wf-reveal-me", ".mats > div",
  ].join(",");
  let io = null;
  function setupReveal() {
    if (!("IntersectionObserver" in window)) return;
    io = new IntersectionObserver((entries) => {
      let k = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.style.setProperty("--d", Math.min(k++, 10) * 55 + "ms");
        en.target.classList.add("wf-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: .05 });
    tag(doc);
    let pending = false;
    new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; tag(doc); });
    }).observe(body, { childList: true, subtree: true });
  }
  function tag(rootNode) {
    if (reduced()) return;   // calm/off: everything is simply there, nothing slides in on scroll
    $$(REVEAL, rootNode).forEach((n) => {
      if (n.dataset.wfr) return;
      n.dataset.wfr = "1";
      n.classList.add("wf-reveal");
      io.observe(n);
    });
  }

  /* =========================================================
     9. Small touches: ripples, page fades, tilt, glossary search
     ========================================================= */

  doc.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".wowbtn");
    if (!b || b.disabled || reduced()) return;   // calm: no ripple when a button is pressed
    const r = b.getBoundingClientRect();
    const s = make("span", "wf-ripple");
    s.style.left = e.clientX - r.left + "px";
    s.style.top = e.clientY - r.top + "px";
    b.append(s);
    setTimeout(() => s.remove(), 650);
  });

  // fade out before going to another page of this site
  doc.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download") || motionOff()) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || !/(\.html|\/)$/.test(url.pathname)) return;
    e.preventDefault();
    html.classList.add("wf-leaving");
    setTimeout(() => { location.href = url.href; }, 190);
  });
  addEventListener("pageshow", () => html.classList.remove("wf-leaving"));

  function setupTilt() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        if (reduced()) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--rx", (0.5 - y) * 7 + "deg");
        card.style.setProperty("--ry", (x - 0.5) * 9 + "deg");
        card.style.setProperty("--mx", x * 100 + "%");
        card.style.setProperty("--my", y * 100 + "%");
        card.classList.add("tilting");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.classList.remove("tilting");
      });
    });
  }
  WF.setupTilt = setupTilt;

  function setupGlossarySearch() {
    const g = $("#glossary");
    if (!g) return;
    const box = make("div", "wf-search",
      `${ICON.search}<input type="search" placeholder="Search words… (e.g. talent, mana, elite)" aria-label="Search words"><small></small>`);
    g.before(box);
    const input = box.querySelector("input"), count = box.querySelector("small");
    const items = $$(":scope > div", g).map((d) => ({ d, dt: d.querySelector("dt"), dd: d.querySelector("dd"), t: d.textContent.toLowerCase(), h: [d.querySelector("dt").innerHTML, d.querySelector("dd").innerHTML] }));
    const mark = (htmlStr, q) => q ? htmlStr.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![^<]*>)`, "gi"), "<mark>$1</mark>") : htmlStr;
    const run = () => {
      const q = input.value.trim().toLowerCase();
      let n = 0;
      items.forEach((it) => {
        const hit = !q || it.t.includes(q);
        it.d.hidden = !hit;
        if (hit) { n++; it.dt.innerHTML = mark(it.h[0], q); it.dd.innerHTML = mark(it.h[1], q); }
      });
      count.textContent = q ? (n ? `${n} word${n === 1 ? "" : "s"} found` : "No match. Try a shorter word.") : `${items.length} words. Click any dotted word in the guide to see it right there.`;
    };
    input.addEventListener("input", run);
    run();
  }

  /* =========================================================
     10. Visual helpers for reading pages (How to Play, Profession Basics)
         Plain headings + lists in the HTML become picture cards,
         with a "jump to" row, a level-colour scale, a combo
         diagram with real ability icons and a skill-up chance bar.
         The HTML stays simple to edit; this only decorates it.
     ========================================================= */

  /* a game icon for each section, picked by words in its heading */
  const SEC_RULES = [
    [/combo/i, "inv_sword_04"], [/quest/i, "achievement_quests_completed_01"],
    [/fight/i, /after/i, "inv_misc_food_19"], [/fight/i, "ability_dualwield"],
    [/stronger/i, "spell_holy_heroism"], [/around/i, "ability_mount_ridinghorse"],
    [/addon/i, "trade_engineering"], [/key/i, "inv_misc_key_03"],
    [/what is/i, "trade_blacksmithing"], [/how to start/i, "inv_misc_book_09"],
    [/colou?r/i, "inv_misc_gem_variety_01"], [/stop/i, "inv_misc_book_07"],
    [/gathering/i, "trade_herbalism"], [/pair/i, "inv_misc_bag_08"], [/fits|class/i, "inv_chest_leather_01"], [/gear/i, "inv_chest_leather_01"],
  ];
  const secIcon = (title) => {
    const r = SEC_RULES.find((rule) => rule.slice(0, -1).every((re) => re.test(title)));
    return `<span class="hc-ico" aria-hidden="true">${WF.icon(r ? r[r.length - 1] : "inv_misc_questionmark")}</span>`;
  };

  /* turn "h3 + what follows" into cards, with a row of picture links to jump to each */
  function cardify(bodyEl, idPrefix) {
    if (!bodyEl || bodyEl.dataset.cards) return;
    bodyEl.dataset.cards = "1";
    const kids = Array.from(bodyEl.children);
    const cards = [];
    let cur = null;
    kids.forEach((n) => {
      if (n.tagName === "H3") {
        cur = make("section", "howcard");
        cur.id = idPrefix + "-" + cards.length;
        n.before(cur);
        cur.append(n);
        n.insertAdjacentHTML("afterbegin", secIcon(n.textContent));
        cards.push({ el: cur, title: n.textContent.trim(), icon: secIcon(n.textContent) });
      } else if (cur && !n.matches(".foot")) {
        cur.append(n);
      }
    });
    if (cards.length < 3) return;
    const jump = make("nav", "howjump");
    jump.setAttribute("aria-label", "Jump to a section");
    jump.innerHTML = `<small>Jump to</small>` + cards.map((c) => `<a href="#${c.el.id}">${c.icon}<span>${esc(c.title)}</span></a>`).join("");
    cards[0].el.before(jump);
    jump.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      const t = $(a.getAttribute("href"));
      const top = t.getBoundingClientRect().top + scrollY - ($(".top") ? $(".top").offsetHeight : 0) - 12;
      scrollTo({ top, behavior: reduced() ? "auto" : "smooth" });
      t.classList.remove("wf-flash"); void t.offsetWidth; t.classList.add("wf-flash");
    });
  }

  /* "grey gives no XP, green is easy…" gets a coloured scale under it */
  function levelScale(root) {
    const li = $$("li", root).find((n) => $(".c-grey", n) && $(".c-red", n));
    if (!li) return;
    const seg = [["grey", "No XP", "far below you"], ["green", "Easy", "below you"], ["yellow", "Fair fight", "about your level"], ["orange", "Hard", "a few levels above"], ["red", "Run!", "far above you"]];
    const box = make("div", "conscale",
      `<div class="cs-bar">${seg.map(([c, t, sub]) => `<div class="cs-${c}"><b>${t}</b><small>${sub}</small></div>`).join("")}</div>
       <div class="cs-axis"><span>‹ weaker than you</span><span>stronger than you ›</span></div>`);
    box.setAttribute("aria-hidden", "true");      // the sentence above already says it in words
    li.append(box);
  }

  /* "The one combo to learn": the abilities as a row of real icons with arrows */
  function comboFlow(root) {
    if (typeof SPELLBOOK === "undefined" || typeof iconHTML !== "function") return;
    const card = $$(".howcard", root).find((c) => /combo/i.test($("h3", c).textContent));
    const ol = card && $("ol", card);
    if (!ol) return;
    const names = Object.keys(SPELLBOOK).map((id) => [id, SPELLBOOK[id].name]).sort((a, b) => b[1].length - a[1].length);
    const steps = $$(":scope > li", ol).map((li) => {
      const text = li.textContent;
      let best = null;
      names.forEach(([id, name]) => {
        const m = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).exec(text);
        if (m && (!best || m.index < best.at)) best = { id, name, at: m.index };
      });
      const short = text.replace(/\s+/g, " ").trim();
      return best ? { id: best.id, label: best.name } : { id: null, label: short.length > 22 ? short.slice(0, 20).replace(/\s+\S*$/, "") + "…" : short };
    });
    if (steps.filter((s) => s.id).length < 2) return;
    const move = '<div class="slot cf-move" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0M9 20l3-6 3 3v4M12 14l1-5-3 1-2 3M13 9l3 3 3 1"/></svg></div>';
    const flow = make("div", "comboflow",
      steps.map((s, n) => `<div class="cf-step"><span class="cf-n">${n + 1}</span>${s.id ? iconHTML(s.id) : move}<b>${esc(s.label)}</b></div>`)
        .join('<span class="cf-arrow" aria-hidden="true">›</span>'));
    ol.before(flow);
    ol.insertAdjacentHTML("beforebegin", '<p class="hint cf-hint">Point at or tap an icon to see what it does. The steps below say when to press each one.</p>');
  }

  /* recipe colours on the Professions page: how likely each one gives a skill point */
  function chanceBar(root) {
    const ul = $$("ul", root).find((n) => $(".c-orange", n) && $(".c-grey", n));
    if (!ul) return;
    const seg = [["orange", "Always", 100], ["yellow", "Usually", 75], ["green", "Sometimes", 30], ["grey", "Never", 0]];
    const box = make("div", "chancebar",
      `<div class="cb-title">Chance to gain a skill point</div>` +
      seg.map(([c, t, p]) => `<div class="cb-row"><span class="c-${c}">${t}</span><div class="cb-track"><i class="cb-${c}" style="width:${Math.max(p, 2)}%"></i></div></div>`).join(""));
    box.setAttribute("aria-hidden", "true");
    ul.after(box);
  }

  function visualHelpers() {
    if (PAGE === "guide") {
      const basics = $("#panel-basics .frame-body");
      cardify(basics, "howto");
      levelScale(basics);
      comboFlow(basics);
    }
    if (PAGE === "professions") {
      const overview = $("#panel-overview .frame-body");
      cardify(overview, "basics");
      chanceBar(overview);
    }
    // numbered "do this, then this" lists in those cards get a connected-steps look
    $$(".howcard > ol").forEach((ol) => ol.classList.add("wf-flow"));
  }

  /* =========================================================
     11. Reacting to the guide engines
     ========================================================= */

  $$("#next, #next2, [data-next]").forEach((b) => b.classList.add("wf-cta"));

  doc.addEventListener("wf:step", (e) => {
    const d = e.detail;
    if (CHAR) store.set("wf.progress." + CHAR, { step: d.index, total: d.total, level: d.level, title: d.title, place: d.place, at: Date.now() });
    if (!(d.direction === "next" && d.index === d.prev + 1)) return;
    const next = $("#next");
    sparksFrom(next, 16, { angle: -Math.PI / 2, spread: 1.3, min: 30, max: 90 });
    const xp = $(".xp");
    if (xp) { xp.classList.remove("wf-gain"); void xp.offsetWidth; xp.classList.add("wf-gain"); }
    // no pop-up messages (level-up, step complete): the step itself says what's next
    if (d.level > d.prevLevel) {
      const mb = $(".mainbar");
      if (mb) { mb.classList.remove("wf-bump"); void mb.offsetWidth; mb.classList.add("wf-bump"); }
    }
  });

  doc.addEventListener("wf:progress", (e) => {
    const d = e.detail;
    sparksFrom(d.source, 16, { angle: -Math.PI / 2, spread: 1.3, min: 30, max: 90 });
  });

  /* =========================================================
     start
     ========================================================= */

  /* a one-click Simple view switch at the top of the Quest Guide (same as Settings → Simple view) */
  if (PAGE === "guide" && $("#panel-steps .lead")) {
    const b = make("button", "wf-simple-toggle",
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h10M4 18h6"/></svg>Simple view: <b>Off</b>`);
    b.type = "button";
    b.title = "Show only the current step: what to do, when it's done, and Back / Next";
    b.addEventListener("click", () => {
      settings.simple = settings.simple === "on" ? "off" : "on";
      store.set(SETTINGS_KEY, settings);
      applySettings();
      if (setDlg) syncSettings();
    });
    $("#panel-steps .lead").append(" ", b);
  }

  applySettings();
  buildDock();
  setupTabEdges();
  buildSwitcher();
  visualHelpers();
  setupReveal();
  setupTilt();
  setupGlossarySearch();
  maybeWelcome();

})();
