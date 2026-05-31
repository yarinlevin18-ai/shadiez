"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Wordmark } from "@/components/logo"

type Colorway = {
  id: string
  name: string
  // Hex for solid swatches, or a *-pattern key for striped ones (mapped below).
  swatch: string
  img: string
}

const colorways: Colorway[] = [
  { id: "cream", name: "Cream", swatch: "#F3ECE0", img: "/colorways/cream.jpg" },
  { id: "butter", name: "Butter", swatch: "#E8D08A", img: "/colorways/butter.jpg" },
  { id: "dusty-blue", name: "Dusty blue", swatch: "#8FA9BC", img: "/colorways/dusty-blue.jpg" },
  { id: "burgundy-stripe", name: "Burgundy stripe", swatch: "burgundy-stripe-pattern", img: "/colorways/burgundy-stripe.jpg" },
  { id: "pinstripe", name: "Pinstripe", swatch: "pinstripe-pattern", img: "/colorways/pinstripe.jpg" },
]

const FALLBACK_IMG = "/shade-hero.jpg"

const PATTERN_CONFIG: Record<string, { base: string; overlay: string }> = {
  "navy-stripe-pattern": {
    base: "#1F3A5F",
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 4px, #F3ECE0 4px, #F3ECE0 8px)",
  },
  "burgundy-stripe-pattern": {
    base: "#722F37",
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 4px, #F3ECE0 4px, #F3ECE0 8px)",
  },
  "pinstripe-pattern": {
    base: "#2B2723",
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(243,236,224,0.7) 3px, rgba(243,236,224,0.7) 4px)",
  },
}

// Color-sweep wipe tuning.
const WIPE_MS = 700
const FEATHER_PX = 32

// Auto-cycle interval — how long each colorway stays before advancing. Stops the
// moment the user clicks any swatch.
const AUTO_CYCLE_MS = 4200

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

function wipeMask(p: number): string {
  const edge = `calc(${p} * (100% + ${FEATHER_PX}px))`
  const solid = `calc(${p} * (100% + ${FEATHER_PX}px) - ${FEATHER_PX}px)`
  return `linear-gradient(to right, #000 ${solid}, transparent ${edge})`
}

