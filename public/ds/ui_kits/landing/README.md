# SHADIEZ Landing — UI Kit

A high-fidelity, interactive recreation of the SHADIEZ storytelling landing page,
composed entirely from this design system's components and real product
photography. It mirrors the production app (`Shadiez/app/v2` + the `app/v3` PRD
narrative), not a new design.

## Run
Open `index.html`. It loads `../../styles.css` + `../../_ds_bundle.js`, then the
screen files below.

## The narrative (scroll arc)
1. **Hero** (`Hero.jsx`) — full-bleed beach photo, oversized kinetic Fraunces
   headline ("Something New Under The Sun"), amber CTA, scroll cue. Frosted nav
   (`Nav.jsx`) fades from transparent → frosted glass past the hero.
2. **The object** (`Object.jsx`) — editorial split: copy + a walnut-detail
   collage. Eyebrow → display headline → `SpecRow` → CTA.
3. **The spectrum** (`Colorways.jsx`) — the signature interactive selector. Pick a
   canvas (`ColorwayPicker`) → the product photo crossfades **and the whole
   section floods to that exact `--cw-*` token.** Persists the choice in
   localStorage.
4. **Lifestyle** (`Lifestyle.jsx`) — full-bleed golden-hour band + the
   matching-tote trio (`ProductCard`).
5. **Final CTA + footer** (`FinalCta.jsx`) — bright amber sun-field finale
   ("Find your shade.") that bookends the hero, then the dark footer.

Every CTA opens the **lead dialog** (`Dialog` + `Field` + `Input` + `Button`)
with idle → submitting → success states (the submit is faked here; the real app
posts to FormSubmit).

## Components used
`Logo` · `WaveMark` · `Button` (primary / warm / ink / glass) · `Badge` ·
`SpecRow` · `ColorwayPicker` · `ProductCard` · `Dialog` · `Field` · `Input`.

## Notes
- Scroll reveals use a small local `Reveal` (IntersectionObserver) exposed on
  `window.Reveal`; all entrances have reduced-motion fallbacks.
- Imagery is the real product (`assets/lifestyle`, `assets/colorways`,
  `assets/kits`, `assets/details`, `assets/product`).
