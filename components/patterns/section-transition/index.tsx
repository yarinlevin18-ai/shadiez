"use client";

// Section Transition — scroll-linked ENTRANCE **and** EXIT for a top-level section.
//
// Unlike SectionReveal (which only fades in once, on enter), this maps the section's
// whole pass through the viewport to opacity / scale / lift, so each section settles
// in as it arrives and recedes as it leaves — a continuous, cinematic scroll feel.
//
//   progress 0  → section's top edge meets the viewport bottom (just appearing)
//   progress 1  → section's bottom edge meets the viewport top   (just leaving)
//
// The plateau between `edge` and `1 - edge` is held fully visible, so content is
// crisp the whole time it's comfortably on screen; the fade only happens in the
// first/last sliver of travel, when the section is mostly off-screen anyway.
//
// Decoupling note: the measured ref is the wrapper itself and the transform is applied
// to that same element. For sections that run their OWN scroll-linked parallax inside
// (they measure their own rect), prefer `lift={0}` here so the wrapper never translates
// the thing those sections are measuring — opacity + scale don't move scroll position,
// so they can't feed back into the inner parallax. Simple sections can pass a lift.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export interface SectionTransitionProps {
  children: ReactNode;
  // px the section lifts toward at each extreme (enters from +lift, exits to -lift).
  // Keep 0 for sections with internal parallax to avoid measurement feedback.
  lift?: number;
  // scale at the extremes; 1 disables. A faint "recede" that adds depth to the fade.
  scaleFrom?: number;
  // opacity floor at the extremes. 0 = full fade; raise (e.g. 0.2) for a softer,
  // never-fully-gone exit at busy seams.
  minOpacity?: number;
  // fraction of the pass spent settling in / out (0–0.5). Smaller = content holds
  // opaque longer, fade only at the very edges.
  edge?: number;
  className?: string;
}

// Expo-ish: most of the change happens fast near the edges, then holds.
export function SectionTransition({
  children,
  lift = 0,
  scaleFrom = 0.985,
  minOpacity = 0,
  edge = 0.14,
  className,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const a = edge;
  const b = 1 - edge;
  const opacity = useTransform(
    scrollYProgress,
    [0, a, b, 1],
    [minOpacity, 1, 1, minOpacity],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, a, b, 1],
    [scaleFrom, 1, 1, scaleFrom],
  );
  const y = useTransform(
    scrollYProgress,
    [0, a, b, 1],
    [lift, 0, 0, -lift],
  );

  // Respect reduced motion — no scroll-scrub, just static content. Ref stays attached
  // so useScroll has a valid target (no warning), the values are simply unused.
  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
