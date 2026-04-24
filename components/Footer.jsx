"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <div className="container-luxe">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="mono-label mb-4">Aether / Studio</div>
            <p className="display text-[clamp(2rem,5vw,4rem)] text-white leading-[1] max-w-[18ch]">
              Premium websites, quietly engineered.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
            <a href="mailto:hello@aether.studio" className="text-white text-xl" data-hover>
              hello@aether.studio
            </a>
            <div className="flex gap-5 mono-label">
              <a href="#" className="hover:text-white transition-colors" data-hover>Dribbble</a>
              <a href="#" className="hover:text-white transition-colors" data-hover>LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors" data-hover>Read.cv</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 justify-between mono-label">
          <div>© {new Date().getFullYear()} Aether Studio — All rights reserved.</div>
          <div>Designed & built in-house — v1.0</div>
        </div>
      </div>
    </footer>
  );
}
