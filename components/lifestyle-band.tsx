import Image from "next/image"
import { HeroReveal, HeroRevealItem } from "@/components/patterns/hero-reveal"

// Full-bleed editorial band between the product showcase and the collections grid.
// Big mood shot, bottom-up dark scrim so the cream copy reads cleanly, copy left-aligned
// so it doesn't compete with the right-of-center focal point of the photo.
export function LifestyleBand() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <Image
        src="/lifestyle-band.jpg"
        alt="A woman lying back in her own shade on the beach"
        fill
        sizes="100vw"
        // focal pulled right-of-center so the subject sits in the photo's natural anchor
        // and the left third stays open for the copy + scrim.
        className="object-cover object-[70%_center]"
        priority={false}
      />

      {/* Bottom-up dark gradient. Heavier than the FinalCTA scrim — copy needs to win
          here, not the photo. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <HeroReveal soft>
            <HeroRevealItem>
              <h2 className="max-w-2xl font-serif text-3xl font-light leading-tight tracking-wide text-cream drop-shadow-[0_2px_8px_rgba(20,12,6,0.45)] md:text-4xl lg:text-5xl text-balance">
                Lie back. We&rsquo;ve got the sun.
              </h2>
            </HeroRevealItem>
          </HeroReveal>
        </div>
      </div>
    </section>
  )
}
