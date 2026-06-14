/* @ds-bundle: {"format":3,"namespace":"SHADIEZDesignSystem_4d9f8a","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"WaveMark","sourcePath":"components/core/WaveMark.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"SHADIEZ_COLORWAYS","sourcePath":"components/product/ColorwayPicker.jsx"},{"name":"ColorwayPicker","sourcePath":"components/product/ColorwayPicker.jsx"},{"name":"ColorwaySwatch","sourcePath":"components/product/ColorwaySwatch.jsx"},{"name":"ProductCard","sourcePath":"components/product/ProductCard.jsx"},{"name":"SpecRow","sourcePath":"components/product/SpecRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3b125a78ec74","components/core/Button.jsx":"84fe18046c6f","components/core/IconButton.jsx":"89ef2941a15f","components/core/Logo.jsx":"80582eb0c518","components/core/WaveMark.jsx":"4547ff7c5425","components/feedback/Dialog.jsx":"a55781dd3ce7","components/feedback/Toast.jsx":"cd6f8683ec0c","components/forms/Field.jsx":"3466f8258b7d","components/forms/Input.jsx":"6f9e13aa9c30","components/forms/Textarea.jsx":"f8beeef33c2f","components/product/ColorwayPicker.jsx":"2cfb18a07aff","components/product/ColorwaySwatch.jsx":"e5a48c3ad8ed","components/product/ProductCard.jsx":"456de9a2de8f","components/product/SpecRow.jsx":"8b399f8f7f63","ui_kits/landing/Colorways.jsx":"fae27917c7fa","ui_kits/landing/FinalCta.jsx":"4549d75f9d6d","ui_kits/landing/Hero.jsx":"adc73691aa17","ui_kits/landing/Lifestyle.jsx":"a86bbf2266c2","ui_kits/landing/Nav.jsx":"7a3771726c2f","ui_kits/landing/Object.jsx":"65dc24496bf0","ui_kits/mobile/MobileApp.jsx":"577272d11257","ui_kits/mobile/ios-frame.jsx":"be3343be4b51"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SHADIEZDesignSystem_4d9f8a = window.SHADIEZDesignSystem_4d9f8a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SHADIEZ Badge — a small label for status, colorway names, "New" flags.
 * Square 4px by default (the house corner); set `pill` for a rounded chip.
 */
const TONES = {
  sand: {
    bg: "var(--surface-sand)",
    fg: "var(--ink)",
    bd: "var(--border)"
  },
  wood: {
    bg: "var(--wood-soft)",
    fg: "var(--wood-deep)",
    bd: "transparent"
  },
  navy: {
    bg: "var(--navy)",
    fg: "var(--cream)",
    bd: "transparent"
  },
  amber: {
    bg: "var(--amber)",
    fg: "#3A2A12",
    bd: "transparent"
  },
  ink: {
    bg: "var(--ink)",
    fg: "var(--cream)",
    bd: "transparent"
  },
  outline: {
    bg: "transparent",
    fg: "var(--ink)",
    bd: "var(--border-strong)"
  }
};
function Badge({
  children,
  tone = "sand",
  pill = false,
  uppercase = false,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.sand;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: uppercase ? "11px" : "12.5px",
      letterSpacing: uppercase ? "0.14em" : "0.01em",
      textTransform: uppercase ? "uppercase" : "none",
      lineHeight: 1,
      padding: "5px 10px",
      borderRadius: pill ? "var(--radius-pill)" : "var(--radius-sm)",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * SHADIEZ Button — the brand's two CTA systems in one primitive.
 *
 *   variant="primary"   solid navy, 4px corners      — the default on light surfaces (header, dialogs)
 *   variant="warm"      amber/sun PILL               — over imagery & bright fields ("Shop the Shade")
 *   variant="ink"       dark PILL                    — on bright amber sun-fields
 *   variant="secondary" warm sand, 4px               — quiet secondary action
 *   variant="ghost"     text-only, wood underline    — tertiary / nav-like
 *   variant="glass"     warm frosted glass           — CTAs sitting over beach footage
 *
 * Motion: springy hover lift + tactile press shrink, honoring reduced-motion.
 */
const RADIUS = {
  primary: "var(--radius-sm)",
  secondary: "var(--radius-sm)",
  ghost: "var(--radius-sm)",
  warm: "var(--radius-pill)",
  ink: "var(--radius-pill)",
  glass: "var(--radius-pill)"
};
const SIZES = {
  sm: {
    padding: "9px 18px",
    fontSize: "14px",
    height: 38
  },
  md: {
    padding: "13px 24px",
    fontSize: "15px",
    height: 46
  },
  lg: {
    padding: "16px 32px",
    fontSize: "16px",
    height: 54
  }
};
function base(variant) {
  switch (variant) {
    case "warm":
      return {
        background: "var(--cta-warm)",
        color: "var(--cta-warm-text)",
        boxShadow: "var(--shadow-warm)",
        border: "1.5px solid transparent"
      };
    case "ink":
      return {
        background: "var(--cta-ink)",
        color: "var(--cta-ink-text)",
        boxShadow: "0 12px 30px -12px rgba(35,32,28,.6)",
        border: "1.5px solid transparent"
      };
    case "secondary":
      return {
        background: "var(--surface-sand)",
        color: "var(--ink)",
        boxShadow: "none",
        border: "1px solid var(--border)"
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--ink)",
        boxShadow: "none",
        border: "1.5px solid transparent"
      };
    case "glass":
      return {
        background: "rgba(247,242,233,0.12)",
        color: "var(--cream)",
        border: "1px solid rgba(247,242,233,0.35)",
        backdropFilter: "blur(10px) saturate(1.5)",
        WebkitBackdropFilter: "blur(10px) saturate(1.5)",
        boxShadow: "inset 0 1px 1px rgba(255,250,242,0.5), 0 12px 34px -12px rgba(20,12,6,0.6)"
      };
    case "primary":
    default:
      return {
        background: "var(--cta)",
        color: "var(--cta-text)",
        boxShadow: "var(--shadow-cta)",
        border: "1.5px solid transparent"
      };
  }
}
function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const b = base(variant);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lift = !reduce && hover && !disabled ? press ? "translateY(0) scale(0.97)" : "translateY(-3px) scale(1.04)" : press && !disabled ? "scale(0.97)" : "none";
  const hoverShadow = hover && !disabled ? variant === "warm" ? "var(--shadow-warm-hover)" : variant === "primary" ? "0 14px 30px -8px rgba(31,58,95,.6)" : b.boxShadow : b.boxShadow;
  const ghostUnderline = variant === "ghost" && hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-body)",
      fontWeight: variant === "primary" ? 500 : 600,
      fontSize: s.fontSize,
      lineHeight: 1,
      padding: s.padding,
      borderRadius: RADIUS[variant],
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      whiteSpace: "nowrap",
      transform: lift,
      transition: "transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 250ms cubic-bezier(.22,1,.36,1), background 200ms, opacity 200ms",
      outline: "none",
      ...b,
      boxShadow: hoverShadow,
      background: variant === "primary" && hover && !disabled ? "color-mix(in srgb, var(--cta) 90%, black)" : b.background,
      ...(ghostUnderline ? {
        boxShadow: "inset 0 -1.5px 0 var(--amber)"
      } : null),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * SHADIEZ IconButton — round, icon-only action (dialog close, nav, social).
 * Pass any SVG / Lucide icon as children.
 */
