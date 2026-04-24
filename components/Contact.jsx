"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Contact() {
  const root = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = root.current.querySelector("[data-contact-title]");
      const split = new SplitType(title, { types: "lines, words", lineClass: "split-line" });
      gsap.set(split.words, { yPercent: 120 });

      ScrollTrigger.create({
        trigger: title,
        start: "top 80%",
        onEnter: () =>
          gsap.to(split.words, {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.06,
            ease: "expo.out",
            delay: 0.1
          })
      });

      gsap.utils.toArray("[data-contact-fade]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: 0.1 + i * 0.07,
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const onFieldInput = (e) => {
    const wrap = e.currentTarget.closest(".field");
    if (!wrap) return;
    if (e.currentTarget.value.length > 0) wrap.classList.add("has-value");
    else wrap.classList.remove("has-value");
  };

  return (
    <section id="contact" ref={root} className="relative py-[14vh] md:py-[22vh]">
      <div className="container-luxe">
        <div className="flex items-center gap-3 mb-10" data-contact-fade>
          <span className="mono-label">04 — Contact</span>
          <span className="flex-1 hairline" />
        </div>

        <div className="grid md:grid-cols-12 gap-14">
          <div className="md:col-span-7">
            <h2
              data-contact-title
              className="display text-[clamp(2.75rem,8vw,8rem)] text-white leading-[0.95] text-balance max-w-[14ch]"
            >
              Let's build something exceptional.
            </h2>

            <p
              data-contact-fade
              className="mt-10 text-mute-300 text-lg md:text-xl max-w-[52ch] leading-relaxed"
            >
              A short brief is enough — timeline, scope, reference. I reply within one business day.
              Currently taking on two new engagements for Q2.
            </p>

            <div className="mt-12 flex flex-wrap gap-4" data-contact-fade>
              <a
                href="mailto:hello@aether.studio"
                className="btn-luxe btn-primary"
                data-hover
              >
                <span>hello@aether.studio</span>
              </a>
              <a
                href="https://wa.me/10000000000"
                target="_blank"
                rel="noreferrer"
                className="btn-luxe"
                data-hover
              >
                <span>WhatsApp</span>
                <WhatsIcon />
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 max-w-md" data-contact-fade>
              <div>
                <div className="mono-label mb-2">Based</div>
                <div className="text-white">London · Remote worldwide</div>
              </div>
              <div>
                <div className="mono-label mb-2">Socials</div>
                <div className="flex flex-col gap-1 text-white">
                  <a href="#" className="hover:text-accent-blue transition-colors" data-hover>Dribbble</a>
                  <a href="#" className="hover:text-accent-blue transition-colors" data-hover>LinkedIn</a>
                  <a href="#" className="hover:text-accent-blue transition-colors" data-hover>Read.cv</a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <form
              onSubmit={onSubmit}
              className="md:sticky md:top-24 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-10"
              data-contact-fade
            >
              {submitted ? (
                <div className="flex flex-col items-start gap-4 py-8">
                  <span className="mono-label text-accent-blue">Message received</span>
                  <p className="display text-3xl text-white leading-tight">
                    Thank you. I'll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mono-label mb-8">Project enquiry</div>
                  <div className="space-y-4">
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" required onInput={onFieldInput} />
                    </div>
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" required onInput={onFieldInput} />
                    </div>
                    <div className="field">
                      <label htmlFor="company">Company</label>
                      <input id="company" name="company" type="text" onInput={onFieldInput} />
                    </div>
                    <div className="field">
                      <label htmlFor="message">Brief</label>
                      <textarea id="message" name="message" rows="4" required onInput={onFieldInput} />
                    </div>
                  </div>

                  <button type="submit" className="btn-luxe btn-primary w-full justify-center mt-10" data-hover>
                    <span>Send enquiry</span>
                    <Arrow />
                  </button>

                  <p className="mono-label text-mute-400 mt-6">
                    Or email directly — hello@aether.studio
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
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

function WhatsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.1-1.2A11 11 0 1 0 20.5 3.5Zm-8.4 16.8c-1.7 0-3.3-.4-4.7-1.3l-.3-.2-3 .7.8-3-.2-.3a9.1 9.1 0 1 1 7.4 4.1Zm5-6.8c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1l-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.4-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5H7.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
