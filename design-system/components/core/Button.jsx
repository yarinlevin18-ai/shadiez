import React, { useState } from "react";

/**
 * SHADIEZ Button — the brand's two CTA systems in one primitive.
 *
 *   variant="primary"   solid navy, 4px corners      — the default on light surfaces (header, dialogs)
 *   variant="warm"      amber/sun PILL               — over imagery & bright fields ("Shop the Shade")
 *   variant="ink"       dark PILL                    — on bright amber sun-fields
 *   variant="secondary" warm sand, 4px               — quiet secondary action
 *   variant="ghost"     text-only, wood underline    — tertiary / nav-like
 *   variant="glass"     warm frosted glass           — CTAs sitting over beach footage
 *
 * Motion: springy hover lift + tactile press shrink, honoring reduced-motion.
 */

const RADIUS = { primary: "var(--radius-sm)", secondary: "var(--radius-sm)", ghost: "var(--radius-sm)", warm: "var(--radius-pill)", ink: "var(--radius-pill)", glass: "var(--radius-pill)" };

const SIZES = {
  sm: { padding: "9px 18px", fontSize: "14px", height: 38 },
  md: { padding: "13px 24px", fontSize: "15px", height: 46 },
  lg: { padding: "16px 32px", fontSize: "16px", height: 54 },
};

function base(variant) {
  switch (variant) {
    case "warm":
      return { background: "var(--cta-warm)", color: "var(--cta-warm-text)", boxShadow: "var(--shadow-warm)", border: "1.5px solid transparent" };
    case "ink":
      return { background: "var(--cta-ink)", color: "var(--cta-ink-text)", boxShadow: "0 12px 30px -12px rgba(35,32,28,.6)", border: "1.5px solid transparent" };
    case "secondary":
      return { background: "var(--surface-sand)", color: "var(--ink)", boxShadow: "none", border: "1px solid var(--border)" };
    case "ghost":
      return { background: "transparent", color: "var(--ink)", boxShadow: "none", border: "1.5px solid transparent" };
    case "glass":
      return { background: "rgba(247,242,233,0.12)", color: "var(--cream)", border: "1px solid rgba(247,242,233,0.35)", backdropFilter: "blur(10px) saturate(1.5)", WebkitBackdropFilter: "blur(10px) saturate(1.5)", boxShadow: "inset 0 1px 1px rgba(255,250,242,0.5), 0 12px 34px -12px rgba(20,12,6,0.6)" };
    case "primary":
    default:
      return { background: "var(--cta)", color: "var(--cta-text)", boxShadow: "var(--shadow-cta)", border: "1.5px solid transparent" };
  }
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const b = base(variant);

  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lift = !reduce && hover && !disabled ? (press ? "translateY(0) scale(0.97)" : "translateY(-3px) scale(1.04)") : (press && !disabled ? "scale(0.97)" : "none");

  const hoverShadow = hover && !disabled
    ? (variant === "warm" ? "var(--shadow-warm-hover)" : variant === "primary" ? "0 14px 30px -8px rgba(31,58,95,.6)" : b.boxShadow)
    : b.boxShadow;

  const ghostUnderline = variant === "ghost" && hover && !disabled;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-body)",
        fontWeight: variant === "primary" ? 500 : 600,
        fontSize: s.fontSize,
        lineHeight: 1,
        padding: s.padding,
        borderRadius: RADIUS[variant],
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        transform: lift,
        transition: "transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 250ms cubic-bezier(.22,1,.36,1), background 200ms, opacity 200ms",
        outline: "none",
        ...b,
        boxShadow: hoverShadow,
        background: variant === "primary" && hover && !disabled ? "color-mix(in srgb, var(--cta) 90%, black)" : b.background,
        ...(ghostUnderline ? { boxShadow: "inset 0 -1.5px 0 var(--amber)" } : null),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