const VARIANTS = {
  ghost: {
    bg: "transparent",
    fg: "var(--ink-60)",
    hoverBg: "rgba(35,32,28,0.06)",
    hoverFg: "var(--ink)"
  },
  solid: {
    bg: "var(--ink)",
    fg: "var(--cream)",
    hoverBg: "var(--wood-deep)",
    hoverFg: "var(--cream)"
  },
  cream: {
    bg: "var(--cream)",
    fg: "var(--ink)",
    hoverBg: "var(--sand)",
    hoverFg: "var(--ink)"
  }
};
const DIM = {
  sm: 32,
  md: 40,
  lg: 44
};
function IconButton({
  children,
  label,
  variant = "ghost",
  size = "md",
  round = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.ghost;
  const d = DIM[size] || DIM.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: d,
      height: d,
      borderRadius: round ? "999px" : "var(--radius-sm)",
      border: "none",
      cursor: "pointer",
      color: hover ? v.hoverFg : v.fg,
      background: hover ? v.hoverBg : v.bg,
      transition: "background 200ms, color 200ms",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/WaveMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SHADIEZ wave-mark — three stacked sea-lines that read as a stylized "Z"
 * (wind / shade / waves). Single-color, stroked, inherits `currentColor`.
 * Aspect 32:18 — set a height and let width auto.
 */
function WaveMark({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.4,
  style,
  ...rest
}) {
  const h = typeof size === "number" ? size : size;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 32 18",
    width: h / 18 * 32,
    height: h,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: "block",
      flexShrink: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M3 4c4-3 8 3 13 0s9 3 13 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 9c4-3 8 3 13 0s9 3 13 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 14c4-3 8 3 13 0s9 3 13 0"
  }));
}
Object.assign(__ds_scope, { WaveMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WaveMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The composed SHADIEZ lockup: wave-mark + wordmark + diamond accent.
 * Sizes off `fontSize`. Drop into a header at ~18px, a hero at ~32px.
 */
function Logo({
  size = 20,
  color = "currentColor",
  showMark = true,
  showAccent = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5em",
      lineHeight: 1,
      color,
      fontSize: size,
      ...style
    }
  }, rest), showMark && /*#__PURE__*/React.createElement(__ds_scope.WaveMark, {
    size: size * 0.9,
    color: color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: "0.22em",
      fontSize: "1em"
    }
  }, "SHADIEZ"), showAccent && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      marginLeft: "0.1em",
      width: "0.35em",
      height: "0.35em",
      transform: "rotate(45deg)",
      background: "currentColor",
      display: "inline-block"
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const {
  useEffect
} = React;
/**
 * SHADIEZ Dialog — the lead-dialog pattern. Warm ink overlay + blur, a cream
 * panel with the thin wood-tone brand bar, big soft shadow, and a ghost close.
 * Controlled: render with `open` and handle `onClose`.
 */
function CloseGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }));
}
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 440
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose && onClose();
    },
    style: {
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
      animation: "ds-fade 220ms cubic-bezier(.22,1,.36,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: `min(92vw, ${width}px)`,
      background: "var(--cream)",
      color: "var(--ink)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid rgba(35,32,28,0.10)",
      overflow: "hidden",
      animation: "ds-pop 280ms cubic-bezier(.22,1,.36,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      insetInline: 0,
      top: 0,
      height: "3px",
      background: "var(--wood-bar)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: () => onClose && onClose(),
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: "999px",
      cursor: "pointer",
      background: "transparent",
      color: "rgba(35,32,28,0.55)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "rgba(35,32,28,0.06)";
      e.currentTarget.style.color = "var(--ink)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "rgba(35,32,28,0.55)";
    }
  }, /*#__PURE__*/React.createElement(CloseGlyph, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "36px 28px 28px"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 300,
      fontSize: "28px",
      lineHeight: 1.1,
      letterSpacing: "0.01em",
      margin: 0
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      color: "rgba(35,32,28,0.65)",
      margin: "6px 0 0"
    }
  }, description), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: title || description ? "20px" : 0
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20px"
    }
  }, footer))), /*#__PURE__*/React.createElement("style", null, `
        @keyframes ds-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ds-pop { from { opacity: 0; transform: translateY(12px) scale(0.98) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { [role="dialog"], [role="dialog"] > div { animation: none !important } }
      `));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * SHADIEZ Toast — a calm, warm confirmation card. Presentational: render it
 * (e.g. inside a fixed container) and remove it on a timer in your app.
 */
