"use client";

import { useRef, useState, type ReactNode } from "react";
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

/* ───────────────────────────────────────────────────────────────────────────
   SHADIEZ — /v2 "Catch the Light"
   Premium, photo-led, low-copy. Every product image is the REAL exact model
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

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── motion primitives (kept from the studio idiom; honor reduced-motion) ── */
type RevealTag = "div" | "p" | "h1" | "h2" | "span";
function Reveal({
  as = "div", className, delay = 0, load = false, style, children,
}: { as?: RevealTag; className?: string; delay?: number; load?: boolean; style?: React.CSSProperties; children: ReactNode; }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  const initial = reduce ? false : { opacity: 0, y: 30 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.9, ease: EASE, delay };
  if (load) return <M className={className} style={style} initial={initial} animate={shown} transition={transition}>{children}</M>;
  return <M className={className} style={style} initial={initial} whileInView={shown} viewport={{ once: true, amount: 0.2 }} transition={transition}>{children}</M>;
}

function Parallax({ className, amount = 60, children }: { className?: string; amount?: number; children: ReactNode; }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return <motion.div ref={ref} className={className} style={{ y }}>{children}</motion.div>;
}

const Mark = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden>
    <path d="M4 14c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 22c5-6 11 6 16 0s11 6 16 0" stroke="#E8A04A" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 30c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/* ── Glare → Shade: scroll crossfades a hot overlay into cool shade ── */
function GlareShade() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const hot = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.2, 0]);
  const cool = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.25, 0.55]);
  return (
    <section className="glare" ref={ref}>
      <div className="glare-media"><Image src="/v2/beach-band.jpg" alt="SHADIEZ sun-shades on a bright beach" fill sizes="100vw" style={{ objectFit: "cover" }} /></div>
      <motion.div className="glare-hot" style={reduce ? { opacity: 0.3 } : { opacity: hot }} />
      <motion.div className="glare-cool" style={reduce ? { opacity: 0.4 } : { opacity: cool }} />
      <div className="glare-copy"><Reveal as="h2" className="display">The sun is relentless.<br /><em>Your shade isn&apos;t.</em></Reveal></div>
    </section>
  );
}

