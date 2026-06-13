import React, { useEffect } from "react";

/**
 * SHADIEZ Dialog — the lead-dialog pattern. Warm ink overlay + blur, a cream
 * panel with the thin wood-tone brand bar, big soft shadow, and a ghost close.
 * Controlled: render with `open` and handle `onClose`.
 */
function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Dialog({ open, onClose, title, description, children, footer, width = 440 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(35,32,28,0.45)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "ds-fade 220ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: `min(92vw, ${width}px)`,
          background: "var(--cream)",
          color: "var(--ink)",
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid rgba(35,32,28,0.10)",
          overflow: "hidden",
          animation: "ds-pop 280ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", insetInline: 0, top: 0, height: "3px", background: "var(--wood-bar)" }} />
        <button
          type="button"
          aria-label="Close"
          onClick={() => onClose && onClose()}
          style={{
            position: "absolute", top: 12, right: 12, width: 32, height: 32,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            border: "none", borderRadius: "999px", cursor: "pointer",
            background: "transparent", color: "rgba(35,32,28,0.55)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(35,32,28,0.06)"; e.currentTarget.style.color = "var(--ink)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(35,32,28,0.55)"; }}
        >
          <CloseGlyph />
        </button>

        <div style={{ padding: "36px 28px 28px" }}>
          {title && (
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "28px", lineHeight: 1.1, letterSpacing: "0.01em", margin: 0 }}>
              {title}
            </h2>
          )}
          {description && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(35,32,28,0.65)", margin: "6px 0 0" }}>
              {description}
            </p>
          )}
          {children && <div style={{ marginTop: title || description ? "20px" : 0 }}>{children}</div>}
          {footer && <div style={{ marginTop: "20px" }}>{footer}</div>}
        </div>
      </div>

      <style>{`
        @keyframes ds-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ds-pop { from { opacity: 0; transform: translateY(12px) scale(0.98) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { [role="dialog"], [role="dialog"] > div { animation: none !important } }
      `}</style>
    </div>
  );
}
