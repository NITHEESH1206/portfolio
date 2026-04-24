"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = rootRef.current.querySelector("[data-hero-title]");
      const sub = rootRef.current.querySelector("[data-hero-sub]");
      const meta = rootRef.current.querySelectorAll("[data-hero-meta]");
      const cta = rootRef.current.querySelectorAll("[data-hero-cta]");
      const sheen = rootRef.current.querySelector("[data-hero-sheen]");
      const scroll = rootRef.current.querySelector("[data-hero-scroll]");

      const splitTitle = new SplitType(title, { types: "lines, words", lineClass: "split-line" });
      const splitSub = new SplitType(sub, { types: "lines", lineClass: "split-line" });

      gsap.set(splitTitle.words, { yPercent: 120, opacity: 0 });
      gsap.set(splitSub.lines.flatMap((l) => l.children), { yPercent: 110 });
      gsap.set([meta, cta, scroll], { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 3.2, defaults: { ease: "expo.out" } });

      tl.to(splitTitle.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.06
      })
        .to(
          splitSub.lines.flatMap((l) => l.children),
          { yPercent: 0, duration: 1, stagger: 0.08 },
          "-=0.7"
        )
        .to(meta, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.6")
        .to(cta, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.7")
        .to(scroll, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");

      // Parallax on sheen
      gsap.to(sheen, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Hero title subtle scale on scroll
      gsap.to(title, {
        scale: 0.98,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-end"
    >
      <div data-hero-sheen className="hero-sheen" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-luxe relative z-10 w-full pb-[10vh] pt-[22vh]">
        <div className="flex items-start justify-between gap-8 mb-10">
          <div
            data-hero-meta
            className="flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
            <span className="mono-label">Available · Q2 2026</span>
          </div>
          <div
            data-hero-meta
            className="hidden md:block mono-label text-right max-w-[240px]"
          >
            Senior Website Developer — building premium digital products for founders, agencies & studios.
          </div>
        </div>

        <h1
          data-hero-title
          className="display text-[clamp(3.25rem,10.5vw,12rem)] text-white text-balance max-w-[16ch]"
        >
          I build high-performance websites.
        </h1>

        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <p
            data-hero-sub
            className="text-mute-300 text-lg md:text-xl max-w-[42ch] leading-relaxed"
          >
            Designed to convert. Engineered to scale.
            <br />
            Crafted for brands who refuse to look like everyone else.
          </p>

          <div className="flex items-center gap-4">
            <a data-hero-cta href="#contact" className="btn-luxe btn-primary">
              <span>Start a project</span>
              <Arrow />
            </a>
            <a data-hero-cta href="#work" className="btn-luxe">
              <span>See work</span>
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="mono-label">Scroll</span>
        <span className="scroll-tick" />
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
