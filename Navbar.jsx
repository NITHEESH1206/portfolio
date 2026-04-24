"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, delay: 3.1, ease: "expo.out" }
    );

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-[rgba(10,10,10,0.55)] backdrop-blur-xl border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between py-5">
        <a href="#top" className="flex items-center gap-3 group" data-hover>
          <span className="w-2 h-2 rounded-full bg-white group-hover:bg-accent-blue transition-colors duration-500" />
          <span className="mono-label text-white">AETHER</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" data-hover>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn-luxe text-[12px] tracking-[0.2em] uppercase py-3 px-5"
          data-hover
        >
          Start a project
          <span aria-hidden className="inline-block w-4 h-[1px] bg-current" />
        </a>
      </div>
    </header>
  );
}
