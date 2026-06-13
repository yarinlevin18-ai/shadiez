import React from "react";

/**
 * SHADIEZ Toast — a calm, warm confirmation card. Presentational: render it
 * (e.g. inside a fixed container) and remove it on a timer in your app.
 */
const TONES = {
  default: { accent: "var(--wood)", icon: null },
  success: { accent: "var(--success)", glyph: "M20 6 9 17l-5-5" },
  error:   { accent: "var(--error)", glyph: "M18 6 6 18M6 6l12 12" },
};

export function Toast({ tone = "default", title, message, onDismiss, style }) {
  const t = TONES[tone] || TONES.default;
  return (
    <div
      role="status"
      style={{
        position: "relative",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        minWidth: 280,
        maxWidth: 380,
        padding: "14px 16px 14px 16px",
        background: "var(--cream)",
        color: "var(--ink)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", insetBlock: 0, left: 0, width: "3px", background: t.accent }} />
      {t.glyph && (
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "999px", flexShrink: 0, color: t.accent, marginTop: 1 }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={t.glyph} /></svg>
        </span>
      )}
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px" }}>{title}</div>}
        {message && <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--ink-60)", marginTop: title ? "2px" : 0 }}>{message}</div>}
      </div>
      {onDismiss && (
        <button type="button" aria-label="Dismiss" onClick={onDismiss} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--ink-60)", padding: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
