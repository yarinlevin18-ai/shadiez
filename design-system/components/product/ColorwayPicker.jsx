import React from "react";
import { ColorwaySwatch } from "./ColorwaySwatch.jsx";

/**
 * SHADIEZ ColorwayPicker — the signature shop control. A row of canvas swatches
 * with the selected name shown above. Controlled: pass `value` (index) + onChange.
 *
 * The default `colorways` are the real SHADIEZ line; pass your own to override.
 */
export const SHADIEZ_COLORWAYS = [
  { key: "Cream",      dot: "var(--cw-cream)" },
  { key: "Coral",      dot: "var(--cw-coral)" },
  { key: "Butter",     dot: "var(--cw-butter)" },
  { key: "Dusty Blue", dot: "var(--cw-dusty-blue)" },
  { key: "Navy",       dot: "var(--cw-navy)" },
  { key: "Burgundy",   dot: "var(--cw-burgundy)" },
  { key: "Pinstripe",  dot: "var(--cw-pinstripe)" },
];

export function ColorwayPicker({ colorways = SHADIEZ_COLORWAYS, value = 0, onChange, showName = true, swatchSize = 30, style, ...rest }) {
  const active = colorways[value] || colorways[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", ...style }} {...rest}>
      {showName && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-60)" }}>
          {active.key}
        </div>
      )}
      <div role="listbox" aria-label="Colorways" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {colorways.map((c, i) => (
          <ColorwaySwatch
            key={c.key}
            color={c.dot}
            label={c.key}
            size={swatchSize}
            selected={i === value}
            onClick={() => onChange && onChange(i, c)}
          />
        ))}
      </div>
    </div>
  );
}
