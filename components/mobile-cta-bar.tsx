"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useLeadDialog } from "@/components/lead-dialog"

// Persistent mobile conversion bar. Pinned to the bottom of the screen on phones
// only (md:hidden) — desktop keeps the header CTA. It stays hidden over the hero
// (which already has a large CTA) and slides up once the user scrolls past the
// first section, so it never competes with the hero and is always reachable
// thereafter. Mirrors the header's "scrolled past hero" detection so the two
// CTAs hand off cleanly.
const SCROLL_FRACTION = 0.7

export function MobileCtaBar() {
  const { openDialog, open: dialogOpen } = useLeadDialog()
  const [past, setPast] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("section")
      const threshold =
        (hero?.offsetHeight ?? window.innerHeight) * SCROLL_FRACTION
      setPast(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Hide while the lead dialog is open so the bar doesn't sit on top of the modal
  // backdrop on small screens.
  const show = past && !dialogOpen

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto border-t border-border/40 bg-background/90 backdrop-blur-xl backdrop-saturate-150 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-6px_24px_-12px_rgba(60,40,20,0.35)]"
          >
            <button
              type="button"
              onClick={openDialog}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[4px] bg-navy font-serif text-base font-normal tracking-wide text-primary-foreground shadow-[0_10px_22px_-8px_rgba(31,58,95,0.5)] transition-colors hover:bg-navy/90 active:bg-navy/80"
            >
              <span>Contact us</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
