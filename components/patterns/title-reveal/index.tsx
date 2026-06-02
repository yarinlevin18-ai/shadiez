"use client";

// Title Reveal — an editorial mask-rise for headings. The text sits clipped below an
// overflow-hidden edge and rises into place when the heading scrolls into view. Works
// with mixed children (plain text + the <Wordmark> component), unlike a per-character
// effect, because it animates the whole block as one rising mask.
//
// Usage:
//   <h2><TitleReveal>Built for the sun</TitleReveal></h2>
//   <h2><TitleReveal>Our <Wordmark /> Collections</TitleReveal></h2>

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

export interface TitleRevealProps {
  children: ReactNode;
  /** Seconds before the rise begins once in view. */
  delay?: number;
  /** Rise duration in seconds. */
  duration?: number;
  /** Fraction of the title that must be visible before it triggers. */
  amount?: number;
  /** Replay every time it re-enters view. Default false (play once). */
  repeat?: boolean;
  className?: string;
}

// Expo-out: leaves the clip fast, settles slow — reads as a deliberate, premium rise.
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function TitleReveal({
  children,
  delay = 0,
  duration = 0.9,
  amount = 0.4,
  repeat = false,
  className,
}: TitleRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: !repeat, amount });

  return (
    <span
      ref={ref}
      className={className}
      // inline-block + overflow hidden forms the mask edge. paddingBottom keeps
      // descenders (g, y, p) from being clipped at rest.
      style={{
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        verticalAlign: "top",
        paddingBottom: "0.12em",
      }}
    >
      <motion.span
        style={{ display: "inline-block", willChange: "transform" }}
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : { y: "115%" }}
        transition={{ duration, ease: EASING, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
