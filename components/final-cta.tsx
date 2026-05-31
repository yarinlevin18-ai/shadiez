"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

// Trim this many seconds off the end of the loop. Set to mask the visible cut at the
// loop seam — most source videos have a couple of mismatched frames right before the
// real end that flash on each loop. Bump up if you still see the seam, down if the
// video feels too short.
const LOOP_TRIM_END_S = 0.35

export function FinalCTA() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Best-effort autoplay kick. Some browsers won't honor the `autoPlay` attribute
    // until the user has interacted with the page; .play() returns a promise we just
    // swallow if it rejects (the poster + scrim are an acceptable fallback).
    const tryPlay = () => v.play().catch(() => {})
    if (v.readyState >= 2) tryPlay()
    else v.addEventListener("canplay", tryPlay, { once: true })

    // Seamless loop: poll currentTime and seek back BEFORE the native end. This
    // skips the bad-frame seam at the source video's end, and avoids the visible
    // hiccup the browser's native `loop` produces between iterations.
    let rafId = 0
    const tick = () => {
      const d = v.duration
      if (d && Number.isFinite(d) && v.currentTime >= d - LOOP_TRIM_END_S) {
        v.currentTime = 0
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      v.removeEventListener("canplay", tryPlay)
    }
  }, [])

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{
        // Fallback bg only — shows while the chair-on-beach video is loading (or if
        // it fails to load). Same warm sky→haze→sand principle as the Details
        // backdrop so the page reads coherent end-to-end.
        background:
          "linear-gradient(to bottom, #FBF5EC 0%, #F3E8D6 50%, #E5CFA8 100%)",
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        // preload="auto" pulls the whole file upfront so the loop boundary doesn't
        // wait on network/decode. Was "metadata" — that loads just enough to know
        // duration and causes the visible late-start at the first loop point.
        preload="auto"
        poster="/cta-beach-poster.jpg"
        // No native `loop` attribute — the rAF tick above owns looping so we can
        // trim the seam. The two together would fight over the boundary.
        aria-hidden
      >
        <source src="/cta-beach.mp4" type="video/mp4" />
      </video>

      {/* Scrim — bottom-heavy so the cream headline + button read cleanly over the
          brightest part of the beach plate. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/35 to-ink/70"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-8 font-serif text-3xl font-light tracking-wide text-cream drop-shadow-[0_2px_8px_rgba(20,12,6,0.45)] md:text-4xl lg:text-5xl text-balance">
          This could be your summer.
        </h2>
        <Button asChild size="lg" variant="secondary" className="px-8 tracking-wide">
          <a href="#shop">Shop now</a>
        </Button>
      </div>
    </section>
  )
}
