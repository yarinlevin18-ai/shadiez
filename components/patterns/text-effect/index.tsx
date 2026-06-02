"use client";

// Text Effect — animate the text itself: typewriter, scramble/decode,
// character cascade, or an animated gradient sweep.
//
// Usage:
//   <TextEffect text="Ship it." effect="scramble" />

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type TextEffectKind =
  | "typewriter"
  | "scramble"
  | "cascade"
  | "gradient";

export interface TextEffectProps {
  text: string;
  effect?: TextEffectKind;
  /** Characters per second (typewriter / scramble) or cascade pace. */
  speed?: number;
  /** Replay the effect on a loop. */
  loop?: boolean;
  /** Show a blinking caret (typewriter). */
  cursor?: boolean;
  /** Delay before the effect starts, in seconds. */
  startDelay?: number;
  /** Gradient endpoints (gradient effect). */
  colorA?: string;
  colorB?: string;
  className?: string;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&";
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function Typewriter({
  text,
  speed,
  loop,
  cursor,
  startDelay,
  className,
}: Required<Pick<TextEffectProps, "text" | "speed" | "loop" | "cursor" | "startDelay">> & {
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setCount(i);
      if (i < text.length) {
        timer = setTimeout(step, 1000 / speed);
      } else if (loop) {
        timer = setTimeout(() => {
          i = 0;
          setCount(0);
          timer = setTimeout(step, 1000 / speed);
        }, 1400);
      }
    };
    timer = setTimeout(step, startDelay * 1000 + 1000 / speed);
    return () => clearTimeout(timer);
  }, [text, speed, loop, startDelay]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {cursor && (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block w-[2px] self-stretch bg-current align-middle"
          style={{ height: "1em" }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  );
}

function Scramble({
  text,
  speed,
  loop,
  startDelay,
  className,
}: Required<Pick<TextEffectProps, "text" | "speed" | "loop" | "startDelay">> & {
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    let raf: ReturnType<typeof setTimeout>;
    const settleEvery = Math.max(1, Math.round(60 / speed)); // frames per settled char
    const run = (start: number) => {
      const tick = () => {
        const settled = Math.floor((frame.current - start) / settleEvery);
        if (settled >= text.length) {
          setDisplay(text);
          if (loop) {
            raf = setTimeout(() => {
              frame.current += 1;
              run(frame.current);
            }, 1600);
          }
          return;
        }
        const out = text
          .split("")
          .map((ch, i) =>
            ch === " " ? " " : i < settled ? ch : randGlyph(),
          )
          .join("");
        setDisplay(out);
        frame.current += 1;
        raf = setTimeout(tick, 1000 / 30);
      };
      tick();
    };
    const startTimer = setTimeout(() => run(frame.current), startDelay * 1000);
    return () => {
      clearTimeout(raf);
      clearTimeout(startTimer);
    };
  }, [text, speed, loop, startDelay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden className="font-mono">
        {display}
      </span>
    </span>
  );
}

function Cascade({
  text,
  speed,
  loop,
  startDelay,
  className,
}: Required<Pick<TextEffectProps, "text" | "speed" | "loop" | "startDelay">> & {
  className?: string;
}) {
  const [cycle, setCycle] = useState(0);
  const stagger = Math.min(0.12, 1 / speed);
  const total = startDelay + text.length * stagger + 0.6;

  useEffect(() => {
    if (!loop) return;
    const id = setInterval(() => setCycle((c) => c + 1), (total + 1.2) * 1000);
    return () => clearInterval(id);
  }, [loop, total]);

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={`${cycle}-${i}`}
          aria-hidden
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: startDelay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Gradient({
  text,
  speed,
  loop,
  colorA,
  colorB,
  className,
}: Required<Pick<TextEffectProps, "text" | "speed" | "loop" | "colorA" | "colorB">> & {
  className?: string;
}) {
  const duration = Math.max(1.2, 6 / speed);
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(110deg, ${colorA} 20%, #ffffff 50%, ${colorB} 80%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      animate={{ backgroundPositionX: ["200%", "0%"] }}
      transition={{
        duration,
        repeat: loop ? Infinity : 0,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}

export function TextEffect({
  text,
  effect = "scramble",
  speed = 16,
  loop = false,
  cursor = true,
  startDelay = 0,
  colorA = "#7C7CFF",
  colorB = "#7C7CFF",
  className,
}: TextEffectProps) {
  if (effect === "typewriter")
    return (
      <Typewriter
        text={text}
        speed={speed}
        loop={loop}
        cursor={cursor}
        startDelay={startDelay}
        className={className}
      />
    );
  if (effect === "scramble")
    return (
      <Scramble
        text={text}
        speed={speed}
        loop={loop}
        startDelay={startDelay}
        className={className}
      />
    );
  if (effect === "cascade")
    return (
      <Cascade
        text={text}
        speed={speed}
        loop={loop}
        startDelay={startDelay}
        className={className}
      />
    );
  return (
    <Gradient
      text={text}
      speed={speed}
      loop={loop}
      colorA={colorA}
      colorB={colorB}
      className={className}
    />
  );
}
