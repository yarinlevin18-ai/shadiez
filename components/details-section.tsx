"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Shade3D } from "@/components/three/shade-3d"
import { Hotspot } from "@/components/patterns/hotspots"
import { HeroReveal, HeroRevealItem } from "@/components/patterns/hero-reveal"
import { TitleReveal } from "@/components/patterns/title-reveal"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"
import {
  StickySection,
  StickyVisual,
  StickyStep,
  useStickyProgress,
} from "@/components/patterns/sticky-section"

// Four story-driven build details. On desktop they become the scroll-scrubbed steps
// of a pinned sticky-section; on mobile they stack as a plain list.
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

// Product dimensions. ⚠️ PLACEHOLDER values — replace with SHADIEZ's real spec sheet
// before shipping. Edit the values here; the layout below adapts automatically.
const dimensions = [
  { label: "Set up", value: "70 × 55 × 62 cm" },
  { label: "Folded", value: "62 × 16 × 8 cm" },
  { label: "Weight", value: "2.6 kg" },
  { label: "Recline", value: "5 notched angles" },
]

// The warm wash + sunlight bloom that sit behind the product, shared by both the
// pinned 3D visual and the static mobile image.
function VisualBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #FAF7F1 0%, #F5EEDC 60%, #ECDFC4 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(255, 226, 175, 0.20) 0%, rgba(255, 226, 175, 0) 70%)",
        }}
        aria-hidden
      />
    </>
  )
}

// Pinned 3D visual whose rotation is driven by the section's scroll progress — as you
// scroll through the four steps, the model turns through its photogenic arc. Lives
// inside <StickyVisual> so it can read useStickyProgress().
function StickyModel() {
  const { progress } = useStickyProgress()
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative aspect-square w-full max-w-[34rem] overflow-hidden rounded-md">
        <VisualBackdrop />
        <div className="absolute inset-0">
          <Shade3D
            progress={progress}
            fallbackSrc="/shade-hero.jpg"
            fallbackAlt="SHADIEZ wooden sun-shade — walnut frame and cream canvas"
          >
            <Hotspot position={[0, 0.22, 0.16]} label="Cotton canvas" />
            <Hotspot position={[0.42, 0.02, 0.04]} label="Notched recline" />
            <Hotspot position={[-0.34, -0.24, 0.06]} label="Walnut frame" />
            <Hotspot position={[0.24, -0.22, 0.12]} label="Brass hardware" />
          </Shade3D>
        </div>
      </div>
    </div>
  )
}

function Dimensions() {
  return (
    <div className="border-t border-border/40 pt-6">
      <h3 className="mb-5 font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
        Dimensions
      </h3>
      <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {dimensions.map((d) => (
          <div
            key={d.label}
            className="flex items-baseline justify-between gap-4 border-b border-border/30 py-2.5"
          >
            <dt className="font-serif text-base font-light tracking-wide text-ink">
              {d.label}
            </dt>
            <dd className="font-sans text-sm tabular-nums text-muted-foreground">
              {d.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function DetailsSection() {
  // Desktop (non-reduced-motion) gets the pinned, scroll-scrubbed sticky-section with
  // the live 3D model. Mobile and reduced-motion fall back to a plain stacked layout —
  // pinning is a poor fit for small screens, and a 4-screen pin shouldn't be forced on
  // someone who asked for less motion. Defaults to the stacked layout for SSR/first
  // paint, then upgrades to sticky on desktop after mount (no WebGL on the fallback).
  const [useSticky, setUseSticky] = useState(false)
  useEffect(() => {
    const mqlD = window.matchMedia("(min-width: 768px)")
    const mqlR = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setUseSticky(mqlD.matches && !mqlR.matches)
    apply()
    mqlD.addEventListener("change", apply)
    mqlR.addEventListener("change", apply)
    return () => {
      mqlD.removeEventListener("change", apply)
      mqlR.removeEventListener("change", apply)
    }
  }, [])

  if (useSticky) {
    return (
      <section id="details" className="scroll-mt-24 bg-background">
        {/* Intro — scrolls in normally, then the steps below pin. */}
        <div className="px-6 pt-24 pb-10 lg:pt-32">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide text-ink md:text-4xl lg:text-5xl text-balance">
              <TitleReveal>In the details</TitleReveal>
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm text-muted-foreground md:text-base">
              A closer look at what&rsquo;s holding it together — scroll to explore.
            </p>
          </div>
        </div>

        {/* Pinned 3D + scroll-scrubbed steps (studio sticky-section). */}
        <div className="mx-auto max-w-6xl px-6">
          <StickySection textSide="right" stepHeight={1} fadeOverlap={0.3}>
            <StickyVisual>
              <StickyModel />
            </StickyVisual>
            {features.map((feature, i) => (
              <StickyStep key={feature.label} index={i}>
                <span className="mb-4 font-sans text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(features.length).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-3xl font-light tracking-wide text-ink md:text-4xl text-balance">
                  {feature.label}
                </h3>
                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </StickyStep>
            ))}
          </StickySection>
        </div>

        {/* Dimensions — back in normal flow once the pin releases. */}
        <div className="px-6 pb-24 lg:pb-32">
          <div className="mx-auto max-w-2xl">
            <Dimensions />
          </div>
        </div>
      </section>
    )
  }

  // Mobile / reduced-motion: stacked, non-pinned. Static product photo, no WebGL.
  return (
    <section
      id="details"
      className="scroll-mt-24 bg-background px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <VisualBackdrop />
              <div className="absolute inset-0">
                <Image
                  src="/shade-hero.jpg"
                  alt="SHADIEZ wooden sun-shade — walnut frame and cream canvas"
                  fill
                  sizes="(min-width: 768px) 32rem, 100vw"
                  quality={88}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

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

            <ScrollStagger stagger={0.1}>
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

            <div className="mt-10 md:mt-12">
              <Dimensions />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
