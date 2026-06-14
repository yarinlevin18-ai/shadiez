import React from "react";

/**
 * SHADIEZ Badge — a small label for status, colorway names, "New" flags.
 * Square 4px by default (the house corner); set `pill` for a rounded chip.
 */
const TONES = {
  sand:   { bg: "var(--surface-sand)", fg: "var(--ink)", bd: "var(--border)" },
  wood:   { bg: "var(--wood-soft)", fg: "var(--wood-deep)", bd: "transparent" },
  navy:   { bg: "var(--navy)", fg: "var(--cream)", bd: "transparent" },
  amber:  { bg: "var(--amber)", fg: "#3A2A12", bd: "transparent" },
  ink:    { bg: "var(--ink)", fg: "var(--cream)", bd: "transparent" },
  outline:{ bg: "transparent", fg: "var(--ink)", bd: "var(--border-strong)" },
};

export function Badge({ children, tone = "sand", pill = false, uppercase = false, style, ...rest }) {
  const t = TONES[tone] || TONES.sand;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: uppercase ? "11px" : "12.5px",
        letterSpacing: uppercase ? "0.14em" : "0.01em",
        textTransform: uppercase ? "uppercase" : "none",
        lineHeight: 1,
        padding: "5px 10px",
        borderRadius: pill ? "var(--radius-pill)" : "var(--radius-sm)",
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
