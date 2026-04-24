"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const stats = [
  { k: "60+", label: "Shipped projects" },
  { k: "9y", label: "Crafting on the web" },
  { k: "100", label: "Lighthouse obsession" },
  { k: "∞", label: "Revisions, until right" }
];

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paragraph = root.current.querySelector("[data-about-p]");
      const split = new SplitType(paragraph, {
        types: "lines",
        lineClass: "split-line"
      });
      gsap.set(
        split.lines.flatMap((l) => l.children),
        { yPercent: 110 }
      );

      ScrollTrigger.create({
        trigger: paragraph,
        start: "top 75%",
        onEnter: () => {
          gsap.to(split.lines.flatMap((l) => l.children), {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.09,
            ease: "expo.out",
            delay: 0.15
          });
        }
      });

      gsap.utils.toArray("[data-about-fade]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: 0.1 + i * 0.08,
            scrollTrigger: { trigger: el, start: "top 80%" }
          }
        );
      });

      gsap.utils.toArray("[data-stat-num]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative py-[14vh] md:py-[22vh]">
      <div className="container-luxe">
        <div className="flex items-center gap-3 mb-16" data-about-fade>
          <span className="mono-label">01 — About</span>
          <span className="flex-1 hairline" />
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4" data-about-fade>
            <p className="mono-label text-mute-300">A studio of one, built for brands who care about detail.</p>
          </div>

          <div className="md:col-span-8">
            <p
              data-about-p
              className="display text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.12] text-white text-balance"
            >
              I craft high-performance, cinematic websites for ambitious founders and modern brands.
              Every interaction is designed, every millisecond engineered —
              so your product feels as premium online as it does in the room.
            </p>
          </div>
        </div>

        <div className="mt-24 md:mt-36 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-[clamp(2.25rem,5vw,4.5rem)] text-white leading-none" data-stat-num>
                {s.k}
              </div>
              <div className="mono-label mt-4" data-about-fade>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
