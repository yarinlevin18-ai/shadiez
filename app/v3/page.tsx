"use client";

/* ───────────────────────────────────────────────────────────────────────────
   SHADIEZ — /v3  ·  "Something New Under The Sun"  (directional-panel build)
   NOT a template page. A sequence of full-screen panels that move in real
   directions as you scroll — copy and product slide in from right / up / down,
   one beat at a time. A few words per panel; the product does the talking.
   No rounded photo-cards — everything is full-bleed. The 3D shade is blended
   into the warm light (fog + haze + grain), not a render sitting on the page.
   ─────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useLeadDialog } from "@/components/lead-dialog";
import "./v3.css";

const ShadeModel = dynamic(() => import("./shade-model"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

/* Colorways — full-bleed studio photo per canvas + an exact flood hue. */
type Colorway = { key: string; photo: string; flood: string; dot: string };
const COLORS: Colorway[] = [
  { key: "Cream",      photo: "/v2/cw-cream.jpg",           flood: "#F3E9D2", dot: "#F1E6CB" },
  { key: "Coral",      photo: "/v2/cw-coral.jpg",           flood: "#E68A6B", dot: "#E08A6E" },
  { key: "Butter",     photo: "/v2/cw-butter.jpg",          flood: "#ECC74F", dot: "#EAC85C" },
  { key: "Dusty Blue", photo: "/v2/cw-dusty-blue.jpg",      flood: "#9DBAD0", dot: "#9FB9CE" },
  { key: "Navy",       photo: "/v2/cw-navy-stripe.jpg",     flood: "#2F517A", dot: "#284A74" },
  { key: "Burgundy",   photo: "/v2/cw-burgundy-stripe.jpg", flood: "#8E454C", dot: "#8E4A4A" },
  { key: "Pinstripe",  photo: "/v2/cw-pinstripe.jpg",       flood: "#C9C2B4", dot: "#C7BEAF" },
];
const STORAGE_KEY = "shadiez-v3-colorway";

/* ── per-panel motion ────────────────────────────────────────────────────────
   Each panel reads its OWN scroll progress (0 below → 0.5 centered → 1 gone) and
   animates its content with a distinct effect, so no two adjacent beats move the
   same way: slide (L/R), drop, rise, scale, or a clip-path wipe. Spring-smoothed.
   Reduced-motion → just present, no travel. ── */
type Fx = "slide-right" | "slide-left" | "drop" | "rise" | "scale" | "wipe";
type Style = Record<string, MotionValue<number> | MotionValue<string> | number>;
function usePanelFx(ref: React.RefObject<HTMLElement | null>, fx: Fx): Style {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 88, damping: 26, mass: 0.5 });
  // every transform is created unconditionally (hooks rule); we pick below
  const opacity = useTransform(p, [0, 0.2, 0.82, 1], [0, 1, 1, 0]);
  const xR = useTransform(p, [0, 0.5, 1], [180, 0, -85]);
  const xL = useTransform(p, [0, 0.5, 1], [-180, 0, 85]);
  const yD = useTransform(p, [0, 0.5, 1], [-150, 0, 70]);
  const yU = useTransform(p, [0, 0.5, 1], [150, 0, -70]);
  const sc = useTransform(p, [0, 0.5, 1], [0.8, 1, 1.08]);
  const yS = useTransform(p, [0, 0.5, 1], [55, 0, -45]);
  const clip = useTransform(p, [0.08, 0.5], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  if (reduce) return { opacity: 1 };
  switch (fx) {
    case "slide-left": return { x: xL, opacity };
    case "drop": return { y: yD, opacity };
    case "rise": return { y: yU, opacity };
    case "scale": return { scale: sc, y: yS, opacity };
    case "wipe": return { clipPath: clip, opacity };
    case "slide-right":
    default: return { x: xR, opacity };
  }
}

/* full-bleed media (no frame, no rounding). `media` sets the entrance:
   kenburns (slow zoom-out), pan (horizontal drift), or wipe (clip-path reveal). */
