"use client";

export default function ProcessBanner() {
  const items = [
    "Strategy",
    "Design",
    "Engineering",
    "Motion",
    "Launch",
    "Iterate"
  ];
  return (
    <section className="relative py-[10vh] border-y border-white/5 overflow-hidden">
      <div className="marquee">
        <div className="marquee__track">
          {[...items, ...items, ...items].map((w, i) => (
            <span
              key={i}
              className="display text-[clamp(3rem,8vw,8rem)] text-white/90 flex items-center gap-10"
            >
              {w}
              <span className="text-accent-violet/80">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
