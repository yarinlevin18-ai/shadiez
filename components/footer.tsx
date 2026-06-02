"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/patterns/scroll-stagger"
import { useLeadDialog } from "@/components/lead-dialog"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  const { openDialog } = useLeadDialog()

  return (
    <footer className="border-t border-border/50 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollStagger stagger={0.1} threshold={0.15}>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
            <ScrollStaggerItem>
              <div className="text-center md:text-left">
                <div className="text-lg text-ink">
                  <Logo />
                </div>
                <p className="mt-2 font-sans text-sm text-muted-foreground">
                  Something New Under The Sun
                </p>
              </div>
            </ScrollStaggerItem>

            <ScrollStaggerItem>
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
                <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3 md:justify-end">
                  <Link href="/privacy" className="font-sans text-sm tracking-wide text-muted-foreground transition-colors hover:text-ink">Privacy</Link>
                  <Link href="/terms" className="font-sans text-sm tracking-wide text-muted-foreground transition-colors hover:text-ink">Terms</Link>
                  <button type="button" onClick={openDialog} className="font-sans text-sm tracking-wide text-muted-foreground transition-colors hover:text-ink">Contact</button>
                </nav>

                <a
                  href="https://instagram.com/"
                  aria-label="SHADIEZ on Instagram"
                  className="text-muted-foreground transition-colors hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </ScrollStaggerItem>
          </div>

          <ScrollStaggerItem>
            <div className="mt-12 border-t border-border/30 pt-8 text-center">
              <p className="font-sans text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} SHADIEZ. All rights reserved.
              </p>
              <p className="mt-1.5 font-sans text-xs text-muted-foreground/70">
                Made by{" "}
                <span className="text-muted-foreground">DGL Solutions</span>
              </p>
            </div>
          </ScrollStaggerItem>
        </ScrollStagger>
      </div>
    </footer>
  )
}