type Media = "kenburns" | "pan" | "wipe";
function Bleed({ src, alt, priority, eager, media = "kenburns" }: { src: string; alt: string; priority?: boolean; eager?: boolean; media?: Media }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const yk = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const xpan = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const clip = useTransform(scrollYProgress, [0.05, 0.5], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  const style: Style | undefined = reduce ? undefined
    : media === "pan" ? { x: xpan, scale: 1.1 }
    : media === "wipe" ? { clipPath: clip, scale: 1.06 }
    : { scale, y: yk };
  return (
    <div className="bleed" ref={ref} aria-hidden>
      <motion.div className="bleed-track" style={style}>
        <Image src={src} alt={alt} fill priority={priority} loading={eager ? "eager" : undefined} sizes="100vw" quality={88} style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

/* line-mask headline — each line rises out of a clip; terse by design */
function MaskLines({ lines, play = true, delay = 0, className }: { lines: string[]; play?: boolean; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span className="mline" key={i}>
          <motion.span className="mline-in"
            initial={reduce ? false : { y: "115%" }}
            animate={play || reduce ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }}>
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function WaveMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const wavePath = (y: number) => `M-16 ${y}c5 -5 11 5 16 0s11 5 16 0s11 5 16 0s11 5 16 0s11 5 16 0`;
  const lines = [
    { y: 14, stroke: "currentColor", dur: 5.5, from: 0, to: -16 },
    { y: 22, stroke: "var(--sun)", dur: 7, from: -16, to: 0 },
    { y: 30, stroke: "currentColor", dur: 6, from: 0, to: -16 },
  ];
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      {lines.map((l, i) => (
        <motion.path key={i} d={wavePath(l.y)} stroke={l.stroke} strokeWidth="2.4" strokeLinecap="round"
          animate={reduce ? undefined : { x: [l.from, l.to] }}
          transition={reduce ? undefined : { duration: l.dur, ease: "linear", repeat: Infinity }} />
      ))}
    </svg>
  );
}

function Btn({ className, onClick, children }: { className?: string; onClick?: () => void; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.button type="button" className={className} onClick={onClick}
      whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.8 }}>
      {children}
    </motion.button>
  );
}

/* loader — quick sunrise; holds the hook entrance until it lifts.
   `?noloader` skips it entirely (used for review/screenshots). */
const LOAD_MIN_MS = 1100;
function Loader({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  // show=true on both server and first client render (no hydration mismatch);
  // the ?noloader skip is decided in the effect below, after mount.
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    const skip = new URLSearchParams(window.location.search).has("noloader");
    // Deterministic dismiss timer — do NOT depend on window 'load' (the dev HMR
    // socket can keep it from firing). Fill the bar, then lift on a fixed beat.
    setReady(true);
    if (skip) setInstant(true);
    const wait = skip ? 0 : LOAD_MIN_MS;
    const t = window.setTimeout(() => { setShow(false); onDone?.(); }, wait);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = prev; };
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="v3load" role="status" aria-label="Loading SHADIEZ"
          initial={{ opacity: 1 }} exit={{ opacity: 0, y: instant || reduce ? 0 : -22 }} transition={{ duration: instant ? 0 : reduce ? 0.3 : 0.9, ease: EASE }}>
          <div className="v3load-bloom" aria-hidden />
          <div className="v3load-stage">
            <motion.span className="v3load-sun" aria-hidden
              initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 44, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { duration: 1.7, ease: EASE, delay: 0.15 }} />
            <WaveMark className="v3load-mark" />
            <motion.div className="v3load-word" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeOut", delay: 0.9 }}>
              SHADIEZ<i className="v3load-dot" aria-hidden />
            </motion.div>
            <span className="v3load-tag">Something new under the sun</span>
            <div className="v3load-bar"><motion.div className="v3load-fill" initial={{ width: reduce ? "100%" : "0%" }} animate={{ width: reduce ? "100%" : ready ? "100%" : "85%" }} transition={reduce ? { duration: 0 } : { duration: ready ? 0.5 : 2.8, ease: "easeOut" }} /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return <motion.div className="v3-progress" style={{ scaleX }} aria-hidden />;
}

