"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { useLeadDialog } from "@/components/lead-dialog"

// Fraction of the first section (the full-height hero) you must scroll past before
// the header swaps from transparent to its frosted-glass state. 0.6 = it kicks in
// as you're leaving the hero, before it's fully out of frame.
const SCROLL_FRACTION = 0.6

export function Header() {
  const { openDialog } = useLeadDialog()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Tie the threshold to the actual hero height (first <section>) so it tracks
    // "scrolled away from the first section" on any viewport, not a fixed px value.
    const onScroll = () => {
      const hero = document.querySelector("section")
      const threshold = (hero?.offsetHeight ?? window.innerHeight) * SCROLL_FRACTION
      setScrolled(window.scrollY > threshold)
    }
    onScroll() // sync initial state in case the page loads scrolled (refresh, hash anchor).
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-border/30 bg-background/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_12px_-6px_rgba(60,40,20,0.18)]"
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
          className="inline-flex items-center justify-center rounded-[4px] bg-navy px-5 py-2 font-serif text-base font-normal tracking-wide text-primary-foreground shadow-[0_8px_20px_-8px_rgba(31,58,95,0.5)] transition-colors hover:bg-navy/90 md:px-6 md:py-2.5"
        >
          Contact us
        </button>
      </nav>
    </header>
  )
}
