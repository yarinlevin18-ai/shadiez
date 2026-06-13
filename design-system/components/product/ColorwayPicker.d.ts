import * as React from "react";

export interface Colorway {
  /** Display name, e.g. "Coral". */
  key: string;
  /** Swatch color (a --cw-* token or any CSS color). */
  dot: string;
}

/**
 * Props for the signature SHADIEZ colorway selector.
 * @startingPoint section="Product" subtitle="The colorway shop selector" viewport="700x140"
 */
export interface ColorwayPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Defaults to the real SHADIEZ line (Cream → Pinstripe). */
  colorways?: Colorway[];
  /** Selected index (controlled). @default 0 */
  value?: number;
  /** Fired with (index, colorway) on select. */
  onChange?: (index: number, colorway: Colorway) => void;
  /** Show the selected colorway name above the row. @default true */
  showName?: boolean;
  /** Swatch diameter. @default 30 */
  swatchSize?: number;
}

/**
 * The signature SHADIEZ colorway selector — a row of canvas swatches.
 */
export function ColorwayPicker(props: ColorwayPickerProps): JSX.Element;
