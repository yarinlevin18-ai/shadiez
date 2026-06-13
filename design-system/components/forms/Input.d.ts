import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Show the error border + ring. @default false */
  invalid?: boolean;
}

/** Single-line text input. 4px corners, warm hairline border, navy focus ring. */
export function Input(props: InputProps): JSX.Element;
