# SHADIEZ — After Effects motion brief

Everything needed to hand-animate the landing page in AE.
Work in a **1440 × 804** comp per scene (or 2880 × 1608 @2x — double all coords).

## Assets you have
- **Backgrounds (PNG @2x):** `hero-plate.png`, `colorways-plate.png`, `finale-plate.png`  (in `public/ae/layers/`)
- **Full-frame references (1x):** `ae-01..ae-09` (in `public/ae/`) — use to eyeball layout
- **Details bg** is solid **cream `#FBF7F0`** (make an AE solid); the shade photo card is in `ae-06-details.png`
- **Collection bg** is solid cream too; the 3 cards are visible in `ae-07` (re-export individually if you want them separate)

> Text comes out of Figma as outlines (non-editable), so **retype it in AE** with the fonts below — cleaner and fully editable. Copy + coords are all here.

## Brand kit
- **Fonts:** Schibsted Grotesk (display) — Bold for big headlines, SemiBold for section titles. Hanken Grotesk (UI/body) — Regular for body/subhead, SemiBold for eyebrows / nav / buttons.
- **Colors:** ink `#23201C` · ink-60 `#6B6256` · cream `#FBF7F0` · amber `#E8A04A` · white `#FFFFFF`
- **Nav (all sections):** wordmark "SHADIEZ" at `x96 y28` (ink, or white on photos) · links "Shade · Colorways · Details · About" right-aligned, ends near `x1344 y28`

## Motion recipe (locked)
- **Reveal:** Position Y **+24 → 0** + Opacity **0 → 100**, ~**12 frames** (@30fps). F9 Easy Ease, then Graph Editor: outgoing influence ~**85%** (fast-out `[0.22,1,0.36,1]` feel).
- **Stagger** siblings (nav links, cards, hotspots): **2–3 frames** apart.
- **Button:** Scale **98 → 100** + fade.
- **Photo ken-burns:** Scale **100 → 108** across the scene, slow ease both ends.

---

## Scene order & timing (≈18s total)
| # | Scene | In | Hold | Motion |
|---|-------|----|------|--------|
| 1 | Loader sunrise | 0.0 | 0.9s | cross-dissolve |
| 2 | Loader noon | 0.8 | 0.9s | cross-dissolve |
| 3 | Loader sunset | 1.6 | 1.0s | cross-dissolve |
| 4 | Hero | 2.6 | 3.2s | plate ken-burns + text rise-in |
| 5 | Colorways | 5.6 | 2.6s | slide-up + title/shades rise |
| 6 | Details | 8.0 | 2.6s | slide-up + text rise + hotspots pop |
| 7 | Collection | 10.4 | 2.6s | slide-up + cards stagger |
| 8 | Finale | 12.8 | 3.4s | plate ken-burns + text rise |
| 9 | Footer | 15.8 | 2.0s | slide-up |

---

## HERO (plate: hero-plate.png)
- **nav** `x96 y28` (white)
- **headline** `x96 y250` — Schibsted Bold ~72/104px, ink (white over photo):
  `Something New`
  `Under the Sun`
- **subhead** `x96 y424` — Hanken Regular 20px, ink-60/white:
  `A portable personal sun-shade — your own patch of shade, anywhere on the sand.`
- **CTA pill** `x96 y508` — amber bg, white "Shop Now", Hanken SemiBold 16
- Reveal order: headline → subhead (+0.25s) → CTA (+0.5s). Plate ken-burns whole scene.

## COLORWAYS (plate: colorways-plate.png)
- **nav** `x0 y28`
- **title** `x96 y132` — Schibsted Bold 60px, ink: `Pick Your Color`  *(note: currently reads "Pick Your Shadeiz" in the file — change if unintended)*
- Reveal: title rises; shades (already in plate) can scale 100→103 for life.

## DETAILS (bg: cream solid #FBF7F0)
- **nav** `x0 y28`
- **eyebrow** `x96 y250` — Hanken SemiBold 13px, amber, tracked: `DETAILS`
- **title** `x96 y284` — Schibsted SemiBold 46px, ink:
  `Crafted to last.`
  `Folds in seconds.`
- **body** `x96 y440` — Hanken Regular 18px, ink-60:
  `Premium oak frame, heavyweight canvas, and a notched recline that sets in seconds — then folds flat into its tote.`
- **shade photo** `x830 y110` (480×640, rounded 18) — from ae-06
- **hotspot dots** (amber 26px, white ring) over the shade → pop in + label:
  - "Adjustable Recline" · "Premium Canvas" · "Folds Flat"
- Reveal: eyebrow → title → body (stagger), then dots pop (stagger 3f).

## COLLECTION (bg: cream solid #FBF7F0)
- **nav** `x0 y28`
- **eyebrow** `x96 y150` — Hanken SemiBold 13px amber: `THE COLLECTION`
- **title** `x96 y184` — Schibsted SemiBold 46px ink: `Shade for every coast.`
- **3 cards** at `y320`, each 392 wide, 36 gap → card1 `x96`, card2 `x524`, card3 `x952`
  - Card 1 — **Coastal Navy** · "Shade + matching tote" · **$189**
  - Card 2 — **Harbor Burgundy** · "Shade + matching tote" · **$189**
  - Card 3 — **The Full Collection** · "All six colorways" · **From $169**
  - each card: white rounded panel + product photo + name (Schibsted SemiBold 22) + desc (Hanken 14 ink-60) + price (Schibsted SemiBold 20) + amber "Add to bag" pill
- Reveal: header rises, then cards rise + fade **staggered 3f apart**.

## FINALE (plate: finale-plate.png — sunset + scrim baked in)
- **wordmark** `x96 y44` — white
- **headline** `x96 y470` — Schibsted Bold 64/92px, white:
  `Your patch of shade`
  `is waiting.`
- **sub** `x96 y638` — Hanken Regular 20px, white:
  `Premium beach sun-shades, made for long golden afternoons.`
- **CTA pill** `x96 y712` — amber, white "Shop the Collection"
- Reveal: plate ken-burns (slow), headline → sub → CTA rise-in.

## FOOTER (ae-09-footer.png)
- ink `#23201C` background, full-frame. Slide up at the end, hold.
