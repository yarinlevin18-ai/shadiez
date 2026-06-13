# SHADIEZ — Landing Page PRD

**Product:** SHADIEZ premium beach sun-shade — e-commerce landing page
**Doc owner:** Yarin · **Status:** Draft v1 · **Date:** 2026-06-13
**Scope of this PRD:** the *new storytelling landing page* (built fresh at `app/v3`,
swapped to the homepage when ready). The current `app/v2` "Catch-the-Light" page
stays live until then.

---

## 1. Purpose

Build the **best storytelling landing page** for SHADIEZ: a single English / LTR
page whose job is to make a beach-goer *feel* the promise of their own patch of
shade, understand the product in seconds, and buy (or submit a lead). Today's v2 is
beautiful but abstract and low-copy — strong on mood, light on narrative. v3's job
is to keep the premium feel **and** carry a deliberate story from first scroll to CTA.

**One-line goal:** turn "what is this wooden thing?" into "I need this for the next
time I'm at the beach" inside one scroll.

---

## 2. The product (do not get this wrong)

SHADIEZ ("shade") is a **portable personal beach sun-shade — NOT a chair.** A
foldable walnut/teak wooden frame with cream canvas that props up at an adjustable
notched angle and shades your **head and upper body while you lie on your towel**.
You don't sit *in* it — it shades *you*.

- **Hero:** the wooden + canvas shade.
- **Secondary:** matching tote bag (one per colorway) + pillow.
- **It's a product line, not one SKU** — multiple canvas colorways, each with a
  matching tote: burgundy stripe, navy stripe, navy, black pinstripe, solid teal,
  coral, butter, and cream/off-white (the hero colorway). → the page needs a real
  **colorway selector**, not a static photo.

**Key selling points (to confirm final order with Yarin):**
blocks the sun · adjustable recline angle · folds flat / packs down · sets up in
seconds · premium oak/walnut + canvas craft.

---

## 3. Audience

| Persona | Who | What wins them |
|---|---|---|
| **The sun-conscious sunbather** (primary) | 25–45, beach regular, dislikes burning, owns nice things | "Shade that travels with me; looks good doing it." Sun-protection + design. |
| **The design-led gifter** | Buying a premium, good-looking gift | Craft, materials, colorway choice, packaging/tote. |
| **The day-tripper / traveller** | Needs portable, packs-down gear | Folds flat, sets up in seconds, carries on the shoulder. |

Primary device split: **mobile-first** (beach product, social/IG traffic). Desktop
is the "premium showcase" experience. A `design/MOBILE_SPEC.md` + mobile wireframe
already exist — honor them.

---

## 4. Brand & positioning

- **Tagline / hero line (locked, real):** **"Something New Under The Sun."** Do not
  invent a replacement headline.
- **Positioning:** lead with **shade / sun protection**, never "seating." Emotional
  core: *your own patch of shade, anywhere.* Premium craft + portability are the
  supporting proof, not the lead.
- **Logo:** wavy-line "Z" wave-mark + "SHADIEZ" wordmark + small diamond accent.
  White on imagery. Minimal, premium.
- **Aesthetic:** warm, premium, light. The *opposite* of the dark Linear/Raycast
  look used in sister projects — **no dark tokens here.** Warm natural walnut wood,
  cream/canvas off-white, sandy beige neutrals, one muted dusty-blue accent, amber CTA.

