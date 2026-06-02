import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"
import { TitleReveal } from "@/components/patterns/title-reveal"
import { Wordmark } from "@/components/logo"

// Each tile = one kit colorway (shade + matching tote). Square crops so the grid reads
// as a clean set; the caption + hover treatment give it real shop value.
const collections = [
  {
    src: "/collection/blue-kit.jpg",
    alt: "SHADIEZ dusty-blue canvas shade with matching tote",
    name: "Dusty Blue",
    note: "Shade + tote",
    swatch: "#8FA9BC",
  },
  {
    src: "/collection/cream-tote.jpg",
    alt: "SHADIEZ cream canvas shade with matching tote",
    name: "Cream",
    note: "Shade + tote",
    swatch: "#F3ECE0",
  },
  {
    src: "/collection/burgundy-kit.jpg",
    alt: "SHADIEZ burgundy-stripe canvas shade with matching tote",
    name: "Burgundy Stripe",
    note: "Shade + tote",
    swatch: "#722F37",
  },
]

export function CollectionsGrid() {
  return (
    <section id="shop" className="scroll-mt-24 px-6 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header block — eyebrow + animated title + supporting line. */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">
            The Collection
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-ink md:text-4xl lg:text-5xl">
            <TitleReveal>
              Our <Wordmark className="text-[0.9em]" /> Kits
            </TitleReveal>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm text-muted-foreground md:text-base text-balance">
            Every shade ships with its own matching tote. Pick the palette that&rsquo;s
            yours.
          </p>
        </div>

        {/* Cards cascade in, then each lifts: image zoom, a warm scrim, and a
            "Shop the kit" affordance slide up on hover. */}
        <ScrollStagger stagger={0.12} threshold={0.2}>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {collections.map((kit) => (
              <ScrollStaggerItem key={kit.src}>
                <article className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-cream/40 shadow-[0_18px_44px_-26px_rgba(60,40,20,0.45)] ring-1 ring-border/40 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-28px_rgba(60,40,20,0.55)]">
                    <Image
                      src={kit.src}
                      alt={kit.alt}
                      fill
                      sizes="(min-width: 768px) 22rem, 100vw"
                      quality={88}
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                    />
                    {/* Warm scrim, strengthens on hover so the CTA reads. */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />
                    {/* Shop affordance — slides up + fades in on hover. */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="font-sans text-xs uppercase tracking-[0.18em] text-cream">
                        Shop the kit
                      </span>
                      <ArrowRight className="h-4 w-4 text-cream" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Caption row: swatch + name, with the kit descriptor. */}
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full ring-1 ring-border/60"
                        style={{ backgroundColor: kit.swatch }}
                        aria-hidden
                      />
                      <span className="font-serif text-lg font-light tracking-wide text-ink">
                        {kit.name}
                      </span>
                    </div>
                    <span className="font-sans text-xs tracking-wide text-muted-foreground">
                      {kit.note}
                    </span>
                  </div>
                </article>
              </ScrollStaggerItem>
            ))}
          </div>
        </ScrollStagger>
      </div>
    </section>
  )
}
