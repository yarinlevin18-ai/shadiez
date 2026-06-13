import * as React from "react";

/**
 * Props for the SHADIEZ lead-capture modal.
 * @startingPoint section="Feedback" subtitle="Lead-capture modal with wood bar" viewport="700x460"
 */
export interface DialogProps {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called on overlay click, close button, or Escape. */
  onClose?: () => void;
  /** Serif title (Fraunces light). */
  title?: string;
  /** Supporting line under the title. */
  description?: string;
  /** Body content — usually a form. */
  children?: React.ReactNode;
  /** Footer area (e.g. submit button). */
  footer?: React.ReactNode;
  /** Max panel width in px. @default 440 */
  width?: number;
}

/**
 * Modal dialog in the SHADIEZ lead-capture style.
 */
export function Dialog(props: DialogProps): JSX.Element | null;
