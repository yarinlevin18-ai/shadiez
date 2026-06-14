import * as React from "react";

/**
 * Props for the full SHADIEZ logo lockup.
 * @startingPoint section="Brand" subtitle="Wave-mark + wordmark lockup" viewport="700x160"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Wordmark font-size (px); the mark + accent scale to it. @default 20 */
  size?: number;
  /** Color for mark, wordmark and accent. @default "currentColor" */
  color?: string;
  /** Show the wave-mark icon. @default true */
  showMark?: boolean;
  /** Show the diamond accent after the wordmark. @default true */
  showAccent?: boolean;
}

/**
 * The full SHADIEZ logo lockup (wave-mark + wordmark + diamond).
 */
export function Logo(props: LogoProps): JSX.Element;
