import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name (required — there's no visible text). */
  label: string;
  /** @default "ghost" */
  variant?: "ghost" | "solid" | "cream";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Round (default) or 4px square. @default true */
  round?: boolean;
  /** The icon, e.g. a Lucide SVG. */
  children?: React.ReactNode;
}

/** Round icon-only button for close / nav / social actions. */
export function IconButton(props: IconButtonProps): JSX.Element;
