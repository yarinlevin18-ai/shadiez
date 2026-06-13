# Archive

Source-of-truth and exploration files that are **not** part of the live website
build. Moved here on 2026-06-13 to declutter the repo root and `public/`. Nothing
was deleted — everything is preserved in git history. None of these files are
referenced by the live site (`app/`, `components/`).

## `after-effects/`
After Effects project + helper scripts used to author the intro/motion graphics.
- `Shadiez.aep` — main AE project
- `Adobe After Effects Auto-Save/` — AE auto-save snapshots
- `SHADIEZ_AE_build.jsx`, `SHADIEZ_AE_setup.jsx`, `SHADIEZ_intro.jsx` — AE ExtendScript
- `SHADIEZ_AE_motion_brief.md` — motion brief for the AE work

## `strategy/`
Pre-design research and reference notes.
- `SHADIEZ_competitor_inspiration.md`
- `inspiration-refs.md`

## `explorations/`
Generated/exploration assets that were dumped into `public/` but never wired into
the shipped page.
- `Higgsfield/` — raw AI image renders (Higgsfield)
- `collection/`, `colorways/` — earlier asset cuts (live page uses `/public/v2/*`)
- `shadiez-v2.html` — stale standalone HTML mockup
- `shadiez-shade.glb` — uncompressed 3D model (live page uses `shadiez-shade-compressed.glb`)
- `public-orphans/` — loose unreferenced images from `public/` root
  (lifestyle shots, WhatsApp source photos, misc PNG/JPEG)

## Still live (left in place)
- `public/v2/*` — all images used by the current landing page
- `public/lottie/*` — loader/wave Lottie animations
- `public/shadiez-shade-compressed.glb` — the 3D model the site loads
- `CLAUDE.md`, `DESIGN_WORKFLOW.md` — active project docs (kept at root)
