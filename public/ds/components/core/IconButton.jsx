import React, { useState } from "react";

/**
 * SHADIEZ IconButton — round, icon-only action (dialog close, nav, social).
 * Pass any SVG / Lucide icon as children.
 */
const VARIANTS = {
  ghost:  { bg: "transparent", fg: "var(--ink-60)", hoverBg: "rgba(35,32,28,0.06)", hoverFg: "var(--ink)" },
  solid:  { bg: "var(--ink)", fg: "var(--cream)", hoverBg: "var(--wood-deep)", hoverFg: "var(--cream)" },
  cream:  { bg: "var(--cream)", fg: "var(--ink)", hoverBg: "var(--sand)", hoverFg: "var(--ink)" },
};
const DIM = { sm: 32, md: 40, lg: 44 };

export function IconButton({ children, label, variant = "ghost", size = "md", round = true, onClick, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.ghost;
  const d = DIM[size] || DIM.md;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: d,
        height: d,
        borderRadius: round ? "999px" : "var(--radius-sm)",
        border: "none",
        cursor: "pointer",
        color: hover ? v.hoverFg : v.fg,
        background: hover ? v.hoverBg : v.bg,
        transition: "background 200ms, color 200ms",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
