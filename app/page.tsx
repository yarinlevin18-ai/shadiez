/**
 * Home — intentionally blank.
 *
 * The previous landing-page design (built before the Figma redesign) was removed.
 * This page is now a clean slate, to be rebuilt section-by-section from the Figma
 * design (exports live in `public/ae/`). Shared infrastructure is still in place:
 * layout, fonts, color tokens, the 3D engine (`components/three`), motion patterns
 * (`components/patterns`), and UI primitives (`components/ui`).
 */

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-sans text-sm uppercase tracking-[0.28em] text-ink-60">
        SHADIEZ
      </p>
      <p className="mt-4 max-w-sm font-serif text-2xl text-ink">
        New landing page — rebuilding from Figma.
      </p>
    </main>
  );
}
