import { Marquee } from "@/components/patterns/marquee"

// Slim brand beat between the mood band and the shop grid. The real tagline repeats
// behind a sand wash with the logo's diamond accent as the separator — fashion-house
// cue, kept quiet: small caps, wide tracking, slow drift, edge-faded.
const PHRASE = "Something New Under The Sun"
const UNITS = Array.from({ length: 6 })

export function TaglineMarquee() {
  return (
    <section aria-hidden className="border-y border-border/40 bg-sand/40 py-5 md:py-6">
      <Marquee speed={38} gap={0} fade>
        {UNITS.map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif text-sm font-light uppercase tracking-[0.3em] text-ink/55 md:text-base">
              {PHRASE}
            </span>
            <span
              className="mx-8 inline-block h-1.5 w-1.5 rotate-45 bg-navy/50 md:mx-10"
              aria-hidden
            />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
