"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useLeadDialog } from "@/components/lead-dialog";
import "./v2.css";

// The hero/cream product shot. The only colorway with a real, dedicated photo;
// every other swatch tints this image to approximate its canvas color until a
// real per-color shot exists (set `photo` and the tint + "approx" flag drop away).
const HERO_SHOT = "/Higgsfield/opt/13.jpg";

type Colorway = {
  key: string;
  hex: string;
  wash: string;
  washOp: number;
  desc: string;
  /** Dedicated product photo. When absent, the stage shows HERO_SHOT tinted and
   *  flags the preview as an approximation. */
  photo?: string;
};

// TODO(real-data): confirm the final SKU list + palette codes with the client
// before locking these. Per the brand asset map the real lineup is 8 colorways
// (cream · olive/khaki · butter · dusty blue · coral + navy / burgundy / black-
// pinstripe stripes); this ships 6, and only Cream has a real photo. Add `photo`
// per colorway as real per-color shots come in.
const COLORS: Colorway[] = [
  { key: "Cream", hex: "#F8F6EF", wash: "transparent", washOp: 0, photo: HERO_SHOT, desc: "The original. Warm off-white canvas on natural walnut — the hero colorway, quiet and timeless." },
  { key: "Coral", hex: "#D38773", wash: "#D38773", washOp: 0.55, desc: "Sun-faded terracotta. Warm, retro and unmistakably coastal." },
  { key: "Navy", hex: "#1F3A5F", wash: "#1F3A5F", washOp: 0.6, desc: "Deep marine navy — crisp against the sand, classic against the wood." },
  { key: "Burgundy", hex: "#7C3B41", wash: "#7C3B41", washOp: 0.55, desc: "Rich oxblood stripe energy. The grown-up red of the lineup." },
  { key: "Teal", hex: "#3E7B73", wash: "#3E7B73", washOp: 0.5, desc: "Solid sea-glass teal — cool, calm, a little bit Riviera." },
  { key: "Butter", hex: "#EBDAB0", wash: "#EBDAB0", washOp: 0.4, desc: "Soft butter yellow. The warmest light of the day, in canvas form." },
];

const COLORWAY_STORAGE_KEY = "shadiez-v2-colorway";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// MOTION PRIMITIVES — Framer Motion, matching motion-lab's reveal/parallax idiom.
// Both honor prefers-reduced-motion: when reduced, content renders in its final
// state with no transform (initial={false} → no entrance, plain div for parallax).
// ─────────────────────────────────────────────────────────────────────────────

type RevealTag = "div" | "p" | "h1" | "h2";

/** Fade + rise reveal. `load` animates on mount (above-the-fold hero); otherwise
 *  it scrubs in once when scrolled into view — the studio `hero-reveal` pattern. */
