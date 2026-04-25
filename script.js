/* ==============================
   AETHER — Luxury Portfolio JS
============================== */

(function () {
  const { gsap } = window;
  if (gsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  // ------- Data -------
  const projects = [
    {
      n: "01",
      client: "Nordlys Maison",
      title: "Editorial commerce for a Nordic fashion house",
      tags: ["E-commerce", "Headless", "Motion"],
      year: "2026",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=85",
      accent: "blue",
      large: true
    },
    {
      n: "02",
      client: "Ordinate Capital",
      title: "Institutional-grade marketing site for a private fund",
      tags: ["Brand site", "Next.js", "CMS"],
      year: "2025",
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=1800&q=85",
      accent: "violet"
    },
    {
      n: "03",
      client: "Forme Atelier",
      title: "Cinematic portfolio for an architecture practice",
      tags: ["Portfolio", "WebGL", "3D"],
      year: "2025",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=85",
      accent: "blue"
    },
    {
      n: "04",
      client: "Solace Hotels",
      title: "Booking experience for a boutique hospitality group",
      tags: ["Booking", "CMS", "Perf"],
      year: "2024",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=85",
      accent: "violet"
    }
  ];

  const skillGroups = [
    {
      title: "Engineering",
      items: [
        "Next.js / React", "TypeScript", "Node.js & Edge runtimes",
        "Headless CMS — Sanity, Contentful", "Shopify Hydrogen",
        "Performance budgets & Core Web Vitals"
      ]
    },
    {
      title: "Craft & Motion",
      items: [
        "GSAP + ScrollTrigger", "Lenis smooth scroll", "Framer Motion",
        "WebGL / Three.js", "Custom interaction systems", "Design-to-code handoff"
      ]
    },
    {
      title: "Delivery",
      items: [
        "Vercel, Cloudflare, AWS", "CI/CD, preview environments",
        "A/B testing & analytics", "Accessibility (WCAG 2.2)",
        "SEO & schema", "Long-term partnership"
      ]
    }
  ];

  const processWords = ["Strategy", "Design", "Engineering", "Motion", "Launch", "Iterate"];
  const techWords = [
    "Next.js","GSAP","Lenis","Shopify","Sanity","TypeScript","Three.js",
    "Framer Motion","Vercel","Tailwind CSS","Node.js","WebGL"
  ];

  // ------- Render dynamic DOM -------
  function renderProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    grid.innerHTML = projects.map((p) => `
      <a href="#contact" class="project-card ${p.large ? "large" : ""}" data-project-card data-hover>
        <div class="project-media-wrap">
          <div class="project-media" data-project-media style="background-image:url('${p.image}')"></div>
          <div class="project-overlay"></div>
          <div class="project-topleft">
            <span class="mono-label" style="color:rgba(255,255,255,0.8)">${p.n}</span>
            <span class="accent ${p.accent}"></span>
          </div>
          <div class="project-topright mono-label">${p.year}</div>
        </div>
        <div class="project-body">
          <div>
            <div class="project-client mono-label">${p.client}</div>
            <h3>${p.title}</h3>
            <div class="project-tags">
              ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
            </div>
          </div>
          <div class="project-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </div>
        </div>
      </a>
    `).join("");
  }

  function renderSkills() {
    const grid = document.getElementById("skillsGrid");
    if (!grid) return;
    grid.innerHTML = skillGroups.map((g) => `
      <div class="skill-group" data-skill-group>
        <div class="skill-title mono-label" data-skill-title>
          <span class="dot"></span>
          ${g.title}
        </div>
        <ul class="skill-list">
          ${g.items.map((it) => `<li data-skill-item><span>${it}</span><span class="tick">◆</span></li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  function renderMarquee(id, words, bulletClass = "bullet") {
    const el = document.getElementById(id);
    if (!el) return;
    const chunk = words.map((w) => `<span>${w} <span class="${bulletClass}">✦</span></span>`).join("");
    el.innerHTML = chunk + chunk + chunk;
  }

  function renderFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = `© ${new Date().getFullYear()} Aether Studio — All rights reserved.`;
  }

  renderProjects();
  renderSkills();
  renderMarquee("processMarquee", processWords);
  renderMarquee("techMarquee", techWords);
  renderFooterYear();

  // ------- Contact form floating labels + submit -------
  const form = document.getElementById("contactForm");
  if (form) {
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

      // Reset error, set loading state
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          gsap.to(content, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              content.hidden = true;
              success.hidden = false;
              gsap.fromTo(
                success,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }
              );
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
        // Restore button so user can retry
        submitLabel.textContent = originalLabel;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
        submitBtn.style.pointerEvents = "";
      }
    });
  }

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

    const mo = new MutationObserver(bindHoverables);
    mo.observe(document.body, { childList: true, subtree: true });
  })();

  // ------- Lenis smooth scroll -------
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6
    });

    if (window.ScrollTrigger) lenis.on("scroll", window.ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor link smooth scroll via Lenis
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
    const logo = document.getElementById("loaderLogo");
    if (!root || !num || !bar || !logo || !gsap) return;

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

    tl.to(logo, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0)
      .to(counter, {
        v: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(counter.v);
          num.textContent = String(val).padStart(3, "0");
          bar.style.transform = `scaleX(${val / 100})`;
        }
      }, 0.2)
      .to([num, logo], { y: -40, opacity: 0, duration: 0.9, ease: "expo.inOut", stagger: 0.05 }, "+=0.25")
      .to(root, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.3");
  })();

  // ------- Nav scroll state + intro reveal -------
  (function nav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    gsap.fromTo(nav, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 3.2, ease: "expo.out" });
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
  })();

  // ------- Reveal animations -------
  function waitForFontsAndSplit(el, opts) {
    // SplitType splits in place; call after fonts ready
    return new window.SplitType(el, opts);
  }

  function setupHero() {
    const title = document.querySelector("[data-hero-title]");
    const sub = document.querySelector("[data-hero-sub]");
    const metas = document.querySelectorAll("[data-hero-meta]");
    const ctas = document.querySelectorAll("[data-hero-cta]");
    const sheen = document.querySelector("[data-hero-sheen]");
    const scroll = document.querySelector("[data-hero-scroll]");
    if (!title || !sub) return;

    const splitTitle = waitForFontsAndSplit(title, { types: "lines, words", lineClass: "split-line" });
    const splitSub = waitForFontsAndSplit(sub, { types: "lines", lineClass: "split-line" });

    gsap.set(splitTitle.words, { yPercent: 120, opacity: 0 });
    const subInners = splitSub.lines.flatMap((l) => Array.from(l.children));
    gsap.set(subInners, { yPercent: 110 });

    const tl = gsap.timeline({ delay: 3.3, defaults: { ease: "expo.out" } });
    tl.to(splitTitle.words, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.06 })
      .to(subInners, { yPercent: 0, duration: 1, stagger: 0.08 }, "-=0.7")
      .to(metas, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.6")
      .to(ctas, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.7")
      .to(scroll, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");

    // Parallax sheen on scroll
    if (window.ScrollTrigger && sheen) {
      gsap.to(sheen, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(title, {
        scale: 0.98,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }
  }

  function setupAbout() {
    const p = document.querySelector("[data-about-p]");
    if (!p) return;

    const split = waitForFontsAndSplit(p, { types: "lines", lineClass: "split-line" });
    const inners = split.lines.flatMap((l) => Array.from(l.children));
    gsap.set(inners, { yPercent: 110 });

    window.ScrollTrigger.create({
      trigger: p,
      start: "top 78%",
      onEnter: () => {
        gsap.to(inners, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "expo.out", delay: 0.15 });
      }
    });

    gsap.utils.toArray("[data-about-fade]").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        delay: 0.1 + (i % 3) * 0.08,
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });

    gsap.utils.toArray("[data-stat-num]").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" }
        }
      );
    });
  }

  function setupProjects() {
    gsap.utils.toArray("[data-proj-head]").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        delay: 0.1 + i * 0.08,
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    gsap.utils.toArray("[data-project-card]").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "expo.out",
          delay: (i % 2) * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%" }
        }
      );

      const media = card.querySelector("[data-project-media]");
      if (media) {
        gsap.to(media, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    });
  }

  function setupSkills() {
    gsap.utils.toArray("[data-skill-head]").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        delay: 0.1 + i * 0.08,
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    gsap.utils.toArray("[data-skill-group]").forEach((group, i) => {
      const title = group.querySelector("[data-skill-title]");
      const items = group.querySelectorAll("[data-skill-item]");

      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: i * 0.08,
            scrollTrigger: { trigger: group, start: "top 82%" }
          });
      }
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
          delay: 0.2 + i * 0.08,
          scrollTrigger: { trigger: group, start: "top 82%" }
        });
    });
  }

  function setupContact() {
    const title = document.querySelector("[data-contact-title]");
    if (title) {
      const split = waitForFontsAndSplit(title, { types: "lines, words", lineClass: "split-line" });
      gsap.set(split.words, { yPercent: 120 });

      window.ScrollTrigger.create({
        trigger: title,
        start: "top 82%",
        onEnter: () => {
          gsap.to(split.words, { yPercent: 0, duration: 1.2, stagger: 0.06, ease: "expo.out", delay: 0.1 });
        }
      });
    }

    gsap.utils.toArray("[data-contact-fade]").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        delay: 0.1 + i * 0.07,
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }

  function runAll() {
    setupHero();
    setupAbout();
    setupProjects();
    setupSkills();
    setupContact();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  // Wait for fonts so SplitType measures correctly
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runAll);
  } else {
    window.addEventListener("load", runAll);
  }
})();
