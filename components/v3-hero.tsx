"use client";

/* ───────────────────────────────────────────────────────────────────────────
   V3Hero — product-forward hero.
   The real SHADIEZ shade (transparent cutout) floats over the warm "Bright
   Coast" beach, in front of the headline (depth). Entrance rises + settles,
   then a slow continuous float with a breathing cast shadow; background
   ken-burns + parallax on scroll; a warm sun-bloom pulses top-right.
   prefers-reduced-motion → everything static.
   ─────────────────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const BEACH = "/landing/lifestyle/hero-beach-web.jpg";
const SHADE = "/landing/product/shade-cutout.png";
const DISPLAY = "var(--font-fraunces)"; // brand display = Schibsted Grotesk

const HEADLINE = ["Something New", "Under The Sun"];

export function V3Hero({ play = true, onCta }: { play?: boolean; onCta?: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const shown = play || !!reduce;

  // scroll-linked parallax across the hero's own travel
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const shadeY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line: Variants = {
    hidden: { y: "120%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 1.2, ease: EASE, delay: 0.2 + i * 0.12 } }),
  };

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-cream">
      {/* BACKGROUND — warm beach, ken-burns + parallax drift */}
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: bgY }}>
        <motion.div
          className="absolute inset-0"
          style={reduce ? { transform: "scale(1.08)" } : { scale: bgScale }}
        >
          <Image
            src={BEACH}
            alt=""
            aria-hidden
            fill
            priority
            quality={88}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 56%" }}
          />
        </motion.div>
      </motion.div>

      {/* ATMOSPHERE — top scrim (nav legibility), sun bloom, bottom fade into cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,247,240,0.82) 0%, rgba(251,247,240,0) 24%, rgba(251,247,240,0) 60%, rgba(251,247,240,0.55) 85%, var(--cream) 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-[1]"
        style={{
          top: "-14%",
          right: "-8%",
          width: "62vw",
          height: "62vw",
          background:
            "radial-gradient(circle, rgba(232,160,74,0.40) 0%, rgba(232,160,74,0.12) 40%, transparent 68%)",
        }}
        animate={reduce ? undefined : { opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
        transition={reduce ? undefined : { duration: 9, ease: "easeInOut", repeat: Infinity }}
      />

      {/* HEADLINE — behind the product (z-10), mask-line reveal */}
      <motion.div
        className="absolute inset-x-0 top-[14%] z-10 px-6 text-center"
        style={reduce ? undefined : { y: copyY, opacity: copyFade }}
      >
        <h1
          className="mx-auto max-w-[16ch] font-bold leading-[0.92] tracking-[-0.025em] text-ink"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 8.2vw, 6.5rem)", textShadow: "0 2px 26px rgba(251,247,240,0.65)" }}
        >
          {HEADLINE.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={i === 1 ? "block italic text-wood" : "block"}
                custom={i}
                variants={line}
                initial={reduce ? false : "hidden"}
                animate={shown ? "show" : "hidden"}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* PRODUCT — floating shade, in front of the headline (z-20) */}
      <motion.div
        className="absolute inset-x-0 bottom-[13%] z-20 flex justify-center"
        style={reduce ? undefined : { y: shadeY }}
      >
        <div className="relative" style={{ width: "clamp(260px, 39vw, 540px)" }}>
          {/* breathing cast shadow */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: "-7%",
              width: "76%",
              height: "10%",
              background:
                "radial-gradient(ellipse, rgba(35,32,28,0.32) 0%, rgba(35,32,28,0.10) 55%, transparent 76%)",
              filter: "blur(9px)",
            }}
            animate={reduce ? undefined : { scaleX: [1, 0.9, 1], opacity: [0.85, 0.65, 0.85] }}
            transition={reduce ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
          {/* entrance wrapper */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 64, scale: 0.86, rotate: -4 }}
            animate={
              shown
                ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                : { opacity: 0, y: 64, scale: 0.86, rotate: -4 }
            }
            transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
          >
            {/* continuous float */}
            <motion.div
              animate={reduce ? undefined : { y: [0, -16, 0], rotate: [0, 0.8, 0] }}
              transition={reduce ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              <Image
                src={SHADE}
                alt="The SHADIEZ portable beach sun-shade — solid walnut frame, cream canvas"
                width={640}
                height={660}
                priority
                className="h-auto w-full drop-shadow-[0_34px_42px_rgba(35,32,28,0.24)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA + aside */}
      <motion.div
        className="absolute inset-x-0 bottom-[6.5%] z-30 flex flex-col items-center gap-3 px-6"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
      >
        <motion.button
          type="button"
          onClick={onCta}
          className="rounded-full bg-amber px-9 py-4 text-base font-semibold text-ink shadow-[0_10px_30px_rgba(232,160,74,0.45)]"
          whileHover={reduce ? undefined : { y: -3, scale: 1.05, boxShadow: "0 16px 42px rgba(232,160,74,0.62)" }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
        >
          Shop the Shade
        </motion.button>
        <span className="text-sm font-medium tracking-wide text-ink/70">Your shade. Anywhere.</span>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#shade"
        aria-label="Scroll to explore"
        className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.span
          className="block h-9 w-px bg-ink/40"
          animate={reduce ? undefined : { scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={reduce ? undefined : { duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.a>
    </section>
  );
}
