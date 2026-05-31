// SHADIEZ brand mark.
//
// Per CLAUDE.md the real logo is a wavy-line "Z" mark (wind / shade / waves) + the
// "SHADIEZ" wordmark + a small diamond accent. Until the production SVG lands, we
// approximate it with three stacked sine waves that read both as a stylised Z and
// as wind/water — same brand cue, premium feel, single-color so it sits anywhere.
//
// Two exports:
//   <Wordmark />  — just the text, inline, inherits font size from the parent.
//   <Logo />      — composed: mark + wordmark + (optional) diamond accent. Use this
//                   in the header, footer, and anywhere a real "logo" lives.

import type { CSSProperties } from "react"

interface MarkProps {
  className?: string
  style?: CSSProperties
  // Decorative-only — set false ONLY if the mark is the sole semantics carrier
  // (i.e. there's no accompanying SHADIEZ text on screen).
  decorative?: boolean
}

/**
 * Three stacked wavy lines. Stroked, single-color. Aspect 32:18 — pair with the
 * wordmark by setting a height (`h-4`, `h-5`, etc.) and letting width auto.
 */
export function WaveMark({ className, style, decorative = true }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
    >
      <path d="M3 4c4-3 8 3 13 0s9 3 13 0" />
      <path d="M3 9c4-3 8 3 13 0s9 3 13 0" />
      <path d="M3 14c4-3 8 3 13 0s9 3 13 0" />
    </svg>
  )
}

interface WordmarkProps {
  className?: string
}

/**
 * Just the "SHADIEZ" wordmark — inline span, no icon. Inherits font size from the
 * parent so you can drop it inside an <h1>, <p>, header link, etc.
 *
 * Typography: Fraunces serif, font-light (300), uppercase, 0.24em tracking — slightly
 * wider than default to read as a brand mark rather than a word.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={`font-serif font-light uppercase tracking-[0.24em] ${className ?? ""}`}
    >
      SHADIEZ
    </span>
  )
}

interface LogoProps {
  className?: string
  // Hide the wave-mark icon (just wordmark + diamond). Useful where the icon would
  // clash with a tighter horizontal slot.
  showMark?: boolean
  // Hide the diamond accent.
  showAccent?: boolean
  // Override the wordmark font size — when omitted, inherits from the parent.
  wordmarkClassName?: string
  // Override the icon height — when omitted, scales to the wordmark via 1em.
  markClassName?: string
}

/**
 * Composed brand lockup: wave mark + wordmark + diamond accent.
 *
 * Sizes itself off the parent's font-size by default (the icon is `h-[1em]`, the
 * accent inherits font-size). Drop into a `<a className="text-xl">` for a header-
 * scale logo or `<div className="text-3xl">` for a hero-scale logo.
 */
export function Logo({
  className,
  showMark = true,
  showAccent = true,
  wordmarkClassName,
  markClassName,
}: LogoProps) {
  return (
    <span
      className={`inline-flex items-center gap-[0.5em] leading-none ${className ?? ""}`}
    >
      {showMark && (
        <WaveMark className={markClassName ?? "h-[0.9em] w-auto shrink-0"} />
      )}
      <Wordmark className={wordmarkClassName} />
      {showAccent && (
        <span
          aria-hidden
          // Small diamond — rotated square. text-[0.35em] keeps it proportional to
          // the wordmark regardless of where the logo is used.
          className="ml-[0.15em] inline-block h-[0.35em] w-[0.35em] rotate-45 bg-current"
        />
      )}
    </span>
  )
}
