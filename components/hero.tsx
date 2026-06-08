"use client"

/**
 * Hero — composited from the two scene images so the magazine titles can sit
 * BETWEEN them (the shade overlaps the type — "under the chair").
 *
 *   z-0   background layer  (cover-stage: beach + baked cast shadow)
 *   z-10  titles            (viewport-anchored, live HTML, gradient fill)
 *   z-20  shade layer       (cover-stage, IDENTICAL geometry: cutout rises in)
 *   z-25  scrim + z-30 nav  (live, crisp, clickable; scrim mutes the baked nav)
 *
 * The two cover-stages share the exact same box, so the shade always lands on its
 * baked shadow regardless of viewport size, while the titles + nav stay anchored to
 * the viewport (never cropped). Titles trigger when the shade starts moving, reveal
 * soft, and drift with the cursor. prefers-reduced-motion → everything static.
 */

import { useEffect, useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Wordmark } from "@/components/logo"

const BG = "/lottie/images/img_1.jpg"
const SHADE = "/lottie/images/img_0.png"
const AR = 1440 / 804

// Shade resting placement + entrance, from the Lottie layer transform.
const SH = { cx: 50.44, cy: 51.53, w: 37.25 } // % of the cover-stage
const SH_FROM_SCALE = 44 / 90
const SH_FROM_ROT = -15

const SERIF = "var(--font-frank-ruhl)"
const EASE_OUT = [0.22, 1, 0.36, 1] as const
// Soft ease-in-out for the headline reveal (gentle in, gentle settle).
const EASE_IN = [0.42, 0, 0.4, 1] as const
// Dark warm gradients — read crisply on the bright golden beach, magazine-rich.
const GRAD_LEFT = "linear-gradient(165deg, #2B1B0D 0%, #7A4424 52%, #E0922F 100%)"
const GRAD_RIGHT = "linear-gradient(165deg, #1C1208 0%, #623722 50%, #D98A33 100%)"

// Identical box for both cover-stages → background + shade always aligned.
const STAGE_STYLE: React.CSSProperties = {
  width: `max(100vw, calc(100svh * ${AR}))`,
  height: `max(100svh, calc(100vw / ${AR}))`,
}

const NAV = [
  { label: "Shade", href: "#shade" },
  { label: "Colorways", href: "#colorways" },
  { label: "Details", href: "#details" },
  { label: "About", href: "#about" },
]

// Legibility halo — applied to the title WRAPPER (an ancestor), never to the
// gradient-clipped text itself, since a filter on that element kills the clip.
const HALO =
  "drop-shadow(0 1px 10px rgba(255,246,228,0.55)) drop-shadow(0 6px 18px rgba(40,22,8,0.30))"

const groupV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
// Soft ease-in reveal: fade + gentle rise (no filter — would break background-clip:text).
const lineV: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_IN } },
}

function gradientText(grad: string): React.CSSProperties {
  return {
    fontFamily: SERIF,
    fontWeight: 700,
    backgroundImage: grad,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
  }
}

export function Hero() {
  const reduce = useReducedMotion()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (reduce) setStarted(true)
  }, [reduce])

  const titleClass =
    "text-[15vw] leading-[0.84] tracking-[-0.02em] sm:text-[12vw] md:text-[10vw] lg:text-[8.5vw]"

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-cream">
      {/* z-0 — background cover-stage */}
      <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" style={STAGE_STYLE}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG} alt="" aria-hidden className="h-full w-full object-cover" />
      </div>

      {/* z-10 — titles, viewport-anchored so they never crop; tuck under the shade */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          style={{ filter: HALO }}
          variants={groupV}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="absolute left-[4%] top-1/2 -translate-y-1/2 select-none"
        >
          <h1 style={gradientText(GRAD_LEFT)} className={titleClass}>
            <motion.span variants={lineV} className="block">
              Something
            </motion.span>
            <motion.span variants={lineV} className="block pl-[0.06em] italic">
              New
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          style={{ filter: HALO }}
          variants={groupV}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="absolute right-[4%] top-1/2 -translate-y-1/2 select-none text-right"
        >
          <h2 style={gradientText(GRAD_RIGHT)} className={titleClass}>
            <motion.span variants={lineV} className="block">
              Under
            </motion.span>
            <motion.span variants={lineV} className="block pr-[0.04em] italic">
              the sun
            </motion.span>
          </h2>
        </motion.div>
      </div>

      {/* z-20 — shade cover-stage (same box as background) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={STAGE_STYLE}
      >
        <div
          className="absolute"
          style={{ left: `${SH.cx}%`, top: `${SH.cy}%`, width: `${SH.w}%`, transform: "translate(-50%, -50%)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={SHADE}
            alt="SHADIEZ sun-shade on a golden-hour beach"
            className="block h-auto w-full origin-center will-change-transform"
            initial={
              reduce
                ? { scale: 1, rotate: 0, opacity: 1 }
                : { scale: SH_FROM_SCALE, rotate: SH_FROM_ROT, opacity: 0 }
            }
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 1.8, ease: EASE_OUT }}
            // Fire the titles exactly when the shade begins moving (reliable — unlike
            // img onLoad, which a cached image can skip).
            onAnimationStart={() => setStarted(true)}
          />
        </div>
      </div>

      {/* z-25 scrim to mute the baked nav, z-30 live nav */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[25] h-[22svh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,247,240,0.99) 0%, rgba(251,247,240,0.97) 50%, rgba(251,247,240,0.6) 76%, rgba(251,247,240,0) 100%)",
        }}
      />
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="absolute inset-x-0 top-0 z-30"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#hero" aria-label="SHADIEZ — home" className="text-ink transition-opacity hover:opacity-70">
            <Wordmark className="text-lg tracking-[0.2em]" />
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {NAV.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </section>
  )
}
