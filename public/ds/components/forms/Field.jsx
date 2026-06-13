import React from "react";

/**
 * SHADIEZ Field — labeled form row matching the lead-dialog pattern:
 * uppercase tracked label, required asterisk (navy), optional hint, inline error.
 * Pass an <Input>/<Textarea> (or any control) as children.
 */
export function Field({ label, htmlFor, required = false, optional = false, error, hint, children, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "var(--ink-60)",
          }}
        >
          {label}
          {required && <span style={{ marginLeft: "0.25em", color: "var(--navy)" }}>*</span>}
        </label>
        {optional && !error && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.04em", color: "rgba(35,32,28,0.4)" }}>optional</span>
        )}
        {error && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "var(--error)" }}>{error}</span>
        )}
      </div>
      {children}
      {hint && !error && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--ink-60)" }}>{hint}</span>
      )}
    </div>
  );
}