const TONES = {
  default: {
    accent: "var(--wood)",
    icon: null
  },
  success: {
    accent: "var(--success)",
    glyph: "M20 6 9 17l-5-5"
  },
  error: {
    accent: "var(--error)",
    glyph: "M18 6 6 18M6 6l12 12"
  }
};
function Toast({
  tone = "default",
  title,
  message,
  onDismiss,
  style
}) {
  const t = TONES[tone] || TONES.default;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      insetBlock: 0,
      left: 0,
      width: "3px",
      background: t.accent
    }
  }), t.glyph && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 22,
      height: 22,
      borderRadius: "999px",
      flexShrink: 0,
      color: t.accent,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: t.glyph
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: "14px"
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      color: "var(--ink-60)",
      marginTop: title ? "2px" : 0
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onDismiss,
    style: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-60)",
      padding: 0,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "15",
    height: "15",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SHADIEZ Field — labeled form row matching the lead-dialog pattern:
 * uppercase tracked label, required asterisk (navy), optional hint, inline error.
 * Pass an <Input>/<Textarea> (or any control) as children.
 */
function Field({
  label,
  htmlFor,
  required = false,
  optional = false,
  error,
  hint,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      color: "var(--ink-60)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.25em",
      color: "var(--navy)"
    }
  }, "*")), optional && !error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "10px",
      letterSpacing: "0.04em",
      color: "rgba(35,32,28,0.4)"
    }
  }, "optional"), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "10px",
      color: "var(--error)"
    }
  }, error)), children, hint && !error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "11px",
      color: "var(--ink-60)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * SHADIEZ Input — 4px corners, warm hairline border, navy focus ring.
 * Use bare, or via <Field> for a labeled row.
 */
function Input({
  invalid = false,
  disabled = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
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
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/** SHADIEZ Textarea — same skin as Input, multi-line. */
function Textarea({
  invalid = false,
  disabled = false,
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
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
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/product/ColorwaySwatch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * SHADIEZ ColorwaySwatch — a single selectable canvas color. Round by default,
 * with a soft ring when selected. Use inside <ColorwayPicker> or standalone.
 */
function ColorwaySwatch({
  color,
  label,
  selected = false,
  size = 30,
  shape = "round",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "option",
    "aria-selected": selected,
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      padding: 0,
      cursor: "pointer",
      borderRadius: shape === "round" ? "999px" : "var(--radius-sm)",
      background: color,
      border: "1px solid rgba(35,32,28,0.18)",
      boxShadow: selected ? "0 0 0 2px var(--cream), 0 0 0 4px var(--ink)" : hover ? "0 0 0 2px var(--cream), 0 0 0 4px rgba(35,32,28,0.25)" : "inset 0 1px 2px rgba(0,0,0,0.12)",
      transform: selected || hover ? "scale(1.06)" : "scale(1)",
      transition: "transform 200ms cubic-bezier(.22,1,.36,1), box-shadow 200ms",
      outline: "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ColorwaySwatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ColorwaySwatch.jsx", error: String((e && e.message) || e) }); }

// components/product/ColorwayPicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SHADIEZ ColorwayPicker — the signature shop control. A row of canvas swatches
 * with the selected name shown above. Controlled: pass `value` (index) + onChange.
 *
 * The default `colorways` are the real SHADIEZ line; pass your own to override.
 */
const SHADIEZ_COLORWAYS = [{
  key: "Cream",
  dot: "var(--cw-cream)"
}, {
  key: "Coral",
  dot: "var(--cw-coral)"
}, {
  key: "Butter",
  dot: "var(--cw-butter)"
}, {
  key: "Dusty Blue",
  dot: "var(--cw-dusty-blue)"
}, {
  key: "Navy",
  dot: "var(--cw-navy)"
}, {
  key: "Burgundy",
  dot: "var(--cw-burgundy)"
}, {
  key: "Pinstripe",
  dot: "var(--cw-pinstripe)"
}];
function ColorwayPicker({
  colorways = SHADIEZ_COLORWAYS,
  value = 0,
  onChange,
  showName = true,
  swatchSize = 30,
  style,
  ...rest
}) {
  const active = colorways[value] || colorways[0];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      ...style
    }
  }, rest), showName && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "13px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--ink-60)"
    }
  }, active.key), /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    "aria-label": "Colorways",
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, colorways.map((c, i) => /*#__PURE__*/React.createElement(__ds_scope.ColorwaySwatch, {
    key: c.key,
    color: c.dot,
    label: c.key,
    size: swatchSize,
    selected: i === value,
    onClick: () => onChange && onChange(i, c)
  }))));
}
Object.assign(__ds_scope, { SHADIEZ_COLORWAYS, ColorwayPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ColorwayPicker.jsx", error: String((e && e.message) || e) }); }

// components/product/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * SHADIEZ ProductCard — a calm catalog card: full-bleed photo, optional
 * eyebrow, name, meta line, and footer (price / CTA). Near-square corners,
 * warm hairline border, soft lift on hover. Photography does the talking.
 */
function ProductCard({
  image,
  alt = "",
  eyebrow,
  name,
  meta,
  footer,
  ratio = "4 / 5",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      background: "var(--sand)",
      overflow: "hidden"
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: alt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transform: hover && interactive ? "scale(1.04)" : "scale(1)",
      transition: "transform 600ms cubic-bezier(.22,1,.36,1)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 18px",
      display: "flex",
      flexDirection: "column",
      gap: "4px"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--wood)"
    }
  }, eyebrow), name && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "18px",
      letterSpacing: "-0.01em",
      color: "var(--ink)"
    }
  }, name), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      color: "var(--ink-60)"
    }
  }, meta), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/product/SpecRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SHADIEZ SpecRow — the inline spec list with diamond/dot separators, e.g.
 * "Solid oak ◆ Canvas ◆ Folds flat". The brand's quiet way to list materials.
 */
