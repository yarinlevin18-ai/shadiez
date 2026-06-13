import * as React from "react";

export interface ToastProps {
  /** Accent + glyph. @default "default" */
  tone?: "default" | "success" | "error";
  /** Bold first line. */
  title?: string;
  /** Secondary line. */
  message?: string;
  /** Show a dismiss button and handle the click. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/** A warm confirmation/notification card (presentational). */
export function Toast(props: ToastProps): JSX.Element;
