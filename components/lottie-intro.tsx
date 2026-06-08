"use client"

/**
 * LottieIntro — full-screen opening sequence built from an After Effects → Bodymovin
 * export (`/lottie/data.json`). Plays once on load, then fades + lifts away to reveal
 * the page beneath.
 *
 * Behavior:
 *   • Holds on a calm cream screen until the animation (and its images) are ready,
 *     then plays through one time.
 *   • On complete → fade + lift → unmount. A safety timer dismisses it even if the
 *     `complete` event never fires (slow/blocked asset).
 *   • prefers-reduced-motion → skipped entirely; the page shows immediately.
 *   • Locks scroll + pins to top while it's up.
 *
 * The scene is shown whole (contain) on a cream field, so nothing of the composition
 * is cropped on non-16:9 screens.
 */

import { useEffect, useRef, useState } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const SRC = "/lottie/data.json"
const FADE_MS = 0.7
const EASE_OUT = [0.22, 1, 0.36, 1] as const
// Hard cap: scene is ~6.4s; dismiss by then + buffer even if `complete` never fires.
const SAFETY_MS = 8000

export function LottieIntro() {
  const reduce = useReducedMotion()
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [show, setShow] = useState(true)

  // Reduced motion → never show the intro.
  const enabled = !reduce

  // Fetch + fix relative image asset paths (otherwise resolved against the page URL).
  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    fetch(SRC)
      .then((r) => {
        if (!r.ok) throw new Error(`Lottie fetch failed: ${r.status} ${SRC}`)
        return r.json()
      })
      .then((json) => {
        const base = SRC.slice(0, SRC.lastIndexOf("/") + 1)
        if (Array.isArray(json?.assets)) {
          for (const a of json.assets) {
            if (
              a &&
              typeof a.p === "string" &&
              typeof a.u === "string" &&
              a.u &&
              !a.u.startsWith("/") &&
              !/^https?:/.test(a.u) &&
              !a.p.startsWith("data:")
            ) {
              a.u = base + a.u
            }
          }
        }
        if (!cancelled) setAnimationData(json)
      })
      .catch((err) => console.error(err))
    return () => {
      cancelled = true
    }
  }, [enabled])

  // Scroll lock + pin to top while the intro is up.
  useEffect(() => {
    if (!enabled || !show) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = prev
    }
  }, [enabled, show])

  // Safety dismissal, in case `onComplete` never fires.
  useEffect(() => {
    if (!enabled) return
    const id = window.setTimeout(() => setShow(false), SAFETY_MS)
    return () => window.clearTimeout(id)
  }, [enabled])

  if (!enabled) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="SHADIEZ intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: FADE_MS, ease: EASE_OUT }}
        >
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay
              onComplete={() => setShow(false)}
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              className="h-full w-full"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
