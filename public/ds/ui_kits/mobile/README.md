# SHADIEZ Mobile — UI Kit

A phone-viewport recreation of the SHADIEZ shop, built to the real
`design/MOBILE_SPEC.md`. Presented inside an iOS device frame (`ios-frame.jsx`),
composed from this design system's components + real product photography.

## Run
Open `index.html`. Loads `../../styles.css` + `../../_ds_bundle.js`, the iOS
frame, then `MobileApp.jsx`.

## Mobile-specific treatments (per spec — not a desktop reflow)
- **Hero** — full-bleed beach shot, centered logo under the dynamic island,
  headline "Something New Under The Sun" + one amber CTA. No 3D.
- **The object** — *stacked*: detail photo over a vertical selling-point list.
- **Lifestyle** — horizontal **scroll-snap carousel** of in-use shots (swipe).
- **The spectrum** — featured photo + a horizontal **colorway chip row**; tapping
  a chip crossfades the photo and floods the section to that `--cw-*` token.
- **The craft** — tap-through **accordion** of detail cards (notch / canvas /
  frame), replacing the desktop sticky-scrub.
- **Final CTA** — amber sun-field "Find your shade." + lineup.
- **Sticky bottom CTA bar** — frosted "Shop the Shade — pick your color".
- **Lead sheet** — native-feel bottom sheet (Field + Input + Button) with a
  success state.

## Components used
`Logo` · `Button` (warm / ink / primary) · `Badge` · `Field` · `Input`.
The colorway chips and accordion are mobile-specific compositions on top of the
token system.
