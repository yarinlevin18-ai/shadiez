"use client"

import { ShoppingBag, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"

// Threshold (px) at which the header swaps from transparent (over hero) to
// translucent-on-cream (over everything else). Roughly 60% of an average viewport so
// it triggers before the hero is fully out of frame.
const SCROLL_THRESHOLD = 480

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        <a
          href="/"
          aria-label="SHADIEZ — home"
          className="text-lg text-ink transition-opacity hover:opacity-80"
        >
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#shop"
            className="text-sm tracking-wide text-ink/70 transition-colors hover:text-ink"
          >
            Shop
          </a>
          <a
            href="#colorways"
            className="text-sm tracking-wide text-ink/70 transition-colors hover:text-ink"
          >
            Colorways
          </a>
          <a
            href="#about"
            className="text-sm tracking-wide text-ink/70 transition-colors hover:text-ink"
          >
            About
          </a>
          <button
            type="button"
            aria-label="Shopping cart"
            className="text-ink/70 transition-colors hover:text-ink"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-ink" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6 text-ink" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#shop"
              className="text-sm tracking-wide text-ink/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </a>
            <a
              href="#colorways"
              className="text-sm tracking-wide text-ink/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              Colorways
            </a>
            <a
              href="#about"
              className="text-sm tracking-wide text-ink/70"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
