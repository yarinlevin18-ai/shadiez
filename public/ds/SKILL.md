---
name: shadiez-design
description: Use this skill to generate well-branded interfaces and assets for SHADIEZ, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# SHADIEZ — design skill

SHADIEZ is a premium portable beach **sun-shade** (a foldable walnut frame + cream
canvas — NOT a chair). Brand line: *"Something New Under The Sun."* Aesthetic:
warm, premium, light — the "Bright Coast" palette (walnut, cream, sand, ink, one
dusty-blue accent, amber/navy CTAs).

Read **README.md** in this skill first — it carries the full product context,
content fundamentals (voice), visual foundations, and iconography. Then explore:

- `styles.css` + `tokens/*` — link `styles.css` to inherit every color, font, and
  spacing token (e.g. `var(--wood)`, `var(--amber)`, `var(--font-serif)`).
- `components/*` — reusable React primitives (Button, Logo, Badge, Input, Field,
  Dialog, Toast, ColorwayPicker, ProductCard, SpecRow). Each has a `.prompt.md`.
- `ui_kits/landing/` — a full landing-page recreation to lift patterns from.
- `assets/*` — real logos and product photography. **Copy these out**; never
  redraw them.
- `guidelines/*` — foundation specimen cards.

**If creating visual artifacts** (slides, mocks, throwaway prototypes): copy the
assets you need out of `assets/` and write static HTML files the user can open.
**If working on production code**: copy assets and follow the rules here to design
as an expert in this brand.

If the user invokes this skill without other guidance, ask what they want to build
or design, ask a few focused questions, and act as an expert SHADIEZ designer who
outputs HTML artifacts _or_ production code, depending on the need.

## Non-negotiables
- It's a **shade**, never a "chair" or "seat."
- Page background is warm **cream** (`#FBF7F0`), never pure white; dark is warm
  **ink** (`#23201C`), never `#000`.
- Headlines are short, Title-Case or sentence case; **no emoji, no exclamation
  marks, no hype.** Speak to "you."
- Square 4px corners everywhere; the amber **pill** CTA is the one exception.
- Photography leads — warm, sun-lit, golden-hour, slight film grain.

## Installing in Claude Code

This folder is a self-contained Agent Skill. To use it locally:

```bash
# project-scoped (recommended — travels with the repo)
mkdir -p .claude/skills
cp -R shadiez-design .claude/skills/shadiez-design

# …or user-scoped (available in every project)
mkdir -p ~/.claude/skills
cp -R shadiez-design ~/.claude/skills/shadiez-design
```

Claude Code auto-discovers the skill from its YAML front-matter. Invoke it by
asking for SHADIEZ work ("design a SHADIEZ product page", "make a SHADIEZ email")
or explicitly: `/shadiez-design`.

## How the pieces fit together

- **`styles.css`** is the only stylesheet to link — it `@import`s `tokens/*`
  (fonts, colors, type, spacing, base). Everything keys off CSS custom
  properties, so you can theme by overriding tokens.
- **Components** are plain React (`components/<group>/<Name>.jsx`) with a sibling
  `.d.ts` (props) and `.prompt.md` (usage). They import only React and read
  styling from the CSS variables — **drop them straight into any React/Next/Vite
  app.** No build step, no npm deps beyond React.
- **`_ds_bundle.js`** is a pre-compiled UMD bundle of every component, exposed on
  `window.SHADIEZDesignSystem_4d9f8a`. It exists so the standalone HTML cards and
  UI kits in this folder render without a bundler. In a real codebase you'll
  usually import the `.jsx` source instead — but the bundle is handy for quick
  static mockups (`<script src="_ds_bundle.js">` then read the namespace).
- **UI kits** (`ui_kits/landing`, `ui_kits/mobile`) and **`templates/landing`**
  are reference recreations — read them to see the components composed into real
  screens, then rebuild in your own stack. They are not meant to ship as-is.
- **Assets** in `assets/` (logos, product photography) are real brand files —
  copy them out; never redraw them.
