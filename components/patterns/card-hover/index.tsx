"use client";

// Card Hover — premium hover state with lift, tilt, and glow.
//
// Usage:
//   <CardHover>
//     <div className="p-6 bg-zinc-900 rounded-lg">
//       <h3>My card</h3>
//       <p>Content here</p>
//     </div>
//   </CardHover>

import { type ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type MotionStyle } from "framer-motion";

export interface CardHoverProps {
  children: ReactNode;
  lift?: number;
  tilt?: number;
  glow?: boolean;
  glowColor?: string;
  duration?: number;
  scale?: number;
  disabled?: boolean;
}

const springConfig = { stiffness: 300, damping: 30 };

export function CardHover({
  children,
  lift = 6,
  tilt = 4,
  glow = true,
  glowColor = "#7C7CFF",
  duration = 0.3,
  scale = 1,
  disabled = false,
}: CardHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    rawRotateX.set((mouseY / (rect.height / 2)) * tilt * -1);
    rawRotateY.set((mouseX / (rect.width / 2)) * tilt);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const glowShadow = glow
    ? `0 0 24px ${glowColor}40`
    : "0 0 0px transparent";

  const motionStyle: MotionStyle = {
    perspective: 1000,
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  };

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      animate={
        disabled
          ? { y: 0, scale: 1, boxShadow: "0 0 0px transparent" }
          : hovered
            ? { y: -lift, scale, boxShadow: glowShadow }
            : { y: 0, scale: 1, boxShadow: "0 0 0px transparent" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 30, duration }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
