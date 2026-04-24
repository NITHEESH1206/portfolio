"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    n: "01",
    client: "Nordlys Maison",
    title: "Editorial commerce for a Nordic fashion house",
    tags: ["E-commerce", "Headless", "Motion"],
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80",
    accent: "blue"
  },
  {
    n: "02",
    client: "Ordinate Capital",
    title: "Institutional-grade marketing site for a private fund",
    tags: ["Brand site", "Next.js", "CMS"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1600&q=80",
    accent: "violet"
  },
  {
    n: "03",
    client: "Forme Atelier",
    title: "Cinematic portfolio for an architecture practice",
    tags: ["Portfolio", "WebGL", "3D"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
    accent: "blue"
  },
  {
    n: "04",
    client: "Solace Hotels",
    title: "Booking experience for a boutique hospitality group",
    tags: ["Booking", "CMS", "Perf"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210ae?auto=format&fit=crop&w=1600&q=80",
    accent: "violet"
  }
];

export default function Projects() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section intro
      gsap.utils.toArray("[data-proj-head]").forEach((el, i) => {
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

      // Cards
      gsap.utils.toArray("[data-project-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: "expo.out",
            delay: (i % 2) * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%" }
          }
        );

        // Subtle parallax on media
        const media = card.querySelector("[data-project-media]");
        if (media) {
          gsap.to(media, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative py-[14vh] md:py-[22vh]">
      <div className="container-luxe">
        <div className="flex items-end justify-between gap-8 mb-20">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8" data-proj-head>
              <span className="mono-label">02 — Selected work</span>
              <span className="flex-1 hairline" />
            </div>
            <h2
              data-proj-head
              className="display text-[clamp(2.5rem,7vw,6.5rem)] text-white leading-[0.95] text-balance max-w-[14ch]"
            >
              Work that earns <em className="italic text-mute-300">its place.</em>
            </h2>
          </div>
          <p
            data-proj-head
            className="mono-label max-w-[24ch] text-right hidden md:block"
          >
            A selection of engagements from 2024–2026. Full case studies on request.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} p={p} large={i % 3 === 0} />
          ))}
        </div>

        <div className="mt-20 flex justify-center" data-proj-head>
          <a href="#contact" className="btn-luxe">
            <span>Request the full portfolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, large }) {
  return (
    <a
      href="#contact"
      data-project-card
      data-hover
      className={`project-card group block ${large ? "md:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
        <div
          data-project-media
          className="project-card__media absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${p.image})` }}
        />
        <div className="project-card__overlay" />
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <span className="mono-label text-white/80">{p.n}</span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              p.accent === "blue"
                ? "bg-accent-blue shadow-[0_0_18px_rgba(59,130,246,0.9)]"
                : "bg-accent-violet shadow-[0_0_18px_rgba(139,92,246,0.9)]"
            }`}
          />
        </div>
        <div className="absolute top-6 right-6 mono-label text-white/70">{p.year}</div>
      </div>

      <div className="p-6 md:p-8 flex items-start justify-between gap-6">
        <div>
          <div className="mono-label text-mute-300 mb-3">{p.client}</div>
          <h3 className="display text-[clamp(1.35rem,2.2vw,2rem)] text-white text-balance max-w-[28ch] leading-[1.1]">
            {p.title}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/10 text-mute-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-black">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
