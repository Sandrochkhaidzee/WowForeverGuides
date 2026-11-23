/* =========================================================
   Gear tab — the character window (like pressing C in game),
   filled with the items this guide's quests give you, plus
   what to buy or craft for empty slots and other options.

   Reads GEAR from the character's data/gear.js (made by tools/build-gear.py):
     GEAR.items = [{ step, slot, id, n, i, q, g, sc, lines, from }]   quest rewards you wear, in order
       step  = title of the guide step where you get it (looked up in STEPS, so adding or
               moving steps in data/guide.js doesn't break it)
       slot  = head|neck|shoulder|back|chest|shirt|tabard|wrist|hands|waist|legs|feet|
               finger1|finger2|trinket1|trinket2|main|off|ranged
       n, i, q = name, icon name, quality (0 grey … 4 purple)
       g = slot group (head … finger, trinket, 1h, 2h, oh, held, ranged), sc = how good for this class
       lines = tooltip lines, from = where it comes from
     or { step, slot, clear:true } = that slot is empty from this step (a staff takes both hands)
     GEAR.pool = [{ id, n, i, q, g, req, sc, lines, src:[kind, text] }]   other items
       kind = quest | dungeon | craft | vendor | ah (auction house)
   Uses STEPS / CHAPTERS from the guide engine (assets/js/guide.js).
   ========================================================= */
