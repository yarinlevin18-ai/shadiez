"use client"

/**
 * HeroVideo — the landing hero, built around the AE-rendered loader→hero clip
 * (`/hero-intro.mp4`). The video carries the cinematic: a white loading screen
 * where the shade assembles, then it lands on the golden-hour beach and holds.
 *
 * The headline / sub / CTA are NOT baked into the video — they fade in live once
 * the clip settles, so they stay crisp, responsive, and interactive. Nav is
 * rendered live too (the baked nav is muted by a top scrim beneath it).
 *
 * Resilience:
 *   • `ended` drives the reveal; a timeout backstops browsers that block autoplay
 *     or never fire `ended`.
 *   • prefers-reduced-motion → no video playback, static poster, content shown
 *     immediately.
 */

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Wordmark } from "@/components/logo"
import { useLeadDialog } from "@/components/lead-dialog"

const NAV_LINKS = [
  { label: "Shade", href: "#details" },
  { label: "Colorways", href: "#colorways" },
  { label: "Details", href: "#details" },
  { label: "About", href: "#collection" },
]

// Backstop: the clip is ~4.0s. If `ended` never fires (autoplay blocked, tab
// backgrounded), reveal the overlay anyway so the hero is never stuck "loading".
const SETTLE_FALLBACK_MS = 4200

// Reveal recipe from the motion brief: y +24 → 0 + fade, fast-out cubic.
const EASE_OUT = [0.22, 1, 0.36, 1] as const

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export function HeroVideo() {
  const { openDialog } = useLeadDialog()
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (reduce) {
      setSettled(true)
      return
    }
    const fallback = window.setTimeout(() => setSettled(true), SETTLE_FALLBACK_MS)
    return () => window.clearTimeout(fallback)
  }, [reduce])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream"
    >
      {/* ── BACKGROUND CLIP ─────────────────────────────────────────────────
          object-cover fills the viewport; on narrow screens we bias toward the
          product (right side) so it never crops fully out of frame. */}
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero-poster.jpg"
          alt="A SHADIEZ sun-shade open on a golden-hour beach"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-center"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-center"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          onEnded={() => setSettled(true)}
        >
          <source src="/hero-intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* Top scrim — legibility for the live nav + mutes the baked-in nav. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,12,6,0.34) 0%, rgba(18,12,6,0) 100%)",
        }}
      />
      {/* Left/bottom scrim — anchors the headline against the sand + sky. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(18,12,6,0.5) 0%, rgba(18,12,6,0.22) 34%, rgba(18,12,6,0) 62%)",
        }}
      />

      {/* ── LIVE NAV ─────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: settled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 z-30"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#hero"
            aria-label="SHADIEZ — home"
            className="text-base text-white transition-opacity hover:opacity-80"
          >
            <Wordmark className="tracking-[0.18em]" />
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-sm text-white/85 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* ── HEADLINE / SUB / CTA ─────────────────────────────────────────── */}
      <motion.div
        variants={group}
        initial="hidden"
        animate={settled ? "show" : "hidden"}
        className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-8"
      >
        <div className="max-w-xl">
          <motion.h1
            variants={item}
            className="font-serif text-5xl font-bold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(18,12,6,0.45)] sm:text-6xl lg:text-7xl text-balance"
          >
            Something New
            <br />
            Under the Sun
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md font-sans text-base text-white/85 sm:text-lg"
          >
            A portable personal sun-shade — your own patch of shade, anywhere on
            the sand.
          </motion.p>

          <motion.div variants={item} className="mt-9">
            <button
              type="button"
              onClick={openDialog}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 font-sans text-base font-semibold text-white shadow-[0_14px_30px_-10px_rgba(232,160,74,0.7)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-12px_rgba(232,160,74,0.8)] active:translate-y-0"
            >
              Shop Now
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
