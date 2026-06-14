import * as React from "react";

/**
 * Props for the SHADIEZ button.
 * @startingPoint section="Core" subtitle="Navy + amber-pill CTA systems" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual system. `primary` = solid navy (default on light); `warm` = amber pill over imagery; `ink` = dark pill on amber fields. */
  variant?: "primary" | "warm" | "ink" | "secondary" | "ghost" | "glass";
  /** Padding / type scale. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Element rendered before the label (e.g. a Lucide icon). */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label. */
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * The SHADIEZ button. Springy hover lift + tactile press, reduced-motion aware.
 */
export function Button(props: ButtonProps): JSX.Element;
