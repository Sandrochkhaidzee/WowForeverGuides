/* =========================================================
   Landing page: character cards, "continue", class chooser.
   Everything comes from assets/js/characters.js, so a new
   character shows up here without touching this file.
   ========================================================= */

(function () {
  "use strict";
  const WF = window.WF;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };

  /* progress for one character's leveling guide: { step, total?, level?, title? } or null */
  function progress(c) {
    const p = read("wf.progress." + c.id);
    if (p && typeof p.step === "number") return p;
    const old = read(c.saveKeys.guide);          // saved before the site layer existed
    if (old && typeof old.step === "number" && old.step > 0) return { step: old.step };
    return null;
  }

  const R = 46, LEN = 2 * Math.PI * R;
  const DIFF = { 1: "Easy to learn", 2: "Easy to learn, a bit more to master", 3: "Takes some practice" };

  function card(c) {
    const p = progress(c);
    const frac = p && p.total ? (p.step + 1) / p.total : 0;
    const started = p && p.step > 0;
    return `
      <article class="frame card" data-tilt data-style="${c.style}" id="card-${c.id}"
               style="--class:${c.color};--glow:${c.glow};--orb:${c.orb}">
        <span class="glare" aria-hidden="true"></span>
        <div class="card-head">
          <div class="portrait">
            <img src="${WF.ICON_URL}${c.icon}.jpg" alt="" onerror="WF.iconErr(this)">
            ${frac ? `<svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="bg" cx="50" cy="50" r="${R}"/>
              <circle class="fg" cx="50" cy="50" r="${R}" stroke-dasharray="${LEN}" stroke-dashoffset="${LEN}" data-off="${LEN * (1 - frac)}"/></svg>` : ""}
          </div>
          <div>
            <h3>${esc(c.cls)}</h3>
            <p class="race">${esc(c.race)} · ${esc(c.faction)} · ${esc(c.role)}</p>
            <div class="diff" title="${DIFF[c.difficulty] || ""}">${[1, 2, 3].map((n) => `<i class="${n <= c.difficulty ? "on" : ""}"></i>`).join("")}<span>${DIFF[c.difficulty] || ""}</span></div>
          </div>
        </div>
        <div class="card-body">
          <p>${esc(c.blurb)}</p>
          <ul class="perks">${c.perks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          <div class="links">
            <a class="wowbtn" href="${WF.href(c, "guide")}">Leveling Guide <small>${started ? `continue · step ${p.step + 1} ›` : "start here ›"}</small></a>
            <a class="wowbtn alt" href="${WF.href(c, "professions")}">Professions <small>skill 1–300 ›</small></a>
            <a class="wowbtn alt" href="${WF.href(c, "addons")}">Addons <small>optional extras ›</small></a>
          </div>
        </div>
      </article>`;
  }

  $("#cards").innerHTML = WF.characters.map(card).join("");

  /* fill the progress rings once they're on screen */
  requestAnimationFrame(() => setTimeout(() => {
    document.querySelectorAll(".ring .fg").forEach((c) => c.setAttribute("stroke-dashoffset", c.dataset.off));
  }, 350));

  /* ---------- continue where you left off ---------- */
  const started = WF.characters.map((c) => [c, progress(c)]).filter(([, p]) => p && p.step > 0)
    .sort((a, b) => (b[1].at || 0) - (a[1].at || 0));
  if (started.length) {
    $("#contlist").innerHTML = started.map(([c, p]) => {
      const pct = p.total ? Math.round(((p.step + 1) / p.total) * 100) : 0;
      return `<a class="cont" href="${WF.href(c, "guide")}" style="--class:${c.color};--glow:${c.glow}">
        <span class="wf-mini" style="--orb:${c.orb}"><img src="${WF.ICON_URL}${c.icon}.jpg" alt="" onerror="WF.iconErr(this)"></span>
        <span style="flex:1;min-width:0">
          <span class="who">${esc(c.name)}</span>
          <span class="what" style="display:block">Step ${p.step + 1}${p.total ? ` of ${p.total}` : ""}${p.level ? ` · Level ${p.level}` : ""}${p.title ? ` · ${esc(p.title)}` : ""}</span>
          ${pct ? `<span class="mini-bar" style="display:block"><i style="--w:${pct}%"></i></span>` : ""}
        </span>
        <span class="go">Continue</span></a>`;
    }).join("");
    $("#continue").hidden = false;
  }

  /* ---------- help me choose ---------- */
  const answer = $("#answer");
  document.getElementById("opts").addEventListener("click", (e) => {
    const b = e.target.closest(".opt");
    if (!b) return;
    document.querySelectorAll(".opt").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    const picks = WF.characters.filter((c) => c.style === b.dataset.style);
    if (!picks.length) { answer.textContent = "No guide for that style yet. More characters are coming!"; return; }
    answer.innerHTML = "Try the " + picks.map((c) =>
      `<a href="${WF.href(c, "guide")}" style="color:${c.color}">${esc(c.name)}</a>`).join(" or ") +
      ". " + esc(picks[0].perks.join(", ")) + ".";
    answer.classList.remove("show"); void answer.offsetWidth; answer.classList.add("show");
    const el = document.getElementById("card-" + picks[0].id);
    if (el) {
      el.classList.remove("pick"); void el.offsetWidth; el.classList.add("pick");
      if (WF.sparksFrom) WF.sparksFrom(b, 18);
    }
  });
})();
