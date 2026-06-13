import * as React from "react";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The field label (uppercase, tracked). */
  label: string;
  /** `htmlFor` linking the label to the control id. */
  htmlFor?: string;
  /** Show the required asterisk. @default false */
  required?: boolean;
  /** Show the "optional" hint on the right. @default false */
  optional?: boolean;
  /** Inline error message (replaces the optional hint, reddens the row). */
  error?: string;
  /** Helper text below the control. */
  hint?: string;
  /** The form control — usually an <Input> or <Textarea>. */
  children?: React.ReactNode;
}

/** A labeled form row matching the SHADIEZ lead-dialog pattern. */
export function Field(props: FieldProps): JSX.Element;