function SpecRow({
  items = [],
  separator = "diamond",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      fontWeight: 500,
      letterSpacing: "0.02em",
      color: "var(--ink)",
      ...style
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", null, item), i < items.length - 1 && (separator === "diamond" ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "5px",
      height: "5px",
      transform: "rotate(45deg)",
      background: "var(--amber)",
      flexShrink: 0
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "16px",
      height: "1px",
      background: "var(--border-strong)",
      flexShrink: 0
    }
  })))));
}
Object.assign(__ds_scope, { SpecRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/SpecRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Colorways.jsx
try { (() => {
// SHADIEZ landing — THE SPECTRUM. The signature colorway selector: pick a
// canvas → the photo crossfades and the whole section floods to that exact hue.
(() => {
  const {
    Badge,
    ColorwayPicker,
    Button,
    SHADIEZ_COLORWAYS
  } = window.SHADIEZDesignSystem_4d9f8a;
  const CW = [{
    key: "Cream",
    photo: "../../assets/colorways/cw-cream.jpg",
    flood: "var(--cw-cream)"
  }, {
    key: "Coral",
    photo: "../../assets/colorways/cw-coral.jpg",
    flood: "var(--cw-coral)"
  }, {
    key: "Butter",
    photo: "../../assets/colorways/cw-butter.jpg",
    flood: "var(--cw-butter)"
  }, {
    key: "Dusty Blue",
    photo: "../../assets/colorways/cw-dusty-blue.jpg",
    flood: "var(--cw-dusty-blue)"
  }, {
    key: "Navy",
    photo: "../../assets/colorways/cw-navy-stripe.jpg",
    flood: "var(--cw-navy)"
  }, {
    key: "Burgundy",
    photo: "../../assets/colorways/cw-burgundy-stripe.jpg",
    flood: "var(--cw-burgundy)"
  }, {
    key: "Pinstripe",
    photo: "../../assets/colorways/cw-pinstripe.jpg",
    flood: "var(--cw-pinstripe)"
  }];
  const STORE = "shadiez-kit-colorway";
  function Colorways({
    onShop
  }) {
    const Reveal = window.Reveal;
    const [i, setI] = React.useState(() => {
      try {
        const s = localStorage.getItem(STORE);
        const n = CW.findIndex(c => c.key === s);
        return n >= 0 ? n : 0;
      } catch {
        return 0;
      }
    });
    const select = idx => {
      setI(idx);
      try {
        localStorage.setItem(STORE, CW[idx].key);
      } catch {}
    };
    const active = CW[i];
    return /*#__PURE__*/React.createElement("section", {
      id: "colorways",
      style: {
        position: "relative",
        padding: "clamp(80px,12vw,150px) 0",
        overflow: "hidden",
        transition: "background 700ms cubic-bezier(.22,1,.36,1)",
        background: `color-mix(in srgb, ${active.flood} 26%, var(--cream))`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 44
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "wood",
      uppercase: true
    }, "The spectrum"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(34px,4.6vw,62px)",
        lineHeight: 1.0,
        letterSpacing: "-0.025em",
        margin: "16px 0 0"
      }
    }, "Seven canvases. One is yours."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 48,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "16 / 11",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)"
      }
    }, CW.map((c, idx) => /*#__PURE__*/React.createElement("img", {
      key: c.key,
      src: c.photo,
      alt: `SHADIEZ shade — ${c.key}`,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: idx === i ? 1 : 0,
        transform: idx === i ? "scale(1)" : "scale(1.05)",
        transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 16,
        bottom: 14,
        color: "var(--cream)",
        fontFamily: "var(--font-serif)",
        fontWeight: 600,
        fontSize: 22,
        letterSpacing: ".01em",
        textShadow: "0 2px 14px rgba(0,0,0,.4)"
      }
    }, active.key))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.08
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(ColorwayPicker, {
      colorways: SHADIEZ_COLORWAYS,
      value: i,
      onChange: idx => select(idx),
      swatchSize: 34
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 16,
        lineHeight: 1.55,
        color: "var(--ink-60)",
        margin: 0,
        maxWidth: "34ch"
      }
    }, "Each canvas ships with its own matching tote \u2014 pick the one that's yours."), /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "lg",
      onClick: onShop,
      style: {
        alignSelf: "flex-start"
      }
    }, "Shop ", active.key))))));
  }
  window.Colorways = Colorways;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Colorways.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/FinalCta.jsx
