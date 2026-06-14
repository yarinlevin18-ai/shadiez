import React, { useState } from "react";

/**
 * SHADIEZ Input — 4px corners, warm hairline border, navy focus ring.
 * Use bare, or via <Field> for a labeled row.
 */
export function Input({ invalid = false, disabled = false, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
      style={{
        height: 46,
        width: "100%",
        boxSizing: "border-box",
        padding: "0 14px",
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        color: "var(--ink)",
        background: focus ? "var(--cream)" : "rgba(251,247,240,0.7)",
        border: `1px solid ${invalid ? "var(--error)" : focus ? "var(--navy)" : "var(--border)"}`,
        borderRadius: "var(--radius-sm)",
        outline: "none",
        boxShadow: focus && !invalid ? "0 0 0 3px rgba(31,58,95,0.18)" : "none",
        transition: "border-color 180ms, box-shadow 180ms, background 180ms",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
      {...rest}
    />
  );
}
