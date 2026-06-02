"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { useLeadDialog } from "@/components/lead-dialog"

// Threshold (px) at which the header swaps from transparent (over hero) to
// translucent-on-cream (over everything else). Roughly 60% of an average viewport
// so it triggers before the hero is fully out of frame.
const SCROLL_THRESHOLD = 480

export function Header() {
  const { openDialog } = useLeadDialog()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll() // sync initial state in case the page loads scrolled (refresh, hash anchor).
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-border/40 bg-background/85 backdrop-blur-md shadow-[0_1px_12px_-6px_rgba(60,40,20,0.18)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          aria-label="SHADIEZ — home"
          className="text-lg text-ink transition-opacity hover:opacity-80"
        >
          <Logo />
        </Link>

        {/* Single CTA — opens the lead dialog. Styling matches the hero button
            so the brand voice stays consistent throughout the page. */}
        <button
          type="button"
          onClick={openDialog}
          className="inline-flex items-center justify-center rounded-[4px] bg-navy px-5 py-2 font-sans text-sm tracking-wide text-primary-foreground shadow-[0_8px_20px_-8px_rgba(31,58,95,0.5)] transition-colors hover:bg-navy/90 md:px-6 md:py-2.5"
        >
          Contact us
        </button>
      </nav>
    </header>
  )
}
