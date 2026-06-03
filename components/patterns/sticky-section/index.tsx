"use client";

// Sticky Section — pin a section to the viewport while you scroll past it,
// and let scroll progress drive a stepped reveal (visual stays, text swaps).
//
// Usage:
//   <StickySection>
//     <StickyVisual>
//       <img src="/feature.png" alt="" />
//     </StickyVisual>
//     <StickyStep index={0}>
//       <h2>First step</h2>
//       <p>Description here</p>
//     </StickyStep>
//     <StickyStep index={1}>...</StickyStep>
//     <StickyStep index={2}>...</StickyStep>
//   </StickySection>

import {
  Children,
  type ReactNode,
  type RefObject,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface StickySectionProps {
  children: ReactNode;
  /** Vertical space per step, as a viewport multiple. 1 = one screen per step. */
  stepHeight?: number;
  /** Side of the layout the text steps sit on. */
  textSide?: "left" | "right";
  /** Cross-fade overlap between steps (0-0.4). Higher = softer transitions. */
  fadeOverlap?: number;
  /** Scroll container for the section. Defaults to window. */
  scrollRoot?: RefObject<HTMLElement | null>;
}

interface StickyContext {
  progress: MotionValue<number>;
  stepCount: number;
  fadeOverlap: number;
}

const StickySectionContext = createContext<StickyContext | null>(null);

function useStickyContext() {
  const ctx = useContext(StickySectionContext);
  if (!ctx) {
    throw new Error(
      "StickyVisual and StickyStep must be used inside <StickySection>",
    );
  }
  return ctx;
}

/**
 * Read the section's scroll progress (0..1) and the currently active step.
 * Use inside a `<StickyVisual>` to drive visuals that respond to step changes.
 */
export function useStickyProgress() {
  const { progress, stepCount } = useStickyContext();
  const activeStep = useTransform(progress, (p) => {
    const idx = Math.floor(p * stepCount);
    return Math.min(stepCount - 1, Math.max(0, idx));
  });
  return { progress, activeStep, stepCount };
}

function countSteps(children: ReactNode): number {
  let count = 0;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === StickyStep) count += 1;
  });
  return count;
}

export function StickySection({
  children,
  stepHeight = 1,
  textSide = "right",
  fadeOverlap = 0.25,
  scrollRoot,
}: StickySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stepCount = useMemo(() => Math.max(1, countSteps(children)), [children]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    container: scrollRoot,
  });

  const ctxValue = useMemo<StickyContext>(
    () => ({ progress: scrollYProgress, stepCount, fadeOverlap }),
    [scrollYProgress, stepCount, fadeOverlap],
  );

  // Outer wrapper has total height of stepCount * stepHeight * 100vh.
  // The inner sticky block pins to 100vh.
  const totalHeight = `${stepCount * stepHeight * 100}vh`;

  return (
    <StickySectionContext value={ctxValue}>
      <div ref={ref} style={{ position: "relative", height: totalHeight }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "3rem",
            direction: textSide === "left" ? "rtl" : "ltr",
          }}
        >
          {/* Reset writing direction inside cells so RTL trick doesn't flip text */}
          <div style={{ direction: "ltr", position: "relative" }}>
            {pickSlot(children, StickyVisual)}
          </div>
          <div style={{ direction: "ltr", position: "relative" }}>
            {pickSlot(children, StickyStep)}
          </div>
        </div>
      </div>
    </StickySectionContext>
  );
}

function pickSlot(children: ReactNode, target: unknown): ReactNode[] {
  const out: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === target) out.push(child);
  });
  return out;
}

export function StickyVisual({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {children}
    </div>
  );
}

export interface StickyStepProps {
  index: number;
  children: ReactNode;
}

export function StickyStep({ index, children }: StickyStepProps) {
  const { progress, stepCount, fadeOverlap } = useStickyContext();

  // Each step owns a 1/stepCount slice of the scroll. We map step progress
  // to opacity (and a small y) with a configurable cross-fade overlap.
  const start = index / stepCount;
  const end = (index + 1) / stepCount;
  const fade = Math.max(0.01, fadeOverlap) / stepCount;

  const opacity = useTransform(
    progress,
    [start - fade, start + fade, end - fade, end + fade],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [start - fade, start + fade, end - fade, end + fade],
    [20, 0, 0, -20],
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </motion.div>
  );
}
