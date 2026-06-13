import React, { useState } from "react";

/**
 * SHADIEZ ProductCard — a calm catalog card: full-bleed photo, optional
 * eyebrow, name, meta line, and footer (price / CTA). Near-square corners,
 * warm hairline border, soft lift on hover. Photography does the talking.
 */
export function ProductCard({ image, alt = "", eyebrow, name, meta, footer, ratio = "4 / 5", onClick, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-canvas)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        cursor: interactive ? "pointer" : "default",
        boxShadow: hover ? "var(--shadow-card)" : "var(--shadow-xs)",
        transform: hover && interactive ? "translateY(-3px)" : "none",
        transition: "transform 260ms cubic-bezier(.22,1,.36,1), box-shadow 260ms",
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: "relative", aspectRatio: ratio, background: "var(--sand)", overflow: "hidden" }}>
        {image && (
          <img
            src={image}
            alt={alt}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              transform: hover && interactive ? "scale(1.04)" : "scale(1)",
              transition: "transform 600ms cubic-bezier(.22,1,.36,1)",
            }}
          />
        )}
      </div>
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {eyebrow && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--wood)" }}>{eyebrow}</span>
        )}
        {name && (
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.01em", color: "var(--ink)" }}>{name}</span>
        )}
        {meta && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--ink-60)" }}>{meta}</span>
        )}
        {footer && <div style={{ marginTop: "10px" }}>{footer}</div>}
      </div>
    </div>
  );
}