(() => {
  if (typeof GEAR === "undefined" || !document.getElementById("gear")) return;
  const $ = (s, r = document) => r.querySelector(s);
  const IMG = new URL("../img/slots/", document.currentScript.src).href;

  const SLOTS = {
    head: ["Head", "head"], neck: ["Neck", "neck"], shoulder: ["Shoulder", "shoulder"], back: ["Back", "chest"],
    chest: ["Chest", "chest"], shirt: ["Shirt", "shirt"], tabard: ["Tabard", "tabard"], wrist: ["Wrist", "wrists"],
    hands: ["Hands", "hands"], waist: ["Waist", "waist"], legs: ["Legs", "legs"], feet: ["Feet", "feet"],
    finger1: ["Finger", "finger"], finger2: ["Finger", "finger"], trinket1: ["Trinket", "trinket"], trinket2: ["Trinket", "trinket"],
    main: ["Main Hand", "mainhand"], off: ["Off Hand", "secondaryhand"], ranged: ["Ranged", "ranged"],
  };
  const LEFT = ["head", "neck", "shoulder", "back", "chest", "shirt", "tabard", "wrist"];
  const RIGHT = ["hands", "waist", "legs", "feet", "finger1", "finger2", "trinket1", "trinket2"];
  const BOTTOM = ["main", "off", "ranged"];
  const QN = ["Poor", "Common", "Uncommon", "Rare", "Epic"];
  const KIND = { quest: "Quest", dungeon: "Dungeon", craft: "Crafted", vendor: "Vendor", ah: "Auction House" };
  const BADGE = { craft: "Craft", vendor: "Vendor", ah: "AH" };
  const BUYABLE = ["ah", "craft", "vendor"];

  const char = WF.byId(GUIDE_PAGE.character) || { name: "", cls: "" };
  const dual = char.cls === "Rogue";               // rogues hold a weapon in each hand from level 10
  const pool = GEAR.pool || [];
  const poolById = Object.fromEntries(pool.map((p) => [p.id, p]));

  /* step title -> step number; an item whose step is gone from the guide is left out */
  const items = GEAR.items
    .map((it, n) => ({ ...it, s: STEPS.findIndex((st) => st.title === it.step), n0: n }))
    .filter((it) => {
      if (it.s < 0) console.warn(`gear.js: no step called "${it.step}" for ${it.n || it.slot}`);
      return it.s >= 0;
    })
    .sort((a, b) => a.s - b.s || a.n0 - b.n0);

  /* which pool groups can go in a slot */
  function groupsFor(key, shown, L) {
    if (key === "shirt" || key === "tabard") return [];
    if (key.startsWith("finger")) return ["finger"];
    if (key.startsWith("trinket")) return ["trinket"];
    if (key === "main") return ["1h", "2h"];
    if (key === "off") return dual ? (L >= 10 ? ["1h", "oh"] : []) : ["held"];
    return [key === "ranged" ? "ranged" : key];
  }
  const fitsSlot = (p, key, shown, L) => groupsFor(key, shown, L).includes(p.g)
    && !(key === "off" && /^Main Hand/.test(p.lines[0] || ""));    // main-hand-only weapons
  const twoHanded = (it) => it && (it.g === "2h" || /^Two-Hand/.test(it.lines[0] || ""));

  /* what you're wearing after finishing step `upTo`, at level L: the quest rewards, then
     the best item you can buy or craft in every slot that's still empty */
  function setAt(upTo, L) {
    const worn = {};
    items.forEach((it) => {
      if (it.s > upTo) return;
      if (it.clear) delete worn[it.slot];       // e.g. a two-handed staff empties the off hand
      else worn[it.slot] = it;
    });
    [...LEFT, ...RIGHT, ...BOTTOM].forEach((key) => {
      if (worn[key] || (key === "off" && twoHanded(worn.main))) return;
      const used = Object.values(worn).map((w) => w.n);          // by name: some items exist twice
      const best = pool
        .filter((p) => BUYABLE.includes(p.src[0]) && p.req <= L && fitsSlot(p, key, worn, L) && !used.includes(p.n))
        .sort((a, b) => b.sc - a.sc)[0];
      if (best) worn[key] = { ...best, fill: true, from: best.src[1] };
    });
    return worn;
  }

  /* Like the Action Bars tab: the level follows your Quest Guide step. Moving the slider
     shows another level; the next step you open in the Quest Guide brings it back. */
  let follow = true;
  let level = 1;
  let picked = null;                 // the slot whose options are open below the window
  const box = $("#gear");
  /* a step's level range: "28–30" -> 30 is the level you reach by its end */
  const stepHi = (i) => Math.max(...String(STEPS[i].lv).split(/[–-]/).map((n) => parseInt(n, 10)).filter((n) => !isNaN(n)), 1);
  /* the last guide step you've fully finished by level L (-1: none yet) */
  const lastStepFor = (L) => { let k = -1; STEPS.forEach((st, i) => { if (stepHi(i) <= L) k = i; }); return k; };
  let pending = [];                  // rewards the current Quest Guide step gives you (not in your bags yet)

  box.innerHTML = `
    <div class="levelpick">
      <button type="button" class="wowbtn small" id="gearminus" aria-label="One level lower">−</button>
      <label for="gearslider">Level <b id="gearlevel">1</b></label>
      <input type="range" id="gearslider" min="1" max="60" value="1">
      <button type="button" class="wowbtn small" id="gearplus" aria-label="One level higher">+</button>
    </div>
    <p class="levelnote" id="pdstatus"></p>
    <div class="paperdoll">
      <div class="pd-head">
        <span class="pd-crest">${WF.icon(char.icon || "inv_misc_questionmark")}</span>
        <div><b>${char.name}</b><span id="pdlevel"></span></div>
      </div>
      <div class="pd-body">
        <div class="pd-col" id="pdleft"></div>
        <div class="pd-center">
          <div class="pd-totals" id="pdtotals"></div>
          <div class="pd-new" id="pdnew"></div>
          <div class="pd-buy" id="pdbuy"></div>
        </div>
        <div class="pd-col" id="pdright"></div>
      </div>
      <div class="pd-bottom" id="pdbottom"></div>
      <div class="pd-detail" id="pddetail" hidden></div>
    </div>
    <p class="pd-legend"><span class="pd-key new"></span> New in this chapter · <span class="pd-key buy">AH</span> not from a quest: buy, craft or get it from a vendor · <b>Click a slot</b> to see every other way to fill it.</p>`;

  function slotHTML(key, it, fresh) {
    const [label, tex] = SLOTS[key];
    const on = picked === key ? " picked" : "";
    if (!it) return `<button type="button" class="gslot empty${on}" data-slot="${key}" aria-label="${label}: empty"><img src="${IMG}${tex}.jpg" alt="" draggable="false"></button>`;
    const badge = it.fill ? `<span class="gbadge">${BADGE[it.src[0]]}</span>` : "";
    return `<button type="button" class="gslot q${it.q}${fresh ? " new" : ""}${it.fill ? " fill" : ""}${on}" data-slot="${key}" aria-label="${label}: ${it.n}">${WF.icon(it.i, "ico")}${badge}</button>`;
  }

  /* short stat line: "+6 Intellect · +4 Stamina · 24 Armor" */
  function brief(it) {
    return it.lines.map((l) => l
      .replace(/^Equip: Increases damage and healing done by magical spells and effects by up to (\d+)\.$/, "+$1 spell power")
      .replace(/^Equip: Increases damage done by (\w+) spells and effects by up to (\d+)\.$/, "+$2 $1 spell damage")
      .replace(/^Equip: \+(\d+) Attack Power\.$/, "+$1 attack power")
      .replace(/^Equip: Improves your chance to get a critical strike by (\d+)%\.$/, "+$1% crit")
      .replace(/^Equip: Improves your chance to hit by (\d+)%\.$/, "+$1% hit")
      .replace(/^\(([\d.]+) damage per second\)$/, "$1 DPS")
      .replace(/^Equip: .*/, "+ special effect"))
      .filter((l) => /^\+|DPS$|^\d+ Armor$/.test(l))
      .join(" · ");
  }

  let worn = {};
  let shownLevel = 1;
  function draw() {
    /* Following the Quest Guide: what you've earned on the steps before this one; this step's own
       rewards are listed apart, because you only get them when you finish it. With the slider:
       everything from the steps you've fully finished by that level. */
    const cur = window.currentStepIndex ? window.currentStepIndex() : 0;
    const upTo = follow ? cur - 1 : lastStepFor(level);
    const here = follow ? cur : Math.max(0, upTo);
    const c = CHAPTERS[Math.max(0, CHAPTERS.findIndex((ch) => here >= ch.from && here <= ch.to))];
    const from = c.from;
    shownLevel = level;
    worn = setAt(upTo, level);
    pending = follow ? items.filter((it) => it.s === cur && !it.clear) : [];
    const fresh = (it) => it && !it.fill && it.s >= from && it.s <= upTo;
    $("#pdleft").innerHTML = LEFT.map((k) => slotHTML(k, worn[k], fresh(worn[k]))).join("");
    $("#pdright").innerHTML = RIGHT.map((k) => slotHTML(k, worn[k], fresh(worn[k]))).join("");
    $("#pdbottom").innerHTML = BOTTOM.map((k) => slotHTML(k, worn[k], fresh(worn[k]))).join("");
    $("#pdlevel").innerHTML = `Level ${level} <span class="cls" style="color:${char.color}">${char.cls}</span>`;
    $("#gearslider").value = level;
    $("#gearlevel").textContent = level;
    $("#pdstatus").innerHTML = follow
      ? `Matches your Quest Guide: what you have when you start step ${cur + 1}, ${STEPS[cur].title} (${c.name}).`
      : `Showing level ${level}: gear from every step you've finished by then. Open another step in the Quest Guide and this follows it again.`;

    /* stat totals from everything worn */
    const tot = {};
    let armor = 0;
    Object.values(worn).forEach((it) => it.lines.forEach((l) => {
      const st = /^\+(\d+) (\w+)$/.exec(l);
      if (st) tot[st[2]] = (tot[st[2]] || 0) + +st[1];
      const ar = /^(\d+) Armor$/.exec(l);
      if (ar) armor += +ar[1];
    }));
    const order = GEAR.stats || ["Intellect", "Agility", "Stamina", "Spirit", "Strength"];
    const stats = order.filter((k) => tot[k]).map((k) => `<li><span>${k}</span><b>+${tot[k]}</b></li>`).join("");
    $("#pdtotals").innerHTML = `<h4>Your gear adds</h4><ul>${stats}${armor ? `<li><span>Armor</span><b>${armor}</b></li>` : ""}</ul>`
      + (stats || armor ? "" : `<p class="pd-none">Nothing yet: your first quest rewards come soon.</p>`);

    const newOnes = items.filter((it) => it.s >= from && it.s <= upTo && worn[it.slot] === it);
    $("#pdnew").innerHTML = (pending.length
      ? `<h4>This step gives you</h4><ul>${pending.map((it, n) => `<li><button type="button" class="pd-row soon" data-slot="${it.slot}" data-pend="${n}">${WF.icon(it.i, "mini")}<span class="q${it.q}">${it.n}</span><small>${SLOTS[it.slot][0]}</small></button></li>`).join("")}</ul>`
      : "")
      + `<h4>New in ${c.name}</h4>`
      + (newOnes.length
        ? `<ul>${newOnes.map((it) => `<li><button type="button" class="pd-row" data-slot="${it.slot}">${WF.icon(it.i, "mini")}<span class="q${it.q}">${it.n}</span></button></li>`).join("")}</ul>`
        : `<p class="pd-none">No new pieces here yet. Keep what you have.</p>`);

    /* worth buying: a clear upgrade over a quest item you can get from the auction house, a trainer's recipe or a vendor */
    const buys = [];
    const seen = new Set();
    [...LEFT, ...RIGHT, ...BOTTOM].forEach((key) => {
      const cur = worn[key];
      if (!cur || cur.fill || (key === "off" && twoHanded(worn.main)) || pending.some((it) => it.slot === key)) return;
      const curSc = cur.sc || 0;
      const best = pool
        .filter((p) => BUYABLE.includes(p.src[0]) && p.req <= level && fitsSlot(p, key, worn, level) && !seen.has(p.n)
          && !Object.values(worn).some((w) => w.n === p.n))
        .sort((a, b) => b.sc - a.sc)[0];
      if (best && best.sc - curSc > Math.max(1.5, curSc * .15)) { seen.add(best.n); buys.push({ key, p: best, gain: best.sc - curSc }); }
    });
    buys.sort((a, b) => b.gain - a.gain);
    $("#pdbuy").innerHTML = buys.length
      ? `<h4>Worth buying now</h4><ul>${buys.slice(0, 5).map(({ key, p }) =>
        `<li><button type="button" class="pd-row" data-slot="${key}" data-pool="${p.id}">${WF.icon(p.i, "mini")}<span class="q${p.q}">${p.n}</span><small>${SLOTS[key][0]} · ${KIND[p.src[0]]}</small></button></li>`).join("")}</ul>`
      : "";

    drawDetail();
  }

  /* ---------- options for one slot, under the window ---------- */
  function drawDetail() {
    const box = $("#pddetail");
    if (!picked || !SLOTS[picked]) { box.hidden = true; return; }
    const key = picked;
    const L = shownLevel;
    const cur = worn[key];
    const curSc = cur ? cur.sc || 0 : 0;
    const groups = groupsFor(key, worn, L);
    const opts = pool.filter((p) => fitsSlot(p, key, worn, L) && p.req >= L - 12 && p.req <= L + 3 && (!cur || p.id !== cur.id));
    // the best two of each source you can use now, and the best of each coming in the next 3 levels
    const pick = [];
    Object.keys(KIND).forEach((k) => {
      const mine = opts.filter((p) => p.src[0] === k).sort((a, b) => b.sc - a.sc);
      pick.push(...mine.filter((p) => p.req <= L).slice(0, 2), ...mine.filter((p) => p.req > L).slice(0, 1));
    });
    pick.sort((a, b) => (a.req > L) - (b.req > L) || b.sc - a.sc);
    const cmp = (p) => {
      if (!cur) return `<span class="cmp up">new</span>`;
      const d = p.sc - curSc;
      return Math.abs(d) < .5 ? `<span class="cmp eq">about the same</span>` : d > 0 ? `<span class="cmp up">▲ better</span>` : `<span class="cmp down">▼ worse</span>`;
    };
    const row = (p, here) => `
      <li class="${here ? "here" : ""}${p.req > L ? " soon" : ""}">
        <button type="button" class="pdd-item" ${here ? `data-slot="${key}"` : `data-pool="${p.id}"`}>${WF.icon(p.i, "mini")}<span class="q${p.q}">${p.n}</span></button>
        <span class="pdd-tags">${here ? `<span class="cmp eq">wearing</span>` : cmp(p)}<span class="kind k-${here ? (p.fill ? p.src[0] : "quest") : p.src[0]}">${here ? (p.fill ? KIND[p.src[0]] : "Quest") : KIND[p.src[0]]}</span>${p.req > L ? `<span class="soonlv">from level ${p.req}</span>` : ""}</span>
        <span class="pdd-stats">${brief(p) || "&nbsp;"}</span>
        <span class="pdd-src">${here ? p.from : p.src[1]}</span>
      </li>`;
    const none = !groups.length
      ? `<p class="pd-none">Shirts and tabards are just for looks.</p>`
      : key === "off" && twoHanded(worn.main) ? `<p class="pd-none">Your ${worn.main.n} takes both hands. An off-hand item needs a one-handed weapon in your main hand.</p>` : "";
    box.innerHTML = `
      <div class="pdd-head"><b>${SLOTS[key][0]}</b><span>options at level ${L}</span><button type="button" class="pdd-close" aria-label="Close">×</button></div>
      ${none}
      <ol class="pdd-list">${cur ? row(cur, true) : ""}${pick.map((p) => row(p, false)).join("")}</ol>
      ${!none && !pick.length ? `<p class="pd-none">No other items for this slot near level ${L}.</p>` : ""}
      <p class="pdd-help"><b>Quest</b> and <b>Dungeon</b> items you earn; <b>Crafted</b> ones you or another player make (Tailoring, Leatherworking…); <b>Auction House</b> items other players sell in any big city. Prices change, so compare before you buy.</p>`;
    box.hidden = false;
  }

  function showLevel(L) {
    follow = false;
    level = Math.max(1, Math.min(60, L));
    hideTip();
    draw();
  }
  function followGuide() {
    follow = true;
    level = window.currentStepLevel ? window.currentStepLevel() : 1;
    draw();
  }

  $("#gearslider").addEventListener("input", (e) => showLevel(+e.target.value));
  $("#gearminus").addEventListener("click", () => showLevel(level - 1));
  $("#gearplus").addEventListener("click", () => showLevel(level + 1));
  document.addEventListener("wf:step", followGuide);

  /* ---------- item tooltip, styled like the game's ---------- */
  const tip = document.createElement("div");
  tip.className = "spelltip itemtip";
  tip.hidden = true;
  tip.setAttribute("role", "tooltip");
  document.body.append(tip);

  function showTip(el) {
    const key = el.dataset.slot;
    const it = el.dataset.pool ? poolById[el.dataset.pool] : el.dataset.pend ? pending[+el.dataset.pend] : worn[key];
    if (!it) {
      const label = SLOTS[key][0];
      const armorSlot = ["head", "shoulder", "chest", "wrist", "hands", "waist", "legs", "feet"].includes(key);
      const hint = (GEAR.empty && GEAR.empty[key])
        || (key === "off" && twoHanded(worn.main) ? "Empty: your two-handed weapon takes both hands."
        : key === "shirt" || key === "tabard" ? "Just for looks: wear any you like."
        : `Nothing from this guide's quests or the auction house list by now. Wear the best ${armorSlot && GEAR.armor ? `<b>${GEAR.armor}</b> ` : ""}piece you find.`);
      tip.innerHTML = `<div class="tt-name">${label}</div><div class="tt-text">${hint}</div>`;
    } else {
      const fromPool = !!it.src && (el.dataset.pool || it.fill);
      const where = fromPool ? it.src[1] : it.from;
      const foot = fromPool
        ? `${KIND[it.src[0]]} · needs level ${it.req} · ${QN[it.q]}`
        : `Quest Guide step ${it.s + 1} · level ${STEPS[it.s].lv} · ${QN[it.q]}`;
      tip.innerHTML = `<div class="it-head">${WF.icon(it.i, "tt-ico big")}<b class="q${it.q}">${it.n}</b></div>
        <div class="it-lines">${it.lines.map((l) => `<div class="${/^(\+|Equip:|Use:|Chance on hit:)/.test(l) ? "gr" : ""}">${l}</div>`).join("")}</div>
        <div class="it-from"><b>From:</b> ${where}</div>
        <div class="it-step">${foot}</div>`;
    }
    tip.hidden = false;
    const r = el.getBoundingClientRect();
    const right = r.left + r.width / 2 > window.innerWidth / 2;
    let left = right ? r.left - tip.offsetWidth - 10 : r.right + 10;
    if (left < 8 || left + tip.offsetWidth > window.innerWidth - 8) left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, r.left + r.width / 2 - tip.offsetWidth / 2));
    let top = r.top;
    if (top + tip.offsetHeight > window.innerHeight - 8) top = Math.max(8, window.innerHeight - tip.offsetHeight - 8);
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.hidden = true; }

  const target = (e) => e.target.closest("#gear .gslot, #gear .pd-row, #gear .pdd-item");
  box.addEventListener("mouseover", (e) => { const t = target(e); if (t) showTip(t); });
  box.addEventListener("mouseout", (e) => { if (target(e) && !target(e).contains(e.relatedTarget)) hideTip(); });
  box.addEventListener("focusin", (e) => { const t = target(e); if (t) showTip(t); });
  box.addEventListener("focusout", hideTip);
  box.addEventListener("click", (e) => {
    if (e.target.closest(".pdd-close")) { picked = null; draw(); return; }
    const t = target(e);
    if (!t) return;
    if (t.matches(".gslot, .pd-row")) {          // open that slot's options
      picked = picked === t.dataset.slot && t.matches(".gslot") ? null : t.dataset.slot;
      draw();
      const again = $(`#gear .gslot[data-slot="${t.dataset.slot}"]`);
      if (again) showTip(again);
      if (picked && t.matches(".pd-row")) $("#pddetail").scrollIntoView({ block: "nearest" });
      return;
    }
    showTip(t);
  });
  document.addEventListener("click", (e) => { if (!target(e)) hideTip(); });
  window.addEventListener("scroll", hideTip, { passive: true });
  document.addEventListener("wf:tab", hideTip);

  followGuide();
})();
