# Aether — Luxury Portfolio

A cinematic, premium portfolio for a senior Website Developer. Built with Next.js 14, Tailwind CSS, GSAP/ScrollTrigger, and Lenis smooth scroll. Inspired by the pacing and polish of top-tier brand sites.

## Stack
- Next.js 14 (App Router) · React 18
- Tailwind CSS 3
- GSAP 3 + ScrollTrigger + SplitType
- Lenis smooth scroll
- Google Fonts: Instrument Serif (display) + Inter (sans)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Structure
```
app/
  globals.css      · design tokens, loader, cursor, form, marquee
  layout.js        · fonts, metadata, mounts Loader / Cursor / SmoothScroll / Navbar
  page.js          · composes sections
components/
  SmoothScroll.jsx · Lenis + GSAP ticker bridge, ScrollTrigger sync
  Cursor.jsx       · Dot + trailing ring, hover state on [data-hover]
  Loader.jsx       · 000→100 counter, fade out
  Navbar.jsx       · Fixed, blurs on scroll
  Hero.jsx         · Display type reveal, parallax sheen
  About.jsx        · Line-by-line reveal + stats
  Projects.jsx     · Large cards, hover zoom, scroll parallax
  Marquee.jsx      · Process banner
  Skills.jsx       · 3 capability columns + tech marquee
  Contact.jsx      · Form with floating labels, CTA, WhatsApp
  Footer.jsx
```

## Design tokens
- Background: `#0A0A0A` → `#111113`
- Text: `#FFFFFF` / `#A1A1AA`
- Accents (sparingly): Electric blue `#3B82F6`, soft violet `#8B5CF6`
- Easing: `expo.out`, `power3.out`
- Durations: 0.8–1.2s · Stagger: 0.08–0.15 · Delay: 0.1–0.3

## Notes
- Cursor auto-disables on coarse pointers.
- Loader blocks scroll until complete, then releases Lenis.
- All reveal animations start slightly delayed after scroll trigger for that "breathing" feel.
- Replace the Unsplash project images with your own in `components/Projects.jsx`.
