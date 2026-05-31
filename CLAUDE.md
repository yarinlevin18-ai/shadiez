# SHADIEZ — Project context for Claude Code

Premium Israeli beach **sun-shade** brand. This project is an **English / LTR
e-commerce landing page** whose job is to drive purchases, with the shade as the
hero product. Client work — quality bar is high.

> This is a **separate project**. NOT TEEPO, NOT motion-lab.
> Location: `D:\Yarin\Projects\shadiez`

## The product — READ THIS, it's a SHADE not a chair
SHADIEZ ("shade") is a **portable personal beach sun-shade**, NOT a chair.
A foldable wooden frame with cream canvas that props up at an **adjustable angle**
(notched recline positions) and shades your head + upper body while you lie on
your towel. You don't sit IN it — it shades YOU. Think personal sun protection,
not seating.
- Hero product: the wooden + canvas shade.
- Secondary: matching tote bag (one per colorway) and pillow.

## Brand (from real assets — confirmed)
- **Official tagline: "Something New Under The Sun"** — USE THIS as the hero line.
  Do not invent a headline; it's their real line and it's strong (subverts
  "nothing new under the sun" + literally about sun/shade).
- Logo: a wavy-line "Z" mark (wind/shade/waves) + "SHADIEZ" wordmark + small
  diamond accent. White on imagery. Minimal, premium.
- **Product LINE, not one item — multiple canvas colorways, each with matching tote:**
    H10 burgundy stripe · H19 navy stripe · H20 navy · H37 black pinstripe ·
    H53 solid teal · + cream/off-white (the hero colorway, matches the 3D model).
  => Product showcase section should include a COLORWAY SELECTOR (real shop value).

## Positioning (value prop)
The pitch is SHADE / SUN — this matches the brand's own tagline "Something New
Under The Sun." Lead with shade, not seating (the brand does). Premium craft +
portability support it. Emotional core: your own patch of shade, anywhere.
Likely selling points: blocks the sun, adjustable angle, folds flat / packs down,
sets up in seconds, premium oak + canvas. (Confirm final list with Yarin.)

## Aesthetic
Warm, premium, light. Opposite of the dark Linear/Raycast look in other projects —
do NOT bring dark tokens here.
- Warm natural wood (real product is a richer walnut/teak brown, not pale oak)
- Cream / canvas off-white
- Sandy beige neutrals
- Muted dusty-blue as the single accent (from the logo)

**Color tokens below are DRAFT — confirm against the real logo + assets in**
`Downloads\shadiez-assets\` **before locking. Real wood is darker than first assumed.**
```
--wood:    #8A5A38   (draft, warm reddish walnut — matches real frames)
--cream:   #F3ECE0   (draft, hero canvas)
--sand:    #E4D9C6   (draft, linen/oatmeal — catalog bg)
--ink:     #2B2723   (draft, warm near-black text)
--accent:  #1F3A5F   (draft, deep navy — nautical, from H19/H20; or let the
                       chosen colorway provide color pops)
```

## Stack
Match motion-lab's stack so studio patterns drop in cleanly:
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4
- Framer Motion (2D animation)
- Lenis (smooth scroll — single scroll source of truth, see below)
- shadcn/ui primitives
- **react-three-fiber + @react-three/drei** (3D hero shade — this project only)

> If using the Next.js version guard, copy motion-lab's `AGENTS.md` in too:
> Next 16 has breaking changes — read `node_modules/next/dist/docs/` before
> writing Next-specific code.

## Page structure (6 sections, LTR)
1. **Hero** — the shade as the whole stage (3D, rotates on scroll), headline
   (about SHADE — old "last beach chair" line is DEAD), subhead, CTA, scroll cue.
   Layout: full-bleed centered, text stacked BELOW the product (no overlay).
2. **Product showcase** — split: product photo + selling points (shade/portability).
3. **Lifestyle gallery** — in-use shots: lying on the towel in your own shade.
4. **Details** — product with tappable hotspots (3D, or scroll photo sequence).
   Good hotspots: adjustable notch mechanism, canvas, folding frame, branding.
5. **Final CTA** — Veo background video (shade on beach, waves, birds) + CTA.
6. **Footer**.

Lo-fi wireframe for all 6 exists (Excalidraw, from Jimmy). Copy is PLACEHOLDER
AND was written for a "chair" — REWRITE all copy for a sun-shade.

## The 3D model
- The product shade, generated via Hyper3D Rodin (Gen-2.5, Symmetric, Quad mesh,
  baked normal, ~50k density), exported PBR 4K `.glb`. Verified structurally correct.
- **CONFIRMED ISSUE: glb has `metallicFactor = 1.0`.** Wood + canvas are non-metallic.
  Full PBR textures are present (baseColor + metallicRoughness + normal), so just
  override on load. In r3f:
    scene.traverse(o => { if(o.isMesh){ o.material.metalness=0; o.material.roughness=0.75 } })
- **CONFIRMED: 11.9 MB, 59.5k verts / 107.5k faces — too heavy for web.** Compress
  before shipping (after you're happy with it):
    npx gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp
  Expect ~1-3 MB result. Store the compressed one in /public.
- Structure verified coherent from all angles (V-fold silhouette correct, no
  exploded geometry) — full scroll rotation is safe.

## studio (motion-lab) — how it relates
"studio" = the motion-lab pattern library at `D:\Yarin\Projects\motion-lab`.
Source of 2D motion (reveals, stagger, hover, parallax). Read its spec:
- `D:\Yarin\Projects\motion-lab\dist-spec\motion-lab-spec.json`
- `D:\Yarin\Projects\motion-lab\dist-spec\MOTION_LAB.md`
Rules:
- Patterns are copy-paste portable (Framer Motion only). Bring the MOTION logic.
- **Do NOT bring studio's dark color tokens** — restyle with SHADIEZ's warm/light palette.
- studio is 2D only. 3D is explicitly out of studio's scope — see below.

## 3D + scroll integration (the critical architecture)
The 3D product is integrated **alongside** studio, not through it. Two render
systems sharing ONE scroll position.

**The landmine:** Lenis (studio's smooth scroll) and drei `ScrollControls` fight
each other — ScrollControls makes its own scroll container. Do not mix.

**The clean pattern — one scroll source of truth:**
1. Lenis drives smooth scroll for the whole page (studio's provider pattern).
2. Framer Motion `useScroll` reads scroll progress (same value studio reveals use).
3. The hero `<Canvas>` rotates the model via `useFrame`, lerping toward a target
   rotation from that shared scroll progress. **Do NOT use drei `ScrollControls`.**
4. studio's `hero-reveal` handles the 2D text/CTA overlay on top.

Result: rotation + text reveals driven by the same scroll number → in sync.

## Build workflow (Yarin's proven flow)
Excalidraw (lo-fi) → v0.dev (generate, v0 Max for quality) → download/inspect →
MANUALLY integrate (never direct ZIP extract — it overwrites real files) → apply
studio animations LAST → 3D + video in code here.

## Current state — VERIFY, don't assume
Jimmy hasn't seen the on-disk project. Before building, check and report:
- Is the project scaffolded? What's in `D:\Yarin\Projects\shadiez`?
- Installed deps: `@react-three/fiber`, `@react-three/drei`, `lenis`,
  `framer-motion`, Tailwind v4?
- Are studio's dist-spec files present/synced?
- Where is the `.glb` — in the project's `/public` yet?

## Out of scope
- TEEPO and motion-lab code (separate projects)
- Hebrew / RTL (this page is English / LTR)
- AI framing of any kind (physical product brand)
- Framing it as a "chair" — it is a SUN-SHADE
