import React, { useState } from "react";

/**
 * SHADIEZ ColorwaySwatch — a single selectable canvas color. Round by default,
 * with a soft ring when selected. Use inside <ColorwayPicker> or standalone.
 */
export function ColorwaySwatch({ color, label, selected = false, size = 30, shape = "round", onClick, style, ...rest }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-label={label}
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        padding: 0,
        cursor: "pointer",
        borderRadius: shape === "round" ? "999px" : "var(--radius-sm)",
        background: color,
        border: "1px solid rgba(35,32,28,0.18)",
        boxShadow: selected
          ? "0 0 0 2px var(--cream), 0 0 0 4px var(--ink)"
          : hover ? "0 0 0 2px var(--cream), 0 0 0 4px rgba(35,32,28,0.25)" : "inset 0 1px 2px rgba(0,0,0,0.12)",
        transform: selected || hover ? "scale(1.06)" : "scale(1)",
        transition: "transform 200ms cubic-bezier(.22,1,.36,1), box-shadow 200ms",
        outline: "none",
        ...style,
      }}
      {...rest}
    />
  );
}
