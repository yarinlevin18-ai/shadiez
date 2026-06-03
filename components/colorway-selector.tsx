"use client"

/**
 * ColorwaySelector — replaces the original ring-of-circles with a row of
 * fabric-chip swatches. Design goals:
 *
 *   • Read as material (canvas + wood), not as generic UI dots.
 *   • Active state uses a thin wood-tone bar UNDER the chip instead of a
 *     web-default focus ring — feels bespoke.
 *   • Hover lifts the chip on a soft warm shadow, suggesting it's pickable
 *     off a tabletop of swatches.
 *   • Labels are always visible in small serif italic — premium catalog
 *     vibe, not "hover to discover" mystery meat.
 *
 * Pure presentation — selection state + handlers come from the parent. Drop
 * this into hero-section.tsx in place of the old <div id="colorways"> block.
 */

import { motion } from "framer-motion"

export type ColorwayOption = {
  id: string
  name: string
  /** Hex for a solid weave, or a "*-pattern" key mapped in PATTERN_CONFIG. */
  swatch: string
}

const PATTERN_CONFIG: Record<string, { base: string; overlay: string }> = {
  "navy-stripe-pattern": {
    base: "#1F3A5F",
    // Finer stripes (2px) read as "fabric weave" instead of "barcode."
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(243,236,224,0.92) 2px, rgba(243,236,224,0.92) 4px)",
  },
  "burgundy-stripe-pattern": {
    base: "#722F37",
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(243,236,224,0.92) 2px, rgba(243,236,224,0.92) 4px)",
  },
  "pinstripe-pattern": {
    base: "#2B2723",
    overlay:
      "repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(243,236,224,0.55) 2px, rgba(243,236,224,0.55) 3px)",
  },
}

export function ColorwaySelector({
  options,
  selectedId,
  onSelect,
  className = "",
}: {
  options: ColorwayOption[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}) {
  return (
    <div
      id="colorways"
      role="radiogroup"
      aria-label="Canvas colorway"
      className={`scroll-mt-24 relative z-10 flex items-start justify-center gap-3 md:gap-4 ${className}`}
    >
      {options.map((cw) => {
        const pattern = PATTERN_CONFIG[cw.swatch]
        const isActive = cw.id === selectedId

        return (
          <button
            key={cw.id}
            type="button"
            onClick={() => onSelect(cw.id)}
            role="radio"
            aria-checked={isActive}
            aria-label={cw.name}
            className="group relative flex flex-col items-center gap-2.5 focus:outline-none"
          >
            {/* ── Chip ─────────────────────────────────────────────────────
                Outer wrapper carries lift + shadow growth on hover/active.
                Inner span is the actual material surface. Rounded-[10px] is
                the sweet spot between "chip" and "tile" — neither circle
                nor hard square. */}
            <motion.span
              className={`relative block h-10 w-10 rounded-[10px] md:h-11 md:w-11 ${
                isActive
                  ? "shadow-[0_10px_22px_-10px_rgba(60,40,20,0.55)]"
                  : "shadow-[0_4px_10px_-4px_rgba(60,40,20,0.35)]"
              }`}
              animate={{
                y: isActive ? -2 : 0,
                scale: isActive ? 1.04 : 1,
              }}
              whileHover={{ y: -3, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              {/* Material surface — the canvas color/pattern itself. The
                  thin warm border softens the chip onto the cream page. */}
              <span
                aria-hidden
                className="absolute inset-0 overflow-hidden rounded-[10px] border border-ink/10"
                style={!pattern ? { backgroundColor: cw.swatch } : undefined}
              >
                {pattern && (
                  <>
                    <span
                      className="absolute inset-0"
                      style={{ backgroundColor: pattern.base }}
                    />
                    <span
                      className="absolute inset-0"
                      style={{ backgroundImage: pattern.overlay }}
                    />
                  </>
                )}

                {/* Fabric depth — diagonal top-left highlight + bottom-right
                    shadow inside the chip so it reads as a soft surface, not
                    a flat fill. */}
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.18) 100%)",
                  }}
                />
              </span>

              {/* Active inner glow — a thin cream highlight just inside the
                  border, only visible on the selected chip. Subtle but reads
                  as "this one is lit up." */}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[10px] ring-1 ring-inset ring-cream/40"
                />
              )}
            </motion.span>

            {/* ── Wood-tone under-mark ─────────────────────────────────────
                Replaces the navy focus ring. Renders as a small warm-walnut
                bar that grows in when the chip is selected. Matches the real
                product material — frames the swatch like a wooden sample
                pin. */}
            <motion.span
              aria-hidden
              className="block h-[3px] rounded-full"
              style={{ backgroundColor: "#8A5A38" }}
              animate={{
                width: isActive ? 22 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            />

            {/* ── Label ────────────────────────────────────────────────────
                Always visible. Italic serif at a small size is the same type
                tradition used by linen/canvas catalogs — feels premium, not
                e-commerce-default. */}
            <span
              className={`-mt-0.5 whitespace-nowrap font-serif text-[11px] italic tracking-wide transition-colors md:text-xs ${
                isActive ? "text-ink" : "text-ink/55 group-hover:text-ink/80"
              }`}
            >
              {cw.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
