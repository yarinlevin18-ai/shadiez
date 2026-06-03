"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Wordmark } from "@/components/logo"

// Full-screen brand preloader. Renders on first paint (it's part of the SSR HTML, so
// there's no flash of unstyled content), then fades into the hero once the page is
// ready. The three wave lines of the brand mark draw themselves on, the wordmark
// settles in, and a thin progress line completes — a calm, premium entry moment.
//
// Dismissal: the moment `window` finishes loading (or a safety cap, whichever comes
// first), but never before a short minimum so it can't flash-and-vanish on fast loads.
// Under prefers-reduced-motion the whole thing is static and leaves quickly.

const MIN_VISIBLE_MS = 650 // floor so a fast load still reads as a deliberate beat
const MAX_VISIBLE_MS = 4000 // ceiling so a slow 3D/video fetch never traps the user
const FADE_MS = 0.6

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

  // Each wave draws in turn; the wordmark and accent follow.
  const waveDelays = [0, 0.16, 0.32]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading SHADIEZ"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.25 : FADE_MS, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Soft warm bloom behind the mark — echoes the hero vignette. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 46%, rgba(255,226,175,0.18) 0%, rgba(255,226,175,0) 70%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Wave mark — larger build of the brand icon, drawn on. */}
            <motion.svg
              viewBox="0 0 32 18"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-12 w-auto text-ink sm:h-14"
            >
              {["M3 4c4-3 8 3 13 0s9 3 13 0", "M3 9c4-3 8 3 13 0s9 3 13 0", "M3 14c4-3 8 3 13 0s9 3 13 0"].map(
                (d, i) => (
                  <motion.path
                    key={d}
                    d={d}
                    initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            pathLength: { duration: 0.95, ease: "easeInOut", delay: waveDelays[i] },
                            opacity: { duration: 0.2, delay: waveDelays[i] },
                          }
                    }
                  />
                ),
              )}
            </motion.svg>

            {/* Wordmark + diamond accent. */}
            <motion.div
              className="mt-6 flex items-center gap-[0.6em] text-lg text-ink sm:text-xl"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut", delay: reduce ? 0 : 0.7 }}
            >
              <Wordmark />
              <motion.span
                aria-hidden
                className="inline-block h-[0.35em] w-[0.35em] rotate-45 bg-current"
                initial={reduce ? { scale: 1 } : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 18, delay: 1.05 }
                }
              />
            </motion.div>

            {/* Progress line — eases toward 90% while loading, then completes on ready. */}
            <div className="mt-8 h-px w-32 overflow-hidden bg-ink/12 sm:w-40">
              <motion.div
                className="h-full bg-navy"
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: reduce ? "100%" : ready ? "100%" : "90%" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: ready ? 0.35 : 2.2, ease: "easeOut" }
                }
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
