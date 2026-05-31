import Image from "next/image"
import { CardHover } from "@/components/patterns/card-hover"
import { Wordmark } from "@/components/logo"

// Each tile = one kit colorway. Square crops so the grid reads as a clean set, not a
// jumble of aspect ratios.
const collections = [
  {
    src: "/collection/blue-kit.jpg",
    alt: "SHADIEZ dusty-blue canvas shade with matching tote",
  },
  {
    src: "/collection/cream-tote.jpg",
    alt: "SHADIEZ cream canvas shade with matching tote",
  },
  {
    src: "/collection/burgundy-kit.jpg",
    alt: "SHADIEZ burgundy-stripe canvas shade with matching tote",
  },
]

export function CollectionsGrid() {
  return (
    <section id="shop" className="scroll-mt-24 px-6 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-serif text-3xl font-light tracking-wide text-ink md:mb-16 md:text-4xl lg:text-5xl">
          Our <Wordmark className="text-[0.9em]" /> Collections
        </h2>

        {/* No ScrollStagger — SectionReveal in page.tsx already drives the entrance,
            and a second layer was causing image-load pop. CardHover lifts each tile
            on hover (no glow — palette correct). bg-cream placeholder keeps empty
            tiles warm during initial image fetch. */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {collections.map((kit) => (
            <CardHover key={kit.src} glow={false} lift={6} tilt={0}>
              <div className="relative aspect-square overflow-hidden rounded-md bg-cream/40 shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)]">
                <Image
                  src={kit.src}
                  alt={kit.alt}
                  fill
                  sizes="(min-width: 768px) 22rem, 100vw"
                  quality={88}
                  className="object-cover"
                />
              </div>
            </CardHover>
          ))}
        </div>
      </div>
    </section>
  )
}
