import React, { useState } from "react";

/** SHADIEZ Textarea — same skin as Input, multi-line. */
export function Textarea({ invalid = false, disabled = false, rows = 4, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea
      rows={rows}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        fontFamily: "var(--font-body)",
        fontSize: "15px",
        lineHeight: 1.5,
        color: "var(--ink)",
        background: focus ? "var(--cream)" : "rgba(251,247,240,0.7)",
        border: `1px solid ${invalid ? "var(--error)" : focus ? "var(--navy)" : "var(--border)"}`,
        borderRadius: "var(--radius-sm)",
        outline: "none",
        resize: "vertical",
        boxShadow: focus && !invalid ? "0 0 0 3px rgba(31,58,95,0.18)" : "none",
        transition: "border-color 180ms, box-shadow 180ms, background 180ms",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
      {...rest}
    />
  );
}
