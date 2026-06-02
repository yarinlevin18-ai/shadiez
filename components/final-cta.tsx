"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { TitleReveal } from "@/components/patterns/title-reveal"
import { useLeadDialog } from "@/components/lead-dialog"

// Trim this many seconds off the end of the loop to mask the visible cut at the
// loop seam.
const LOOP_TRIM_END_S = 0.35

export function FinalCTA() {
  const { openDialog } = useLeadDialog()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const tryPlay = () => v.play().catch(() => {})
    if (v.readyState >= 2) tryPlay()
    else v.addEventListener("canplay", tryPlay, { once: true })

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
        preload="auto"
        poster="/cta-beach-poster.jpg"
        aria-hidden
      >
        <source src="/cta-beach.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/35 to-ink/70"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-8 font-serif text-3xl font-light tracking-wide text-cream drop-shadow-[0_2px_8px_rgba(20,12,6,0.45)] md:text-4xl lg:text-5xl text-balance">
          <TitleReveal>This could be your summer.</TitleReveal>
        </h2>
        <Button
          type="button"
          size="lg"
          variant="glass"
          className="px-8 tracking-wide"
          onClick={openDialog}
        >
          Get on the list
        </Button>
      </div>
    </section>
  )
}
