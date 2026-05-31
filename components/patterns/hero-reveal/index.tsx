"use client";

// Hero Reveal — staggered fade-up on mount.
//
// Usage:
//   <HeroReveal>
//     <HeroRevealItem><Badge>New</Badge></HeroRevealItem>
//     <HeroRevealItem><h1>Big headline</h1></HeroRevealItem>
//     <HeroRevealItem><p>Subtitle</p></HeroRevealItem>
//     <HeroRevealItem><Button>Get started</Button></HeroRevealItem>
//   </HeroReveal>

import { type ReactNode, createContext, useContext, useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type Transition,
} from "framer-motion";

export interface HeroRevealProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  easing?: "spring" | "easeOut";
  // Soft preset — gentler tween for editorial / image-led sections. Wins over `easing`
  // and any default-valued numeric prop, but any prop the caller passes explicitly
  // still wins (so you can soften then override e.g. `distance={24}` if needed).
  soft?: boolean;
}

interface RevealConfig {
  distance: number;
  transition: Transition;
}

const RevealContext = createContext<RevealConfig>({
  distance: 24,
  transition: { type: "spring", damping: 24, mass: 0.8, stiffness: 200 },
});

export function HeroReveal(props: HeroRevealProps) {
  const { children, soft = false } = props;
  // Soft preset = gentler tween (longer duration, shorter travel, more stagger,
  // easeOut). Each prop the caller passes explicitly still wins.
  const stagger = props.stagger ?? (soft ? 0.12 : 0.08);
  const delay = props.delay ?? 0.1;
  const duration = props.duration ?? (soft ? 0.9 : 0.6);
  const distance = props.distance ?? (soft ? 16 : 24);
  const once = props.once ?? true;
  const easing = props.easing ?? (soft ? "easeOut" : "spring");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const transition: Transition =
    easing === "spring"
      ? { type: "spring", damping: 24, mass: 0.8, stiffness: 200 }
      : { type: "tween", ease: "easeOut", duration };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <RevealContext value={{ distance, transition }}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </RevealContext>
  );
}

export function HeroRevealItem({ children }: { children: ReactNode }) {
  const { distance, transition } = useContext(RevealContext);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition },
  };

  return <motion.div variants={itemVariants}>{children}</motion.div>;
}