function Reveal({
  as = "div",
  className,
  delay = 0,
  load = false,
  style,
  children,
}: {
  as?: RevealTag;
  className?: string;
  delay?: number;
  load?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  const initial = reduce ? false : { opacity: 0, y: 34 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.9, ease: EASE, delay };

  if (load) {
    return (
      <M className={className} style={style} initial={initial} animate={shown} transition={transition}>
        {children}
      </M>
    );
  }
  return (
    <M
      className={className}
      style={style}
      initial={initial}
      whileInView={shown}
      viewport={{ once: true, amount: 0.14 }}
      transition={transition}
    >
      {children}
    </M>
  );
}

/** Scroll-linked vertical parallax for a `.media-track` (taller than its clip box,
 *  so the drift never reveals an edge). One scroll source: Framer's useScroll. */
function Parallax({
  className,
  amount = 50,
  children,
}: {
  className?: string;
  amount?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

const Mark = () => (
  <svg viewBox="0 0 40 40" fill="none">
    <path d="M4 14c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 22c5-6 11 6 16 0s11 6 16 0" stroke="#E8A04A" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 30c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export default function V2() {
  const [active, setActive] = useState(0);

  // Persist the colorway choice so a returning shopper sees the canvas they were
  // considering. Restored after mount (client-only) to keep SSR markup stable.
  useEffect(() => {
    const saved = window.localStorage.getItem(COLORWAY_STORAGE_KEY);
    if (!saved) return;
    const i = COLORS.findIndex((x) => x.key === saved);
    if (i >= 0) setActive(i);
  }, []);

  const selectColor = (i: number) => {
    setActive(i);
    try {
      window.localStorage.setItem(COLORWAY_STORAGE_KEY, COLORS[i].key);
    } catch {
      /* storage may be unavailable (private mode) — selection still works in-session */
    }
  };

  // Shared lead-capture dialog (provider lives in app/layout). Every "Shop the
  // Shade" CTA opens it — that's this page's conversion action.
  const { openDialog } = useLeadDialog();

  // Header background toggle — driven off the same scroll position as everything
  // else (Framer's useScroll), no standalone scroll listener.
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const c = COLORS[active];
  const approx = !c.photo; // tinted preview rather than a real photo of this canvas

  return (
    <div className="v2root">
      <div className="v2-grain" />

      {/* HEADER */}
      <header className={scrolled ? "scrolled" : undefined}>
        <div className="wrap bar">
          <a className="logo" href="#top"><Mark />SHADIEZ</a>
          <nav className="links">
            <a href="#shade">The Shade</a>
            <a href="#colors">Colors</a>
            <a href="#craft">Craft</a>
          </nav>
          <div className="header-cta">
            <a className="btn btn-ghost" href="#colors">Pick your color</a>
            <button type="button" className="btn btn-amber" onClick={openDialog}>Shop the Shade</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-media"><Parallax className="media-track" amount={60}><Image src="/Higgsfield/opt/1.jpg" alt="SHADIEZ personal beach sun-shade on warm sand" fill priority sizes="100vw" style={{ objectFit: "cover" }} /></Parallax></div>
        <div className="hero-inner">
          <div className="wrap">
            <Reveal as="p" className="eyebrow" load>The personal beach sun-shade</Reveal>
            <Reveal as="h1" className="display" load delay={0.1}>Something New<br />Under The Sun</Reveal>
            <Reveal as="p" className="sub" load delay={0.2}>A premium walnut-and-canvas shade that folds flat, sets up in seconds, and hands you your own patch of shade — anywhere the sun finds you.</Reveal>
            <Reveal className="hero-actions" load delay={0.3}>
              <button type="button" className="btn btn-amber" onClick={openDialog}>Shop the Shade</button>
              <a className="btn btn-ghost" style={{ borderColor: "rgba(251,247,240,.5)", color: "var(--cream)" }} href="#shade">See how it works</a>
            </Reveal>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll</span><span className="line" /></div>
      </section>

      {/* PRESS — removed: the "As seen in" publications were fabricated placeholders.
          TODO(real-data): reinstate only with genuine, confirmed press/retail features
          (real logo assets + permission to use them). Layout styles for `.press`
          remain in v2.css so this can drop back in. */}

      {/* STATEMENT */}
      <section className="statement pad" id="shade">
        <div className="wrap grid">
          <Reveal>
            <p className="eyebrow">Why SHADIEZ</p>
            <h2 className="display">They said there&apos;s nothing new under the sun.<br /><em>So we made shade you can carry.</em></h2>
            <p className="lead" style={{ color: "var(--ink-60)" }}>SHADIEZ isn&apos;t a chair — it&apos;s your own pocket of shade. A foldable oak frame and cream canvas prop up at the angle you choose, shading your head and shoulders while you lie back on the sand. No poles to bury, no tent to wrestle. Open it, recline it, disappear into the cool.</p>
          </Reveal>
          <Reveal className="figure" delay={0.08}><Image src="/Higgsfield/opt/12.jpg" alt="SHADIEZ shade casting cool shadow on rippled sand" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} /></Reveal>
        </div>
        <div className="wrap">
          <div className="props">
            <Reveal className="prop">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeLinecap="round" /></svg></div>
              <h3>Blocks the sun</h3>
              <p>Dense marine-grade canvas throws real, deep shade over your head and upper body — not a thin patch of dappled light.</p>
            </Reveal>
            <Reveal className="prop" delay={0.08}>
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 18L14 6M14 6l-1 5M14 6l-5 1" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 20h16" strokeLinecap="round" /></svg></div>
              <h3>Adjustable angle</h3>
              <p>Notched recline positions let you dial the shade exactly where the sun is — and move it as the afternoon does.</p>
            </Reveal>
            <Reveal className="prop" delay={0.16}>
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7l9-4 9 4-9 4-9-4z" strokeLinejoin="round" /><path d="M3 7v6l9 4 9-4V7" strokeLinejoin="round" /></svg></div>
              <h3>Folds flat, sets up in seconds</h3>
              <p>Collapses to a slim board that drops in the matching tote. From bag to shade in one easy motion.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COLORWAYS */}
      <section className="colorways pad" id="colors">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="eyebrow">Pick your color</p>
            <h2 className="display">One shade, six ways to catch the light.</h2>
            <p className="lead">Every canvas comes with its own matching tote. Tap a color to preview it.</p>
          </Reveal>
          <div className="cw-grid">
            <Reveal className="cw-stage">
              <Parallax className="media-track" amount={22}><Image src={c.photo ?? HERO_SHOT} alt={approx ? `SHADIEZ shade in cream canvas, shown as an approximate ${c.key} colour preview` : `SHADIEZ shade — ${c.key} colorway`} fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: "cover" }} /></Parallax>
              {approx && <div className="cw-wash" style={{ background: c.wash, opacity: c.washOp }} />}
              {approx && <div className="cw-approx" title="Color preview is approximate — the photo is the cream canvas, tinted.">Approx. color</div>}
              <div className="cw-tag"><span className="dot" style={{ background: c.hex }} /><span>{c.key}</span></div>
            </Reveal>
            <Reveal className="cw-panel" delay={0.08}>
              <h3>{c.key}</h3>
              <p className="desc">{c.desc}</p>
              <div className="swatches" role="listbox" aria-label="Colorways">
                {COLORS.map((col, i) => (
                  <button key={col.key} className="swatch" style={{ background: col.hex }} role="option"
                    aria-label={col.key} aria-selected={i === active} onClick={() => selectColor(i)} />
                ))}
              </div>
              <div className="cw-tote"><Image src="/Higgsfield/opt/totes.jpg" alt="Matching SHADIEZ totes" width={64} height={64} sizes="64px" /><span>Ships with a matching canvas tote in every color.</span></div>
              <p className="cw-note">
                {approx
                  ? `Preview is a styling approximation — the ${c.key} canvas is shown by tinting the cream shot. Final colour is sampled from the real ${c.key} weave.`
                  : "Shown in the real cream canvas — the hero colorway."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="life pad">
        <div className="wrap grid">
          <Reveal className="figure"><Image src="/Higgsfield/opt/7.jpg" alt="Person carrying the folded SHADIEZ shade and tote down the beach" fill sizes="(max-width:900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Pack it. Carry it. Claim your spot.</p>
            <h2 className="display">Your shade goes where you go.</h2>
            <div className="steps">
              <div className="step"><span className="n">01</span><div><h4>Sling it over your shoulder</h4><p>Folded flat in its tote, SHADIEZ carries like a portfolio — down the boardwalk, onto the sand, into the car.</p></div></div>
              <div className="step"><span className="n">02</span><div><h4>Unfold in seconds</h4><p>The frame springs open and locks. No stakes, no instructions, no sandy struggle.</p></div></div>
              <div className="step"><span className="n">03</span><div><h4>Set your angle and lie back</h4><p>Choose a recline notch, tilt the canvas to the sun, and settle into your own cool corner of the beach.</p></div></div>
            </div>
            <button type="button" className="btn btn-dark" style={{ marginTop: 28 }} onClick={openDialog}>Shop the Shade</button>
          </Reveal>
        </div>
      </section>

      {/* CINEMATIC BAND */}
      <section className="band"><Parallax className="media-track" amount={40}><Image src="/Higgsfield/opt/9.jpg" alt="SHADIEZ shades on a wide sunset beach" fill sizes="100vw" style={{ objectFit: "cover" }} /></Parallax><p className="q">Made for long afternoons and the people who don&apos;t want them to end.</p></section>

      {/* CRAFT */}
      <section className="craft pad" id="craft">
        <div className="wrap">
          <Reveal className="sec-head">
            <p className="eyebrow">Built like furniture</p>
            <h2 className="display">The details you&apos;ll only notice after years of use.</h2>
            <p className="lead">Every SHADIEZ is made from materials chosen to take salt, sun and sand — and still look good doing it.</p>
          </Reveal>
          <div className="detail-grid">
            <Reveal className="detail"><div className="ph"><Image src="/Higgsfield/opt/19.jpg" alt="Solid walnut folding frame" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The frame</span><h3>Solid oak, walnut finish</h3><p>A V-fold hardwood frame, sanded smooth and sealed — strong enough to lean on, light enough to carry.</p></div></Reveal>
            <Reveal className="detail" delay={0.08}><div className="ph"><Image src="/Higgsfield/opt/2.jpg" alt="Notched recline mechanism" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The mechanism</span><h3>Notched recline</h3><p>Brass-pinned notches hold your chosen angle without slipping — adjust it with one hand.</p></div></Reveal>
            <Reveal className="detail" delay={0.16}><div className="ph"><Image src="/Higgsfield/opt/18.jpg" alt="Marine-grade canvas weave" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The canvas</span><h3>Marine-grade weave</h3><p>Tight, UV-resistant canvas that blocks the glare and shrugs off spray, dries fast, fades slow.</p></div></Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS — removed: the 4.9 / "4,200+ beach days" rating and the three
          testimonials (Maya R. / Daniel K. / Noa B.) were all fabricated.
          TODO(real-data): rebuild from a real source — an aggregate rating from the
          review platform + verified customer quotes used with consent. Styles for
          `.reviews` / `.stars` / `.rating-line` / `.quote` remain in v2.css.
          NOTE: the "#reviews" nav + footer links were removed with this section. */}

      {/* FINAL CTA */}
      <section className="final" id="buy">
        <Parallax className="media-track" amount={30}><Image src="/Higgsfield/opt/8.jpg" alt="SHADIEZ shades on the beach at golden hour" fill sizes="100vw" style={{ objectFit: "cover" }} /></Parallax>
        <div className="inner wrap">
          <Reveal as="p" className="eyebrow" style={{ color: "var(--amber)" }}>Your patch of shade is waiting</Reveal>
          <Reveal as="h2" className="display" delay={0.08}>Claim your shade.</Reveal>
          <Reveal as="p" delay={0.16}>Premium oak-and-canvas sun-shade. Free shipping &amp; returns, limited lifetime warranty, and your color of choice — ready before your next beach day.</Reveal>
          <Reveal delay={0.24} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" className="btn btn-amber" onClick={openDialog}>Shop the Shade</button>
            <a className="btn btn-ghost" style={{ borderColor: "rgba(251,247,240,.5)", color: "var(--cream)" }} href="#colors">Explore colors</a>
          </Reveal>
        </div>
      </section>

      {/* TRUST BADGES */}
      <div className="badges">
        <div className="wrap row">
          <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg> Free shipping &amp; returns</span>
          <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" strokeLinejoin="round" /></svg> Limited lifetime warranty</span>
          <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg> Sets up in seconds</span>
          <span className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg> Folds flat to carry</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo"><Mark /> SHADIEZ</div>
              <p className="bl">Something new under the sun. Premium personal beach sun-shades, made for long afternoons.</p>
            </div>
            <div><h5>Shop</h5><ul><li><a href="#colors">Colorways</a></li><li><a href="#buy">The Shade</a></li><li><a href="#">Matching totes</a></li><li><a href="#">Gift cards</a></li></ul></div>
            <div><h5>Help</h5><ul><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">Warranty</a></li><li><a href="#">Contact</a></li></ul></div>
            <div><h5>Brand</h5><ul><li><a href="#shade">Our story</a></li><li><a href="#craft">Craft</a></li><li><a href="#">Journal</a></li></ul></div>
          </div>
          <div className="foot-bot"><span>© 2026 SHADIEZ. All rights reserved.</span><span>Privacy · Terms · Accessibility</span></div>
        </div>
      </footer>
    </div>
  );
}
