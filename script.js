/* =================================================
   AETHER STUDIOS — Restaurant Growth Agency
   Lenis · GSAP · ScrollTrigger · SplitType · Web3Forms
================================================= */

(function () {
  const { gsap } = window;
  if (gsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  // ------- Trust marquee data -------
  const trustWords = [
    "Elegancia",
    "Bagaicha",
    "Sundara Café",
    "Forme Hospitality",
    "Nilgiri Brew House",
    "Maison Verde",
    "Hilltop Kitchen",
    "Coorg Roastery",
    "Nordlys Maison",
    "Pavilion 8"
  ];

  function renderTrustMarquee() {
    const el = document.getElementById("trustMarquee");
    if (!el) return;
    const chunk = trustWords
      .map((w) => `<span>${w} <span class="bullet">●</span></span>`)
      .join("");
    el.innerHTML = chunk + chunk + chunk;
  }

  function renderFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = `© ${new Date().getFullYear()} Aether Studios — Restaurant growth specialists.`;
  }

  renderTrustMarquee();
  renderFooterYear();

  // ------- Custom cursor -------
  (function cursor() {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (isCoarse || !dot || !ring || !gsap) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    const ringPos = { x: target.x, y: target.y };

    const setDot = gsap.quickSetter(dot, "css");
    const setRing = gsap.quickSetter(ring, "css");

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    }, { passive: true });

    gsap.ticker.add(() => {
      pos.x += (target.x - pos.x) * 0.5;
      pos.y += (target.y - pos.y) * 0.5;
      ringPos.x += (target.x - ringPos.x) * 0.12;
      ringPos.y += (target.y - ringPos.y) * 0.12;
      setDot({ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)` });
      setRing({ transform: `translate3d(${ringPos.x - 19}px, ${ringPos.y - 19}px, 0)` });
    });

    function bindHoverables() {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";
        el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
      });
    }
    bindHoverables();
    new MutationObserver(bindHoverables).observe(document.body, { childList: true, subtree: true });
  })();

  // ------- Lenis smooth scroll -------
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6
    });
    if (window.ScrollTrigger) lenis.on("scroll", window.ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor links via Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ------- Loader -------
  (function loader() {
    const root = document.getElementById("loader");
    const num = document.getElementById("loaderNum");
    const bar = document.getElementById("loaderBar");
    const mark = document.getElementById("loaderMark");
    if (!root || !num || !bar || !mark || !gsap) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");
    if (lenis && lenis.stop) lenis.stop();

    const counter = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        document.documentElement.classList.remove("lenis-stopped");
        if (lenis && lenis.start) lenis.start();
        setTimeout(() => {
          root.style.display = "none";
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }, 40);
      }
    });

    tl.to(mark, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0)
      .to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(counter.v);
          num.textContent = String(val).padStart(3, "0");
          bar.style.transform = `scaleX(${val / 100})`;
        }
      }, 0.2)
      .to([num, mark], { y: -32, opacity: 0, duration: 0.8, ease: "expo.inOut", stagger: 0.05 }, "+=0.2")
      .to(root, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, "-=0.3");
  })();

  // ------- Nav -------
  (function nav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    gsap.fromTo(nav, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, delay: 2.6, ease: "expo.out" });
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
  })();

  // ------- Sticky CTA + WhatsApp FAB visibility -------
  (function stickyAndFab() {
    const stickyCta = document.getElementById("stickyCta");
    const waFab = document.getElementById("waFab");
    const heroEl = document.querySelector(".hero");
    if (!stickyCta && !waFab) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 600;
      const past = scrolled > 600 || heroBottom < 0;

      if (stickyCta) stickyCta.classList.toggle("visible", past);
      if (waFab) waFab.classList.toggle("visible", scrolled > 240);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hide sticky when contact is in view (avoid double CTA noise)
    const contact = document.getElementById("contact");
    if (contact && stickyCta && window.ScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: contact,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => stickyCta.classList.remove("visible"),
        onLeaveBack: () => stickyCta.classList.add("visible")
      });
    }
  })();

  // ------- Reveal helpers -------
  function splitMaybe(el, opts) {
    if (!window.SplitType) return null;
    return new window.SplitType(el, opts);
  }

  function setupHero() {
    const title = document.querySelector("[data-hero-title]");
    const sub = document.querySelector("[data-hero-sub]");
    const metas = document.querySelectorAll("[data-hero-meta]");
    const ctaRow = document.querySelector("[data-hero-cta-row]");
    const stats = document.querySelector("[data-hero-stats]");
    const visual = document.querySelector("[data-hero-visual]");

    let titleSplit, subSplit;
    if (title) {
      titleSplit = splitMaybe(title, { types: "lines, words", lineClass: "split-line" });
      if (titleSplit) gsap.set(titleSplit.words, { yPercent: 120, opacity: 0 });
    }
    if (sub) {
      subSplit = splitMaybe(sub, { types: "lines", lineClass: "split-line" });
      if (subSplit) gsap.set(subSplit.lines.flatMap((l) => Array.from(l.children)), { yPercent: 110 });
    }

    const tl = gsap.timeline({ delay: 2.7, defaults: { ease: "expo.out" } });

    if (titleSplit) {
      tl.to(titleSplit.words, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.05 });
    }
    if (subSplit) {
      tl.to(subSplit.lines.flatMap((l) => Array.from(l.children)),
        { yPercent: 0, duration: 0.9, stagger: 0.06 }, "-=0.7");
    }
    if (metas.length)  tl.to(metas,  { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");
    if (ctaRow)        tl.to(ctaRow, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");
    if (stats)         tl.to(stats,  { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");
    if (visual)        tl.to(visual, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7");

    // Hero stat numbers — count up
    document.querySelectorAll(".hero-stat strong").forEach((el) => {
      const text = el.textContent.trim();
      const match = text.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
      if (!match) return;
      const sign = match[1];
      const target = parseFloat(match[2]);
      const suffix = match[3];
      const counter = { v: 0 };

      window.ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              const isInt = Number.isInteger(target);
              const display = isInt ? Math.round(counter.v) : counter.v.toFixed(1);
              el.textContent = `${sign}${display}${suffix}`;
            }
          });
        }
      });
    });

    // Subtle parallax on hero collage
    if (visual && window.ScrollTrigger) {
      gsap.to(visual.querySelectorAll(".hero-card"), {
        yPercent: -10,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: visual,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }

  function setupSplitTitles() {
    document.querySelectorAll("[data-split]").forEach((title) => {
      const split = splitMaybe(title, { types: "lines, words", lineClass: "split-line" });
      if (!split) return;
      gsap.set(split.words, { yPercent: 120 });

      window.ScrollTrigger.create({
        trigger: title,
        start: "top 82%",
        onEnter: () => {
          gsap.to(split.words, {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.05,
            ease: "expo.out",
            delay: 0.1
          });
        }
      });
    });
  }

  function setupFades() {
    gsap.utils.toArray("[data-fade]").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.1 + (i % 4) * 0.07,
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  function setupResultStats() {
    // Animate result-card stat numbers when they enter
    document.querySelectorAll(".result-stats strong").forEach((el) => {
      const text = el.textContent.trim();
      const match = text.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
      if (!match) return;
      const sign = match[1];
      const target = parseFloat(match[2]);
      const suffix = match[3];
      const counter = { v: 0 };

      window.ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              const isInt = Number.isInteger(target);
              const display = isInt ? Math.round(counter.v) : counter.v.toFixed(1);
              el.textContent = `${sign}${display}${suffix}`;
            }
          });
        }
      });
    });
  }

  // ------- Contact form (Web3Forms) -------
  (function contact() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.querySelectorAll(".field input, .field textarea").forEach((input) => {
      input.addEventListener("input", () => {
        const wrap = input.closest(".field");
        if (!wrap) return;
        wrap.classList.toggle("has-value", input.value.length > 0);
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const content = document.getElementById("formContent");
      const success = document.getElementById("formSuccess");
      const submitBtn = document.getElementById("submitBtn");
      const submitLabel = document.getElementById("submitLabel");
      const errorEl = document.getElementById("formError");
      if (!content || !success || !submitBtn || !submitLabel) return;

      if (errorEl) errorEl.hidden = true;
      const originalLabel = submitLabel.textContent;
      submitLabel.textContent = "Sending…";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.style.pointerEvents = "none";

      try {
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          gsap.to(content, {
            opacity: 0, y: 16, duration: 0.5, ease: "power3.out",
            onComplete: () => {
              content.hidden = true;
              success.hidden = false;
              gsap.fromTo(success, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" });
              form.reset();
              form.querySelectorAll(".field.has-value").forEach((f) => f.classList.remove("has-value"));
            }
          });
        } else {
          throw new Error((data && data.message) || "Submit failed");
        }
      } catch (err) {
        if (errorEl) {
          errorEl.hidden = false;
          gsap.fromTo(errorEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
        }
        submitLabel.textContent = originalLabel;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
        submitBtn.style.pointerEvents = "";
      }
    });
  })();

  // ------- Run all reveal setup once fonts are ready -------
  function runAll() {
    setupHero();
    setupSplitTitles();
    setupFades();
    setupResultStats();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runAll);
  } else {
    window.addEventListener("load", runAll);
  }
})();
