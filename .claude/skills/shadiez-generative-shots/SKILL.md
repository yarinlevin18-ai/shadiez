---
name: shadiez-generative-shots
description: Generate brand-faithful, editorial SHADIEZ product imagery (hero shots, lifestyle scenes, ads) with Higgsfield using the real shade as a reference. Use for ANY creative product image instead of hand-compositing cutouts in Photoshop. Triggers — "hero shot", "product shot", "lifestyle image", "ad creative", "campaign visual", "make it look good / premium / editorial", "a beautiful shot of the shade".
---

# SHADIEZ — Generative Product Shots

## When to use this (the core lesson)
For **creative** imagery (heroes, lifestyle, ads, concept shots) **generate a real styled scene** — do NOT paste cutouts onto a stock beach in Photoshop. Compositing produces flat, "stuck-on" results (the catalog-row failure). Generation gives photographic light, depth, and atmosphere with the product matching the real shade.

Reach for **Photoshop** (see `design-system/ps-scripts/`, if present) only for *precise mechanical* work: exact cutouts, removing a background, batch tonal grading, putting a known asset at exact pixels. Reach for **generation** for anything that needs to *look beautiful*.

## Engine
Higgsfield MCP (already connected + authed). No CLI needed.
- Model: **`marketing_studio_image`** (product/ad hero generator). Takes the shade as a reference → keeps the real walnut frame + cream canvas + "SHADIEZ" mark.
- Resolution `2k`, `count` up to 4, ~**2 credits per 3 images** (cheap — always `get_cost: true` first to confirm).
- Aspect: `16:9` hero/web, `4:5` IG feed, `9:16` stories/reels, `2:3` Pinterest.

## Workflow (proven)
1. `list_workspaces` → `select_workspace` (private workspace).
2. Get the shade in as a reference: `media_upload_widget` (user uploads `public/landing/product/shade-cutout.png`) → returns a `media_id`. (A clean transparent cutout reference gives the best fidelity.)
3. Preflight: `generate_image` with `get_cost: true`.
4. `generate_image`:
   - `model: "marketing_studio_image"`
   - `medias: [{ value: <media_id>, role: "image" }]`
   - `resolution: "2k"`, `count: 3`, `aspect_ratio: "16:9"`
   - prompt = the recipe below.
5. Poll `job_display <job_id>` per id until `status: completed` (jobs can finish at different times; a slow one shouldn't block delivery of the fast ones). Background-`sleep` ~30s between polls.
6. Download `results.rawUrl` (curl -L) into `public/landing/generated/`.

## Prompt recipe (golden-hour hero — the one that worked)
> Editorial brand hero photograph of a premium portable beach sun-shade with a solid walnut wood frame and cream canvas, propped at an adjustable recline angle, planted on warm rippled golden sand at golden hour. Low warm sun, long soft cast shadow across the sand, gentle lens flare, calm turquoise sea and soft horizon behind, dreamy shallow depth of field, elevated minimal lifestyle, warm coastal palette of cream, amber, sand and soft dusty blue, cinematic magazine-quality lighting, no people.

Always end with **"no people"** unless a model/lifestyle shot is wanted. Keep the **Bright Coast** palette words (cream, amber, sand, dusty blue) — see [[feedback_product_landing_design]] / [[feedback_object_first_assets]] in memory.

### Variations to offer
- **Conceptual / levitation** — "floating against a soft gradient, frozen sand particles, sculptural, studio." (use `conceptual` framing)
- **Lifestyle with person** — "a person reclining in its shade on a quiet beach, sun-protected, candid." (drop "no people")
- **Clean studio** — "on seamless warm-sand backdrop, soft shadow, catalog hero, minimal."
- **Pinterest pin** — same recipe, `aspect_ratio: "2:3"`.

## Art-direction guardrails
Warm, premium, light — never dark/generic. Hierarchy + depth + one hero, never a flat evenly-spaced row. Match the real product (walnut + cream canvas). If a result looks "stuck-on" or flat, it's the wrong tool — regenerate, don't composite.
