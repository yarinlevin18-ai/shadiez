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
  // Section content shifts upward by this many px while hidden.
  distance?: number;
  // Section settles up from this scale — a subtle "push in" that gives the entrance
  // more presence than a flat rise. 1 disables it.
  scaleFrom?: number;
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

// Expo-out: leaves the start fast, settles slow. Reads as a deliberate, premium
// arrival rather than a mechanical fade.
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SectionReveal({
  children,
  // Rise + scale together so each section "arrives" with weight. Transform-only
  // (no filter) so the 3D canvas / video sections stay cheap and jank-free.
  distance = 56,
  scaleFrom = 0.975,
  duration = 1,
  amount = 0.05,
  once = true,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance, scale: scaleFrom }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: distance, scale: scaleFrom }
      }
      transition={{ duration, ease: EASING }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
