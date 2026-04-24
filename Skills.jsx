"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const groups = [
  {
    title: "Engineering",
    items: [
      "Next.js / React",
      "TypeScript",
      "Node.js & Edge runtimes",
      "Headless CMS — Sanity, Contentful",
      "Shopify Hydrogen",
      "Performance budgets & Core Web Vitals"
    ]
  },
  {
    title: "Craft & Motion",
    items: [
      "GSAP + ScrollTrigger",
      "Lenis smooth scroll",
      "Framer Motion",
      "WebGL / Three.js",
      "Custom interaction systems",
      "Design-to-code handoff"
    ]
  },
  {
    title: "Delivery",
    items: [
      "Vercel, Cloudflare, AWS",
      "CI/CD, preview environments",
      "A/B testing & analytics",
      "Accessibility (WCAG 2.2)",
      "SEO & schema",
      "Long-term partnership"
    ]
  }
];

const marquee = [
  "Next.js",
  "GSAP",
  "Lenis",
  "Shopify",
  "Sanity",
  "TypeScript",
  "Three.js",
  "Framer Motion",
  "Vercel",
  "Tailwind CSS",
  "Node.js",
  "WebGL"
];

export default function Skills() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-skill-head]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: 0.1 + i * 0.08,
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      gsap.utils.toArray("[data-skill-group]").forEach((el, i) => {
        const items = el.querySelectorAll("[data-skill-item]");
        gsap.fromTo(
          el.querySelector("[data-skill-title]"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 80%" }
          }
        );
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.2 + i * 0.08,
            scrollTrigger: { trigger: el, start: "top 80%" }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="relative py-[14vh] md:py-[22vh]">
      <div className="container-luxe">
        <div className="flex items-center gap-3 mb-10" data-skill-head>
          <span className="mono-label">03 — Capabilities</span>
          <span className="flex-1 hairline" />
        </div>

        <h2
          data-skill-head
          className="display text-[clamp(2.25rem,6vw,5.5rem)] text-white leading-[0.95] max-w-[18ch] text-balance mb-20"
        >
          A full-stack toolkit, obsessively refined.
        </h2>

        <div className="grid md:grid-cols-3 gap-14 md:gap-20">
          {groups.map((g) => (
            <div key={g.title} data-skill-group>
              <div
                data-skill-title
                className="mono-label mb-8 flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                {g.title}
              </div>
              <ul className="space-y-5">
                {g.items.map((it) => (
                  <li
                    key={it}
                    data-skill-item
                    className="flex items-baseline justify-between border-b border-white/5 pb-4 text-white/90 text-lg"
                  >
                    <span>{it}</span>
                    <span className="text-mute-400 text-xs tracking-[0.25em]">
                      ◆
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-28 md:mt-40 marquee">
        <div className="marquee__track">
          {[...marquee, ...marquee].map((w, i) => (
            <span
              key={i}
              className="display text-[clamp(2.5rem,6vw,6rem)] text-white/10 hover:text-white/60 transition-colors duration-700"
              data-hover
            >
              {w} <span className="text-accent-blue/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
