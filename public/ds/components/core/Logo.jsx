import React from "react";
import { WaveMark } from "./WaveMark.jsx";

/**
 * The composed SHADIEZ lockup: wave-mark + wordmark + diamond accent.
 * Sizes off `fontSize`. Drop into a header at ~18px, a hero at ~32px.
 */
export function Logo({
  size = 20,
  color = "currentColor",
  showMark = true,
  showAccent = true,
  style,
  ...rest
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5em",
        lineHeight: 1,
        color,
        fontSize: size,
        ...style,
      }}
      {...rest}
    >
      {showMark && <WaveMark size={size * 0.9} color={color} />}
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          fontSize: "1em",
        }}
      >
        SHADIEZ
      </span>
      {showAccent && (
        <span
          aria-hidden="true"
          style={{
            marginLeft: "0.1em",
            width: "0.35em",
            height: "0.35em",
            transform: "rotate(45deg)",
            background: "currentColor",
            display: "inline-block",
          }}
        />
      )}
    </span>
  );
}
