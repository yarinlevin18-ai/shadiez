import React from "react";

/**
 * SHADIEZ wave-mark — three stacked sea-lines that read as a stylized "Z"
 * (wind / shade / waves). Single-color, stroked, inherits `currentColor`.
 * Aspect 32:18 — set a height and let width auto.
 */
export function WaveMark({ size = 20, color = "currentColor", strokeWidth = 1.4, style, ...rest }) {
  const h = typeof size === "number" ? size : size;
  return (
    <svg
      viewBox="0 0 32 18"
      width={(h / 18) * 32}
      height={h}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, ...style }}
      {...rest}
    >
      <path d="M3 4c4-3 8 3 13 0s9 3 13 0" />
      <path d="M3 9c4-3 8 3 13 0s9 3 13 0" />
      <path d="M3 14c4-3 8 3 13 0s9 3 13 0" />
    </svg>
  );
}
