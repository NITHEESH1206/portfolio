"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    const num = numRef.current;
    const bar = barRef.current;
    if (!root || !num || !bar) return;

    // Prevent scroll during load
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");

    const counter = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        document.documentElement.classList.remove("lenis-stopped");
        setTimeout(() => setMounted(false), 50);
      }
    });

    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0)
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
      .to([num, logoRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.inOut",
        stagger: 0.05
      }, "+=0.25")
      .to(root, {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut"
      }, "-=0.3");

    return () => tl.kill();
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="loader-root">
      <div className="absolute inset-0 hero-sheen" />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <div
          ref={logoRef}
          className="flex items-center gap-3 opacity-0 translate-y-4"
        >
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="mono-label text-white/90">AETHER / STUDIO</span>
        </div>
        <div ref={numRef} className="loader-num grad-text">
          000
        </div>
        <div className="w-[240px] h-[1px] bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full origin-left bg-white"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
