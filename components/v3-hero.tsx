"use client";

/* ───────────────────────────────────────────────────────────────────────────
   V3Hero — full-bleed cinematic hero built on the generated golden-hour shot
   (the real SHADIEZ shade on the beach). Photographic scene + overlaid copy:
   headline mask-reveal, amber CTA, ken-burns + parallax, warm bottom scrim for
   legibility. prefers-reduced-motion → static.
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
const HERO = "/landing/hero-gen-1-web.jpg";
const DISPLAY = "var(--font-fraunces)"; // brand display = Schibsted Grotesk
const HEADLINE = ["Something New", "Under The Sun"];

export function V3Hero({ play = true, onCta }: { play?: boolean; onCta?: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const shown = play || !!reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line: Variants = {
    hidden: { y: "120%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 1.2, ease: EASE, delay: 0.2 + i * 0.12 } }),
  };

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-cream">
      {/* full-bleed hero photo — ken-burns + parallax */}
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: imgY }}>
        <motion.div
          className="absolute inset-0"
          style={reduce ? { transform: "scale(1.06)" } : { scale: imgScale }}
        >
          <Image
            src={HERO}
            alt="A SHADIEZ portable beach sun-shade on golden sand at golden hour, sea behind"
            fill
            priority
            quality={88}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 42%" }}
          />
        </motion.div>
      </motion.div>

      {/* warm bottom scrim for copy legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(32,22,10,0.62) 0%, rgba(32,22,10,0.18) 30%, rgba(32,22,10,0) 56%)",
        }}
      />

      {/* copy — bottom-left, aligned to page width */}
      <motion.div
        className="absolute inset-x-0 bottom-[12%] z-10 px-6 md:px-12 lg:px-16"
        style={reduce ? undefined : { y: copyY, opacity: copyFade }}
      >
        <div className="mx-auto max-w-7xl">
          <h1
            className="font-bold leading-[0.95] tracking-[-0.025em] text-cream"
            style={{ fontFamily: DISPLAY, fontSize: "clamp(2.6rem, 7vw, 6rem)", textShadow: "0 2px 30px rgba(18,12,4,0.5)" }}
          >
            {HEADLINE.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={i === 1 ? "block italic text-butter" : "block"}
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

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-5"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
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
            <span className="text-sm font-medium tracking-wide text-cream/85">Your shade. Anywhere.</span>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#shade"
        aria-label="Scroll to explore"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.span
          className="block h-9 w-px bg-cream/60"
          animate={reduce ? undefined : { scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={reduce ? undefined : { duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.a>
    </section>
  );
}
