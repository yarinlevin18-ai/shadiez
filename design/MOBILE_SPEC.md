# SHADIEZ — Mobile Redesign Spec & Build Prompt

Companion to `design/mobile-wireframe.excalidraw`. This is the document to feed
Claude Code. The wireframe is a visual reference; **this file is the source of truth**.

Scope: phone viewport only (`< md`, Tailwind `768px`). Desktop is unchanged.
The mobile version is **not a pure reflow** — the Hero, Lifestyle, Collections,
and Details sections get genuinely different mobile treatments (noted below).

---

## Architecture rules (read first)

- **Keep one page** (`app/page.tsx`). Branch *inside* sections, not via a separate route.
- **One scroll source of truth stays Lenis.** Do not add a second scroll container.
  Do **not** introduce drei `ScrollControls` anywhere (see CLAUDE.md landmine).
- **Breakpoint detection:** add a tiny `hooks/use-is-mobile.ts` (matchMedia
  `(max-width: 767px)`, SSR-safe: default `false`, set on mount). Use it to *skip
  mounting* the heavy 3D / scroll-scrub on phones — CSS `hidden`/`md:block` alone
  is not enough because the `<Canvas>` and `useFrame` still run.
- **Hydration safety:** anything keyed off `use-is-mobile` must render the desktop/
  default tree on first paint, then swap after mount, to avoid hydration mismatch.
  Prefer CSS (`hidden md:block` / `block md:hidden`) for pure layout swaps; reserve
  the JS hook for *not mounting* expensive subtrees (3D canvas, sticky scrub).
- Reuse existing tokens: `wood / cream / sand / ink / navy`, `font-serif` (Fraunces),
  radius `0.25rem`. CTA is **lead-gen** ("Contact us" → `useLeadDialog`), not a cart.
- Apply studio motion patterns last; on phones reduce stagger/parallax distances.
- Respect `prefers-reduced-motion` — fall back to fades, no transforms.

---

## Per-section mobile behavior

Real page order (`app/page.tsx`):
Header → Hero → ProductShowcase → LifestyleBand → TaglineMarquee → CollectionsGrid
→ DetailsSection → FinalCTA → Footer → MobileCtaBar.

### Header (`components/header.tsx`)
- Logo left/centered. Collapse nav links into a menu (sheet/disclosure) if present.
- **No header CTA on phone** — it's handed off to `MobileCtaBar`. (Already partly the case.)

### Hero (`components/hero-section.tsx`) — DIVERGES
- Desktop: 3D model scroll-rotates via `useFrame` + shared `useScroll`.
- **Mobile: do NOT mount the `<Canvas>`.** Render a static high-res product render
  (or a muted, `playsInline`, autoplay poster video) in its place. No scroll-linked
  rotation. This is the single biggest perf win (11.9 MB glb avoided on cellular).
- Layout unchanged in spirit: product as the stage, headline **"Something New Under
  The Sun"** stacked *below* the product, subhead, one CTA, scroll cue.
- Keep the studio `hero-reveal` 2D text entrance.

### ProductShowcase (`components/product-showcase.tsx`)
- Desktop split (photo | points). **Mobile: stack** — photo on top, selling points
  as a vertical list below. `flex-col md:flex-row`.

### LifestyleBand (`components/lifestyle-band.tsx`) — DIVERGES
- Desktop multi-column gallery. **Mobile: horizontal scroll-snap carousel**
  (`overflow-x-auto snap-x snap-mandatory`, one in-use shot per snap). Swipe, not stack.

### TaglineMarquee (`components/tagline-marquee.tsx`)
- Keep. Smaller type, slightly slower speed on phone. Pure CSS/Framer, cheap.

### CollectionsGrid (`components/collections-grid.tsx`) — DIVERGES
- This holds the colorway selector (H10 burgundy, H19 navy stripe, H20 navy,
  H37 black pinstripe, H53 teal, cream).
- **Mobile: 2-col grid** for the cards, and the colorway selector becomes a
  **horizontal swatch/chip row** (scroll-snap) instead of a wide grid.

### DetailsSection (`components/details-section.tsx`) — ⚠ RISKIEST, DIVERGES
- Desktop: pinned `sticky-section` that scroll-scrubs hotspot steps.
- **Mobile: drop the pin + scrub entirely.** `position: sticky` scrubbing fights
  touch scroll and feels broken. Replace with either:
  - a **tap-through accordion** of hotspot cards (notch mechanism, canvas, folding
    frame, branding), or
  - a **swipe carousel** of static hotspot cards.
- Use `use-is-mobile` to render the carousel/accordion branch and **not** mount the
  sticky scrub controller on phones.

### FinalCTA (`components/final-cta.tsx`)
- Desktop: Veo background video (beach, waves). **Mobile: poster image fallback**
  (or a shorter/lighter, muted, `playsInline` video). CTA prominent.

### Footer (`components/footer.tsx`)
- Stack columns vertically. Legal links, logo.

### MobileCtaBar (`components/mobile-cta-bar.tsx`) — already exists, keep
- Fixed bottom "Contact us" bar, `md:hidden`, slides up past the hero. No change
  needed unless a section overlaps it.

---

## Acceptance checks
- On a 375×812 viewport: no horizontal overflow; no 3D canvas in the DOM on hero;
  Details has no `position: sticky` scrub; Lifestyle + Collections swipe; bottom
  CTA appears after hero.
- Lighthouse mobile: no second scrollbar/scroll-jank; reduced-motion respected.
- Desktop (`≥ md`) visually identical to today.

---

## Paste-ready prompt for Claude Code

> Implement a mobile (`< md`) version of the SHADIEZ landing page following
> `design/MOBILE_SPEC.md` and the visual reference `design/mobile-wireframe.excalidraw`.
> Keep one page and Lenis as the only scroll source — never add drei `ScrollControls`.
> Add an SSR-safe `hooks/use-is-mobile.ts` (matchMedia `max-width:767px`) and use it to
> AVOID MOUNTING the hero `<Canvas>` and the Details sticky-scrub on phones, not just
> hide them. Per section: Hero → static render/poster + headline "Something New Under
> The Sun", no scroll rotation; ProductShowcase → stack photo over points; LifestyleBand
> → horizontal scroll-snap carousel; CollectionsGrid → 2-col grid + horizontal swatch
> chips for the colorway selector; DetailsSection → replace pinned scrub with a
> tap-through accordion (or swipe carousel) of static hotspot cards; FinalCTA → poster
> fallback for the Veo video. Reuse brand tokens (wood/cream/sand/ink/navy, Fraunces
> serif, radius 0.25rem) and the existing lead-gen "Contact us" CTA. Respect
> prefers-reduced-motion. Do not change the desktop layout. Show me a per-file plan
> before editing.
