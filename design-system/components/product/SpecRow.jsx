import React from "react";

/**
 * SHADIEZ SpecRow — the inline spec list with diamond/dot separators, e.g.
 * "Solid oak ◆ Canvas ◆ Folds flat". The brand's quiet way to list materials.
 */
export function SpecRow({ items = [], separator = "diamond", style, ...rest }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: "var(--ink)",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span>{item}</span>
          {i < items.length - 1 && (
            separator === "diamond" ? (
              <span aria-hidden="true" style={{ width: "5px", height: "5px", transform: "rotate(45deg)", background: "var(--amber)", flexShrink: 0 }} />
            ) : (
              <span aria-hidden="true" style={{ width: "16px", height: "1px", background: "var(--border-strong)", flexShrink: 0 }} />
            )
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
