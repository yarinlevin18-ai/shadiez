# SHADIEZ — Design System

> **Something New Under The Sun.**

A premium brand system for **SHADIEZ** — a portable personal beach **sun-shade**
(not a chair). This folder is the single source of truth for designing on-brand
SHADIEZ interfaces, marketing pages, and assets: colors, type, fonts, real
product photography, reusable React components, and a full landing-page UI kit.

---

## 1 · The product (get this right)

SHADIEZ ("shade") is a **portable personal beach sun-shade**. A foldable
walnut/teak wooden frame with cream canvas that props up at an **adjustable
notched recline** and shades your **head and upper body while you lie on your
towel**. You don't sit *in* it — it shades *you*.

- **Hero product:** the wooden + canvas shade.
- **Secondary:** a matching canvas tote (one per colorway) + pillow.
- **It's a product line, not one SKU.** Multiple canvas colorways, each with a
  matching tote: **Cream** (hero) · Coral · Butter · Dusty Blue · Navy ·
  Burgundy stripe · Black pinstripe.

**Positioning:** lead with **shade / sun protection**, never "seating." Emotional
core — *your own patch of shade, anywhere.* Premium craft + portability are the
supporting proof, not the lead. Israeli brand; the landing experience is
English / LTR.

**Selling points:** blocks the sun · adjustable recline angle · folds flat /
packs down · sets up in seconds · premium walnut + canvas craft.

---

## 2 · Sources (provenance)

This system was reverse-engineered from the real production codebase and brand
assets. Keep these for anyone who wants to go deeper:

| Source | Location | Notes |
|---|---|---|
| **Production codebase** | `Shadiez/` (Next.js 16 / React 19 / Tailwind v4 app) | The live e-commerce landing page (`app/v2` "Catch the Light" + `app/v3` storytelling rebuild). Token system in `app/globals.css`. |
| **PRD** | `Shadiez/docs/PRD.md` | Product + page narrative spec. |
| **Brand context** | `Shadiez/CLAUDE.md` | Locked "Bright Coast" palette, fonts, positioning. |
| **Product photography** | `Shadiez/public/v2/*` | Real studio + lifestyle shots of the exact model (copied into `assets/`). |
| **GitHub** | https://github.com/yarinlevin18-ai/claude-design | Referenced repo — **empty / inaccessible at build time (409).** Explore it for richer source if it becomes available. |

> The brand's own GitHub: https://github.com/yarinlevin18-ai/shadiez — explore for
> the full production implementation if you have access.

---

## 3 · Content fundamentals (voice & copy)

SHADIEZ copy is **warm, confident, and spare** — it sells a feeling, not a
spec sheet. The reader is a design-led beach-goer who hates burning and owns
nice things.

**Tone & vibe**
- **Premium but unfussy.** Calm, declarative, a little poetic. Never salesy,
  never loud, never "AI."
- **Sensory and emotional first**, functional second. Lead with the feeling of
  your own shade; let craft and portability be the proof underneath.
- **Short.** Headlines are 2–5 words. Body copy is one or two lines. White space
  does the rest.

**Person & address**
- Speaks to **"you" / "your"** — *"Your shade. Anywhere." · "Your own patch of
  shade." · "One is yours."*
- The brand refers to itself sparingly; it lets the product talk.

**Casing & punctuation**
- **The tagline is Title Case and locked:** *"Something New Under The Sun."* Do
  not rewrite it.
- Eyebrows / kickers are short and may run lowercase or small-caps
  (*"The object," "The spectrum," "Something new"*).
- The **wordmark is always all-caps: SHADIEZ**, widely tracked.
- Sentence case for body and UI labels. Em dashes and the occasional period
  used for rhythm (*"Long afternoons, claimed."*).

**Headline patterns (real, from the site)**
- "Something New Under The Sun." (hero / locked)
- "Built like furniture. Carried like a bag."
- "Your own patch of shade."
- "Seven canvases. One is yours."
- "Long afternoons, claimed."
- "Made for the long way home."
- "Find your shade."