try { (() => {
// SHADIEZ landing — FINAL CTA + footer. Bright amber sun-field finale that
// bookends the hero, then the footer.
(() => {
  const {
    Logo,
    Button,
    WaveMark
  } = window.SHADIEZDesignSystem_4d9f8a;
  function FinalCta({
    onShop
  }) {
    const Reveal = window.Reveal;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        background: "var(--amber)",
        overflow: "hidden",
        padding: "clamp(90px,13vw,170px) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(60% 50% at 50% 30%, rgba(255,233,180,.55), transparent 70%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(44px,8vw,108px)",
        lineHeight: 0.92,
        letterSpacing: "-0.035em",
        color: "var(--ink)",
        margin: 0
      }
    }, "Find your shade.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.1
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "lg",
      onClick: onShop
    }, "Shop the Shade"))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.16
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/product/lineup.png",
      alt: "The full SHADIEZ lineup \u2014 every colorway with its matching tote",
      style: {
        display: "block",
        width: "min(760px, 90%)",
        margin: "44px auto 0",
        filter: "drop-shadow(0 30px 50px rgba(60,40,20,.28))"
      }
    })))), /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "64px 0 40px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 40
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
      size: 20,
      color: "var(--cream)"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "rgba(251,247,240,.6)",
        margin: "14px 0 0",
        maxWidth: "26ch"
      }
    }, "Something New Under The Sun.")), [{
      h: "Shop",
      items: ["Colorways", "The shade", "Totes"]
    }, {
      h: "Help",
      items: ["Shipping", "Returns", "Warranty"]
    }, {
      h: "Brand",
      items: ["Craft", "Journal", "Contact"]
    }].map(col => /*#__PURE__*/React.createElement("div", {
      key: col.h
    }, /*#__PURE__*/React.createElement("h5", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 12,
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: "rgba(251,247,240,.55)",
        margin: "0 0 14px"
      }
    }, col.h), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 9
      }
    }, col.items.map(it => /*#__PURE__*/React.createElement("li", {
      key: it
    }, /*#__PURE__*/React.createElement("a", {
      href: "#top",
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 14,
        color: "rgba(251,247,240,.82)"
      },
      onMouseEnter: e => e.currentTarget.style.color = "var(--amber)",
      onMouseLeave: e => e.currentTarget.style.color = "rgba(251,247,240,.82)"
    }, it))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 48,
        paddingTop: 22,
        borderTop: "1px solid rgba(251,247,240,.14)",
        fontFamily: "var(--font-body)",
        fontSize: 12.5,
        color: "rgba(251,247,240,.55)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(WaveMark, {
      size: 16,
      color: "rgba(251,247,240,.55)"
    }), " \xA9 2026 SHADIEZ"), /*#__PURE__*/React.createElement("span", null, "Privacy \xB7 Terms")))));
  }
  window.FinalCta = FinalCta;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/FinalCta.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
// SHADIEZ landing — HERO. Full-bleed beach photo, oversized kinetic headline,
// amber CTA. The headline does the per-word masked rise on mount.
(() => {
  const {
    Button
  } = window.SHADIEZDesignSystem_4d9f8a;
  function KineticLine({
    text,
    delay
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        animation: `heroRise 1.4s cubic-bezier(.22,1,.36,1) ${delay}s both`
      }
    }, text));
  }
  function Hero({
    onShop
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: "top",
      className: "ds-grain",
      style: {
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/lifestyle/beach-recline.jpg",
      alt: "A SHADIEZ sun-shade on a bright beach",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        animation: "heroZoom 14s ease-out both"
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(35,32,28,.34) 0%, rgba(35,32,28,0) 30%, rgba(35,32,28,.1) 55%, rgba(35,32,28,.72) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px 72px",
        color: "var(--cream)"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(48px, 9vw, 128px)",
        lineHeight: 0.92,
        letterSpacing: "-0.035em",
        margin: 0,
        color: "var(--cream)",
        textShadow: "0 2px 40px rgba(35,32,28,.45)"
      }
    }, /*#__PURE__*/React.createElement(KineticLine, {
      text: "Something New",
      delay: 0.2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontStyle: "italic",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        animation: "heroRise 1.4s cubic-bezier(.22,1,.36,1) 0.42s both"
      }
    }, "Under The Sun"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 22,
        marginTop: 32,
        animation: "heroFade 1s ease-out 1.1s both"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "warm",
      size: "lg",
      onClick: onShop
    }, "Shop the Shade"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 15,
        letterSpacing: ".02em",
        opacity: .92
      }
    }, "Your shade. Anywhere."))), /*#__PURE__*/React.createElement("a", {
      href: "#shade",
      "aria-label": "Scroll",
      style: {
        position: "absolute",
        left: "50%",
        bottom: 26,
        transform: "translateX(-50%)",
        zIndex: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        width: 1,
        height: 46,
        background: "linear-gradient(var(--cream), transparent)",
        animation: "scrollCue 2.2s ease-in-out infinite"
      }
    })));
  }
  window.Hero = Hero;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Lifestyle.jsx
try { (() => {
// SHADIEZ landing — LIFESTYLE. A full-bleed golden-hour band, then the
// matching-tote trio ("Made for the long way home").
(() => {
  const {
    ProductCard,
    Button
  } = window.SHADIEZDesignSystem_4d9f8a;
  function Lifestyle() {
    const Reveal = window.Reveal;
    const kits = [{
      src: "../../assets/kits/kit-cream.jpg",
      k: "Cream"
    }, {
      src: "../../assets/kits/kit-blue.jpg",
      k: "Dusty Blue"
    }, {
      src: "../../assets/kits/kit-burgundy.jpg",
      k: "Burgundy"
    }];
    return /*#__PURE__*/React.createElement("section", {
      id: "details"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ds-grain",
      style: {
        position: "relative",
        height: "70vh",
        minHeight: 420,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/lifestyle/golden-hour.png",
      alt: "Two SHADIEZ shades on the beach at golden hour",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(35,32,28,.1) 0%, rgba(35,32,28,0) 40%, rgba(35,32,28,.55) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        maxWidth: 1280,
        width: "100%",
        margin: "0 auto",
        padding: "0 32px 56px"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(34px,5vw,72px)",
        lineHeight: 0.98,
        letterSpacing: "-0.025em",
        color: "var(--cream)",
        margin: 0,
        textShadow: "0 2px 30px rgba(35,32,28,.4)"
      }
    }, "Long afternoons,", /*#__PURE__*/React.createElement("br", null), "claimed."))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "clamp(72px,10vw,130px) 0",
        background: "var(--sand)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(28px,3.4vw,46px)",
        lineHeight: 1.0,
        letterSpacing: "-0.02em",
        textAlign: "center",
        margin: "0 0 44px"
      }
    }, "Made for the long way home.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 22
      }
    }, kits.map((x, idx) => /*#__PURE__*/React.createElement(Reveal, {
      key: x.k,
      delay: idx * 0.08
    }, /*#__PURE__*/React.createElement(ProductCard, {
      image: x.src,
      eyebrow: "Shade + tote",
      name: x.k,
      meta: "Matching canvas tote",
      ratio: "1 / 1"
    })))))));
  }
  window.Lifestyle = Lifestyle;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Lifestyle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Nav.jsx
