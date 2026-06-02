"use client";

// Marquee — an infinite scrolling strip for logos, testimonials, or tags.
// Self-contained (injects its own keyframes); pause-on-hover and edge fade.
//
// Usage:
//   <Marquee>{logos.map(l => <Logo key={l.id} {...l} />)}</Marquee>

import { type CSSProperties, type ReactNode, useState } from "react";

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop (higher = slower). */
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  pauseOnHover?: boolean;
  /** Fade the left/right edges. */
  fade?: boolean;
  className?: string;
}

const KEYFRAMES = `@keyframes tl-marquee-x{from{transform:translateX(0)}to{transform:translateX(-50%)}}`;

export function Marquee({
  children,
  speed = 20,
  direction = "left",
  gap = 40,
  pauseOnHover = true,
  fade = true,
  className,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  const maskStyle: CSSProperties = fade
    ? {
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }
    : {};

  const group: CSSProperties = {
    display: "flex",
    gap,
    paddingRight: gap,
    flexShrink: 0,
  };

  return (
    <div
      className={className}
      style={{ overflow: "hidden", ...maskStyle }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{KEYFRAMES}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `tl-marquee-x ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div style={group}>{children}</div>
        <div style={group} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
