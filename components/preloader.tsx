"use client"

/**
 * Preloader — the first-paint loading screen. On-brand "sunrise": a warm amber sun
 * blooms and rises over the SHADIEZ wave mark, the wordmark settles in, and a thin
 * progress line completes — then the whole overlay lifts away to reveal the page.
 * Ties directly to the brand line, "Something New Under the Sun."
 *
 * It's part of the SSR HTML (renders on first paint — no flash of unstyled content),
 * then dismisses the moment the window finishes loading, but never before a short
 * minimum (so it can't flash-and-vanish) and never after a safety cap (so a slow
 * fetch can't trap the user). Under prefers-reduced-motion it's static and leaves fast.
 */

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Wordmark } from "@/components/logo"

const MIN_VISIBLE_MS = 900 // floor so the sunrise reads as a deliberate beat
const MAX_VISIBLE_MS = 4000 // ceiling so a slow asset fetch never traps the user
const FADE_MS = 0.7
const EASE_OUT = [0.22, 1, 0.36, 1] as const

// The three wave lines of the brand mark (viewBox 0 0 32 18).
const WAVES = [
  "M3 5c4-3 8 3 13 0s9 3 13 0",
  "M3 10c4-3 8 3 13 0s9 3 13 0",
  "M3 15c4-3 8 3 13 0s9 3 13 0",
]

export function Preloader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)
  // Flips true on "ready" so the progress line can race to 100% before the fade.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now()
    let dismissed = false

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      setReady(true)
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now()
      const wait = Math.max(0, MIN_VISIBLE_MS - (now - start))
      window.setTimeout(() => setShow(false), wait)
    }

    if (document.readyState === "complete") dismiss()
    else window.addEventListener("load", dismiss, { once: true })
    const maxId = window.setTimeout(dismiss, MAX_VISIBLE_MS)

    return () => {
      window.removeEventListener("load", dismiss)
      window.clearTimeout(maxId)
    }
  }, [])

  // Lock scrolling + pin to top while the overlay is up, so the hero is framed the
  // instant it's revealed.
  useEffect(() => {
    if (!show) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading SHADIEZ"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -16 }}
          transition={{ duration: reduce ? 0.25 : FADE_MS, ease: EASE_OUT }}
        >
          {/* Warm sunrise bloom — rises with the sun, breathes gently while loading. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 46% 38% at 50% 47%, rgba(255,201,120,0.40) 0%, rgba(255,201,120,0) 70%)",
            }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: [0, 1, 0.82, 1], scale: [0.9, 1.04, 1] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.6, ease: "easeInOut", times: [0, 0.4, 0.7, 1], repeat: Infinity, repeatType: "mirror" }
            }
          />

          <div className="relative flex flex-col items-center">
            {/* Sun + waves stage. The sun rises from behind the waves and settles. */}
            <div className="relative flex h-[72px] w-[120px] items-end justify-center overflow-hidden">
              {/* Sun disc — rises (y) + grows (scale) into place. */}
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-1 block h-12 w-12 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 38%, #F6C172 0%, #E8A04A 64%, #E0913A 100%)",
                  boxShadow: "0 0 28px 6px rgba(232,160,74,0.45)",
                }}
                initial={reduce ? { y: 0, scale: 1, opacity: 1 } : { y: 34, scale: 0.7, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 1.1, ease: EASE_OUT, delay: 0.1 }
                }
              />

              {/* Wave mark — the "sea" the sun rises over. Draws on, line by line. */}
              <svg
                viewBox="0 0 32 18"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="relative h-9 w-auto text-ink"
              >
                {WAVES.map((d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.5 + i * 0.16 },
                            opacity: { duration: 0.2, delay: 0.5 + i * 0.16 },
                          }
                    }
                  />
                ))}
              </svg>
            </div>

            {/* Wordmark + tagline. */}
            <motion.div
              className="mt-7 flex flex-col items-center gap-1.5 text-ink"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut", delay: reduce ? 0 : 1.0 }}
            >
              <div className="flex items-center gap-[0.55em] text-lg sm:text-xl">
                <Wordmark className="tracking-[0.2em]" />
                <span
                  aria-hidden
                  className="inline-block h-[0.32em] w-[0.32em] rotate-45 bg-amber"
                />
              </div>
              <span className="font-serif text-[11px] italic text-ink-60 sm:text-xs">
                Something new under the sun
              </span>
            </motion.div>

            {/* Progress line — eases toward 90% while loading, completes on ready. */}
            <div className="mt-7 h-px w-32 overflow-hidden bg-ink/12 sm:w-40">
              <motion.div
                className="h-full bg-amber"
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: reduce ? "100%" : ready ? "100%" : "90%" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: ready ? 0.4 : 2.2, ease: "easeOut" }
                }
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
