"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    const ringPos = { x: pos.x, y: pos.y };

    const setDot = gsap.quickSetter(dot, "css");
    const setRing = gsap.quickSetter(ring, "css");

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      // Dot follows tightly
      pos.x += (target.x - pos.x) * 0.5;
      pos.y += (target.y - pos.y) * 0.5;
      // Ring trails softly
      ringPos.x += (target.x - ringPos.x) * 0.12;
      ringPos.y += (target.y - ringPos.y) * 0.12;

      setDot({ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)` });
      setRing({ transform: `translate3d(${ringPos.x - 19}px, ${ringPos.y - 19}px, 0)` });
    };

    gsap.ticker.add(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    const hoverables = document.querySelectorAll("a, button, [data-hover]");
    const onEnter = () => ring.classList.add("is-hover");
    const onLeave = () => ring.classList.remove("is-hover");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Observe new hoverable elements added later (project cards etc.)
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        if (!el.dataset.cursorBound) {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          el.dataset.cursorBound = "1";
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(loop);
      window.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
