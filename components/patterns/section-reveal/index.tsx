"use client";

// Section Reveal — soft fade + rise as each section enters the viewport. Designed to
// wrap top-level page sections (one per section), not individual elements. For inner
// elements use HeroReveal / ScrollStagger.
//
// Usage:
//   <SectionReveal>
//     <ProductShowcase />
//   </SectionReveal>
//
// Skip on sections that already drive their own scroll-linked animations (sticky pins,
// scroll-mapped opacity, etc.) — the entrance fade will fight with them.

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

export interface SectionRevealProps {
  children: ReactNode;
  // Section content shifts upward by this many px while hidden. Default 48 reads as
  // "settling into place" without being a noticeable jump.
  distance?: number;
  // Tween duration in seconds. ~1s feels editorial — fast enough to never block, slow
  // enough to register as a deliberate motion.
  duration?: number;
  // Fraction of the section that must be visible before the reveal triggers. Lower =
  // earlier trigger (more responsive on fast scroll); higher = later (more dramatic).
  amount?: number;
  // Set false to allow the reveal to replay each time the section re-enters viewport.
  // Default true: play once on first sight, then leave alone.
  once?: boolean;
  // Optional className passthrough — useful if the parent needs to set width/display
  // on the wrapper.
  className?: string;
}

// Custom easing: a soft "outQuint"-ish curve — quick to depart from start, slow to
// settle. Less mechanical than the built-in easeOut.
const EASING: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export function SectionReveal({
  children,
  // Smaller default rise (was 48) — large translation made the section feel like
  // it was "loading in" on slow image fetches. 20px is enough to register as a
  // deliberate motion without screaming.
  distance = 20,
  // Shorter default duration (was 0.9) — quicker settle, less time for the user
  // to perceive any in-flight image loads happening behind the animation.
  duration = 0.6,
  // Trigger as soon as the section starts peeking into view (was 0.15). Earlier
  // trigger = section's already settled by the time the user reads it on a
  // scroll-through.
  amount = 0.05,
  once = true,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, ease: EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
