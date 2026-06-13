import * as React from "react";

export interface ColorwaySwatchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Swatch fill (a colorway token, e.g. var(--cw-coral)). */
  color: string;
  /** Accessible name / tooltip (the colorway name). */
  label: string;
  /** Selected state — draws the ring. @default false */
  selected?: boolean;
  /** Diameter in px. @default 30 */
  size?: number;
  /** @default "round" */
  shape?: "round" | "square";
}

/** A single selectable canvas-color swatch. */
export function ColorwaySwatch(props: ColorwaySwatchProps): JSX.Element;