try { (() => {
// SHADIEZ landing — frosted nav. Transparent over the hero, frosts in on scroll.
(() => {
  const {
    Logo,
    Button
  } = window.SHADIEZDesignSystem_4d9f8a;
  function Nav({
    onContact,
    scrolled
  }) {
    const links = ["Shade", "Colorways", "Details"];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 400ms, backdrop-filter 400ms, box-shadow 400ms, border-color 400ms",
        background: scrolled ? "rgba(251,247,240,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none"
      }
    }, /*#__PURE__*/React.createElement("nav", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px"
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#top",
      "aria-label": "SHADIEZ \u2014 home",
      style: {
        color: scrolled ? "var(--ink)" : "var(--cream)",
        transition: "color 400ms"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 19
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 30
      }
    }, /*#__PURE__*/React.createElement("ul", {
      style: {
        display: "flex",
        gap: 28,
        listStyle: "none",
        margin: 0,
        padding: 0
      }
    }, links.map(l => /*#__PURE__*/React.createElement("li", {
      key: l
    }, /*#__PURE__*/React.createElement("a", {
      href: "#" + l.toLowerCase(),
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 500,
        color: scrolled ? "var(--ink)" : "rgba(251,247,240,0.92)",
        transition: "color 400ms, opacity 200ms"
      },
      onMouseEnter: e => e.currentTarget.style.opacity = .7,
      onMouseLeave: e => e.currentTarget.style.opacity = 1
    }, l)))), scrolled ? /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: onContact
    }, "Contact us") : /*#__PURE__*/React.createElement(Button, {
      variant: "glass",
      size: "sm",
      onClick: onContact
    }, "Contact us"))));
  }
  window.Nav = Nav;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Object.jsx
try { (() => {
// SHADIEZ landing — THE OBJECT. Editorial split: words + a detail collage.
(() => {
  const {
    Badge,
    SpecRow,
    Button
  } = window.SHADIEZDesignSystem_4d9f8a;
  function Reveal({
    children,
    delay = 0,
    style
  }) {
    const ref = React.useRef(null);
    const [shown, setShown] = React.useState(false);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      }, {
        threshold: 0.2
      });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity 1.1s cubic-bezier(.22,1,.36,1) ${delay}s, transform 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style
      }
    }, children);
  }
  window.Reveal = Reveal;
  function ObjectSection({
    onShop
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: "shade",
      style: {
        padding: "clamp(80px,12vw,150px) 0",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "wood",
      uppercase: true
    }, "The object")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.08
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: "clamp(34px,4.4vw,60px)",
        lineHeight: 1.0,
        letterSpacing: "-0.025em",
        margin: "16px 0 0"
      }
    }, "Built like furniture.", /*#__PURE__*/React.createElement("br", null), "Carried like a bag.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.16
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 18,
        lineHeight: 1.55,
        color: "var(--ink-60)",
        maxWidth: "44ch",
        margin: "20px 0 0"
      }
    }, "A walnut frame and cream canvas that props up at an adjustable notch \u2014 shading your head and shoulders while you lie on your towel. You don't sit in it. It shades you.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.22,
      style: {
        marginTop: 26
      }
    }, /*#__PURE__*/React.createElement(SpecRow, {
      items: ["Solid walnut", "Cream canvas", "Folds flat"]
    })), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.3,
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "warm",
      size: "lg",
      onClick: onShop
    }, "Shop the Shade"))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 0.1
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 14,
        aspectRatio: "1 / 1"
      }
    }, /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        gridRow: "1 / 3",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/details/notch-pin.png",
      alt: "Brass pivot pin and notched recline detail",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })), /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/details/corner.png",
      alt: "Brass-screwed frame corner",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    })), /*#__PURE__*/React.createElement("figure", {
      style: {
        margin: 0,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/details/frame-joint.png",
      alt: "The folding frame joint and canvas",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      }
    }))))));
  }
  window.ObjectSection = ObjectSection;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Object.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/MobileApp.jsx
