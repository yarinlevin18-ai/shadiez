"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./v2.css";

const COLORS = [
  { key: "Cream", hex: "#F8F6EF", wash: "transparent", washOp: 0, desc: "The original. Warm off-white canvas on natural walnut — the hero colorway, quiet and timeless." },
  { key: "Coral", hex: "#D38773", wash: "#D38773", washOp: 0.55, desc: "Sun-faded terracotta. Warm, retro and unmistakably coastal." },
  { key: "Navy", hex: "#1F3A5F", wash: "#1F3A5F", washOp: 0.6, desc: "Deep marine navy — crisp against the sand, classic against the wood." },
  { key: "Burgundy", hex: "#7C3B41", wash: "#7C3B41", washOp: 0.55, desc: "Rich oxblood stripe energy. The grown-up red of the lineup." },
  { key: "Teal", hex: "#3E7B73", wash: "#3E7B73", washOp: 0.5, desc: "Solid sea-glass teal — cool, calm, a little bit Riviera." },
  { key: "Butter", hex: "#EBDAB0", wash: "#EBDAB0", washOp: 0.4, desc: "Soft butter yellow. The warmest light of the day, in canvas form." },
];

const Star = ({ s = 24 }: { s?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
    <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 6.9L12 17.8 5.2 21l1.5-6.9L1.5 9.3l7-.8z" />
  </svg>
);

const Mark = () => (
  <svg viewBox="0 0 40 40" fill="none">
    <path d="M4 14c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 22c5-6 11 6 16 0s11 6 16 0" stroke="#E8A04A" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 30c5-6 11 6 16 0s11 6 16 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export default function V2() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hdr = root.querySelector("header");
    const parallax = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const onScroll = () => {
      if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 40);
      const vh = window.innerHeight;
      parallax.forEach((el) => {
        const r = el.getBoundingClientRect();
        const off = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translateY(${off * -0.06}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.14 }
    );
    root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const c = COLORS[active];

  return (
    <div className="v2root" ref={rootRef}>
      <div className="v2-grain" />

      {/* HEADER */}
      <header>
        <div className="wrap bar">
          <a className="logo" href="#top"><Mark />SHADIEZ</a>
          <nav className="links">
            <a href="#shade">The Shade</a>
            <a href="#colors">Colors</a>
            <a href="#craft">Craft</a>
            <a href="#reviews">Reviews</a>
          </nav>
          <div className="header-cta">
            <a className="btn btn-ghost" href="#colors">Pick your color</a>
            <a className="btn btn-amber" href="#buy">Shop the Shade</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-media"><div className="media-track" data-parallax><Image src="/Higgsfield/opt/1.jpg" alt="SHADIEZ personal beach sun-shade on warm sand" fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div></div>
        <div className="hero-inner">
          <div className="wrap">
            <p className="eyebrow reveal in">The personal beach sun-shade</p>
            <h1 className="display reveal in d1">Something New<br />Under The Sun</h1>
            <p className="sub reveal in d2">A premium walnut-and-canvas shade that folds flat, sets up in seconds, and hands you your own patch of shade — anywhere the sun finds you.</p>
            <div className="hero-actions reveal in d3">
              <a className="btn btn-amber" href="#buy">Shop the Shade</a>
              <a className="btn btn-ghost" style={{ borderColor: "rgba(251,247,240,.5)", color: "var(--cream)" }} href="#shade">See how it works</a>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll</span><span className="line" /></div>
      </section>

      {/* PRESS */}
      <div className="press">
        <div className="wrap row">
          <span className="lbl">As seen in <span className="ph-flag">placeholder</span></span>
          <div className="names"><span>Vogue Living</span><span>Monocle</span><span>Condé Nast Traveler</span><span>Belle</span><span>Kinfolk</span></div>
        </div>
      </div>

      {/* STATEMENT */}
      <section className="statement pad" id="shade">
        <div className="wrap grid">
          <div className="reveal">
            <p className="eyebrow">Why SHADIEZ</p>
            <h2 className="display">They said there&apos;s nothing new under the sun.<br /><em>So we made shade you can carry.</em></h2>
            <p className="lead" style={{ color: "var(--ink-60)" }}>SHADIEZ isn&apos;t a chair — it&apos;s your own pocket of shade. A foldable oak frame and cream canvas prop up at the angle you choose, shading your head and shoulders while you lie back on the sand. No poles to bury, no tent to wrestle. Open it, recline it, disappear into the cool.</p>
          </div>
          <div className="figure reveal d1"><Image src="/Higgsfield/opt/12.jpg" alt="SHADIEZ shade casting cool shadow on rippled sand" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} /></div>
        </div>
        <div className="wrap">
          <div className="props">
            <div className="prop reveal">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeLinecap="round" /></svg></div>
              <h3>Blocks the sun</h3>
              <p>Dense marine-grade canvas throws real, deep shade over your head and upper body — not a thin patch of dappled light.</p>
            </div>
            <div className="prop reveal d1">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 18L14 6M14 6l-1 5M14 6l-5 1" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 20h16" strokeLinecap="round" /></svg></div>
              <h3>Adjustable angle</h3>
              <p>Notched recline positions let you dial the shade exactly where the sun is — and move it as the afternoon does.</p>
            </div>
            <div className="prop reveal d2">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7l9-4 9 4-9 4-9-4z" strokeLinejoin="round" /><path d="M3 7v6l9 4 9-4V7" strokeLinejoin="round" /></svg></div>
              <h3>Folds flat, sets up in seconds</h3>
              <p>Collapses to a slim board that drops in the matching tote. From bag to shade in one easy motion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLORWAYS */}
      <section className="colorways pad" id="colors">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Pick your color</p>
            <h2 className="display">One shade, six ways to catch the light.</h2>
            <p className="lead">Every canvas comes with its own matching tote. Tap a color to preview it.</p>
          </div>
          <div className="cw-grid">
            <div className="cw-stage reveal">
              <div className="media-track" data-parallax><Image src="/Higgsfield/opt/13.jpg" alt={`SHADIEZ shade — ${c.key} colorway`} fill sizes="(max-width:900px) 100vw, 46vw" style={{ objectFit: "cover" }} /></div>
              <div className="cw-wash" style={{ background: c.wash, opacity: c.washOp }} />
              <div className="cw-tag"><span className="dot" style={{ background: c.hex }} /><span>{c.key}</span></div>
            </div>
            <div className="cw-panel reveal d1">
              <h3>{c.key}</h3>
              <p className="desc">{c.desc}</p>
              <div className="swatches" role="listbox" aria-label="Colorways">
                {COLORS.map((col, i) => (
                  <button key={col.key} className="swatch" style={{ background: col.hex }} role="option"
                    aria-label={col.key} aria-selected={i === active} onClick={() => setActive(i)} />
                ))}
              </div>
              <div className="cw-tote"><Image src="/Higgsfield/opt/totes.jpg" alt="Matching SHADIEZ totes" width={64} height={64} sizes="64px" /><span>Ships with a matching canvas tote in every color.</span></div>
              <p className="cw-note">Live colorway preview is a styling approximation. Final swatches sampled from real canvas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="life pad">
        <div className="wrap grid">
          <div className="figure reveal"><Image src="/Higgsfield/opt/7.jpg" alt="Person carrying the folded SHADIEZ shade and tote down the beach" fill sizes="(max-width:900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div>
          <div className="reveal d1">
            <p className="eyebrow">Pack it. Carry it. Claim your spot.</p>
            <h2 className="display">Your shade goes where you go.</h2>
            <div className="steps">
              <div className="step"><span className="n">01</span><div><h4>Sling it over your shoulder</h4><p>Folded flat in its tote, SHADIEZ carries like a portfolio — down the boardwalk, onto the sand, into the car.</p></div></div>
              <div className="step"><span className="n">02</span><div><h4>Unfold in seconds</h4><p>The frame springs open and locks. No stakes, no instructions, no sandy struggle.</p></div></div>
              <div className="step"><span className="n">03</span><div><h4>Set your angle and lie back</h4><p>Choose a recline notch, tilt the canvas to the sun, and settle into your own cool corner of the beach.</p></div></div>
            </div>
            <a className="btn btn-dark" href="#buy" style={{ marginTop: 28 }}>Shop the Shade</a>
          </div>
        </div>
      </section>

      {/* CINEMATIC BAND */}
      <section className="band"><div className="media-track" data-parallax><Image src="/Higgsfield/opt/9.jpg" alt="SHADIEZ shades on a wide sunset beach" fill sizes="100vw" style={{ objectFit: "cover" }} /></div><p className="q">Made for long afternoons and the people who don&apos;t want them to end.</p></section>

      {/* CRAFT */}
      <section className="craft pad" id="craft">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Built like furniture</p>
            <h2 className="display">The details you&apos;ll only notice after years of use.</h2>
            <p className="lead">Every SHADIEZ is made from materials chosen to take salt, sun and sand — and still look good doing it.</p>
          </div>
          <div className="detail-grid">
            <div className="detail reveal"><div className="ph"><Image src="/Higgsfield/opt/19.jpg" alt="Solid walnut folding frame" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The frame</span><h3>Solid oak, walnut finish</h3><p>A V-fold hardwood frame, sanded smooth and sealed — strong enough to lean on, light enough to carry.</p></div></div>
            <div className="detail reveal d1"><div className="ph"><Image src="/Higgsfield/opt/2.jpg" alt="Notched recline mechanism" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The mechanism</span><h3>Notched recline</h3><p>Brass-pinned notches hold your chosen angle without slipping — adjust it with one hand.</p></div></div>
            <div className="detail reveal d2"><div className="ph"><Image src="/Higgsfield/opt/18.jpg" alt="Marine-grade canvas weave" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div><div className="cap"><span className="k">The canvas</span><h3>Marine-grade weave</h3><p>Tight, UV-resistant canvas that blocks the glare and shrugs off spray, dries fast, fades slow.</p></div></div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews pad" id="reviews">
        <div className="wrap">
          <div className="reveal">
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
            <p className="rating-line">4.9 out of 5 <span>· from 4,200+ beach days <span className="ph-flag">placeholder</span></span></p>
          </div>
          <div className="quotes">
            {[
              { t: "Set it up in literally ten seconds and didn't move from under it all afternoon. It's the most beautiful thing on the beach.", n: "Maya R.", l: "Tel Aviv", a: "M" },
              { t: "Finally a beach shade that doesn't look like camping gear. The walnut and canvas feel like real furniture.", n: "Daniel K.", l: "Herzliya", a: "D" },
              { t: "Packs flat in the trunk, opens in a second, and the angle adjustment actually works. Bought a second one for my partner.", n: "Noa B.", l: "Caesarea", a: "N" },
            ].map((q, i) => (
              <div className={`quote reveal${i ? ` d${i}` : ""}`} key={q.n}>
                <div className="qs">{Array.from({ length: 5 }).map((_, j) => <Star key={j} s={16} />)}</div>
                <p>&ldquo;{q.t}&rdquo;</p>
                <div className="who"><span className="av">{q.a}</span><div><b>{q.n}</b><small>{q.l}</small></div></div>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 26, fontSize: 13 }}><span className="ph-flag">placeholder</span> Reviews are sample copy — swap for real testimonials before launch.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="buy">
        <div className="media-track" data-parallax><Image src="/Higgsfield/opt/8.jpg" alt="SHADIEZ shades on the beach at golden hour" fill sizes="100vw" style={{ objectFit: "cover" }} /></div>
        <div className="inner wrap">
          <p className="eyebrow reveal" style={{ color: "var(--amber)" }}>Your patch of shade is waiting</p>
          <h2 className="display reveal d1">Claim your shade.</h2>
          <p className="reveal d2">Premium oak-and-canvas sun-shade. Free shipping &amp; returns, limited lifetime warranty, and your color of choice — ready before your next beach day.</p>
          <div className="reveal d3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-amber" href="#">Shop the Shade</a>
            <a className="btn btn-ghost" style={{ borderColor: "rgba(251,247,240,.5)", color: "var(--cream)" }} href="#colors">Explore colors</a>
          </div>
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
            <div><h5>Brand</h5><ul><li><a href="#shade">Our story</a></li><li><a href="#craft">Craft</a></li><li><a href="#reviews">Reviews</a></li><li><a href="#">Journal</a></li></ul></div>
          </div>
          <div className="foot-bot"><span>© 2026 SHADIEZ. All rights reserved.</span><span>Privacy · Terms · Accessibility</span></div>
        </div>
      </footer>
    </div>
  );
}