### Design system (LOCKED — "Bright Coast", lives in `app/globals.css`)
```
--wood #8E5330  --wood-deep #623722  --cream #FBF7F0  --canvas #F8F6EF
--sand #ECE3D4  --ink #23201C  --ink-60 #6B6256  --sky #C3D6DC
--amber #E8A04A (primary CTA)  --accent-blue #768D9F  --navy #1F3A5F
--coral #D38773  --butter #EBDAB0
```
Fonts: **Schibsted Grotesk** (display) + **Hanken Grotesk** (body/UI). (v2 also uses
Fraunces for editorial display — keep that option open for v3's narrative voice.)

---

## 5. Goals & success metrics

**Primary conversion goal:** lead/purchase via the contact/lead form (currently
posts to FormSubmit → shadiezsales@gmail.com).

| Metric | Target intent |
|---|---|
| Lead-form submit rate | Primary — maximize |
| Scroll-depth to colorway section | Proxy for story landing |
| Time-to-first-CTA-interaction | Lower is better |
| Mobile bounce | Lower vs. current v2 |
| LCP / hero load | < 2.5s; 3D/video must not block first paint |

(No analytics wiring is specified yet — see Open Questions.)

---

## 6. Storytelling strategy — the narrative arc (the heart of v3)

The page should read as **one continuous story**, not a stack of feature boxes. The
arc moves the visitor from *problem → object → promise → choice → proof → act.*

1. **The hook — "Something New Under The Sun."**
   Cinematic full-bleed shade on a real beach. Oversized kinetic headline. No feature
   talk yet — establish mood, premium, and the literal sun/shade play. One CTA + scroll cue.

2. **The tension (the problem worth solving).**
   The universal beach friction: harsh sun, no shade, umbrellas that fly away / don't
   travel. Brief, felt, copy-light. Sets up *why this exists.*

3. **The reveal (meet the object).**
   The shade as a crafted object — walnut frame, cream canvas, the adjustable notch.
   This is where the 3D model earns its place: **the shade rotates / unfolds as you
   scroll**, showing it's a personal shade you lie under, not a chair you sit in.

4. **The promise (what it does for you).**
   The three or four selling points, each a story beat tied to a real in-use shot:
   *blocks the sun · adjusts to your angle · folds flat & travels · up in seconds.*
   Show the human lying in their own shade — the emotional payoff.

5. **The choice (make it yours).**
   Interactive **colorway selector** — pick a canvas, the page warms/floods to that
   color, matching tote shown. This is the "it's a line, and it's *yours*" moment and
   the strongest e-commerce hook.

6. **The proof (craft & trust).**
   Materials close-ups / detail hotspots (notch mechanism, canvas weave, folding
   frame, branding), plus any social proof / guarantees once available.

7. **The act (final CTA).**
   Background beach video (shade, waves) + a clear, single CTA. Restate
   "Something New Under The Sun" to close the loop opened in beat 1.

8. **Footer** — nav, legal, contact, WhatsApp support hours.

> Differentiation from v2: v2 ("The Object / The Spectrum / Wild") is abstract and
> mood-first. v3 keeps the premium mood **but** every section now has a job in a
> spoken narrative, with explicit problem→payoff framing and copy rewritten for a
> *sun-shade* (all "chair"/"last beach chair" language is dead).

---

## 7. Page section spec (build checklist)

| # | Section | Must contain | Motion / interaction |
|---|---|---|---|
| 1 | Hero | "Something New Under The Sun", subhead, CTA, scroll cue, full-bleed shade | Headline reveal; product scale+blur-in; gated until loader lifts |
| 2 | Tension | short problem copy + atmospheric beach visual | Scroll reveal, parallax |
| 3 | Reveal / 3D | the shade as object; adjustable-notch story | Scroll-driven model rotate/unfold (single Lenis scroll source) |
| 4 | Promise | 3–4 selling points, each w/ in-use shot | One reusable reveal pattern, staggered |
| 5 | Colorway selector | all colorways + matching tote, price/CTA | Click → page floods to real colorway color (exact tokens, no tint approximations) |
| 6 | Proof / details | material close-ups, tappable hotspots, trust | Hotspot reveal or scroll photo-sequence |
| 7 | Final CTA | Veo/beach background video + single CTA + lead form | Video must not block paint; lazy/poster fallback |
| 8 | Footer | nav, legal links, contact, WhatsApp hours | — |

---

## 8. Functional requirements

- **Lead capture:** reuse existing `lead-dialog` + `app/api/lead` flow (client-side
  submit to FormSubmit; Vercel server IPs are blocked — keep client-side).
- **Colorway selector:** real, interactive; selecting a colorway updates the matching
  tote image and floods the section with the exact locked color token.
- **Legal pages** (privacy, terms, returns, shipping, accessibility) already exist —
  v3 shares the same header/footer.
- **Cookie notice** persists (existing `cookie-notice` component).
- **Accessibility:** keyboard-operable colorway selector (it already uses
  `role="listbox"/"option"`), reduced-motion fallbacks, alt text, LTR.

---

## 9. Technical requirements

Match the existing stack (studio patterns drop in cleanly):
- Next.js 16 App Router · React 19 · TypeScript
- Tailwind CSS v4
- Framer Motion (2D motion) · **Lenis** as the single smooth-scroll source of truth
- shadcn/ui primitives
- **react-three-fiber + @react-three/drei** for the 3D shade hero (this project only)

**3D model:**
- Use `public/shadiez-shade-compressed.glb` (the uncompressed `.glb` is archived).
- On load, override `metalness = 0`, `roughness = 0.75` (glb ships `metallicFactor=1`;
  wood + canvas are non-metallic). Full PBR textures are present.
- **Critical scroll architecture:** Lenis drives scroll → Framer `useScroll` reads
  progress → hero `<Canvas>` lerps model rotation via `useFrame` from that shared
  progress. **Do NOT use drei `ScrollControls`** — it creates its own scroll container
  and fights Lenis.

**Build workflow (Yarin's proven flow):**
Excalidraw (lo-fi) → v0.dev (generate, v0 Max) → download/inspect → **manually
integrate** (never raw-ZIP-extract; it overwrites real files) → apply studio
animations last → 3D + video in code here.

---

## 10. Repo / organization notes

- v3 lives at `app/v3/` (mirrors the v2 layout: `page.tsx` + local effect components
  + scoped CSS). Keep v2 live (`app/page.tsx` re-exports it) until v3 is approved,
  then flip the re-export to v3.
- Non-build artifacts (After Effects sources, motion scripts, strategy briefs,
  exploration renders) are archived under `/archive` — see `archive/README.md`.
- Live `public/` assets: `v2/*`, `lottie/*`, `shadiez-shade-compressed.glb`. New v3
  assets should go in `public/v3/` to keep the two designs cleanly separable.

---

## 11. Out of scope

- TEEPO and motion-lab code (separate projects).
- Hebrew / RTL — this page is English / LTR.
- Any "AI" framing — this is a physical product brand.
- Framing the product as a "chair" — it is a **sun-shade**.
- Full checkout/payments (current goal is lead capture, not a cart) unless changed.

---

## 12. Open questions (for Yarin)

**Resolved 2026-06-13:**
- ✅ **Conversion model:** stay **lead-form** (existing lead-dialog → FormSubmit). No
  cart/payments in scope. Colorway selector is a choice + lead CTA, not add-to-cart.
- ✅ **Pricing:** **no price on the page** for now — lead-gen only.
- ✅ **Build path:** build v3 via the **product-landing-playbook** house method.

**Still open:**
1. **Final selling-point list + order** — confirm the 3–4 headline benefits.
4. **Social proof** — any reviews / press / UGC available for the proof section?
5. **Final-CTA video** — is the Veo beach video shot/available, or placeholder for now?
6. **Analytics** — which tool (GA4 / Plausible / none) for the success metrics in §5?
7. **Inventory** — are all listed colorways actually in stock / sellable at launch?
