import * as React from "react";

export interface WaveMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Mark height in px. Width follows the 32:18 aspect. @default 20 */
  size?: number;
  /** Stroke color (defaults to currentColor so it inherits text color). */
  color?: string;
  /** Stroke weight. @default 1.4 */
  strokeWidth?: number;
}

/** The SHADIEZ brand wave-mark (icon only, no wordmark). */
export function WaveMark(props: WaveMarkProps): JSX.Element;
