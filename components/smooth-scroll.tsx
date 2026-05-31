"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Intercept in-page hash links so they smooth-scroll via Lenis instead of doing
    // the native instant jump. Handles same-document targets only — external links
    // and explicit-handler clicks (defaultPrevented) pass through untouched.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      // Plain left-click only — let cmd/ctrl/shift-click do their thing.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      // Walk up to the closest anchor (handles clicks on inner spans/svgs).
      const anchor = (e.target as HTMLElement | null)?.closest?.("a")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("#") || href === "#") return

      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      // offset matches the fixed-header height + a little breathing room.
      lenis.scrollTo(target as HTMLElement, { offset: -88 })
      // Keep the URL hash in sync without forcing a jump.
      history.replaceState(null, "", href)
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
