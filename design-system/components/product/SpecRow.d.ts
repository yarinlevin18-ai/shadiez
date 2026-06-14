import * as React from "react";

export interface SpecRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spec labels, e.g. ["Solid walnut", "Canvas", "Folds flat"]. */
  items: string[];
  /** Separator glyph between items. @default "diamond" */
  separator?: "diamond" | "rule";
}

/** Inline material/feature spec list with brand separators. */
export function SpecRow(props: SpecRowProps): JSX.Element;
