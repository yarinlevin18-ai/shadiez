"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

// Lightweight, accurate cookie notice. The site currently sets ONLY essential
// cookies and runs no analytics/trackers (see /privacy), so a blocking
// Accept/Reject consent gate isn't legally required — this is an informational
// notice with a single dismiss. The choice is recorded in localStorage so it
// doesn't reappear.
//
// ⚠️ IF you later add analytics/marketing cookies, upgrade this to a real consent
// gate (Accept all / Essential only) that withholds those scripts until consent,
// and update the Privacy Policy to match.
const KEY = "shadiez:cookie-notice-dismissed"

export function CookieNotice() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "1") setShow(true)
    } catch {
      // localStorage blocked (private mode / cookies disabled) — just don't show.
    }
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1")
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 rounded-md border border-border/60 bg-cream/95 p-4 shadow-[0_20px_50px_-20px_rgba(20,12,6,0.5)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <p className="font-sans text-sm leading-relaxed text-ink/80">
          We use only essential cookies to keep the site running — no tracking,
          no ads. More in our{" "}
          <Link
            href="/privacy"
            className="text-navy underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 self-stretch rounded-[4px] bg-navy px-5 py-2 font-sans text-sm tracking-wide text-primary-foreground transition-colors hover:bg-navy/90 sm:self-auto"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