export default function V2() {
  const { openDialog } = useLeadDialog();
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const select = (i: number) => setActive(i);
  const c = COLORS[active];

  return (
    <div className="v2root">
      <div className="v2-grain" />

      {/* HEADER */}
      <header className={scrolled ? "scrolled" : undefined}>
        <div className="wrap bar">
          <a className="logo" href="#top" aria-label="SHADIEZ home"><Mark />SHADIEZ</a>
          <nav className="links">
            <a href="#object">Shade</a>
            <a href="#colors">Colors</a>
            <a href="#detail">Craft</a>
          </nav>
          <button type="button" className="btn btn-amber" onClick={openDialog}>Shop</button>
        </div>
      </header>

      {/* 1 · HERO */}
      <section className="hero" id="top">
        <div className="hero-media"><Parallax className="media-track" amount={70}><Image src="/v2/beach-recline.jpg" alt="A SHADIEZ sun-shade on a bright beach" fill priority sizes="100vw" style={{ objectFit: "cover" }} /></Parallax></div>
        <div className="hero-inner wrap">
          <h1 className="hero-h1 display">
            <Reveal as="span" load>Something New</Reveal>
            <Reveal as="span" load delay={0.12}>Under The Sun</Reveal>
          </h1>
          <Reveal className="hero-foot" load delay={0.3}>
            <button type="button" className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</button>
            <span className="hero-kicker">Your shade. Anywhere.</span>
          </Reveal>
        </div>
        <a href="#object" className="scroll-cue" aria-label="Scroll"><span className="line" /></a>
      </section>

      {/* 2 · THE OBJECT */}
      <section className="object pad" id="object">
        <div className="wrap object-grid">
          <div className="object-words">
            <Reveal as="p" className="eyebrow">The object</Reveal>
            <Reveal as="h2" className="display">Built like furniture.<br />Carried like a bag.</Reveal>
            <Reveal className="spec-row">
              <span>Solid oak</span><i /><span>Canvas</span><i /><span>Folds flat</span>
            </Reveal>
          </div>
          <Reveal className="object-stage" delay={0.1}>
            <Parallax amount={26}><Image src="/v2/studio.jpg" alt="The SHADIEZ sun-shade — walnut frame, cream canvas" width={1500} height={1500} sizes="(max-width:900px) 90vw, 620px" /></Parallax>
          </Reveal>
        </div>
      </section>

      {/* 3 · GLARE → SHADE */}
      <GlareShade />

      {/* 4 · THE SPECTRUM (colorways) */}
      <section className="spectrum pad" id="colors" style={{ "--flood": c.flood } as React.CSSProperties}>
        <div className="wrap">
          <div className="spectrum-head">
            <Reveal as="p" className="eyebrow">The spectrum</Reveal>
            <Reveal as="h2" className="display">Seven canvases.<br />One is yours.</Reveal>
          </div>
          <div className="spectrum-stage">
            <Reveal className="spectrum-photo">
              {COLORS.map((col, i) => (
                <Image key={col.key} src={col.photo} alt={`SHADIEZ shade — ${col.key}`} fill sizes="(max-width:900px) 92vw, 760px"
                  style={{ objectFit: "cover", opacity: i === active ? 1 : 0, transition: "opacity .5s ease" }} priority={i === 0} />
              ))}
              <span className="spectrum-name">{c.key}</span>
            </Reveal>
            <div className="swatches" role="listbox" aria-label="Colorways">
              {COLORS.map((col, i) => (
                <button key={col.key} type="button" role="option" aria-selected={i === active} aria-label={col.key}
                  className="swatch" style={{ background: col.dot }} onClick={() => select(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 · IN THE WILD */}
      <section className="wild">
        <div className="wild-band">
          <Parallax className="media-track" amount={50}><Image src="/v2/beach-dusk.jpg" alt="SHADIEZ on the beach at golden hour" fill sizes="100vw" style={{ objectFit: "cover" }} /></Parallax>
          <Reveal as="p" className="wild-line display">Long afternoons,<br />claimed.</Reveal>
        </div>
      </section>

      {/* 6 · THE DETAIL */}
      <section className="detail pad" id="detail">
        <div className="wrap detail-grid">
          <Reveal className="detail-photo"><Parallax amount={24}><Image src="/v2/detail.jpg" alt="The notched recline mechanism, brass pins, walnut frame" width={1500} height={1500} sizes="(max-width:900px) 90vw, 560px" /></Parallax></Reveal>
          <div className="detail-words">
            <Reveal as="p" className="eyebrow">The craft</Reveal>
            <Reveal as="h2" className="display">The parts you&apos;ll thank us for in five summers.</Reveal>
            <Reveal className="detail-list">
              <span>The notch</span><span>The hinge</span><span>The weave</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 · THE KIT */}
      <section className="kit pad">
        <div className="wrap">
          <Reveal as="h2" className="display kit-title">Every shade,<br />a matching tote.</Reveal>
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
        </div>
      </section>

      {/* 8 · QUIET PROOF */}
      <section className="proof pad">
        <div className="wrap">
          <Reveal as="p" className="proof-quote display">&ldquo;The most beautiful thing on the beach — and I didn&apos;t move from under it all afternoon.&rdquo;</Reveal>
          <Reveal className="proof-by">Maya R. · Tel Aviv <span className="ph-flag">placeholder</span></Reveal>
        </div>
      </section>

      {/* 9 · CLOSE */}
      <section className="close" id="buy">
        <div className="close-media"><Parallax className="media-track" amount={50}><Image src="/v2/beach-recline.jpg" alt="A SHADIEZ sun-shade at the water's edge" fill sizes="100vw" style={{ objectFit: "cover" }} /></Parallax></div>
        <div className="close-inner wrap">
          <Reveal as="h2" className="display">Find your shade.</Reveal>
          <Reveal delay={0.1}><button type="button" className="btn btn-amber lg" onClick={openDialog}>Shop the Shade</button></Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot-grid">
          <div>
            <div className="logo"><Mark /> SHADIEZ</div>
            <p className="bl">Something new under the sun.</p>
          </div>
          <div><h5>Shop</h5><ul><li><a href="#colors">Colorways</a></li><li><a href="#object">The shade</a></li><li><a href="#kit">Totes</a></li></ul></div>
          <div><h5>Help</h5><ul><li><a href="#">Shipping</a></li><li><a href="#">Returns</a></li><li><a href="#">Warranty</a></li></ul></div>
          <div><h5>Brand</h5><ul><li><a href="#detail">Craft</a></li><li><a href="#">Journal</a></li><li><a href="#">Contact</a></li></ul></div>
        </div>
        <div className="wrap foot-bot"><span>© 2026 SHADIEZ</span><span>Privacy · Terms</span></div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="mobile-cta"><button type="button" className="btn btn-amber" onClick={openDialog}>Shop the Shade — pick your color</button></div>
    </div>
  );
}
