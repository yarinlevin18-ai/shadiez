"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { TitleReveal } from "@/components/patterns/title-reveal"

// Full-bleed editorial band between the product showcase and the collections grid.
// Big mood shot, bottom-up dark scrim so the cream copy reads cleanly, copy left-aligned
// so it doesn't compete with the right-of-center focal point of the photo.
//
// Loading note: the section's bg-ink keeps the empty state dark (matching the bottom
// scrim) so the image fading in feels like the photo "developing" rather than popping
// onto a void. No internal heading reveal — SectionReveal in page.tsx owns the entrance,
// and a second rise-on-h2 was contributing to the visual jump on slow loads.
//
// The image gets a slow scroll-parallax drift (transform-only, so it never affects
// layout or re-triggers the load jump). The plate is over-scaled so the drift never
// exposes an edge.
export function LifestyleBand() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Image drifts up as the band passes through the viewport — gentle, editorial.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section
      ref={sectionRef}
      className="relative h-[85vh] w-full overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/lifestyle-band.jpg"
          alt="A woman lying back in her own shade on the beach"
          fill
          sizes="100vw"
          quality={88}
          // scale-115 gives the parallax headroom so the ±8% drift never reveals an
          // edge. focal pulled right-of-center so the subject sits in the photo's
          // natural anchor and the left third stays open for the copy + scrim.
          className="scale-115 object-cover object-[70%_center]"
        />
      </motion.div>

      {/* Bottom-up dark gradient. Heavier than the FinalCTA scrim — copy needs to win
          here, not the photo. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-2xl font-serif text-3xl font-light leading-tight tracking-wide text-cream drop-shadow-[0_2px_8px_rgba(20,12,6,0.45)] md:text-4xl lg:text-5xl text-balance">
            <TitleReveal>Lie back. We&rsquo;ve got the sun.</TitleReveal>
          </h2>
        </div>
      </div>
    </section>
  )
}