export function HeroSection() {
  const [baseId, setBaseId] = useState<string>("cream")
  const [incomingId, setIncomingId] = useState<string | null>(null)
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set())
  // Tracks first user swatch click. Once true, auto-cycle stops permanently.
  const [userInteracted, setUserInteracted] = useState(false)

  const incomingRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const heroRef = useRef<HTMLElement | null>(null)

  const handleImageError = (id: string) =>
    setFailedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))

  const srcFor = (id: string, img: string) => (failedIds.has(id) ? FALLBACK_IMG : img)

  // ── WIPE ANIMATION ──────────────────────────────────────────────────────────
  // Drive the wipe with rAF whenever an incoming colorway mounts. Identical to the
  // earlier implementation — preserved so the colorway swap UX doesn't regress.
  useEffect(() => {
    if (incomingId == null) return

    const el = incomingRef.current
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!el || reduce) {
      setBaseId(incomingId)
      setIncomingId(null)
      return
    }

    startRef.current = performance.now()

    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / WIPE_MS)
      const m = wipeMask(easeInOut(p))
      el.style.webkitMaskImage = m
      el.style.maskImage = m
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
        setBaseId(incomingId)
        setIncomingId(null)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [incomingId])

  // Wipe trigger. Stable identity (no deps) so the auto-cycle effect can call it
  // without re-creating the function each tick. fromUser=true marks the first real
  // click and disables auto-cycling for the rest of the session.
  const handleSelectColor = useCallback(
    (id: string, fromUser: boolean) => {
      if (fromUser) setUserInteracted(true)
      // Read latest state directly via the setters — avoids stale closures and lets
      // the auto-cycle effect call this with stable identity.
      setIncomingId((curIncoming) => {
        // Already showing this colorway, nothing to do.
        if (curIncoming == null) {
          // Need baseId — read via setBaseId trick or accept slight inefficiency.
          // Inline read here is fine since we control the flow.
        }
        if (id === curIncoming) return curIncoming
        if (curIncoming != null) {
          if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
          }
          setBaseId(curIncoming) // promote to base, snap-finish
        }
        return id
      })
    },
    [],
  )

  // ── AUTO-CYCLE ──────────────────────────────────────────────────────────────
  // Advance to the next colorway every AUTO_CYCLE_MS while the user hasn't
  // interacted. Effect re-runs when baseId/incomingId change so the next tick is
  // always scheduled from the latest settled colorway → consistent 4s spacing.
  useEffect(() => {
    if (userInteracted) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const timeoutId = window.setTimeout(() => {
      const currentId = incomingId ?? baseId
      const idx = colorways.findIndex((c) => c.id === currentId)
      const nextId = colorways[(idx + 1) % colorways.length].id
      handleSelectColor(nextId, false) // fromUser=false so userInteracted stays
    }, AUTO_CYCLE_MS)
    return () => window.clearTimeout(timeoutId)
  }, [userInteracted, baseId, incomingId, handleSelectColor])

  // ── PARALLAX ────────────────────────────────────────────────────────────────
  // Product drifts UP and video drifts DOWN slightly as user scrolls. Range is
  // intentionally small — depth cue, not a roller coaster.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // 0 at top, 1 when hero leaves
  })
  const productY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 40])

  const selectedId = incomingId ?? baseId
  const baseCw = colorways.find((c) => c.id === baseId) ?? colorways[0]
  const incomingCw = incomingId
    ? colorways.find((c) => c.id === incomingId) ?? null
    : null

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12"
    >
      {/* ── VIDEO BACKDROP ──────────────────────────────────────────────────────
          Same beach footage as FinalCTA but heavily treated: scale-110 hides the
          blurred edges, blur+brightness desaturates it into atmospheric texture
          rather than a foreground asset. Slight parallax drift. */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: videoY }}
        aria-hidden
      >
        <video
          className="absolute inset-0 h-full w-full scale-110 object-cover"
          style={{ filter: "blur(18px) brightness(0.92) saturate(0.85)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/cta-beach-poster.jpg"
        >
          <source src="/cta-beach.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cream wash — pulls the video toward the page palette so it reads warm,
          not "video on a webpage". Stronger at top/bottom, weaker in the middle. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-background/55"
        aria-hidden
      />
      {/* Vignette + focal pool — brightens the center area where the product lives
          so it stays readable, fades to a slightly darker edge for cinematic feel. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(250,247,241,0.45) 0%, rgba(250,247,241,0) 70%), radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(60,40,20,0.18) 100%)",
        }}
        aria-hidden
      />

      {/* ── PRODUCT IMAGE (parallax + float) ────────────────────────────────────
          Two nested motion.divs: outer applies scroll-parallax y, inner applies
          the gentle infinite vertical bob. They compose via DOM hierarchy. The
          OUTER carries the width so the inner's `w-full` has a parent to fill —
          without this both collapse to 0. */}
      <motion.div
        className="relative z-10 mb-12 w-full max-w-2xl lg:max-w-3xl"
        style={{ y: productY }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          // Hero product photo. Fixed 43:24 ratio so the box never resizes on swap.
          // Stronger shadow than before to lift off the video; thin background-tone
          // ring frames the card cleanly against the moving backdrop.
          className="relative aspect-[43/24] w-full overflow-hidden rounded-md shadow-[0_40px_80px_-30px_rgba(20,15,10,0.55)] ring-1 ring-background/40"
        >
          {/* Settled base layer. */}
          <div className="absolute inset-0">
            <Image
              key={baseId}
              src={srcFor(baseCw.id, baseCw.img)}
              alt={`SHADIEZ wooden sun-shade — ${baseCw.name} canvas`}
              fill
              sizes="(min-width: 1024px) 48rem, (min-width: 768px) 42rem, 90vw"
              priority={baseId === "cream"}
              onError={() => handleImageError(baseCw.id)}
              className="object-cover"
            />
          </div>

          {/* Incoming wipe layer. */}
          {incomingCw && (
            <div
              ref={incomingRef}
              key={incomingCw.id}
              className="absolute inset-0"
              style={{
                willChange: "mask-image",
                WebkitMaskImage: wipeMask(0),
                maskImage: wipeMask(0),
              }}
            >
              <Image
                src={srcFor(incomingCw.id, incomingCw.img)}
                alt=""
                fill
                sizes="(min-width: 1024px) 48rem, (min-width: 768px) 42rem, 90vw"
                loading="eager"
                onError={() => handleImageError(incomingCw.id)}
                className="object-cover"
              />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Headline. drop-shadow keeps the dark serif legible over the cream/video. */}
      <h1 className="relative z-10 mb-4 text-center font-serif text-4xl font-light tracking-wide text-ink drop-shadow-[0_1px_2px_rgba(250,247,241,0.6)] md:text-5xl lg:text-6xl text-balance">
        Pick Your Style of{" "}
        <Wordmark className="text-[0.9em]" />
      </h1>

      <p className="relative z-10 mb-8 text-center font-sans text-base text-ink/70 md:text-lg">
        Shade, crafted in wood and canvas.
      </p>

      <a
        href="#shop"
        className="relative z-10 mb-10 inline-flex items-center justify-center rounded-[4px] bg-navy px-8 py-3.5 font-sans text-sm tracking-wide text-primary-foreground shadow-[0_12px_24px_-8px_rgba(31,58,95,0.5)] transition-colors hover:bg-navy/90"
      >
        Shop the shade
      </a>

      {/* Colorway selector. */}
      <div
        id="colorways"
        className="scroll-mt-24 relative z-10 mb-12 flex items-center gap-2.5 md:gap-3"
      >
        {colorways.map((cw) => {
          const pattern = PATTERN_CONFIG[cw.swatch]
          const isActive = cw.id === selectedId
          return (
            <button
              key={cw.id}
              type="button"
              onClick={() => handleSelectColor(cw.id, true)}
              aria-label={cw.name}
              aria-pressed={isActive}
              className={`group relative h-7 w-7 rounded-full transition-transform duration-200 md:h-8 md:w-8 ${
                isActive
                  ? "scale-110 ring-2 ring-navy ring-offset-2 ring-offset-background"
                  : "hover:scale-105"
              }`}
              style={!pattern ? { backgroundColor: cw.swatch } : undefined}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full border border-border/60">
                {pattern && (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{ backgroundColor: pattern.base }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{ backgroundImage: pattern.overlay }}
                    />
                  </>
                )}
              </span>

              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink/90 px-2 py-1 font-sans text-[10px] uppercase tracking-wider text-cream opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                {cw.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Scroll cue. */}
      <a
        href="#about"
        aria-label="Scroll to product details"
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-ink/60 transition-colors hover:text-ink"
      >
        <ChevronDown
          className="h-5 w-5 animate-bounce [animation-duration:2.4s] group-hover:animate-none"
          strokeWidth={1}
        />
      </a>
    </section>
  )
}