**CTA language:** *"Shop the Shade," "Shop {Colorway}," "Contact us," "Get in
touch," "Send message."* Confident verbs, no urgency gimmicks, no exclamation
points.

**Don'ts:** never call it a "chair" or "seat." No exclamation marks in headlines.
No emoji. No "AI" framing — it's a physical product. No hype words ("game-
changing," "revolutionary").

---

## 4 · Visual foundations

The aesthetic is **"Bright Coast"** — warm, premium, light. The opposite of a
dark SaaS UI: sun-washed paper, natural walnut, cream canvas, one cool dusty-blue
accent for poise.

**Color**
- Page background is always warm paper (`--cream #FBF7F0`) — never pure white.
- Surfaces step warmer/darker: cream → `--canvas` → `--sand`. Dark sections use
  `--ink #23201C` (a warm near-black, never `#000`).
- **Walnut wood** (`--wood #8E5330` / `--wood-deep #623722`) is the signature
  material color — used for eyebrows, embossing cues, the thin "wood bar" accent.
- **Two CTA systems:** deep **navy** (`#1F3A5F`) solid buttons on light surfaces
  (header, dialog) and the **amber/sun pill** (`#E8A04A`/`#F4B23D`) over imagery
  and bright fields. Ink pills appear on amber backgrounds.
- The colorways (coral, butter, dusty-blue, navy, burgundy, pinstripe) are real
  product hues; when a canvas is selected the section *floods* to the exact token
  — no tints or approximations.

**Type**
- Display/UI pairing is **Schibsted Grotesk + Hanken Grotesk** (the locked
  system). **Fraunces** (serif) carries the editorial/magazine voice and the
  wordmark — used for big storytelling headlines, often with *italic* accent
  words.
- Hero headlines are **oversized** (up to ~10vw), line-height ~0.92, tight
  negative tracking. Eyebrows are uppercase, 0.26em tracked, in wood brown.

**Backgrounds & texture**
- **Full-bleed editorial photography** is the premium anchor — warm, sun-lit,
  golden-hour, grainy 35mm feel. Real beach + real product, never stock-cold.
- Between photos, **single-color "sun fields"** (amber/gold washes) act as a
  playful counterpoint, often hosting product cut-outs and drifting "sun mote"
  particles.
- A continuous **sand-gradient wash** runs down the whole page (cream → warm
  sand) rather than hard section color blocks.
- A subtle **film grain** multiply overlay (~5% opacity) sits over heroes and
  dark sections.
- Imagery vibe: **warm, sunny, slightly faded film** — amber/sand temperature,
  soft contrast, never cool or clinical, never B&W.

**Motion**
- House easing is `cubic-bezier(0.22, 1, 0.36, 1)` — a calm "settle" curve.
- Entrances are **slow reveals** (~1.25s): rise + fade + a hair of settle-scale.
  Hero headlines do a **per-word masked rise** (kinetic line).
- Scroll-linked **parallax** and gentle ken-burns zoom on media.
- Buttons get a **springy hover lift** (`y: -3, scale: 1.04`) and a tactile
  **press shrink** (`scale: 0.95`). Loaders are a slow "sunrise."
- Everything has a `prefers-reduced-motion` static fallback.

**Hover / press states**
- Links: opacity 0.8 → 1, or a sun-colored underline that wipes in left→right.
- Solid buttons: darken ~10% (`bg/90`) + deepen shadow; warm pills grow their
  glow shadow.
- Press: subtle scale-down to ~0.97 and a downward nudge.

**Borders, radius & shadows**
- The house is **square: 4px** (`--radius-sm`) for cards, inputs, navy buttons,
  dialogs. The **pill (100px)** is the single exception — the amber CTA.
- Borders are **hairline warm ink at low alpha** (`rgba(35,32,28,0.14)`), never
  pure grey.
- Shadows are **warm-tinted and soft**, used sparingly: lifted cards, frosted
  header (`0 1px 12px -6px`), big dialog shadow (`0 40px 80px -20px`), and the
  colored CTA glows (navy / amber).
- Cards = warm cream/canvas fill + hairline border + soft warm shadow; corners
  stay near-square. A thin **wood-tone bar** is a recurring brand cue on dialogs.

