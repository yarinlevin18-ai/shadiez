"use client";

/* ───────────────────────────────────────────────────────────────────────────
   SHADIEZ — /v3  ·  "Something New Under The Sun"
   The Claude-design landing (lifestyle-photo hero, the object split, the
   colorway catalog, the golden-hour lifestyle band + matching totes, the amber
   finale) — rebuilt natively and wrapped in the motion system we built:
   Lenis smooth scroll, the sunrise loader, mask-line headline reveals,
   directional section entrances, parallax / ken-burns media, the colorway
   catalog grid, and a sideways (horizontal) passage for the matching totes.
   Lead-form conversion, no pricing. Palette = locked "Bright Coast".
   ─────────────────────────────────────────────────────────────────────────── */

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
} from "framer-motion";
import { useLeadDialog } from "@/components/lead-dialog";
import { V3Hero } from "@/components/v3-hero";
import { LogoLockup, LogoMark, LogoWord } from "./BrandLogo";
import "./v3.css";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Colorways — the catalog line. Each entry carries a framed studio card photo,
   the transparent cut-out, the dot/flood hue, and its SKU.
   ⚠ SKU NOTE (confirm with Yarin): only burgundy-stripe (H10), navy-stripe (H19)
   and pinstripe (H37) come from CLAUDE.md. Cream/Coral/Butter/Dusty Blue codes
   below are PLACEHOLDERS — swap them for the real catalog codes before launch. */
type Colorway = { key: string; sku: string; card: string; clip: string; photo: string; flood: string; dot: string };
const COLORS: Colorway[] = [
  { key: "Cream",      sku: "H01", card: "/landing/colorways/cw-cream.jpg",           clip: "/landing/colorways/transitions/cream.mp4",     photo: "/landing/product/cuts/cream.png",     flood: "#F3E9D2", dot: "#F1E6CB" },
  { key: "Coral",      sku: "H44", card: "/landing/colorways/cw-coral.jpg",           clip: "/landing/colorways/transitions/coral.mp4",     photo: "/landing/product/cuts/coral.png",     flood: "#E68A6B", dot: "#E08A6E" },
  { key: "Butter",     sku: "H22", card: "/landing/colorways/cw-butter.jpg",          clip: "/landing/colorways/transitions/butter.mp4",    photo: "/landing/product/cuts/butter.png",    flood: "#ECC74F", dot: "#EAC85C" },
  { key: "Dusty Blue", sku: "H48", card: "/landing/colorways/cw-dusty-blue.jpg",      clip: "/landing/colorways/transitions/dustyblue.mp4", photo: "/landing/product/cuts/dustyblue.png", flood: "#9DBAD0", dot: "#9FB9CE" },
  { key: "Navy",       sku: "H19", card: "/landing/colorways/cw-navy-stripe.jpg",     clip: "/landing/colorways/transitions/navy.mp4",      photo: "/landing/product/cuts/navy.png",      flood: "#2F517A", dot: "#284A74" },
  { key: "Burgundy",   sku: "H10", card: "/landing/colorways/cw-burgundy-stripe.jpg", clip: "/landing/colorways/transitions/burgundy.mp4",  photo: "/landing/product/cuts/burgundy.png",  flood: "#8E454C", dot: "#8E4A4A" },
  { key: "Pinstripe",  sku: "H37", card: "/landing/colorways/cw-pinstripe.jpg",       clip: "/landing/colorways/transitions/pinstripe.mp4", photo: "/landing/product/cuts/pinstripe.png", flood: "#C9C2B4", dot: "#C7BEAF" },
];

/* matching-tote panels for the sideways passage */
type HItem = { src: string; alt: string; eyebrow: string; lines: string[] };
const TOTES: HItem[] = [
  { src: "/landing/kits/kit-cream.jpg",    alt: "SHADIEZ Cream shade and matching tote",      eyebrow: "Shade + tote", lines: ["Cream"] },
  { src: "/landing/kits/kit-blue.jpg",     alt: "SHADIEZ Dusty Blue shade and matching tote", eyebrow: "Shade + tote", lines: ["Dusty Blue"] },
  { src: "/landing/kits/kit-burgundy.jpg", alt: "SHADIEZ Burgundy shade and matching tote",   eyebrow: "Shade + tote", lines: ["Burgundy"] },
];

