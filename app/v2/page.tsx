"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useVelocity,
  useMotionTemplate,
} from "framer-motion";
import { useLeadDialog } from "@/components/lead-dialog";
import { SunMotes } from "./sun-motes";
import { SandDrift } from "./sand-drift";
import "./v2.css";

/* ───────────────────────────────────────────────────────────────────────────
   SHADIEZ — /v2 "Catch the Light"
   Premium, photo-led, low-copy. The editorial photo sections are the premium
   anchor; between them, full-viewport single-color SUN FIELDS (bold amber color
   blocks, drifting sun-motes, original monoline line-art, the product cut-out)
   are the sunny counterpoint. Every product image is the REAL exact model
   (branded walnut frame, brass pins, notched recline) from /public/v2/.
   ─────────────────────────────────────────────────────────────────────────── */

// Real per-colorway studio photos of the exact model + a bright "flood" hue used
// to wash the section when that color is selected. No tints, no approximations.
type Colorway = { key: string; photo: string; flood: string; dot: string };
const COLORS: Colorway[] = [
  { key: "Cream",     photo: "/v2/cw-cream.jpg",           flood: "#F3E9D2", dot: "#F1E6CB" },
  { key: "Coral",     photo: "/v2/cw-coral.jpg",           flood: "#E68A6B", dot: "#E08A6E" },
  { key: "Butter",    photo: "/v2/cw-butter.jpg",          flood: "#ECC74F", dot: "#EAC85C" },
  { key: "Dusty Blue",photo: "/v2/cw-dusty-blue.jpg",      flood: "#9DBAD0", dot: "#9FB9CE" },
  { key: "Navy",      photo: "/v2/cw-navy-stripe.jpg",     flood: "#2F517A", dot: "#284A74" },
  { key: "Burgundy",  photo: "/v2/cw-burgundy-stripe.jpg", flood: "#8E454C", dot: "#8E4A4A" },
  { key: "Pinstripe", photo: "/v2/cw-pinstripe.jpg",       flood: "#C9C2B4", dot: "#C7BEAF" },
];

const SPECTRUM_STORAGE_KEY = "shadiez-v2-colorway";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── motion primitives (kept from the studio idiom; honor reduced-motion) ── */
type RevealTag = "div" | "p" | "h1" | "h2" | "span";
function Reveal({
  as = "div", className, delay = 0, load = false, style, children,
}: { as?: RevealTag; className?: string; delay?: number; load?: boolean; style?: React.CSSProperties; children: ReactNode; }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  // One reveal recipe reused everywhere: rise + settle-scale + fade on a single
  // custom curve, so the whole page enters with the same calm rhythm.
  const initial = reduce ? false : { opacity: 0, y: 28, scale: 0.985 };
  const shown = { opacity: 1, y: 0, scale: 1 };
  const transition = { duration: 0.9, ease: EASE, delay };
  if (load) return <M className={className} style={style} initial={initial} animate={shown} transition={transition}>{children}</M>;
  return <M className={className} style={style} initial={initial} whileInView={shown} viewport={{ once: true, amount: 0.2 }} transition={transition}>{children}</M>;
}

// matchMedia hook — SSR-safe (false on first paint); used to soften parallax travel
// on phones so scroll stays smooth and never forces horizontal overflow.
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

function Parallax({ className, amount = 60, children }: { className?: string; amount?: number; children: ReactNode; }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const amt = isMobile ? amount * 0.5 : amount;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amt, amt]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return <motion.div ref={ref} className={className} style={{ y }}>{children}</motion.div>;
}

/* ── Top scroll-progress bar — a slim sun-colored line tracking page progress.
   Reads the shared Lenis scroll via Framer's useScroll, spring-smoothed so it
   glides rather than snaps. Reflects the user's own scroll, so it stays on under
   reduced motion. ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <motion.div className="v2-progress" style={{ scaleX }} aria-hidden />;
}

/* ── Per-word kinetic reveal for the oversized hero headline. Each word rises
   from a masked baseline; staggered. Static under reduced motion. ── */
function KineticLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className="kline">
      {words.map((word, i) => (
        <span className="kword" key={`${word}-${i}`}>
          <motion.span
            className="kword-in"
            initial={reduce ? false : { y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.0, ease: EASE, delay: delay + i * 0.09 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Brand mark — three sea-lines that flow endlessly. Each path is five
   wavelengths wide (x −16 → 64) and translates by exactly one wavelength (16
   user units) on a linear loop, so the drift is seamless. Lines move at different
   speeds and the middle one counter-flows, for an organic sea. Static under
   reduced motion. ── */
const wavePath = (y: number) =>
  `M-16 ${y}c5 -5 11 5 16 0s11 5 16 0s11 5 16 0s11 5 16 0s11 5 16 0`;

const WAVE_LINES = [
  { y: 14, stroke: "currentColor", dur: 5.5, from: 0, to: -16 },
  { y: 22, stroke: "var(--sun)", dur: 7, from: -16, to: 0 },
  { y: 30, stroke: "currentColor", dur: 6, from: 0, to: -16 },
];

function WaveMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      {WAVE_LINES.map((l, i) => (
        <motion.path
          key={i}
          d={wavePath(l.y)}
          stroke={l.stroke}
          strokeWidth="2.4"
          strokeLinecap="round"
          animate={reduce ? undefined : { x: [l.from, l.to] }}
          transition={reduce ? undefined : { duration: l.dur, ease: "linear", repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

/* ── Original monoline line-art for the sun fields (drawn here from scratch — not
   reproduced from any third-party source). Cream/white stroke, decorative. ── */
// Radiating sun: a ring + alternating ticks. Slowly rotates (CSS), paused under
// reduced motion via the `.sun-rays-spin` rule.
const SunRays = ({ className }: { className?: string }) => {
  const rays = Array.from({ length: 24 });
  // Round coordinates so SSR (Node) and client (V8) emit byte-identical strings —
  // unrounded Math.cos/sin diverge in the last FP digit and trip hydration.
  const r2dp = (n: number) => Math.round(n * 100) / 100;
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
      <g className="sun-rays-spin">
        {rays.map((_, i) => {
          const a = (i / rays.length) * Math.PI * 2;
          const r1 = i % 2 === 0 ? 70 : 74;
          const r2 = i % 2 === 0 ? 92 : 84;
          return (
            <line
              key={i}
              x1={r2dp(100 + Math.cos(a) * r1)}
              y1={r2dp(100 + Math.sin(a) * r1)}
              x2={r2dp(100 + Math.cos(a) * r2)}
              y2={r2dp(100 + Math.sin(a) * r2)}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

// A horizon wave, monoline (two offset passes).
// A horizon wave, monoline (two offset passes) — flows endlessly. The path runs one
// wavelength (240) wider on each side than the 600 viewBox, and each pass translates
// by exactly one wavelength on a linear loop, so the drift is seamless. The two
// passes run at different speeds and counter-directions for an organic sea.
// Static under reduced motion.
const WL_PATH =
  "c40-34 80-34 120 0s80 34 120 0s80-34 120 0s80 34 120 0s80-34 120 0s80 34 120 0s80-34 120 0s80 34 120 0s80-34 120 0";
const WL_LINES = [
  { y: 40, w: 2, op: 0.9, dur: 11, from: 0, to: -240 },
  { y: 56, w: 1.2, op: 0.4, dur: 15, from: -240, to: 0 },
];
const WaveLine = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <svg className={className} viewBox="0 0 600 80" fill="none" preserveAspectRatio="none" aria-hidden>
      {WL_LINES.map((l, i) => (
        <motion.path
          key={i}
          d={`M-240 ${l.y}${WL_PATH}`}
          stroke="currentColor"
          strokeWidth={l.w}
          strokeLinecap="round"
          opacity={l.op}
          animate={reduce ? undefined : { x: [l.from, l.to] }}
          transition={reduce ? undefined : { duration: l.dur, ease: "linear", repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

/* ── Reactive button — springy hover lift + tactile press. Honors reduced motion.
   (CSS owns the colour/shadow; motion owns the transform.) ── */
function Btn({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      whileHover={reduce ? undefined : { y: -2, scale: 1.035 }}
      whileTap={reduce ? undefined : { scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 24, mass: 0.6 }}
    >
      {children}
    </motion.button>
  );
}

/* ── Loading screen — a slow, deliberate "sunrise": a warm sun rises behind the
   flowing wave mark, the wordmark settles, a progress line fills, then the whole
   overlay lifts to reveal the page. Dismisses on window load but never before a
   generous minimum (so the beat reads) and never after a safety cap. Static +
   quick under reduced motion. ── */
const LOAD_MIN_MS = 2200;
const LOAD_MAX_MS = 6000;

function V2Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      setReady(true);
      const wait = Math.max(0, LOAD_MIN_MS - (performance.now() - start));
      window.setTimeout(() => setShow(false), wait);
    };
    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });
    const cap = window.setTimeout(dismiss, LOAD_MAX_MS);
    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(cap);
    };
  }, []);

  // Lock scroll + pin to top while the overlay is up.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="v2load"
          role="status"
          aria-label="Loading SHADIEZ"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -22 }}
          transition={{ duration: reduce ? 0.3 : 1.0, ease: EASE }}
        >
          <div className="v2load-bloom" aria-hidden />
          <div className="v2load-stage">
            <div className="v2load-scene">
              <motion.span
                className="v2load-sun"
                aria-hidden
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 2.0, ease: EASE, delay: 0.2 }}
              />
              <WaveMark className="v2load-mark" />
            </div>
            <motion.div
              className="v2load-word"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeOut", delay: 1.2 }}
            >
              SHADIEZ<i className="v2load-dot" aria-hidden />
            </motion.div>
            <span className="v2load-tag">Something new under the sun</span>
            <div className="v2load-bar">
              <motion.div
                className="v2load-fill"
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: reduce ? "100%" : ready ? "100%" : "88%" }}
                transition={reduce ? { duration: 0 } : { duration: ready ? 0.5 : 3.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── SUN FIELD — full-viewport single-color wash; the playful counterpoint to the
   editorial photography. Hosts the drifting sun-mote particle layer (scroll-
   parallaxed via <Parallax>, time-animated by the canvas, off under reduced
   motion). Content (oversized type / cut-out / monoline) is passed as children. ── */
function SunField({
  variant = "amber",
  motes = 1,
  className,
  children,
}: {
  variant?: "amber" | "gold";
  motes?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section className={`sunfield sunfield-${variant}${className ? ` ${className}` : ""}`}>
      <div className="sunfield-motes" aria-hidden>
        <Parallax className="motes-track" amount={70}>
          <SunMotes className="motes-canvas" density={motes} animate={!reduce} />
        </Parallax>
      </div>
      <div className="wrap sunfield-inner">{children}</div>
    </section>
  );
}

export default function V2() {
  const { openDialog } = useLeadDialog();
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // ── Living background ──────────────────────────────────────────────────────
  // A single fixed layer behind the whole page. Its linear gradient does two
  // things at once: (1) the colour stops are driven by scrollYProgress, so the
  // wash warms from bright morning paper at the top into deep golden sand at the
  // foot of the page — a continuous, linear colour journey; (2) CSS slowly drifts
  // the gradient's position (see .v2-bg-color), so the colour is always gently
  // fluid even at rest. Three stops are interpolated independently for depth.
  const bgA = useTransform(scrollYProgress, [0, 0.5, 1], ["#FBF6EC", "#F3E7CD", "#ECDDBC"]);
  const bgB = useTransform(scrollYProgress, [0, 0.5, 1], ["#F6EDD8", "#ECDCB9", "#E2D0A6"]);
  const bgC = useTransform(scrollYProgress, [0, 0.5, 1], ["#F1E4C8", "#E6D4AC", "#D9C597"]);
  const bgImage = useMotionTemplate`linear-gradient(165deg, ${bgA} 0%, ${bgB} 52%, ${bgC} 100%)`;

  // Live scroll velocity feeds the page-wide sand grains so they react to movement.
  const scrollVelocity = useVelocity(scrollY);
  const sandVelocity = useSpring(scrollVelocity, { stiffness: 200, damping: 40, mass: 0.6 });

  // Hero hand-off: as the hero scrolls away, its headline + CTA drift up and fade,
  // so leaving the first screen reads as a deliberate move, not an abrupt cut.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProg, [0, 1], [0, -110]);
  const heroFade = useTransform(heroProg, [0, 0.8], [1, 0]);

  // Persist the chosen colorway across visits.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SPECTRUM_STORAGE_KEY);
      if (saved !== null) {
        const i = COLORS.findIndex((col) => col.key === saved);
        if (i >= 0) setActive(i);
      }
    } catch {
      /* localStorage unavailable — keep the default */
    }
  }, []);

  const select = (i: number) => {
    setActive(i);
    try {
      window.localStorage.setItem(SPECTRUM_STORAGE_KEY, COLORS[i].key);
    } catch {
      /* ignore persistence failures */
    }
  };
  const c = COLORS[active];

  return (
    <div className="v2root">
      {/* LIVING BACKGROUND — fixed behind every section: a scroll-warmed, slowly
          drifting linear wash + a page-wide field of movement-reactive sand. */}
      <div className="v2-bg" aria-hidden>
        <motion.div className="v2-bg-color" style={reduce ? undefined : { backgroundImage: bgImage }} />
        <div className="v2-bg-flow" />
        <SandDrift className="v2-bg-sand" velocity={sandVelocity} animate={!reduce} />
      </div>

      <V2Loader />
      <ScrollProgress />
      <div className="v2-grain" />

      {/* HEADER — stripped chrome: mark left · centered wordmark · minimal menu right */}
      <header className={scrolled ? "scrolled" : undefined}>
        <div className="wrap bar">
          <a className="mark-link" href="#top" aria-label="SHADIEZ home"><WaveMark /></a>
          <a className="wordmark" href="#top">SHADIEZ</a>
          <nav className="links">
            <a href="#colors">Colors</a>
            <Btn className="btn btn-amber sm" onClick={openDialog}>Shop</Btn>
          </nav>
        </div>
      </header>

      {/* 1 · HERO — photo anchor + oversized kinetic headline */}
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-media"><Parallax className="media-track" amount={70}><Image src="/v2/beach-recline.jpg" alt="A SHADIEZ sun-shade on a bright beach" fill priority sizes="100vw" style={{ objectFit: "cover" }} /></Parallax></div>
        <SunRays className="hero-sun" />
        <motion.div className="hero-inner wrap" style={reduce ? undefined : { y: heroY, opacity: heroFade }}>
          <h1 className="hero-h1 hero-headline">
            <KineticLine text="Something New" delay={0.15} />
            <KineticLine text="Under The Sun" delay={0.34} />
          </h1>
          <Reveal className="hero-foot" load delay={0.75}>
            <Btn className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</Btn>
            <span className="hero-kicker">Your shade. Anywhere.</span>
          </Reveal>
        </motion.div>
        <a href="#object" className="scroll-cue" aria-label="Scroll"><span className="line" /></a>
      </section>

      {/* 2 · THE OBJECT */}
      <section className="object pad" id="object">
        <div className="wrap object-grid">
          <div className="object-words">
            <Reveal as="p" className="eyebrow">The object</Reveal>
            <Reveal as="h2" className="display" delay={0.08}>Built like furniture.<br />Carried like a bag.</Reveal>
            <Reveal className="spec-row" delay={0.16}>
              <span>Solid oak</span><i /><span>Canvas</span><i /><span>Folds flat</span>
            </Reveal>
            <Reveal className="cta-row" delay={0.24}>
              <Btn className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</Btn>
            </Reveal>
          </div>
          <Reveal className="object-collage" delay={0.1}>
            {/* Three real product details, all shot on sand — they blend straight
                into the page's sand wash. Overlapping cluster on desktop, tidy
                grid on mobile. */}
            <figure className="ocard ocard-a">
              <Image src="/v2/2.png" alt="Brass pivot pin and notched recline detail" fill sizes="(max-width:900px) 92vw, 420px" style={{ objectFit: "cover" }} />
            </figure>
            <figure className="ocard ocard-b">
              <Image src="/v2/17.png" alt="Brass-screwed frame corner, dusted with sand" fill sizes="(max-width:900px) 46vw, 260px" style={{ objectFit: "cover" }} />
            </figure>
            <figure className="ocard ocard-c">
              <Image src="/v2/10.png" alt="The folding frame joint and canvas on the sand" fill sizes="(max-width:900px) 46vw, 300px" style={{ objectFit: "cover" }} />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ☀ SUN FIELD A — the immersive centerpiece: colorway lineup + monoline sun */}
      <SunField variant="amber" motes={1.1} className="sunfield-stage">
        <div className="sf-stack">
          <Reveal as="p" className="sf-eyebrow">Something new</Reveal>
          <Reveal as="h2" className="sf-display display">Your own<br />patch of shade.</Reveal>
          <WaveLine className="sf-wave sf-wave-under" />
          <Reveal className="cta-row sf-cta" delay={0.18}>
            <Btn className="btn btn-ink lg" onClick={openDialog}>Shop the Shade</Btn>
          </Reveal>
        </div>
        <Reveal className="sf-object" delay={0.1}>
          <SunRays className="sf-sun" />
          <Parallax className="sf-cutout-wrap" amount={22}>
            <Image className="sf-cutout sf-cutout-colorways" src="/v2/colorways-shade.png" alt="The SHADIEZ sun-shade in three colorways — cream, coral and navy" width={2322} height={1206} sizes="(max-width:900px) 88vw, 620px" />
          </Parallax>
        </Reveal>
      </SunField>

      {/* 4 · THE SPECTRUM (colorways) */}
      <section className="spectrum pad" id="colors" style={{ "--flood": c.flood } as React.CSSProperties}>
        <div className="wrap">
          <div className="spectrum-head">
            <Reveal as="p" className="eyebrow">The spectrum</Reveal>
            <Reveal as="h2" className="display" delay={0.08}>Seven canvases.<br />One is yours.</Reveal>
          </div>
          <div className="spectrum-stage">
            <Reveal className="spectrum-photo">
              {COLORS.map((col, i) => (
                <Image key={col.key} src={col.photo} alt={`SHADIEZ shade — ${col.key}`} fill sizes="(max-width:900px) 92vw, 760px"
                  style={{ objectFit: "cover", opacity: i === active ? 1 : 0, transition: "opacity .6s var(--ease)" }} priority={i === 0} />
              ))}
              <span className="spectrum-name">{c.key}</span>
            </Reveal>
            <div className="swatches" role="listbox" aria-label="Colorways">
              {COLORS.map((col, i) => (
                <button key={col.key} type="button" role="option" aria-selected={i === active} aria-label={col.key}
                  className="swatch" style={{ background: col.dot }} onClick={() => select(i)} />
              ))}
            </div>
            <Reveal className="cta-row cta-center" delay={0.12}>
              <Btn className="btn btn-amber lg" onClick={openDialog}>Shop {c.key}</Btn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 · IN THE WILD */}
      <section className="wild">
        <div className="wild-band">
          <Parallax className="media-track wild-graded" amount={50}><Image src="/v2/8.png" alt="Two SHADIEZ shades on the beach at golden hour" fill sizes="100vw" style={{ objectFit: "cover" }} /></Parallax>
          <Reveal as="p" className="wild-line display">Long afternoons,<br />claimed.</Reveal>
        </div>
      </section>

      {/* ☀ SUN FIELD B — deep-golden, type-led counterpoint, now hosting the
          matching-tote lineup: headline → wave-under-title → the colorway photos,
          all riding above the drifting sun-mote + sun-ray animation. */}
      <SunField variant="gold" motes={0.85} className="sunfield-quote sunfield-kit">
        <span id="kit" className="sf-anchor" aria-hidden />
        <Reveal as="h2" className="sf-big display">Made for<br />the long way home.</Reveal>
        <WaveLine className="sf-wave sf-wave-under" />
        <div className="kit-row">
          {[
            { src: "/v2/kit-cream.jpg", k: "Cream" },
            { src: "/v2/kit-blue.jpg", k: "Dusty Blue" },
            { src: "/v2/kit-burgundy.jpg", k: "Burgundy" },
          ].map((x, i) => (
            <Reveal className="kit-card" key={x.k} delay={i * 0.08}>
              <Image src={x.src} alt={`SHADIEZ ${x.k} shade and matching tote`} width={1024} height={1024} sizes="(max-width:900px) 90vw, 380px" />
              <span>{x.k}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="cta-row sf-cta" delay={0.14}>
          <Btn className="btn btn-ink lg" onClick={openDialog}>Shop the Shade</Btn>
        </Reveal>
        <SunRays className="sf-sun sf-sun-corner" />
      </SunField>

      {/* 9 · CLOSE — amber sun-field finale, bookending the hero */}
      <SunField variant="amber" motes={1.2} className="close-field">
        <span id="buy" className="sf-anchor" aria-hidden />
        <SunRays className="sf-sun sf-sun-behind" />
        <div className="close-stack">
          <Reveal as="h2" className="sf-display display">Find your shade.</Reveal>
          <Reveal delay={0.1}><Btn className="btn btn-ink lg" onClick={openDialog}>Shop the Shade</Btn></Reveal>
        </div>
        <Parallax className="sf-cutout-wrap" amount={20}>
          <Image className="close-shot" src="/v2/4 1.png" alt="The full SHADIEZ lineup — every colorway with its matching tote" width={1600} height={1463} sizes="(max-width:900px) 90vw, 720px" />
        </Parallax>
        <WaveLine className="sf-wave" />
      </SunField>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot-grid">
          <div>
            <div className="logo"><WaveMark /> SHADIEZ</div>
            <p className="bl">Something new under the sun.</p>
          </div>
          <div><h5>Shop</h5><ul><li><a href="#colors">Colorways</a></li><li><a href="#object">The shade</a></li><li><a href="#kit">Totes</a></li></ul></div>
          <div><h5>Help</h5><ul><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">Warranty</a></li></ul></div>
          <div><h5>Brand</h5><ul><li><a href="#object">Craft</a></li><li><a href="#">Journal</a></li><li><a href="#">Contact</a></li></ul></div>
        </div>
        <div className="wrap foot-bot"><span>© 2026 SHADIEZ</span><span>Privacy · Terms</span></div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="mobile-cta"><Btn className="btn btn-amber" onClick={openDialog}>Shop the Shade — pick your color</Btn></div>
    </div>
  );
}
