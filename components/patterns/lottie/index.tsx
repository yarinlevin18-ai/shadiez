"use client"

/**
 * LottieAnimation — drop-in player for animations exported from After Effects via
 * the Bodymovin / LottieFiles plugin.
 *
 * Two ways to give it an animation:
 *   • `src`  — a URL to a .json in /public, e.g. src="/lottie/loader.json"
 *              (easiest: just drop the export into public/lottie/ and reference it)
 *   • `data` — an imported JSON object (import loader from "@/public/lottie/loader.json")
 *
 * Behavior:
 *   • loop / autoplay default on.
 *   • `playOnView` waits until the element scrolls into view, then plays once
 *     (great for section-entrance animations). Overrides autoplay.
 *   • prefers-reduced-motion → renders the first frame, static. No motion.
 *
 * Examples:
 *   <LottieAnimation src="/lottie/loader.json" className="h-40 w-40" />
 *   <LottieAnimation src="/lottie/wave.json" loop={false} playOnView />
 */

import { useEffect, useRef, useState } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { useReducedMotion } from "framer-motion"

type LottieAnimationProps = {
  /** URL to a Lottie .json in /public (e.g. "/lottie/loader.json"). */
  src?: string
  /** Or pass imported JSON directly. Takes precedence over `src`. */
  data?: object
  /** Loop the animation. Default true. */
  loop?: boolean
  /** Start playing immediately. Default true. Ignored when `playOnView` is set. */
  autoplay?: boolean
  /** Play once the element scrolls into view (one-shot). Default false. */
  playOnView?: boolean
  /** Playback speed multiplier. Default 1. */
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export function LottieAnimation({
  src,
  data,
  loop = true,
  autoplay = true,
  playOnView = false,
  speed = 1,
  className,
  style,
}: LottieAnimationProps) {
  const reduce = useReducedMotion()
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [animationData, setAnimationData] = useState<object | null>(data ?? null)

  // Fetch the JSON when given a `src` (and no inline data).
  useEffect(() => {
    if (data || !src) return
    let cancelled = false
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`Lottie fetch failed: ${r.status} ${src}`)
        return r.json()
      })
      .then((json) => {
        // Image assets (`u` + `p`) are otherwise resolved against the document URL,
        // not the JSON's folder — rewrite relative `u` to sit next to the .json so
        // `/lottie/images/...` resolves correctly. Skips absolute/remote/data URIs.
        const base = src.slice(0, src.lastIndexOf("/") + 1)
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
  }, [src, data])

  // Apply speed once the instance exists.
  useEffect(() => {
    lottieRef.current?.setSpeed(speed)
  }, [speed, animationData])

  // Reduced motion: freeze on the first frame.
  useEffect(() => {
    if (reduce && animationData) lottieRef.current?.goToAndStop(0, true)
  }, [reduce, animationData])

  // Play-on-view: hold until the element enters the viewport, then play once.
  useEffect(() => {
    if (!playOnView || reduce || !animationData) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            lottieRef.current?.goToAndPlay(0, true)
            obs.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [playOnView, reduce, animationData])

  if (!animationData) {
    // Placeholder keeps layout stable while the JSON loads.
    return <div ref={containerRef} className={className} style={style} aria-hidden />
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={reduce ? false : loop}
        autoplay={reduce ? false : playOnView ? false : autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