/* ── directional reveal for in-flow sections (whileInView, once) ── */
type RevDir = "up" | "left" | "right" | "scale";
type RevTag = "div" | "p" | "h2" | "h3" | "span" | "li" | "figure";
function Reveal({
  from = "up", delay = 0, className, as = "div", style, children,
}: { from?: RevDir; delay?: number; className?: string; as?: RevTag; style?: React.CSSProperties; children: ReactNode }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  const off: Record<RevDir, Record<string, number>> = { up: { y: 38 }, left: { x: -64 }, right: { x: 64 }, scale: { scale: 0.92 } };
  const initial = reduce ? false : { opacity: 0, ...off[from] };
  return (
    <M className={className} style={style} initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, ease: EASE, delay }}>
      {children}
    </M>
  );
}

/* full-bleed media with scroll-linked ken-burns / pan */
function Bleed({ src, alt, priority, media = "kenburns", className }: { src: string; alt: string; priority?: boolean; media?: "kenburns" | "pan"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const yk = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const xpan = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const style = reduce ? undefined : media === "pan" ? { x: xpan, scale: 1.1 } : { scale, y: yk };
  return (
    <div className={className ? `bleed ${className}` : "bleed"} ref={ref} aria-hidden>
      <motion.div className="bleed-track" style={style}>
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" quality={88} style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

/* line-mask headline — each line rises out of a clip */
function MaskLines({ lines, italicLast, play = true, delay = 0 }: { lines: string[]; italicLast?: boolean; play?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {lines.map((line, i) => (
        <span className={`mline${italicLast && i === lines.length - 1 ? " mline-italic" : ""}`} key={i}>
          <motion.span className="mline-in"
            initial={reduce ? false : { y: "115%" }}
            animate={play || reduce ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }}>
            {line}
          </motion.span>
        </span>
      ))}
    </>
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

/* loader — quick sunrise; ?noloader skips it */
const LOAD_MIN_MS = 1100;
function Loader({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    const skip = new URLSearchParams(window.location.search).has("noloader");
    setReady(true);
    if (skip) setInstant(true);
    const t = window.setTimeout(() => { setShow(false); onDone?.(); }, skip ? 0 : LOAD_MIN_MS);
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
            <motion.div className="v3load-lockwrap" initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: 0.35 }}>
              <LogoLockup className="v3load-lockup" />
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

/* ── sideways passage (matching totes): scroll down → the row slides left. ── */
function TotePanel({ item }: { item: HItem }) {
  return (
    <div className="hpanel">
      <div className="hpanel-media" aria-hidden><Image src={item.src} alt={item.alt} fill sizes="100vw" quality={88} style={{ objectFit: "cover" }} /></div>
      <div className="hpanel-scrim" aria-hidden />
      <div className="hpanel-copy">
        <span className="panel-eyebrow on-dark">{item.eyebrow}</span>
        <h3 className="panel-words"><MaskLines lines={item.lines} /></h3>
        <span className="hpanel-meta">Matching canvas tote</span>
      </div>
    </div>
  );
}
function ToteTrack({ items }: { items: HItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Light, responsive smoothing (low mass, firm) so the row tracks the scroll
  // tightly instead of lagging/rubber-banding.
  const prog = useSpring(scrollYProgress, { stiffness: 150, damping: 36, mass: 0.22 });
  // Continuous slide (NO dwell plateaus → no "stuck" feel). The small 0.06/0.94
  // margins hold the first/last panel steady while the section pins/unpins, so
  // the vertical→horizontal handoff is smooth rather than abrupt.
  const end = `-${(((items.length - 1) / items.length) * 100).toFixed(4)}%`;
  const x = useTransform(prog, [0.06, 0.94], ["0%", end]);
  // As the passage reaches its end, bloom a warm wash up from the bottom in the
  // SAME tone the finale starts with — so the last tote photo dissolves into
  // "Find your shade." instead of a hard seam between the two sections.
  const seam = useTransform(scrollYProgress, [0.72, 0.96], [0, 1]);
  return (
    <section className={reduce ? "htrack is-static" : "htrack"} ref={ref} style={reduce ? undefined : { height: `${items.length * 108}svh` }} aria-label="Matching totes">
      <div className="htrack-pin">
        <motion.div className="htrack-row" style={reduce ? undefined : { x }}>
          {items.map((it, i) => <TotePanel key={i} item={it} />)}
        </motion.div>
        <div className="htrack-cap"><span>Made for the long way home</span></div>
        <div className="htrack-hint" aria-hidden><span /></div>
        <motion.div className="htrack-seam" style={reduce ? { opacity: 1 } : { opacity: seam }} aria-hidden />
      </div>
    </section>
  );
}

/* stage media — real photo as poster; Higgsfield colour-morph clip plays on hover */
function CwMedia({ col, priority }: { col: Colorway; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const play = () => { const v = ref.current; if (!v || reduce) return; v.currentTime = 0; v.play().catch(() => {}); };
  const stop = () => { const v = ref.current; if (!v) return; v.pause(); v.currentTime = 0; };
  return (
    <span className="cw-stage" onPointerEnter={play} onPointerLeave={stop}>
      <Image src={col.card} alt={`SHADIEZ ${col.key} shade and matching tote`} fill
        sizes="(max-width:900px) 92vw, 620px" quality={88} style={{ objectFit: "cover" }} priority={priority} />
      {!reduce && (
        <video ref={ref} className="cw-clip" muted loop playsInline preload="none" poster={col.card} aria-hidden>
          <source src={col.clip} type="video/mp4" />
        </video>
      )}
      <span className="cw-tote" aria-hidden>＋ matching tote</span>
    </span>
  );
}

/* one colour-themed split section per canvas; photo side alternates */
function ColorwaySection({ col, index, total, onCta }: { col: Colorway; index: number; total: number; onCta: () => void }) {
  const flip = index % 2 === 1;
  const tint = `color-mix(in srgb, ${col.dot} 24%, var(--cream))`;
  const n = (x: number) => String(x).padStart(2, "0");
  return (
    <section className={flip ? "cw-sec flip" : "cw-sec"} style={{ background: tint }}>
      <div className="wrap cw-sec-inner">
        <Reveal from={flip ? "right" : "left"} className="cw-stage-wrap">
          <CwMedia col={col} priority={index < 1} />
        </Reveal>
        <Reveal from={flip ? "left" : "right"} delay={0.08} className="cw-copy">
          <span className="cw-eyebrow">{n(index + 1)} / {n(total)} · Colourway</span>
          <h3 className="cw-name-lg">{col.key}</h3>
          <span className="cw-sku-lg" style={{ color: `color-mix(in srgb, ${col.dot} 62%, var(--ink))` }}>{col.sku}</span>
          <p className="cw-line">{`Solid walnut frame, ${col.key.toLowerCase()} canvas — propped at your angle, packed flat in its own matching tote.`}</p>
          <span className="cw-meta-lg"><span className="cw-dot" style={{ background: col.dot }} aria-hidden /> Matching tote included</span>
          <Btn className="btn btn-ink lg" onClick={onCta}>Shop {col.key}</Btn>
        </Reveal>
      </div>
    </section>
  );
}

export default function V3() {
  const { openDialog } = useLeadDialog();
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  return (
    <div className="v3root">
      <div className="v3-bg" aria-hidden>
        <div className="v3-bg-color" />
        <div className="v3-bg-flow" />
      </div>

      <Loader onDone={() => setEntered(true)} />
      <ScrollProgress />
      <div className="v3-grain" />

      {/* NAV — transparent over the hero, frosts in on scroll */}
      <header className={scrolled ? "v3head scrolled" : "v3head"}>
        <div className="wrap bar">
          <a className="mark-link" href="#top" aria-label="SHADIEZ home"><LogoMark className="mk-mark" /> <LogoWord className="mk-word" /></a>
          <nav className="links">
            <a href="#shade">Shade</a>
            <a href="#colorways">Colorways</a>
            <a href="#details">Details</a>
            <Btn className="btn btn-amber sm" onClick={openDialog}>Contact us</Btn>
          </nav>
        </div>
      </header>

      {/* 1 · HERO — product-forward: the real shade floats over the warm beach */}
      <V3Hero play={entered} onCta={openDialog} />

      {/* 2 · THE OBJECT — editorial split: words slide in left, collage right */}
      <section className="object pad" id="shade">
        <div className="wrap object-grid">
          <div className="object-words">
            <Reveal from="left" as="span" className="eyebrow">The object</Reveal>
            <Reveal from="left" delay={0.06} as="h2" className="object-h2">Built like furniture.<br />Carried like a bag.</Reveal>
            <Reveal from="left" delay={0.12} as="p" className="object-body">
              A walnut frame and cream canvas that props up at an adjustable notch — shading your head and shoulders while you lie on your towel. You don’t sit in it. It shades you.
            </Reveal>
            <Reveal from="left" delay={0.18} className="spec-row">
              <span>Solid walnut</span><i /><span>Cream canvas</span><i /><span>Folds flat</span>
            </Reveal>
            <Reveal from="up" delay={0.24} className="object-cta">
              <Btn className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</Btn>
            </Reveal>
          </div>
          <Reveal from="right" delay={0.1} className="object-collage">
            <figure className="ocard ocard-a"><Image src="/landing/details/notch-pin.png" alt="Brass pivot pin and notched recline detail" fill sizes="(max-width:900px) 92vw, 420px" style={{ objectFit: "cover" }} /></figure>
            <figure className="ocard ocard-b"><Image src="/landing/details/corner.png" alt="Brass-screwed walnut frame corner" fill sizes="(max-width:900px) 46vw, 280px" style={{ objectFit: "cover" }} /></figure>
            <figure className="ocard ocard-c"><Image src="/landing/details/frame-joint.png" alt="The folding frame joint and canvas" fill sizes="(max-width:900px) 46vw, 280px" style={{ objectFit: "cover" }} /></figure>
          </Reveal>
        </div>
      </section>

      {/* 3 · THE COLOURWAYS — one colour-themed split section per canvas */}
      <div className="catalog" id="colorways">
        <Reveal className="catalog-head">
          <span className="eyebrow">The line</span>
          <h2 className="catalog-h2">Seven canvases.<br />One is yours.</h2>
          <p className="catalog-sub">Every shade is solid walnut and cream-edged canvas — each in its own colour, each with its own matching tote.</p>
        </Reveal>
        {COLORS.map((col, i) => (
          <ColorwaySection key={col.key} col={col} index={i} total={COLORS.length} onCta={openDialog} />
        ))}
      </div>

      {/* 4 · LIFESTYLE — golden-hour band, then the sideways tote passage */}
      <section className="band" id="details">
        <Bleed src="/landing/lifestyle/golden-hour.png" alt="Two SHADIEZ shades on the beach at golden hour" media="pan" className="only-desktop" />
        <Bleed src="/landing/lifestyle/band-portrait-web.jpg" alt="A person relaxing in the shade of a SHADIEZ sun-shade at golden hour" media="kenburns" className="only-mobile" />
        <div className="band-scrim" aria-hidden />
        <div className="wrap band-copy">
          <h2 className="band-h2"><MaskLines lines={["Long afternoons,", "claimed."]} /></h2>
        </div>
      </section>
      <ToteTrack items={TOTES} />

      {/* 5 · FINAL CTA — text + CTA on the amber, then the lineup sits on a bed
            of sand whose grains cascade down into the dark footer */}
      <section className="finale">
        <div className="finale-bloom" aria-hidden />
        <div className="wrap finale-inner">
          <Reveal as="h2" className="finale-h2">Find your shade.</Reveal>
          <Reveal delay={0.1} className="finale-cta"><Btn className="btn btn-ink lg" onClick={openDialog}>Shop the Shade</Btn></Reveal>
        </div>
        <div className="finale-ground">
          <div className="finale-sand" aria-hidden />
          <div className="finale-shadow" aria-hidden />
          <Reveal delay={0.16} className="finale-shot">
            <Image src="/landing/product/lineup.png" alt="The full SHADIEZ lineup — every colorway with its matching tote" width={1600} height={1200} sizes="(max-width:900px) 84vw, 600px" />
          </Reveal>
        </div>
      </section>

      <footer className="v3foot">
        <div className="wrap foot-grid">
          <div>
            <div className="logo"><LogoMark className="fl-mark" /> <LogoWord className="fl-word" /></div>
            <p className="bl">Something New Under The Sun.</p>
          </div>
          <div><h5>Shop</h5><ul><li><a href="#colorways">Colorways</a></li><li><a href="#shade">The shade</a></li><li><a href="#details">Totes</a></li></ul></div>
          <div><h5>Help</h5><ul><li><a href="/shipping-policy">Shipping</a></li><li><a href="/returns">Returns</a></li><li><a href="/accessibility">Accessibility</a></li></ul></div>
          <div><h5>Brand</h5><ul><li><a href="/privacy">Privacy</a></li><li><a href="/terms">Terms</a></li></ul></div>
        </div>
        <div className="wrap foot-bot"><span><LogoMark className="foot-mark" /> © 2026 SHADIEZ</span><span>Privacy · Terms</span></div>
      </footer>

      <div className="mobile-cta"><Btn className="btn btn-amber" onClick={openDialog}>Shop the Shade</Btn></div>
    </div>
  );
}
