import Image from "next/image"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"
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

        {/* Tiles stagger in on enter; each card lifts on hover (no glow — the default
            purple glow doesn't fit the warm palette). Tilt disabled for a calmer, more
            editorial feel; pure lift only. */}
        <ScrollStagger>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {collections.map((kit) => (
              <ScrollStaggerItem key={kit.src}>
                <CardHover glow={false} lift={6} tilt={0}>
                  <div className="relative aspect-square overflow-hidden rounded-md bg-cream/30 shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)]">
                    <Image
                      src={kit.src}
                      alt={kit.alt}
                      fill
                      sizes="(min-width: 768px) 22rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                </CardHover>
              </ScrollStaggerItem>
            ))}
          </div>
        </ScrollStagger>
      </div>
    </section>
  )
}