try { (() => {
// SHADIEZ — mobile shop, built to design/MOBILE_SPEC.md. Lives inside the iOS
// frame's scroll area. Sections diverge for phone: stacked showcase, lifestyle
// carousel, colorway chip row, details accordion, sticky bottom CTA + lead sheet.
(() => {
  const A = "../../assets";
  const COLORWAYS = [{
    key: "Cream",
    photo: A + "/colorways/cw-cream.jpg",
    dot: "var(--cw-cream)"
  }, {
    key: "Coral",
    photo: A + "/colorways/cw-coral.jpg",
    dot: "var(--cw-coral)"
  }, {
    key: "Butter",
    photo: A + "/colorways/cw-butter.jpg",
    dot: "var(--cw-butter)"
  }, {
    key: "Dusty Blue",
    photo: A + "/colorways/cw-dusty-blue.jpg",
    dot: "var(--cw-dusty-blue)"
  }, {
    key: "Navy",
    photo: A + "/colorways/cw-navy-stripe.jpg",
    dot: "var(--cw-navy)"
  }, {
    key: "Burgundy",
    photo: A + "/colorways/cw-burgundy-stripe.jpg",
    dot: "var(--cw-burgundy)"
  }, {
    key: "Pinstripe",
    photo: A + "/colorways/cw-pinstripe.jpg",
    dot: "var(--cw-pinstripe)"
  }];
  const LIFESTYLE = [A + "/lifestyle/beach-recline.jpg", A + "/lifestyle/golden-hour.png", A + "/lifestyle/beach-band.jpg", A + "/lifestyle/beach-dusk.jpg"];
  const DETAILS = [{
    t: "The notch",
    d: "Brass pins drop into carved notches — set your recline in seconds and it holds.",
    img: A + "/details/notch-pin.png"
  }, {
    t: "The canvas",
    d: "Heavyweight cream canvas, embroidered with the SHADIEZ mark. Soft, breathable, made for sun.",
    img: A + "/details/detail.jpg"
  }, {
    t: "The frame",
    d: "Solid walnut, folds flat to carry on your shoulder. Built like furniture.",
    img: A + "/details/frame-joint.png"
  }];
  function MobileApp() {
    const NS = window.SHADIEZDesignSystem_4d9f8a;
    const {
      Logo,
      Button,
      Badge,
      SpecRow
    } = NS;
    const [cw, setCw] = React.useState(0);
    const [openDetail, setOpenDetail] = React.useState(0);
    const [lead, setLead] = React.useState(false);
    const active = COLORWAYS[cw];
    const Section = ({
      children,
      style
    }) => /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "44px 22px",
        ...style
      }
    }, children);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "var(--cream)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: 76,
        fontFamily: "var(--font-body)",
        color: "var(--ink)"
      }
    }, /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        height: 520,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: A + "/lifestyle/beach-recline.jpg",
      alt: "A SHADIEZ sun-shade on a bright beach",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(35,32,28,.42) 0%, rgba(35,32,28,0) 26%, rgba(35,32,28,.05) 50%, rgba(35,32,28,.74) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        paddingTop: 58,
        display: "flex",
        justifyContent: "center",
        color: "var(--cream)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 17,
      color: "var(--cream)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        padding: "0 22px 30px",
        color: "var(--cream)"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 0.94,
        letterSpacing: "-0.03em",
        margin: 0,
        color: "var(--cream)",
        textShadow: "0 2px 30px rgba(35,32,28,.4)"
      }
    }, "Something New", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: "italic"
      }
    }, "Under The Sun")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14.5,
        opacity: .92,
        margin: "12px 0 18px"
      }
    }, "Your shade. Anywhere."), /*#__PURE__*/React.createElement(Button, {
      variant: "warm",
      size: "md",
      fullWidth: true,
      onClick: () => setLead(true)
    }, "Shop the Shade"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("img", {
      src: A + "/details/notch-pin.png",
      alt: "Brass pin and notched recline detail",
      style: {
        width: "100%",
        aspectRatio: "4/3",
        objectFit: "cover",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
        display: "block"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "wood",
      uppercase: true
    }, "The object"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 30,
        lineHeight: 1.0,
        letterSpacing: "-0.02em",
        margin: "12px 0 0"
      }
    }, "Built like furniture. Carried like a bag."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 15.5,
        lineHeight: 1.55,
        color: "var(--ink-60)",
        margin: "12px 0 18px"
      }
    }, "A walnut frame and cream canvas that props up at an adjustable notch \u2014 shading your head and shoulders while you lie on your towel."), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 11
      }
    }, ["Blocks the sun", "Adjustable recline angle", "Folds flat & travels", "Sets up in seconds"].map(s => /*#__PURE__*/React.createElement("li", {
      key: s,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        fontSize: 15.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        transform: "rotate(45deg)",
        background: "var(--amber)",
        flexShrink: 0
      }
    }), s))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 0 44px"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: "-0.02em",
        margin: "0 22px 16px"
      }
    }, "Long afternoons, claimed."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        padding: "0 22px",
        scrollbarWidth: "none"
      }
    }, LIFESTYLE.map((src, i) => /*#__PURE__*/React.createElement("img", {
      key: i,
      src: src,
      alt: "SHADIEZ in use on the beach",
      style: {
        scrollSnapAlign: "center",
        flex: "0 0 auto",
        width: 248,
        height: 320,
        objectFit: "cover",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        display: "block"
      }
    })))), /*#__PURE__*/React.createElement(Section, {
      style: {
        background: `color-mix(in srgb, ${active.dot} 26%, var(--cream))`,
        transition: "background 600ms cubic-bezier(.22,1,.36,1)"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "wood",
      uppercase: true
    }, "The spectrum"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 30,
        lineHeight: 1.0,
        letterSpacing: "-0.02em",
        margin: "12px 0 18px"
      }
    }, "Seven canvases. One is yours."), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%",
        aspectRatio: "16/12",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)"
      }
    }, COLORWAYS.map((c, i) => /*#__PURE__*/React.createElement("img", {
      key: c.key,
      src: c.photo,
      alt: `SHADIEZ — ${c.key}`,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: i === cw ? 1 : 0,
        transition: "opacity .6s cubic-bezier(.22,1,.36,1)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 14,
        bottom: 12,
        color: "var(--cream)",
        fontFamily: "var(--font-serif)",
        fontWeight: 600,
        fontSize: 19,
        textShadow: "0 2px 12px rgba(0,0,0,.4)"
      }
    }, active.key)), /*#__PURE__*/React.createElement("div", {
      role: "listbox",
      "aria-label": "Colorways",
      style: {
        display: "flex",
        gap: 9,
        overflowX: "auto",
        padding: "16px 0 2px",
        scrollbarWidth: "none"
      }
    }, COLORWAYS.map((c, i) => /*#__PURE__*/React.createElement("button", {
      key: c.key,
      role: "option",
      "aria-selected": i === cw,
      onClick: () => setCw(i),
      style: {
        flex: "0 0 auto",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 13px 8px 9px",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        background: i === cw ? "var(--ink)" : "var(--cream)",
        color: i === cw ? "var(--cream)" : "var(--ink)",
        border: `1px solid ${i === cw ? "var(--ink)" : "var(--border)"}`,
        fontFamily: "var(--font-body)",
        fontSize: 13.5,
        fontWeight: 600,
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "999px",
        background: c.dot,
        border: "1px solid rgba(35,32,28,.2)"
      }
    }), c.key))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "md",
      fullWidth: true,
      onClick: () => setLead(true)
    }, "Shop ", active.key))), /*#__PURE__*/React.createElement(Section, {
      style: {
        background: "var(--sand)"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "wood",
      uppercase: true
    }, "The craft"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: "-0.02em",
        margin: "12px 0 18px"
      }
    }, "In the details."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, DETAILS.map((d, i) => {
      const open = openDetail === i;
      return /*#__PURE__*/React.createElement("div", {
        key: d.t,
        style: {
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setOpenDetail(open ? -1 : i),
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 16.5,
          color: "var(--ink)",
          textAlign: "left"
        }
      }, d.t, /*#__PURE__*/React.createElement("span", {
        style: {
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform .3s",
          color: "var(--wood)",
          fontSize: 22,
          lineHeight: 1
        }
      }, "+")), /*#__PURE__*/React.createElement("div", {
        style: {
          maxHeight: open ? 320 : 0,
          overflow: "hidden",
          transition: "max-height .4s cubic-bezier(.22,1,.36,1)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "0 16px 16px"
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: d.img,
        alt: d.t,
        style: {
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderRadius: "var(--radius-sm)",
          display: "block",
          marginBottom: 12
        }
      }), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--ink-60)",
          margin: 0
        }
      }, d.d))));
    }))), /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        background: "var(--amber)",
        padding: "52px 22px 56px",
        textAlign: "center",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(60% 50% at 50% 24%, rgba(255,233,180,.55), transparent 70%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 0.94,
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        margin: "0 0 22px"
      }
    }, "Find your shade."), /*#__PURE__*/React.createElement(Button, {
      variant: "ink",
      size: "md",
      onClick: () => setLead(true)
    }, "Shop the Shade"), /*#__PURE__*/React.createElement("img", {
      src: A + "/product/lineup.png",
      alt: "The full SHADIEZ lineup",
      style: {
        width: "100%",
        margin: "32px auto 0",
        display: "block",
        filter: "drop-shadow(0 20px 36px rgba(60,40,20,.26))"
      }
    }))), /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "34px 22px 30px"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 18,
      color: "var(--cream)"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        color: "rgba(251,247,240,.6)",
        margin: "12px 0 18px"
      }
    }, "Something New Under The Sun."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px 20px",
        fontSize: 13.5,
        color: "rgba(251,247,240,.8)"
      }
    }, ["Colorways", "The shade", "Totes", "Shipping", "Returns", "Contact"].map(l => /*#__PURE__*/React.createElement("span", {
      key: l
    }, l))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11.5,
        color: "rgba(251,247,240,.5)",
        margin: "22px 0 0"
      }
    }, "\xA9 2026 SHADIEZ \xB7 Privacy \xB7 Terms"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 18px))",
        background: "rgba(251,247,240,.82)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        borderTop: "1px solid var(--border)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "warm",
      size: "md",
      fullWidth: true,
      onClick: () => setLead(true)
    }, "Shop the Shade \u2014 pick your color")), /*#__PURE__*/React.createElement(LeadSheet, {
      open: lead,
      onClose: () => setLead(false),
      NS: NS
    }));
  }
  function LeadSheet({
    open,
    onClose,
    NS
  }) {
    const {
      Field,
      Input,
      Button
    } = NS;
    const [sent, setSent] = React.useState(false);
    React.useEffect(() => {
      if (!open) {
        const t = setTimeout(() => setSent(false), 250);
        return () => clearTimeout(t);
      }
    }, [open]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 60,
        background: "rgba(35,32,28,.45)",
        backdropFilter: "blur(3px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .3s"
      }
    }), /*#__PURE__*/React.createElement("div", {
      role: "dialog",
      "aria-modal": "true",
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 61,
        background: "var(--cream)",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -20px 50px rgba(20,12,6,.4)",
        transform: open ? "translateY(0)" : "translateY(110%)",
        transition: "transform .42s cubic-bezier(.22,1,.36,1)",
        paddingBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: "var(--wood-bar)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0 2px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 4,
        borderRadius: 99,
        background: "rgba(35,32,28,.2)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px 22px 0"
      }
    }, sent ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "18px 0 8px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 99,
        background: "rgba(31,58,95,.1)",
        color: "var(--navy)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "22",
      height: "22",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }))), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 300,
        fontSize: 26,
        margin: 0
      }
    }, "Message sent."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: "var(--ink-60)",
        margin: "6px 0 0"
      }
    }, "We'll be in touch shortly.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 300,
        fontSize: 26,
        margin: 0
      }
    }, "Get in touch"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        color: "var(--ink-60)",
        margin: "4px 0 16px"
      }
    }, "Leave your details and we'll get back to you shortly."), /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 13
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name",
      htmlFor: "mn",
      required: true
    }, /*#__PURE__*/React.createElement(Input, {
      id: "mn"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Email",
      htmlFor: "me",
      required: true
    }, /*#__PURE__*/React.createElement(Input, {
      id: "me",
      type: "email"
    })), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      size: "md",
      fullWidth: true
    }, "Send message"))))));
  }
  window.MobileApp = MobileApp;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/MobileApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.WaveMark = __ds_scope.WaveMark;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.SHADIEZ_COLORWAYS = __ds_scope.SHADIEZ_COLORWAYS;

__ds_ns.ColorwayPicker = __ds_scope.ColorwayPicker;

__ds_ns.ColorwaySwatch = __ds_scope.ColorwaySwatch;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SpecRow = __ds_scope.SpecRow;

})();
