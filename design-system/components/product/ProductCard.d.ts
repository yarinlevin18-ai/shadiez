import * as React from "react";

/**
 * Props for the photography-led catalog card.
 * @startingPoint section="Product" subtitle="Photography-led catalog card" viewport="380x520"
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image src (use real product photography). */
  image?: string;
  /** Alt text. */
  alt?: string;
  /** Small uppercase wood-tone kicker above the name. */
  eyebrow?: string;
  /** Product name (display font). */
  name?: string;
  /** Secondary meta line (e.g. "Walnut + cream canvas"). */
  meta?: string;
  /** Footer slot — price, CTA, or colorway picker. */
  footer?: React.ReactNode;
  /** CSS aspect-ratio for the image. @default "4 / 5" */
  ratio?: string;
  /** Makes the card interactive (pointer + hover lift + image zoom). */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * A calm, photography-led catalog card.
 */
export function ProductCard(props: ProductCardProps): JSX.Element;
