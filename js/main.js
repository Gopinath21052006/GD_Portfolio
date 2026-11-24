(() => {
  "use strict";
  const SITE = window.SITE, PROJECTS = window.PROJECTS, SKILLS = window.SKILLS, TIMELINE = window.TIMELINE;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny helpers ---------- */
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const extAttrs = 'target="_blank" rel="noopener noreferrer"';

  function mediaHTML(p, lazy = true) {
    const img = p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" ${lazy ? 'loading="lazy"' : ""} decoding="async" onerror="this.remove()">`
      : "";
    const vid = p.video
      ? `<video class="proj__video" muted loop playsinline preload="metadata">
           <source src="${esc(p.video)}" type="video/${p.video.endsWith('.webm') ? 'webm' : 'mp4'}">
           ${p.video.endsWith('.mp4') ? `<source src="${esc(p.video.replace(/\.mp4$/, '.webm'))}" type="video/webm">` : ''}
         </video>
         <span class="proj__badge-video" aria-hidden="true">Live Preview</span>`
      : `<span class="proj__badge-ongoing" aria-hidden="true"><span class="proj__dot-ongoing"></span>BUILD ONGOING</span>`;
    const hudCorners = `
      <div class="proj__hud-frame" aria-hidden="true">
        <span class="proj__hud-corner proj__hud-corner--tl"></span>
        <span class="proj__hud-corner proj__hud-corner--tr"></span>
        <span class="proj__hud-corner proj__hud-corner--bl"></span>
        <span class="proj__hud-corner proj__hud-corner--br"></span>
      </div>`;
    return `<div class="art ${esc(p.art)}"></div>${img}${vid}${hudCorners}`;
  }

  /* ---------- game UI sound effects (Web Audio API) ---------- */
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem("gamedev_sfx") === "true";

  function getAudioCtx() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, duration, type = "sine", gainVal = 0.08) {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  }

  function sfxHover() {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1480, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (_) {}
  }

  function sfxClick() {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      // High-tech crisp two-tone click
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(960, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.04);
      gain1.gain.setValueAtTime(0.05, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.04);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(320, ctx.currentTime + 0.015);
      gain2.gain.setValueAtTime(0.04, ctx.currentTime + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.015);
      osc2.stop(ctx.currentTime + 0.06);
    } catch (_) {}
  }

  function sfxShockwave() {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.38);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.38);
    } catch (_) {}
  }

  function sfxModalOpen() {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }

  function initAudioToggle() {
    const btn = $("#sfxToggle");
    if (!btn) return;
    const updateUI = () => {
      btn.classList.toggle("is-active", sfxEnabled);
      const icon = $(".sfx-icon", btn);
      const label = $(".sfx-label", btn);
      if (icon) icon.textContent = sfxEnabled ? "🔊" : "🔈";
      if (label) label.textContent = sfxEnabled ? "SFX: ON" : "SFX: OFF";
    };
    updateUI();
    btn.addEventListener("click", () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem("gamedev_sfx", sfxEnabled);
      updateUI();
      if (sfxEnabled) {
        getAudioCtx();
        sfxClick();
      }
    });
  }

  /* ---------- static content from data ---------- */
  function applySite() {
    $$(".js-resume").forEach(a => {
      if (SITE.resume) {
        a.href = SITE.resume;
        a.hidden = false;
      } else {
        a.hidden = true;
      }
    });
    const img = $("#profileImg");
    if (SITE.profileImage) {
      img.src = SITE.profileImage;
      img.addEventListener("error", () => img.remove());
    } else img.remove();
    $("#year").textContent = new Date().getFullYear();

    const links = [];
    if (SITE.email) links.push(`<a class="btn btn--primary" href="mailto:${esc(SITE.email)}">Email me</a>`);
    links.push(`<a class="btn ${SITE.email ? "btn--ghost" : "btn--primary"}" href="${esc(SITE.linkedin)}" ${extAttrs}>LinkedIn</a>`);
    links.push(`<a class="btn btn--ghost" href="${esc(SITE.github)}" ${extAttrs}>GitHub</a>`);
    if (SITE.resume) links.push(`<a class="btn btn--ghost js-resume" href="${esc(SITE.resume)}" ${extAttrs} download="GOPINATH_R_Game_developer.pdf">Resume (PDF) ↗</a>`);
    $("#contactLinks").innerHTML = links.join("");
  }

  function renderSkills() {
    $("#skillsGrid").innerHTML = SKILLS.map((g, i) => `
      <div class="skill-group reveal" style="--rd:${i * 0.1}s">
        <h3>${esc(g.group)}</h3>
        ${g.items.map(s => `
          <div class="skill">
            <span class="skill__icon" aria-hidden="true">${esc(s.abbr)}</span>
            <div><b>${esc(s.name)}</b><small>${esc(s.note)}</small></div>
          </div>`).join("")}
      </div>`).join("");
  }

  function renderTimeline() {
    $("#timeline").innerHTML = TIMELINE.map((t, i) => `
      <li class="tl reveal" style="--rd:${i * 0.08}s">
        <span class="tl__node" aria-hidden="true"><span class="tl__node-pulse"></span></span>
        <div class="tl__header">
          <span class="tl__when">${esc(t.when)}</span>
          ${t.quest ? `<span class="tl__quest">${esc(t.quest)}</span>` : ""}
        </div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
      </li>`).join("");
  }

  /* ---------- projects ---------- */
  function renderProjects() {
    const showcase = $("#showcase");
    showcase.innerHTML = PROJECTS.map(p => `
      <article class="proj reveal" data-id="${esc(p.id)}" data-filters="${esc(p.filters.join("|"))}">
        <div class="proj__media">
          ${mediaHTML(p)}
          <span class="proj__num" aria-hidden="true">${esc(p.index)}</span>
          ${(p.image || p.video) ? "" : '<span class="proj__ph">Preview coming soon</span>'}
        </div>
        <div class="proj__body">
          <p class="proj__cat">${esc(p.category)}</p>
          <h3 class="proj__title">${esc(p.title)}</h3>
          <p class="proj__sum">${esc(p.summary)}</p>
          <div class="labels">
            <span class="label">${esc(p.engine)}</span>
            <span class="label">${esc(p.languages)}</span>
          </div>
          <div class="proj__actions">
            <button class="btn btn--primary" data-open="${esc(p.id)}">View Project <span aria-hidden="true">→</span></button>
            ${p.links.slice(0, 2).map(l => `<a class="btn btn--ghost" href="${esc(l.url)}" ${extAttrs}>${esc(l.label)}</a>`).join("")}
          </div>
        </div>
      </article>`).join("");

    // Whole card opens the modal (except real links)
    showcase.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      const card = e.target.closest(".proj");
      if (card) {
        sfxClick();
        openModal(card.dataset.id, e.target.closest("[data-open]") || card);
      }
    });

    // filters
    const tags = ["All", ...new Set(PROJECTS.flatMap(p => p.filters))];
    const fWrap = $("#filters");
    fWrap.innerHTML = tags.map((t, i) => `<button class="filter" data-filter="${esc(t)}" aria-pressed="${i === 0}">${esc(t)}</button>`).join("");
    fWrap.addEventListener("click", e => {
      const b = e.target.closest(".filter");
      if (!b) return;
      sfxClick();
      $$(".filter", fWrap).forEach(x => x.setAttribute("aria-pressed", x === b));
      const f = b.dataset.filter;
      $$(".proj", showcase).forEach(card => {
        const show = f === "All" || card.dataset.filters.split("|").includes(f);
        card.classList.toggle("is-hidden", !show);
        if (show) { card.style.animation = "none"; void card.offsetWidth; card.style.animation = ""; card.classList.add("is-in"); }
      });
    });

    initVideoPlayback();
  }

  /* ---------- video playback: desktop hover & mobile scroll autoplay ---------- */
  function initVideoPlayback() {
    const cards = $$(".proj");
    if (!cards.length) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 860px)").matches;

    if (isTouch) {
      // Mobile: autoplay muted when card is visible in viewport
      const vObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const card = entry.target;
          const media = $(".proj__media", card);
          const video = $(".proj__video", card);
          if (!video) return;
          if (entry.isIntersecting) {
            video.muted = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                if (media) media.classList.add("is-playing");
                card.classList.add("is-playing");
              }).catch(() => {});
            }
          } else {
            video.pause();
            if (media) media.classList.remove("is-playing");
            card.classList.remove("is-playing");
          }
        });
      }, { threshold: 0.4 });

      cards.forEach(card => vObs.observe(card));
    } else {
      // Desktop: hover video area to preview
      cards.forEach(card => {
        const media = $(".proj__media", card);
        const video = $(".proj__video", card);
        if (!media || !video) return;

        media.addEventListener("mouseenter", () => {
          sfxHover();
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              media.classList.add("is-playing");
              card.classList.add("is-playing");
            }).catch(() => {});
          }
        });

        media.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
          media.classList.remove("is-playing");
          card.classList.remove("is-playing");
        });
      });
    }
  }

  /* ---------- attach UI audio feedback ---------- */
  function attachHoverSFX() {
    const targets = $$(".btn, .nav__link, .filter, .skill-group, .hero__pill, .sfx-toggle, .modal__close");
    targets.forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (sfxEnabled) sfxHover();
      }, { passive: true });
    });
  }

  /* ---------- modal ---------- */
  const modal = $("#modal"), modalBody = $("#modalBody"), panel = $(".modal__panel", modal);
  let lastFocus = null, closeTimer;

  function openModal(id, trigger) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    sfxModalOpen();
    clearTimeout(closeTimer);
    lastFocus = trigger || document.activeElement;
    const modalMedia = p.video
      ? `<div class="md__media md__media--video">
           <video class="md__video" controls autoplay muted loop playsinline>
             <source src="${esc(p.video)}" type="video/${p.video.endsWith('.webm') ? 'webm' : 'mp4'}">
             ${p.video.endsWith('.mp4') ? `<source src="${esc(p.video.replace(/\.mp4$/, '.webm'))}" type="video/webm">` : ''}
           </video>
         </div>`
      : `<div class="md__media">${mediaHTML(p, false)}</div>`;

    modalBody.innerHTML = `
      ${modalMedia}
      <div class="md__body">
        <div>
          <div class="md__header-row">
            <p class="eyebrow">${esc(p.category)}</p>
          </div>
          <h2 id="modalTitle">${esc(p.title)}</h2>
          <p>${esc(p.details)}</p>
          <h3>Features</h3>
          <ul class="md__feat">${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
        </div>
        <aside>
          <h3>Project info</h3>
          <dl class="md__facts">
            <div><dt>Engine</dt><dd>${esc(p.engine)}</dd></div>
            ${p.platform ? `<div><dt>Platform</dt><dd>${esc(p.platform)}</dd></div>` : ""}
            <div><dt>Languages</dt><dd>${esc(p.languages)}</dd></div>
          </dl>
          <div class="labels" style="margin-bottom:1.4rem">${p.tags.map(t => `<span class="label">${esc(t)}</span>`).join("")}</div>
          ${p.links.length
            ? `<div class="md__links">${p.links.map((l, i) => `<a class="btn ${i ? "btn--ghost" : "btn--primary"}" href="${esc(l.url)}" ${extAttrs}>${esc(l.label)} ↗</a>`).join("")}</div>`
            : `<p class="md__note">Source and demo links will be added here when they're available.</p>`}
        </aside>
      </div>`;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
    panel.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => { modal.classList.add("is-open"); panel.focus({ preventScroll: true }); }));
    history.replaceState(null, "", "#project-" + id);
  }

  function closeModal() {
    if (modal.hidden) return;
    sfxClick();
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
    closeTimer = setTimeout(() => { modal.hidden = true; modalBody.innerHTML = ""; }, reduceMotion ? 0 : 450);
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", "#projects");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") return closeModal();
    if (e.key === "Tab") {
      const f = $$('a[href],button:not([disabled])', panel).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- nav ---------- */
  const nav = $("#nav"), navMenu = $("#navMenu"), navToggle = $("#navToggle");
  const navLinks = $$(".nav__link"), indicator = $("#navIndicator");

  function setMenu(open) {
    nav.classList.toggle("menu-open", open);
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open);
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
    document.documentElement.classList.toggle("no-scroll", open);
  }
  navToggle.addEventListener("click", () => {
    sfxClick();
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });
  navLinks.forEach(a => a.addEventListener("click", () => setMenu(false)));
  $(".nav__resume").addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width:861px)").addEventListener("change", () => setMenu(false));

  function moveIndicator(link) {
    if (!link || getComputedStyle(indicator).display === "none") return;
    indicator.style.width = link.offsetWidth + "px";
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    indicator.style.opacity = 1;
  }
  let activeLink = navLinks[0];
  function setActive(id) {
    const map = {};
    const target = map[id] || id;
    const link = navLinks.find(a => a.getAttribute("href") === "#" + target);
    if (!link) return;
    navLinks.forEach(a => { a.classList.toggle("is-active", a === link); a === link ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
    activeLink = link; moveIndicator(link);
  }
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => secObs.observe(s));
  window.addEventListener("resize", () => moveIndicator(activeLink));
  document.fonts && document.fonts.ready.then(() => moveIndicator(activeLink));

  /* ---------- scroll: nav state, progress, back-to-top, parallax ---------- */
  const toTop = $("#toTop");
  toTop.addEventListener("click", () => {
    sfxClick();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
  const parallax = $$("[data-speed]").map(el => ({ el, speed: parseFloat(el.dataset.speed), inHero: !!el.closest(".hero"), host: el.parentElement }));
  const scrollProg = $("#scrollProgress");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY, vh = window.innerHeight;
    nav.classList.toggle("is-stuck", y > 20);
    toTop.classList.toggle("is-visible", y > vh * 0.8);

    if (scrollProg) {
      const docH = document.documentElement.scrollHeight - vh;
      const pct = docH > 0 ? (y / docH) * 100 : 0;
      scrollProg.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }

    if (!reduceMotion) {
      for (const p of parallax) {
        if (p.inHero) { if (y > vh * 1.2) continue; p.el.style.transform = `translate3d(0,${(y * p.speed * 0.35).toFixed(1)}px,0)`; }
        else {
          const r = p.host.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          p.el.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * p.speed).toFixed(1)}px,0)`;
        }
      }
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- reveal ---------- */
  function initReveal() {
    const io = new IntersectionObserver((entries, o) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); o.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---------- hero canvas: stars, gravity, shockwaves & meteors ---------- */
  function initStars() {
    const c = $("#stars");
    if (!c || reduceMotion) return;
    const ctx = c.getContext("2d");
    let w, h, stars = [], shootingStars = [], shockwaves = [], running = false, raf;
    let mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(w * h / 7500);
      stars = Array.from({ length: n }, () => ({
        baseX: Math.random() * w,
        baseY: Math.random() * h * 0.8,
        x: 0, y: 0,
        vx: 0, vy: 0,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.82 ? "#c4b5fd" : (Math.random() > 0.65 ? "#93c5fd" : "#ffffff")
      }));
      stars.forEach(s => { s.x = s.baseX; s.y = s.baseY; });
    };

    const addShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.016) {
        shootingStars.push({
          x: Math.random() * w * 0.85,
          y: Math.random() * h * 0.35,
          len: Math.random() * 70 + 40,
          speed: Math.random() * 7 + 7,
          dx: 1, dy: 0.55,
          life: 1,
          decay: Math.random() * 0.02 + 0.016
        });
      }
    };

    const addShockwave = (x, y) => {
      shockwaves.push({ x, y, r: 4, maxR: Math.min(w, h) * 0.45, speed: 7.5, life: 1 });
      sfxShockwave();
    };

    const heroSection = c.closest(".hero") || c.parentElement;
    heroSection.addEventListener("mousemove", e => {
      const rect = c.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroSection.addEventListener("mouseleave", () => {
      mouse.active = false;
    });

    heroSection.addEventListener("click", e => {
      if (e.target.closest("a, button")) return;
      const rect = c.getBoundingClientRect();
      addShockwave(e.clientX - rect.left, e.clientY - rect.top);
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.r += sw.speed;
        sw.life = Math.max(0, 1 - sw.r / sw.maxR);
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${(sw.life * 0.55).toFixed(2)})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = "#a78bfa";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
        if (sw.life <= 0) shockwaves.splice(i, 1);
      }

      // Render stars & physics
      for (const s of stars) {
        s.a += s.s;

        let tx = s.baseX, ty = s.baseY;
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (1 - dist / 130) * 10;
            tx += (dx / dist) * force;
            ty += (dy / dist) * force;
          }
        }

        for (const sw of shockwaves) {
          const dx = s.x - sw.x;
          const dy = s.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - sw.r);
          if (diff < 28) {
            const push = (1 - diff / 28) * 18 * sw.life;
            s.vx += (dx / (dist || 1)) * push;
            s.vy += (dy / (dist || 1)) * push;
          }
        }

        s.vx *= 0.88;
        s.vy *= 0.88;
        s.x += (tx - s.x) * 0.08 + s.vx;
        s.y += (ty - s.y) * 0.08 + s.vy;

        ctx.globalAlpha = 0.28 + 0.65 * Math.abs(Math.sin(s.a));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }

      // Render shooting stars
      addShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.dx * ss.speed;
        ss.y += ss.dy * ss.speed;
        ss.life -= ss.decay;
        if (ss.life <= 0 || ss.x > w || ss.y > h) {
          shootingStars.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.dx * ss.len, ss.y - ss.dy * ss.len);
        ctx.strokeStyle = `rgba(215, 230, 255, ${(ss.life * 0.75).toFixed(2)})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "#a78bfa";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      raf = running ? requestAnimationFrame(draw) : 0;
    };

    resize();
    window.addEventListener("resize", resize);
    new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !raf) raf = requestAnimationFrame(draw);
    }).observe(c);
  }

  /* ---------- deep link to a project ---------- */
  function openFromHash() {
    if (location.hash.startsWith("#project-")) openModal(location.hash.slice(9), null);
  }

  /* ---------- terminal typewriter for kickers ---------- */
  function initTypewriters() {
    if (reduceMotion) return;

    const targets = $$(".kicker, .hero__kicker-text");
    targets.forEach(el => {
      let phrases = [];
      if (el.dataset.phrases) {
        try {
          phrases = JSON.parse(el.dataset.phrases.replace(/&amp;/g, "&").replace(/&quot;/g, '"'));
        } catch (_) {}
      }
      if (!phrases || !phrases.length) {
        phrases = [el.textContent.trim()];
      }

      el.innerHTML = '<span class="type-text"></span><span class="type-cursor" aria-hidden="true">_</span>';
      const textSpan = $(".type-text", el);

      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let timer = null;
      let isVisible = true;

      const io = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !timer) {
          tick();
        }
      }, { threshold: 0.05 });
      io.observe(el);

      function tick() {
        if (!isVisible) {
          timer = null;
          return;
        }

        const currentPhrase = phrases[phraseIdx % phrases.length];

        if (isDeleting) {
          charIdx--;
          textSpan.textContent = currentPhrase.substring(0, charIdx);
        } else {
          charIdx++;
          textSpan.textContent = currentPhrase.substring(0, charIdx);
        }

        let speed = isDeleting ? 30 : 65;

        if (!isDeleting && charIdx === currentPhrase.length) {
          speed = 2200; // Pause 2.2s so user reads phrase comfortably
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx++;
          speed = 350; // Pause before starting next phrase
        }

        timer = setTimeout(tick, speed);
      }

      tick();
    });
  }

  /* ---------- Intro Typing Preloader ---------- */
  function initIntroLoader() {
    const loader = $("#introLoader");
    if (!loader) return;

    const typedEl = $("#introTyped");
    const barEl = $("#introBar");
    const percentEl = $("#introPercent");
    const tagEl = $("#introTag");
    const subEl = $("#introSub");
    const skipBtn = $("#introSkip");

    const targetText = "Gopinath R";
    let index = 0;
    let isDone = false;

    // Lock scrolling during intro
    document.body.classList.add("is-intro-active");

    function finish() {
      if (isDone) return;
      isDone = true;

      if (typedEl) typedEl.textContent = targetText;
      if (barEl) barEl.style.width = "100%";
      if (percentEl) percentEl.textContent = "100%";
      if (tagEl) tagEl.textContent = "// READY";
      if (subEl) subEl.classList.add("is-visible");

      setTimeout(() => {
        loader.classList.add("is-hidden");
        document.body.classList.remove("is-intro-active");
        document.body.classList.add("site-ready");

        setTimeout(() => {
          loader.remove();
        }, 600);
      }, 400);
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", finish);
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !isDone) finish();
    });

    loader.addEventListener("click", (e) => {
      if (e.target !== skipBtn && !isDone) finish();
    });

    if (reduceMotion) {
      finish();
      return;
    }

    function typeNextChar() {
      if (isDone) return;

      if (index < targetText.length) {
        index++;
        typedEl.textContent = targetText.substring(0, index);

        const pct = Math.round((index / targetText.length) * 100);
        if (barEl) barEl.style.width = `${pct}%`;
        if (percentEl) percentEl.textContent = `${pct}%`;

        playTone(600 + index * 45, 0.025, "sine", 0.02);

        const char = targetText[index - 1];
        const delay = char === " " ? 140 : 85;

        setTimeout(typeNextChar, delay);
      } else {
        if (tagEl) tagEl.textContent = "// SYSTEM READY";
        if (subEl) subEl.classList.add("is-visible");

        setTimeout(finish, 450);
      }
    }

    setTimeout(typeNextChar, 250);
  }

  /* ---------- Quantum Singularity & Hyperspace Warp ---------- */
  function initPortalWarp() {
    const btn = document.getElementById('otherWorldBtn');
    const overlay = document.getElementById('portalVortexOverlay');
    const canvas = document.getElementById('warpTunnelCanvas');
    const flare = document.getElementById('warpFlare');
    if (!btn) return;

    const targetUrl = btn.getAttribute('href') || "https://gopinath21052006.github.io/Portfolio/";
    let isWarping = false;
    let animId = null;

    function playWarpSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        // 1. Activation Ping
        const ping = ctx.createOscillator(), pGain = ctx.createGain();
        ping.type = 'sine';
        ping.frequency.setValueAtTime(1400, now);
        ping.frequency.exponentialRampToValueAtTime(500, now + 0.09);
        pGain.gain.setValueAtTime(0.28, now);
        pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        ping.connect(pGain);
        pGain.connect(ctx.destination);
        ping.start(now);
        ping.stop(now + 0.1);

        // 2. Sub-Bass Boom
        const sub = ctx.createOscillator(), sGain = ctx.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(150, now);
        sub.frequency.exponentialRampToValueAtTime(36, now + 0.85);
        sGain.gain.setValueAtTime(0.5, now);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        sub.connect(sGain);
        sGain.connect(ctx.destination);
        sub.start(now);
        sub.stop(now + 0.95);

        // 3. Dimensional Frequency Ramp
        const warp = ctx.createOscillator(), wFilter = ctx.createBiquadFilter(), wGain = ctx.createGain();
        warp.type = 'sawtooth';
        wFilter.type = 'lowpass';
        wFilter.frequency.setValueAtTime(350, now);
        wFilter.frequency.exponentialRampToValueAtTime(2200, now + 0.7);
        warp.frequency.setValueAtTime(180, now);
        warp.frequency.exponentialRampToValueAtTime(680, now + 0.75);
        wGain.gain.setValueAtTime(0.02, now);
        wGain.gain.linearRampToValueAtTime(0.2, now + 0.35);
        wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.82);
        warp.connect(wFilter);
        wFilter.connect(wGain);
        wGain.connect(ctx.destination);
        warp.start(now);
        warp.stop(now + 0.85);

        // 4. Suction Whoosh
        const bufSize = ctx.sampleRate * 0.75, buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const nFilter = ctx.createBiquadFilter(), nGain = ctx.createGain();
        nFilter.type = 'bandpass';
        nFilter.frequency.setValueAtTime(950, now);
        nFilter.frequency.exponentialRampToValueAtTime(200, now + 0.75);
        nFilter.Q.setValueAtTime(2.5, now);
        nGain.gain.setValueAtTime(0.22, now);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
        noise.connect(nFilter);
        nFilter.connect(nGain);
        nGain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.8);
      } catch (_) {}
    }

    function startHyperspaceCanvas() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth, height = canvas.height = window.innerHeight;
      const cx = width / 2, cy = height / 2;
      const stars = Array.from({ length: 70 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 40 + 10,
        speed: Math.random() * 14 + 10,
        len: Math.random() * 35 + 15,
        color: Math.random() > 0.35 ? '#d4af37' : '#ffffff'
      }));
      let start = performance.now();
      function render(t) {
        const el = t - start;
        ctx.fillStyle = 'rgba(7, 6, 10, 0.3)';
        ctx.fillRect(0, 0, width, height);
        stars.forEach(s => {
          s.dist += s.speed * (1 + el / 350);
          const sx = cx + Math.cos(s.angle) * s.dist, sy = cy + Math.sin(s.angle) * s.dist;
          const ex = cx + Math.cos(s.angle) * (s.dist + s.len * (1 + el / 400)), ey = cy + Math.sin(s.angle) * (s.dist + s.len * (1 + el / 400));
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          if (sx < 0 || sx > width || sy < 0 || sy > height) {
            s.dist = Math.random() * 25 + 5;
            s.angle = Math.random() * Math.PI * 2;
          }
        });
        animId = requestAnimationFrame(render);
      }
      animId = requestAnimationFrame(render);
    }

    function triggerVanish(e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.which === 2 || e.button === 1) return;
      e.preventDefault();
      if (isWarping) return;
      isWarping = true;

      playWarpSound();
      document.body.classList.add('is-vanishing');
      if (overlay) {
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
      }
      startHyperspaceCanvas();

      setTimeout(() => {
        if (flare) flare.classList.add('active');
      }, 700);
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 850);
    }

    btn.addEventListener('click', triggerVanish);

    window.addEventListener('pageshow', function(evt) {
      if (evt.persisted || isWarping) {
        isWarping = false;
        document.body.classList.remove('is-vanishing');
        if (overlay) {
          overlay.classList.remove('active');
          overlay.setAttribute('aria-hidden', 'true');
        }
        if (flare) flare.classList.remove('active');
        if (animId) cancelAnimationFrame(animId);
      }
    });
  }

  /* ---------- init ---------- */
  initIntroLoader();
  applySite();
  renderProjects();
  renderSkills();
  renderTimeline();
  initReveal();
  initStars();
  initAudioToggle();
  initTypewriters();
  attachHoverSFX();
  initPortalWarp();
  onScroll();
  setActive("home");
  openFromHash();
})();
