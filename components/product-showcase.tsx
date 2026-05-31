"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroReveal, HeroRevealItem } from "@/components/patterns/hero-reveal"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"
import { CardHover } from "@/components/patterns/card-hover"

const features = [
  {
    label: "Adjustable",
    description: "recline to your angle",
  },
  {
    label: "Folds flat",
    description: "packs light, carries easy",
  },
  {
    label: "Solid walnut",
    description: "made to outlast the season",
  },
  {
    label: "Premium canvas",
    description: "five colorways",
  },
]

export function ProductShowcase() {
  // Section progress drives the parallax drift on the two lifestyle shots. "start end"
  // → "end start" means we read progress across the whole time the section is anywhere
  // on screen — gives long, smooth parallax instead of a quick snap.
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Two shots drift at slightly different rates so they read as separate "depths" —
  // the magazine-collage cue is the rate difference, not the magnitude. Keep ranges
  // small to stay editorial, not gimmicky.
  const yBeach = useTransform(scrollYProgress, [0, 1], [40, -40])
  // Tighter range because the tote now sits INSIDE the studio frame — a 120px drift
  // would push it off the studio shot's bounds. 30px reads as a gentle "floating" cue.
  const yTote = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 bg-sand/40 px-6 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16 lg:gap-20">
          {/* LEFT — editorial-overlap composition. Mobile stacks the three images
              vertically; md+ switches into the absolute-positioned overlap. Was
              md:aspect-[5/6] (portrait, too tall, left a void below text); now square
              so the composition matches the text column's natural height. */}
          <div className="relative md:aspect-square">
            {/* Mobile-only stack. */}
            <div className="grid gap-4 md:hidden">
              <HeroReveal soft>
                <HeroRevealItem>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)]">
                    <Image
                      src="/4.jpeg"
                      alt="SHADIEZ wooden sun-shade — walnut frame and cream canvas"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw"
                      quality={92}
                      className="object-cover"
                    />
                  </div>
                </HeroRevealItem>
                <HeroRevealItem>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-[0_18px_40px_-24px_rgba(60,40,20,0.30)]">
                    <Image
                      src="/lifestyle-shade-beach.png"
                      alt="SHADIEZ sun-shade in use on the beach"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </HeroRevealItem>
                <HeroRevealItem>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-[0_18px_40px_-24px_rgba(60,40,20,0.30)]">
                    <Image
                      src="/lifestyle-tote-walk.png"
                      alt="SHADIEZ matching tote on the way to the beach"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </HeroRevealItem>
              </HeroReveal>
            </div>

            {/* Desktop layout (md+). Studio shot dominates the left two-thirds; the
                two lifestyle shots form a curated vertical pair on the right with a
                slight horizontal offset (tote pulled left of beach) so they read as a
                staggered stack, not a stiff column. HeroReveal staggers all three;
                the two lifestyle shots carry scroll-driven parallax. */}
            <div className="hidden md:block">
              <HeroReveal soft stagger={0.15}>
                {/* Studio — base layer, anchored top-left, ~64% wide / 100% tall.
                    Quality 92 + larger sizes attr so the image isn't downsampled. */}
                <HeroRevealItem>
                  <div className="absolute left-0 top-0 z-10 h-full w-[64%]">
                    <div className="relative h-full w-full overflow-hidden rounded-md shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)]">
                      <Image
                        src="/4.jpeg"
                        alt="SHADIEZ wooden sun-shade — walnut frame and cream canvas"
                        fill
                        sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 32rem, 28rem"
                        quality={92}
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </HeroRevealItem>

                {/* Beach lifestyle — upper-right corner, flush to top + right. */}
                <HeroRevealItem>
                  <motion.div
                    style={{ y: yBeach }}
                    className="absolute right-0 top-0 z-20 w-[40%]"
                  >
                    <CardHover glow={false} lift={6} tilt={0}>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-[0_22px_45px_-22px_rgba(60,40,20,0.42)] ring-1 ring-background/70">
                        <Image
                          src="/lifestyle-shade-beach.png"
                          alt="SHADIEZ sun-shade in use on the beach"
                          fill
                          sizes="(min-width: 1024px) 16rem, 12rem"
                          quality={90}
                          // priority so the image loads on initial page hit, not when
                          // the section scrolls into view. Without this the picture
                          // pops in AFTER the SectionReveal animation, looking broken.
                          priority
                          className="object-cover"
                        />
                      </div>
                    </CardHover>
                  </motion.div>
                </HeroRevealItem>

                {/* Tote lifestyle — lower-right, pulled slightly LEFT of the beach
                    shot above. Slightly narrower so it doesn't crash into beach's
                    bottom edge. The horizontal offset breaks the pair into a stagger
                    so they read as a composition, not a list. */}
                <HeroRevealItem>
                  <motion.div
                    style={{ y: yTote }}
                    className="absolute bottom-0 right-[8%] z-20 w-[32%]"
                  >
                    <CardHover glow={false} lift={6} tilt={0}>
                      <div className="relative aspect-[3/4] overflow-hidden rounded-md shadow-[0_22px_45px_-22px_rgba(60,40,20,0.5)] ring-1 ring-background/70">
                        <Image
                          src="/lifestyle-tote-walk.png"
                          alt="SHADIEZ matching tote on the way to the beach"
                          fill
                          sizes="(min-width: 1024px) 14rem, 10rem"
                          quality={90}
                          priority
                          className="object-cover"
                        />
                      </div>
                    </CardHover>
                  </motion.div>
                </HeroRevealItem>
              </HeroReveal>
            </div>
          </div>

          {/* RIGHT — headline + 4 points. Points stagger in as the section enters. */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-10 font-serif text-3xl font-light tracking-wide text-ink md:text-4xl lg:text-5xl text-balance">
              Built for the sun
            </h2>

            <ScrollStagger>
              <div className="space-y-6">
                {features.map((feature) => (
                  <ScrollStaggerItem key={feature.label}>
                    <div className="border-t border-border/50 pt-5">
                      <p className="font-sans text-base text-ink">
                        <span className="font-medium">{feature.label}</span>
                        <span className="text-muted-foreground"> — {feature.description}</span>
                      </p>
                    </div>
                  </ScrollStaggerItem>
                ))}
              </div>
            </ScrollStagger>
          </div>
        </div>
      </div>
    </section>
  )
}