/* ── a terse word-panel over full-bleed product. `tone`: light|dark chrome. ── */
function WordPanel({
  id, fx, media, src, alt, eyebrow, lines, tone = "dark", eager, onShop, shopLabel = "Shop the Shade",
}: {
  id: string; fx: Fx; media?: Media; src: string; alt: string; eyebrow?: string; lines: string[]; tone?: "light" | "dark"; eager?: boolean; onShop: () => void; shopLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const style = usePanelFx(ref, fx);
  return (
    <section className={`panel panel-${tone}`} id={id} ref={ref}>
      <Bleed src={src} alt={alt} eager={eager} media={media} />
      <div className="panel-scrim" aria-hidden />
      <motion.div className="panel-copy" style={style}>
        {eyebrow && <span className="panel-eyebrow">{eyebrow}</span>}
        <h2 className="panel-words"><MaskLines lines={lines} /></h2>
        <Btn className={`btn ${tone === "dark" ? "btn-amber" : "btn-ink"} lg panel-cta`} onClick={onShop}>{shopLabel}</Btn>
      </motion.div>
    </section>
  );
}

/* ── horizontal track ────────────────────────────────────────────────────────
   Breaks the top-to-bottom rhythm: the section is tall (N×100svh) and pinned;
   scrolling DOWN translates a row of full-bleed product panels sideways (LEFT),
   so this whole passage reads as lateral travel, not more vertical scroll. Each
   panel's words fade/slide as it passes the centre. Reduced-motion → plain stack. */
type HItem = { src: string; alt: string; eyebrow: string; lines: string[] };
function HPanel({ prog, i, n, item }: { prog: MotionValue<number>; i: number; n: number; item: HItem }) {
  const reduce = useReducedMotion();
  const center = n > 1 ? i / (n - 1) : 0.5;
  const op = useTransform(prog, [center - 0.16, center - 0.04, center + 0.04, center + 0.16], [0.12, 1, 1, 0.12]);
  const x = useTransform(prog, [center - 0.2, center, center + 0.2], [80, 0, -80]);
  return (
    <div className="hpanel">
      <div className="hpanel-media" aria-hidden><Image src={item.src} alt={item.alt} fill sizes="100vw" quality={88} style={{ objectFit: "cover" }} /></div>
      <div className="hpanel-scrim" aria-hidden />
      <motion.div className="hpanel-copy" style={reduce ? undefined : { opacity: op, x }}>
        <span className="panel-eyebrow">{item.eyebrow}</span>
        <h2 className="panel-words"><MaskLines lines={item.lines} /></h2>
      </motion.div>
    </div>
  );
}
// Build dwell keyframes: each panel HOLDS at centre, then slides to the next.
// The final panel gets the longest hold so the closing beat lingers.
function trackKeys(n: number) {
  const pos = (i: number) => `-${(((i) / n) * 100).toFixed(4)}%`; // panel i at the left edge
  const t = 0.12;                          // transition width between panels
  const hLast = 0.36;                      // dwell on the last panel (longest)
  const hEarly = n > 1 ? (1 - hLast - (n - 1) * t) / (n - 1) : 1;
  const input: number[] = [];
  const output: string[] = [];
  let c = 0;
  for (let i = 0; i < n; i++) {
    const hold = i === n - 1 ? hLast : hEarly;
    input.push(+c.toFixed(4)); output.push(pos(i));
    c += hold;
    input.push(+Math.min(c, 1).toFixed(4)); output.push(pos(i));
    if (i < n - 1) c += t;
  }
  return { input, output };
}
function HorizontalTrack({ items }: { items: HItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const prog = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  // translateX as a % of the ROW's own width, with per-panel dwell (see trackKeys).
  const keys = trackKeys(items.length);
  const x = useTransform(prog, keys.input, keys.output);
  return (
    // taller section (130svh per panel) → more scroll time across the whole passage
    <section className={reduce ? "htrack is-static" : "htrack"} ref={ref} style={reduce ? undefined : { height: `${items.length * 130}svh` }} aria-label="What it does">
      <div className="htrack-pin">
        <motion.div className="htrack-row" style={reduce ? undefined : { x }}>
          {items.map((it, i) => <HPanel key={i} prog={prog} i={i} n={items.length} item={it} />)}
        </motion.div>
        <div className="htrack-hint" aria-hidden><span /></div>
      </div>
    </section>
  );
}

const PROMISE: HItem[] = [
  { src: "/v2/8.png",  alt: "A SHADIEZ shade throwing shade on the beach", eyebrow: "01", lines: ["Blocks", "the sun."] },
  { src: "/v2/10.png", alt: "The notched recline angle, adjusted",        eyebrow: "02", lines: ["Adjusts", "to you."] },
  { src: "/v2/2.png",  alt: "The folding walnut frame and brass pins",     eyebrow: "03", lines: ["Packs down.", "Travels far."] },
];

export default function V3() {
  const { openDialog } = useLeadDialog();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // hook panel drives the 3D rotation (model rotates as the hook scrolls away)
  const hookRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hookProg } = useScroll({ target: hookRef, offset: ["start start", "end start"] });
  const heroY = useTransform(hookProg, [0, 1], [0, -80]);
  const heroFade = useTransform(hookProg, [0, 0.7], [1, 0]);
  const shadeFade = useTransform(hookProg, [0, 0.85], [1, 0]);

  // choice panel — directional swatch swap + flood
  const choiceRef = useRef<HTMLElement>(null);
  const choiceSlide = usePanelFx(choiceRef, "slide-right");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) { const i = COLORS.findIndex((c) => c.key === saved); if (i >= 0) setActive(i); }
    } catch { /* default */ }
  }, []);
  const select = (i: number) => { setActive(i); try { window.localStorage.setItem(STORAGE_KEY, COLORS[i].key); } catch { /* ignore */ } };
  const c = COLORS[active];

  return (
    <div className="v3root">
      {/* living warm background (only seen behind the light panels: hook + choice) */}
      <div className="v3-bg" aria-hidden>
        <div className="v3-bg-color" />
        <div className="v3-bg-flow" />
      </div>

      <Loader onDone={() => setEntered(true)} />
      <ScrollProgress />
      <div className="v3-grain" />

      <header className={scrolled ? "v3head scrolled" : "v3head"}>
        <div className="wrap bar">
          <a className="mark-link" href="#top" aria-label="SHADIEZ home"><WaveMark /></a>
          <a className="wordmark" href="#top">SHADIEZ</a>
          <nav className="links">
            <a href="#colors">Colors</a>
            <Btn className="btn btn-amber sm" onClick={openDialog}>Shop</Btn>
          </nav>
        </div>
      </header>

      {/* 1 · HOOK — editorial: the shade blended into warm light, an asymmetric
            ragged-left headline (italic serif lead-in + massive roman), a material
            meta line, a vertical scroll rail, a corner index and a horizon rule. */}
      <section className="panel hook" id="top" ref={hookRef}>
        <motion.div className="hook-canvas" style={reduce ? undefined : { opacity: shadeFade }} aria-hidden>
          <ShadeModel progress={hookProg} className="hook-3d" />
          <div className="hook-haze" />
          <div className="hook-vignette" />
        </motion.div>
        <div className="hook-rule" aria-hidden />

        {/* vertical scroll rail (bottom-left) */}
        <div className="hook-rail" aria-hidden>
          <span className="hook-rail-label">Scroll</span>
          <span className="hook-rail-line" />
        </div>
        {/* corner index + framing meta */}
        <span className="hook-corner hook-corner-tr" aria-hidden>I — VI</span>
        <span className="hook-corner hook-corner-tl" aria-hidden>Est. by the sea</span>

        <motion.div className="hook-copy" style={reduce ? undefined : { y: heroY, opacity: heroFade }}>
          <h1 className="hook-h1">
            <span className="h1-lead"><MaskLines lines={["Something new"]} play={entered} delay={0.15} /></span>
            <span className="h1-big"><MaskLines lines={["Under the Sun"]} play={entered} delay={0.32} /></span>
          </h1>
          <motion.div className="hook-foot"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={entered || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}>
            <div className="hook-meta">
              <span className="hook-meta-k">Personal beach sun-shade</span>
              <i className="hook-meta-dot" />
              <span className="hook-meta-k">Solid walnut · Cotton canvas</span>
            </div>
            <div className="hook-cta-row">
              <Btn className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</Btn>
              <span className="hook-aside">Your own patch of shade, anywhere.</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2 · TENSION — copy drops from above; media slow ken-burns */}
      <WordPanel id="tension" fx="drop" media="kenburns" src="/v2/beach-recline.jpg" alt="Open beach in the midday sun" eager
        eyebrow="The problem" lines={["By noon,", "the sun wins."]} tone="dark" onShop={openDialog} />

      {/* 3 · PROMISE — a HORIZONTAL passage: scroll down → travel sideways */}
      <div id="p1" /><HorizontalTrack items={PROMISE} />

      {/* 6 · CHOICE — full-bleed colorway swap + flood; copy slides from the right */}
      <section className="panel choice" id="colors" ref={choiceRef} style={{ "--flood": c.flood } as React.CSSProperties}>
        <div className="choice-bleed" aria-hidden>
          {COLORS.map((col, i) => (
            <Image key={col.key} src={col.photo} alt="" fill sizes="100vw" quality={88}
              style={{ objectFit: "cover", opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.06)", transition: "opacity .8s var(--ease), transform 1.2s var(--ease)" }} priority={i === 0} />
          ))}
        </div>
        <div className="choice-flood" aria-hidden />
        <motion.div className="choice-copy" style={choiceSlide}>
          <span className="panel-eyebrow on-dark">Make it yours</span>
          <h2 className="panel-words on-dark"><MaskLines lines={["Seven canvases.", "One is yours."]} /></h2>
          <span className="choice-name">{c.key}</span>
          <div className="swatches" role="listbox" aria-label="Colorways">
            {COLORS.map((col, i) => (
              <button key={col.key} type="button" role="option" aria-selected={i === active} aria-label={col.key}
                className={i === active ? "swatch is-active" : "swatch"} style={{ background: col.dot }} onClick={() => select(i)} />
            ))}
          </div>
          <Btn className="btn btn-amber lg" onClick={openDialog}>Shop {c.key}</Btn>
        </motion.div>
      </section>

      {/* 7 · ACT — final beat, copy rises from below; closes the loop */}
      <ActPanel onShop={openDialog} />

      <footer className="v3foot">
        <div className="wrap foot-grid">
          <div>
            <div className="logo"><WaveMark /> SHADIEZ</div>
            <p className="bl">Something new under the sun.</p>
          </div>
          <div><h5>Shop</h5><ul><li><a href="#colors">Colorways</a></li><li><a href="#p1">Why SHADIEZ</a></li><li><a href="#top">The shade</a></li></ul></div>
          <div><h5>Help</h5><ul><li><a href="/shipping-policy">Shipping</a></li><li><a href="/returns">Returns</a></li><li><a href="/accessibility">Accessibility</a></li></ul></div>
          <div><h5>Brand</h5><ul><li><a href="/privacy">Privacy</a></li><li><a href="/terms">Terms</a></li></ul></div>
        </div>
        <div className="wrap foot-bot"><span>© 2026 SHADIEZ</span><span>Privacy · Terms</span></div>
      </footer>

      <div className="mobile-cta"><Btn className="btn btn-amber" onClick={openDialog}>Shop the Shade</Btn></div>
    </div>
  );
}

function ActPanel({ onShop }: { onShop: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const style = usePanelFx(ref, "rise");
  return (
    <section className="panel panel-dark act" id="buy" ref={ref}>
      <Bleed src="/v2/8.png" alt="SHADIEZ shades on the beach at golden hour" media="pan" />
      <div className="act-scrim" aria-hidden />
      <motion.div className="act-copy" style={style}>
        <h2 className="act-h2"><MaskLines lines={["Find your", "shade."]} /></h2>
        <span className="act-tag">Something new under the sun.</span>
        <Btn className="btn btn-amber xl" onClick={onShop}>Shop the Shade</Btn>
      </motion.div>
    </section>
  );
}
