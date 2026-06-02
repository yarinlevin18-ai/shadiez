"use client"

import { useEffect } from "react"
import { useMotionValue } from "framer-motion"
import { Shade3D } from "@/components/three/shade-3d"
import { Hotspot } from "@/components/patterns/hotspots"
import { HeroReveal, HeroRevealItem } from "@/components/patterns/hero-reveal"
import { TitleReveal } from "@/components/patterns/title-reveal"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"

// Four story-driven build details. Each lives as plain text on the right; the 3D
// model on the left is the visual anchor (drag to inspect).
const features = [
  {
    label: "Notched recline",
    description:
      "Side rails lock into every angle from upright reading to flat sun-bathing — no levers, no springs, just notched walnut.",
  },
  {
    label: "Cotton canvas",
    description:
      "Heavyweight cotton, woven for the sun and salt of full-season use. Develops a soft hand the more you live with it.",
  },
  {
    label: "Walnut frame",
    description:
      "Solid walnut, oil-finished by hand. The grain shows. Every screw is brass — the kind that lasts.",
  },
  {
    label: "Folds flat",
    description:
      "One motion drops the frame to its flat-pack profile. Slides into the matching tote and walks out with you.",
  },
]

// Auto-orbit period — full back-and-forth in seconds. Long enough to feel like
// natural drift, not a turntable.
const ORBIT_PERIOD_S = 24

export function DetailsSection() {
  // 0..1 progress drives the model's Y-rotation inside Shade3D (mapped to a ~54°
  // arc on top of the base 25° pose). A gentle sine oscillation makes the model
  // breathe back-and-forth across that arc when idle; Shade3D auto-pauses this
  // lerp while the user is dragging the camera and resumes on release.
  const progress = useMotionValue(0.5)

  useEffect(() => {
    if (typeof window === "undefined") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      progress.set(0.5)
      return
    }
    let rafId = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = (now - start) / 1000
      // 0.5 + 0.5*sin(...) maps to 0..1 with sine's soft accelerate/decel.
      progress.set(0.5 + 0.5 * Math.sin((t * Math.PI * 2) / ORBIT_PERIOD_S))
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [progress])

  return (
    <section
      id="details"
      className="scroll-mt-24 bg-background px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* LEFT — contained 3D canvas. Square aspect, sized to its column. The
              warm wash + sunlight glow stay inside the canvas frame instead of
              flooding the whole section. */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              {/* Warm wash backdrop — top matches page bg, bottom hints at sand. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, #FAF7F1 0%, #F5EEDC 60%, #ECDFC4 100%)",
                }}
                aria-hidden
              />
              {/* Soft sunlight bloom above the model. */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(255, 226, 175, 0.20) 0%, rgba(255, 226, 175, 0) 70%)",
                }}
                aria-hidden
              />
              <Shade3D
                progress={progress}
                fallbackSrc="/shade-hero.jpg"
                fallbackAlt="SHADIEZ wooden sun-shade — walnut frame and cream canvas"
              >
                {/* Feature callouts anchored to the model in its normalized,
                    centered space (≈ ±0.55 half-extent). occlude fades each one
                    out as the geometry rotates in front of it. Positions are a
                    first pass — fine-tune against the live model. */}
                <Hotspot position={[0, 0.22, 0.16]} label="Cotton canvas" />
                <Hotspot position={[0.42, 0.02, 0.04]} label="Notched recline" />
                <Hotspot position={[-0.34, -0.24, 0.06]} label="Walnut frame" />
                <Hotspot position={[0.24, -0.22, 0.12]} label="Brass hardware" />
              </Shade3D>
            </div>
            <p className="mt-4 text-center font-sans text-[11px] uppercase tracking-[0.20em] text-muted-foreground">
              Drag to rotate
            </p>
          </div>

          {/* RIGHT — story copy. Title fades in soft; the 4 feature blocks
              stagger in as the section enters view. */}
          <div className="flex flex-col">
            <h2 className="mb-3 font-serif text-3xl font-light tracking-wide text-ink md:text-4xl lg:text-5xl text-balance">
              <TitleReveal>In the details</TitleReveal>
            </h2>
            <HeroReveal soft>
              <HeroRevealItem>
                <p className="mb-10 max-w-sm font-sans text-sm text-muted-foreground md:text-base">
                  A closer look at what&rsquo;s holding it together.
                </p>
              </HeroRevealItem>
            </HeroReveal>

            <ScrollStagger stagger={0.10}>
              <div className="space-y-7 md:space-y-8">
                {features.map((feature) => (
                  <ScrollStaggerItem key={feature.label}>
                    <article className="border-t border-border/40 pt-5">
                      <h3 className="font-serif text-lg font-light tracking-wide text-ink md:text-xl">
                        {feature.label}
                      </h3>
                      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {feature.description}
                      </p>
                    </article>
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
