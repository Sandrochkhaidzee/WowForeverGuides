/* =========================================================
   Talents tab: the game's talent window (press N), one point at a time.

   Reads:
     TALENT_TREE  from data/talents/<class>.js (made from the game files by
                  tools/extract-talents.py): the three trees, where each talent
                  sits, its ranks, arrows and what every rank does.
     TALENTS      from the character's data/guide.js: the build, as rows of
                  [levels, talent name, how many clicks, plain-words note].
   Like the Gear and Action Bars tabs, the level follows your Quest Guide step;
   Back / Next, the slider or the list under the trees show another level.
   ========================================================= */
(() => {
  const box = document.getElementById("talents");
  if (!box || typeof TALENT_TREE === "undefined" || typeof TALENTS === "undefined") return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const BG = new URL("../img/talents/", document.currentScript.src).href;
  const FIRST = 10, LAST = 60;

  /* ---------- the trees ---------- */
  const tabs = TALENT_TREE.tabs;
  const byId = {};
  tabs.forEach((tab, t) => tab.talents.forEach((tl) => { tl.tab = t; byId[tl.id] = tl; }));
  const findTalent = (name) => {
    const want = name.toLowerCase();
    for (const tab of tabs) for (const tl of tab.talents) if (tl.n.toLowerCase() === want) return tl;
    return null;
  };

  /* ---------- the build: one point per level ---------- */
  const lvNums = (s) => String(s).split(/[–-]/).map((x) => parseInt(x, 10)).filter((x) => !isNaN(x));
  const picks = [];                     // picks[k] = { level, tl, rank, row }
  const rows = TALENTS.map((r, k) => {
    const [lo, hi = lo] = lvNums(r[0]);
    const name = r[1].replace(/\s*\(.*?\)\s*$/, "");
    const tl = findTalent(name);
    if (!tl) console.warn("Talents: no talent called", name);
    const row = { k, lo, hi, name, tl, how: r[2], note: r[3] };
    for (let L = lo; L <= hi && tl; L++) {
      const rank = picks.filter((p) => p.tl === tl).length + 1;
      if (rank > tl.max) console.warn("Talents:", name, "has only", tl.max, "ranks");
      picks.push({ level: L, tl, rank, row });
    }
    return row;
  });
  /* plain-words note for a talent: the first guide row that has one */
  const noteFor = (tl) => (rows.find((r) => r.tl === tl && r.note) || {}).note || "";
  const levelsFor = (tl) => picks.filter((p) => p.tl === tl).map((p) => p.level);
  const pickAt = (L) => picks.find((p) => p.level === L);

  /* ranks in every talent once you've spent the points up to level L */
  function ranksAt(L) {
    const r = {};
    picks.forEach((p) => { if (p.level <= L) r[p.tl.id] = p.rank; });
    return r;
  }
  const spentIn = (ranks, t) => tabs[t].talents.reduce((n, tl) => n + (ranks[tl.id] || 0), 0);
  const needFor = (tl) => tl.need != null ? tl.need : tl.r * 5;
  function isOpen(tl, ranks) {
    if (spentIn(ranks, tl.tab) < needFor(tl)) return false;
    if (tl.req && (ranks[tl.req] || 0) < byId[tl.req].max) return false;
    return true;
  }

  /* ---------- page ---------- */
  const tabName = (t) => tabs[t].name;
  const rowsOf = Math.max(...tabs.flatMap((tab) => tab.talents.map((tl) => tl.r))) + 1;

  box.innerHTML = `
    <div class="tstep" id="tstep" aria-live="polite"></div>
    <div class="levelpick">
      <button type="button" class="wowbtn small" id="tminus" aria-label="One level lower">−</button>
      <label for="tslider">Level <b id="tlevel">${FIRST}</b></label>
      <input type="range" id="tslider" min="${FIRST}" max="${LAST}" value="${FIRST}">
      <button type="button" class="wowbtn small" id="tplus" aria-label="One level higher">+</button>
    </div>
    <p class="levelnote" id="tnote"></p>
    <div class="tw">
      <div class="tw-bar">
        <span class="tw-title">Talents</span>
        <span class="tw-count">Points spent <b id="tspent">0</b><small> / ${picks.length}</small></span>
      </div>
      <div class="tw-pick" role="tablist" aria-label="Talent trees">${tabs.map((tab, t) =>
        `<button type="button" role="tab" data-tree="${t}">${WF.icon(tab.i, "")}<span>${tab.name}</span><b data-spent="${t}">0</b></button>`).join("")}</div>
      <div class="tw-trees">${tabs.map((tab, t) => `
        <section class="tree" data-tree="${t}" style="--bg:url('${BG}${tab.bg}.jpg')" aria-label="${tab.name} talents">
          <header class="tree-head">
            <span class="tree-ico">${WF.icon(tab.i, "")}<b data-spent="${t}">0</b></span>
            <h4>${tab.name}</h4>
          </header>
          <div class="tree-grid" style="--rows:${rowsOf}">
            ${tab.talents.filter((tl) => tl.req && byId[tl.req]).map((tl) => arrowHTML(byId[tl.req], tl)).join("")}
            ${tab.talents.map((tl) => `<button type="button" class="tnode" data-id="${tl.id}" style="--r:${tl.r};--c:${tl.c}">${WF.icon(tl.i, "")}<span class="trank"></span></button>`).join("")}
          </div>
        </section>`).join("")}
      </div>
    </div>
    <p class="tlegend"><span class="tkey full"></span> Full <span class="tkey some"></span> Some points <span class="tkey now"></span> This level's point <span class="tkey plan"></span> Comes later in this build · hover over or tap a talent to see what it does.</p>
    <h3 class="tplan-h">Every point, level by level</h3>
    <ol class="tplan" id="tplan">${rows.filter((r) => r.tl).map((r) => `
      <li><button type="button" data-level="${r.lo}">
        <span class="tp-lv">${r.lo === r.hi ? r.lo : `${r.lo}–${r.hi}`}</span>
        ${WF.icon(r.tl.i, "tp-ico")}
        <span class="tp-txt"><b>${r.tl.n}</b> <small>${tabName(r.tl.tab)} · ${r.how}</small></span>
      </button></li>`).join("")}
    </ol>`;

  function arrowHTML(from, to) {
    if (from.c === to.c && to.r > from.r) return `<i class="tarrow down" data-from="${from.id}" style="--c:${from.c};--r1:${from.r};--r2:${to.r}"></i>`;
    if (from.r === to.r) return `<i class="tarrow side" data-from="${from.id}" style="--r:${from.r};--c1:${Math.min(from.c, to.c)};--c2:${Math.max(from.c, to.c)}"></i>`;
    return "";
  }

  /* ---------- drawing a level ---------- */
  let follow = true;
  let level = FIRST;
  let guideLevel = 1;
  let shownTree = null;                 // phones: which tree is on screen

  function draw() {
    const ranks = ranksAt(level);
    const now = pickAt(level);
    const later = new Set(picks.filter((p) => p.level > level).map((p) => p.tl.id));

    $$(".tnode", box).forEach((el) => {
      const tl = byId[el.dataset.id];
      const r = ranks[tl.id] || 0;
      const open = isOpen(tl, ranks);
      el.classList.toggle("full", r === tl.max);
      el.classList.toggle("some", r > 0 && r < tl.max);
      el.classList.toggle("open", r === 0 && open);
      el.classList.toggle("locked", r === 0 && !open);
      el.classList.toggle("now", !!now && now.tl === tl);
      el.classList.toggle("plan", r < tl.max && later.has(tl.id) && !(now && now.tl === tl));
      $(".trank", el).textContent = r ? r : "";
      el.setAttribute("aria-label", `${tl.n}, rank ${r} of ${tl.max}${now && now.tl === tl ? ", this level's point" : ""}`);
    });
    $$(".tarrow", box).forEach((a) => a.classList.toggle("lit", (ranks[a.dataset.from] || 0) >= byId[a.dataset.from].max));
    tabs.forEach((_, t) => $$(`[data-spent="${t}"]`, box).forEach((b) => { b.textContent = spentIn(ranks, t); }));
    $("#tspent").textContent = Object.values(ranks).reduce((a, b) => a + b, 0);

    /* the step card: this level's click */
    const prev = level > FIRST, next = level < LAST;
    const nav = (dir, on) => `<button type="button" class="wowbtn small tnav" data-go="${dir}" ${on ? "" : "disabled"} aria-label="${dir < 0 ? "Previous" : "Next"} level">${dir < 0 ? "‹ Back" : "Next ›"}</button>`;
    let body;
    if (now) {
      const tl = now.tl;
      const note = now.row.note || noteFor(tl);
      body = `<div class="ts-ico">${WF.icon(tl.i, "")}<b>${now.rank}/${tl.max}</b></div>
        <div class="ts-txt">
          <small>Level ${level} · point ${picks.indexOf(now) + 1} of ${picks.length}</small>
          <h4>Click <b>${tl.n}</b> <span>(${tabName(tl.tab)} tree)</span></h4>
          <p>${now.rank === 1 ? "First point" : `Point ${now.rank} of ${tl.max}`}${now.rank === tl.max && tl.max > 1 ? ": it's full now" : ""}. ${note}</p>
        </div>`;
    } else {
      body = `<div class="ts-txt"><small>Level ${level}</small><h4>No talent point at this level</h4></div>`;
    }
    $("#tstep").innerHTML = `${nav(-1, prev)}<div class="ts-main">${body}</div>${nav(1, next)}`;

    $("#tslider").value = level;
    $("#tlevel").textContent = level;
    $("#tnote").innerHTML = follow
      ? (guideLevel < FIRST
        ? `You're level ${guideLevel} on the Quest Guide. Your first talent point comes at level ${FIRST}: this is what you'll click then.`
        : `Matches your Quest Guide: level ${guideLevel}. Points from earlier levels are already in.`)
      : `Showing level ${level}. <button type="button" class="linkish" id="tback">Back to my Quest Guide level${guideLevel >= FIRST ? ` (${guideLevel})` : ""}</button>`;

    /* phones show one tree: the one this level's point goes into */
    if (now && (follow || shownTree === null)) shownTree = now.tl.tab;
    if (shownTree === null) shownTree = 0;
    showTree(shownTree);

    /* the list under the trees */
    $$("#tplan button", box).forEach((b) => {
      const r = rows.find((x) => x.lo === +b.dataset.level);
      const li = b.parentElement;
      li.classList.toggle("done", r.hi < level);
      li.classList.toggle("current", r.lo <= level && level <= r.hi);
    });
  }

  function showTree(t) {
    shownTree = t;
    $$(".tw-pick button", box).forEach((b) => {
      const on = +b.dataset.tree === t;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", on);
    });
    $$(".tree", box).forEach((s) => s.classList.toggle("shown", +s.dataset.tree === t));
  }

  function showLevel(L, keepTree) {
    follow = false;
    level = Math.max(FIRST, Math.min(LAST, L));
    if (!keepTree) { const p = pickAt(level); if (p) shownTree = p.tl.tab; }
    hideTip();
    draw();
  }
  function followGuide() {
    follow = true;
    guideLevel = window.currentStepLevel ? window.currentStepLevel() : 1;
    level = Math.max(FIRST, Math.min(LAST, guideLevel));
    draw();
  }

  $("#tslider").addEventListener("input", (e) => showLevel(+e.target.value));
  $("#tminus").addEventListener("click", () => showLevel(level - 1));
  $("#tplus").addEventListener("click", () => showLevel(level + 1));
  box.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { showLevel(level + +go.dataset.go); return; }
    if (e.target.closest("#tback")) { followGuide(); return; }
    const plan = e.target.closest("#tplan button");
    if (plan) {
      showLevel(+plan.dataset.level);
      $(".tw", box).scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }
    const tree = e.target.closest(".tw-pick button");
    if (tree) showTree(+tree.dataset.tree);
  });
  document.addEventListener("keydown", (e) => {
    if (!$("#panel-talents").classList.contains("on")) return;
    if (e.target instanceof Element && e.target.matches("input, textarea") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "ArrowRight") { showLevel(level + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { showLevel(level - 1); e.preventDefault(); }
  });
  document.addEventListener("wf:step", followGuide);

  /* ---------- tooltip, like the game's ---------- */
  const tip = document.createElement("div");
  tip.className = "spelltip talenttip";
  tip.hidden = true;
  tip.setAttribute("role", "tooltip");
  document.body.append(tip);

  const para = (s) => s.split("\n").map((x) => `<span>${x}</span>`).join("");
  function showTip(el) {
    const tl = byId[el.dataset.id];
    const ranks = ranksAt(level);
    const r = ranks[tl.id] || 0;
    const reqs = [];
    const need = needFor(tl);
    if (need) reqs.push([spentIn(ranks, tl.tab) >= need, `Requires ${need} points in ${tabName(tl.tab)} Talents`]);
    if (tl.req) reqs.push([(ranks[tl.req] || 0) >= byId[tl.req].max, `Requires ${byId[tl.req].max} point${byId[tl.req].max > 1 ? "s" : ""} in ${byId[tl.req].n}`]);
    const lv = levelsFor(tl);
    /* 21, 22, 23, 24, 28 -> "levels 21–24 and 28" */
    const spans = [];
    lv.forEach((L) => { const s = spans[spans.length - 1]; if (s && s[1] === L - 1) s[1] = L; else spans.push([L, L]); });
    const words = spans.map(([a, b]) => a === b ? a : `${a}–${b}`);
    const when = `level${lv.length > 1 ? "s" : ""} ${words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}` : words[0]}`;
    const plan = lv.length
      ? `<div class="tt-plan"><b>This build:</b> ${lv.length === tl.max ? "all" : lv.length} point${lv.length > 1 ? "s" : ""} at ${when}${noteFor(tl) ? `. ${noteFor(tl)}` : ""}</div>`
      : `<div class="tt-plan skip">Not part of this build.</div>`;
    tip.innerHTML = `<div class="tt-name">${tl.n}</div>
      <div class="tt-rank">Rank ${r}/${tl.max}</div>
      ${reqs.filter(([ok]) => !ok || r === 0).map(([ok, t]) => `<div class="tt-req${ok ? "" : " no"}">${t}</div>`).join("")}
      <div class="tt-desc">${para(tl.d[Math.max(0, r - 1)])}</div>
      ${r > 0 && r < tl.max ? `<div class="tt-next">Next rank:</div><div class="tt-desc">${para(tl.d[r])}</div>` : ""}
      ${plan}`;
    tip.hidden = false;
    const b = el.getBoundingClientRect();
    let left = b.right + 10;
    if (left + tip.offsetWidth > window.innerWidth - 8) left = b.left - tip.offsetWidth - 10;
    if (left < 8) left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, b.left + b.width / 2 - tip.offsetWidth / 2));
    let top = b.top;
    if (left < b.right && left + tip.offsetWidth > b.left) top = b.bottom + 8;        // below the icon on narrow screens
    if (top + tip.offsetHeight > window.innerHeight - 8) top = Math.max(8, (left < b.right && left + tip.offsetWidth > b.left ? b.top - tip.offsetHeight - 8 : window.innerHeight - tip.offsetHeight - 8));
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.hidden = true; }

  const node = (e) => e.target instanceof Element && e.target.closest("#talents .tnode");
  box.addEventListener("mouseover", (e) => { const n = node(e); if (n) showTip(n); });
  box.addEventListener("mouseout", (e) => { const n = node(e); if (n && !n.contains(e.relatedTarget)) hideTip(); });
  box.addEventListener("focusin", (e) => { const n = node(e); if (n) showTip(n); });
  box.addEventListener("focusout", hideTip);
  box.addEventListener("click", (e) => { const n = node(e); if (n) showTip(n); });
  document.addEventListener("click", (e) => { if (!node(e)) hideTip(); });
  window.addEventListener("scroll", hideTip, { passive: true });
  document.addEventListener("wf:tab", hideTip);

  followGuide();
})();
