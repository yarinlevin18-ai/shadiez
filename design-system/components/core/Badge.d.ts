import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color treatment. @default "sand" */
  tone?: "sand" | "wood" | "navy" | "amber" | "ink" | "outline";
  /** Fully rounded chip instead of the 4px house corner. @default false */
  pill?: boolean;
  /** Uppercase, tracked, smaller — for eyebrow-style tags. @default false */
  uppercase?: boolean;
  children?: React.ReactNode;
}

/** A compact label for status, colorway names, or "New" flags. */
export function Badge(props: BadgeProps): JSX.Element;