**Transparency & blur**
- Used for the **frosted scrolled header** (`backdrop-blur` + saturate over a
  translucent cream) and the dialog overlay (warm ink wash + light blur).
- A **liquid-glass** button variant (warm-tinted frosted material) exists for
  CTAs that sit over beach footage.

**Layout**
- Centered, max-width ~1280px, generous 32px gutters, editorial vertical rhythm
  (`clamp(80px, 12vw, 160px)` section padding).
- Mobile-first (beach product, IG traffic); desktop is the "premium showcase."
- Fixed elements: the frosted header (appears after the hero), a top
  scroll-progress line, and a mobile sticky CTA bar.

---

## 5 · Iconography

SHADIEZ is **near icon-free by design** — it's a photography-led brand, not a
dashboard. What it does use:

- **Brand wave-mark.** The logo is a **three-line wave** (wind / shade / waves)
  that reads as a stylized "Z," paired with the **SHADIEZ** wordmark and a small
  **diamond accent** (a 45°-rotated square). Single-color, stroked, scales with
  font size. Provided as SVG in `assets/logo/` (`wavemark-ink/cream/wood.svg`)
  and as the `<Logo>` / `<WaveMark>` React components.
- **Lucide** (`lucide-react`, thin 1.5px stroke) is the production app's UI icon
  set — used only where functional UI demands it (dialog close `X`, form
  `Check`/`Loader2`, a hand-rolled Instagram glyph in the footer). When you need
  an icon, **use Lucide from CDN** (`https://unpkg.com/lucide@latest`) to match
  stroke weight and style. This is the brand's real choice, not a substitution.
- **No emoji. No unicode-symbol icons.** Decorative line-art (radiating sun,
  flowing wave lines) is original monoline SVG, used sparingly on sun fields.
- Diamond accent `◆` (as a rotated square element) is the one recurring
  decorative glyph.

---

## 6 · Index / manifest

```
styles.css                  ← the one file consumers link (@import manifest)
tokens/
  fonts.css                 Google Fonts: Schibsted Grotesk · Hanken Grotesk · Fraunces
  colors.css                Bright Coast palette + colorway hues + semantic aliases
  typography.css            families, weights, scale, tracking
  spacing.css               spacing, radii, shadows, motion
  base.css                  element defaults + .ds-eyebrow / .ds-display / .ds-wordmark
guidelines/                 foundation specimen cards (Design System tab)
components/
  core/                     Button, Badge, IconButton, Logo
  forms/                    Input, Textarea, Field
  feedback/                 Dialog, Toast
  product/                  ColorwaySwatch, ColorwayPicker, ProductCard, SpecRow
ui_kits/
  landing/                  full SHADIEZ landing-page recreation (desktop)
  mobile/                   phone shop in an iOS frame (built to MOBILE_SPEC.md)
templates/
  landing/                  copy-and-go landing starter (ds-base.js loader)
assets/
  logo/                     wave-mark SVGs
  colorways/ kits/ product/ details/ lifestyle/   real product photography
SKILL.md                    Agent-Skill manifest (for Claude Code / download)
README.md                   this file
```

**Components** (mount via `const { X } = window.SHADIEZDesignSystem_4d9f8a`):
`Button` · `IconButton` · `Badge` · `Logo` · `WaveMark` · `Input` · `Textarea` ·
`Field` · `Dialog` · `Toast` · `ColorwaySwatch` · `ColorwayPicker` ·
`ProductCard` · `SpecRow`.

**UI kits:**
- `ui_kits/landing` — the desktop storytelling landing page (hero → object →
  colorway selector → lifestyle → final CTA + lead dialog).
- `ui_kits/mobile` — the phone shop inside an iOS frame, built to the real
  `MOBILE_SPEC.md` (stacked hero, lifestyle carousel, colorway chip row, details
  accordion, sticky bottom CTA + lead sheet).

**Templates** (consuming-project starting points): `templates/landing` — a
copy-and-go landing seed that loads the system via a one-line `ds-base.js`.
