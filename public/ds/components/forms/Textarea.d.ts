import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show the error border + ring. @default false */
  invalid?: boolean;
}

/** Multi-line text input, sharing the Input skin. */
export function Textarea(props: TextareaProps): JSX.Element;
