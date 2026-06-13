// SHADIEZ — mobile shop, built to design/MOBILE_SPEC.md. Lives inside the iOS
// frame's scroll area. Sections diverge for phone: stacked showcase, lifestyle
// carousel, colorway chip row, details accordion, sticky bottom CTA + lead sheet.
(() => {
const A = "../../assets";
const COLORWAYS = [
  { key: "Cream",      photo: A + "/colorways/cw-cream.jpg",          dot: "var(--cw-cream)" },
  { key: "Coral",      photo: A + "/colorways/cw-coral.jpg",          dot: "var(--cw-coral)" },
  { key: "Butter",     photo: A + "/colorways/cw-butter.jpg",         dot: "var(--cw-butter)" },
  { key: "Dusty Blue", photo: A + "/colorways/cw-dusty-blue.jpg",     dot: "var(--cw-dusty-blue)" },
  { key: "Navy",       photo: A + "/colorways/cw-navy-stripe.jpg",    dot: "var(--cw-navy)" },
  { key: "Burgundy",   photo: A + "/colorways/cw-burgundy-stripe.jpg",dot: "var(--cw-burgundy)" },
  { key: "Pinstripe",  photo: A + "/colorways/cw-pinstripe.jpg",      dot: "var(--cw-pinstripe)" },
];
const LIFESTYLE = [A + "/lifestyle/beach-recline.jpg", A + "/lifestyle/golden-hour.png", A + "/lifestyle/beach-band.jpg", A + "/lifestyle/beach-dusk.jpg"];
const DETAILS = [
  { t: "The notch", d: "Brass pins drop into carved notches — set your recline in seconds and it holds.", img: A + "/details/notch-pin.png" },
  { t: "The canvas", d: "Heavyweight cream canvas, embroidered with the SHADIEZ mark. Soft, breathable, made for sun.", img: A + "/details/detail.jpg" },
  { t: "The frame", d: "Solid walnut, folds flat to carry on your shoulder. Built like furniture.", img: A + "/details/frame-joint.png" },
];

function MobileApp() {
  const NS = window.SHADIEZDesignSystem_4d9f8a;
  const { Logo, Button, Badge, SpecRow } = NS;
  const [cw, setCw] = React.useState(0);
  const [openDetail, setOpenDetail] = React.useState(0);
  const [lead, setLead] = React.useState(false);
  const active = COLORWAYS[cw];

  const Section = ({ children, style }) => (
    <section style={{ padding: "44px 22px", ...style }}>{children}</section>
  );

  return (
    <div style={{ height: "100%", position: "relative", overflow: "hidden", background: "var(--cream)" }}>
      <div style={{ height: "100%", overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 76, fontFamily: "var(--font-body)", color: "var(--ink)" }}>

        {/* HERO */}
        <section style={{ position: "relative", height: 520, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <img src={A + "/lifestyle/beach-recline.jpg"} alt="A SHADIEZ sun-shade on a bright beach" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(35,32,28,.42) 0%, rgba(35,32,28,0) 26%, rgba(35,32,28,.05) 50%, rgba(35,32,28,.74) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, paddingTop: 58, display: "flex", justifyContent: "center", color: "var(--cream)" }}>
            <Logo size={17} color="var(--cream)" />
          </div>
          <div style={{ position: "relative", zIndex: 2, padding: "0 22px 30px", color: "var(--cream)" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 46, lineHeight: 0.94, letterSpacing: "-0.03em", margin: 0, color: "var(--cream)", textShadow: "0 2px 30px rgba(35,32,28,.4)" }}>
              Something New<br/><span style={{ fontStyle: "italic" }}>Under The Sun</span>
            </h1>
            <p style={{ fontSize: 14.5, opacity: .92, margin: "12px 0 18px" }}>Your shade. Anywhere.</p>
            <Button variant="warm" size="md" fullWidth onClick={() => setLead(true)}>Shop the Shade</Button>
          </div>
        </section>

        {/* THE OBJECT — stacked */}
        <Section>
          <img src={A + "/details/notch-pin.png"} alt="Brass pin and notched recline detail" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)", display: "block" }} />
          <div style={{ marginTop: 22 }}>
            <Badge tone="wood" uppercase>The object</Badge>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 30, lineHeight: 1.0, letterSpacing: "-0.02em", margin: "12px 0 0" }}>Built like furniture. Carried like a bag.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--ink-60)", margin: "12px 0 18px" }}>
              A walnut frame and cream canvas that props up at an adjustable notch — shading your head and shoulders while you lie on your towel.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {["Blocks the sun", "Adjustable recline angle", "Folds flat & travels", "Sets up in seconds"].map((s) => (
                <li key={s} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 15.5 }}>
                  <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: "var(--amber)", flexShrink: 0 }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* LIFESTYLE — horizontal scroll-snap carousel */}
        <div style={{ padding: "8px 0 44px" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", margin: "0 22px 16px" }}>Long afternoons, claimed.</h3>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", padding: "0 22px", scrollbarWidth: "none" }}>
            {LIFESTYLE.map((src, i) => (
              <img key={i} src={src} alt="SHADIEZ in use on the beach" style={{ scrollSnapAlign: "center", flex: "0 0 auto", width: 248, height: 320, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", display: "block" }} />
            ))}
          </div>
        </div>

        {/* THE SPECTRUM — featured photo + horizontal swatch chips */}
        <Section style={{ background: `color-mix(in srgb, ${active.dot} 26%, var(--cream))`, transition: "background 600ms cubic-bezier(.22,1,.36,1)" }}>
          <Badge tone="wood" uppercase>The spectrum</Badge>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 30, lineHeight: 1.0, letterSpacing: "-0.02em", margin: "12px 0 18px" }}>Seven canvases. One is yours.</h2>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/12", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
            {COLORWAYS.map((c, i) => (
              <img key={c.key} src={c.photo} alt={`SHADIEZ — ${c.key}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === cw ? 1 : 0, transition: "opacity .6s cubic-bezier(.22,1,.36,1)" }} />
            ))}
            <span style={{ position: "absolute", left: 14, bottom: 12, color: "var(--cream)", fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 19, textShadow: "0 2px 12px rgba(0,0,0,.4)" }}>{active.key}</span>
          </div>
          <div role="listbox" aria-label="Colorways" style={{ display: "flex", gap: 9, overflowX: "auto", padding: "16px 0 2px", scrollbarWidth: "none" }}>
            {COLORWAYS.map((c, i) => (
              <button key={c.key} role="option" aria-selected={i === cw} onClick={() => setCw(i)}
                style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 13px 8px 9px", borderRadius: "var(--radius-pill)", cursor: "pointer",
                  background: i === cw ? "var(--ink)" : "var(--cream)", color: i === cw ? "var(--cream)" : "var(--ink)",
                  border: `1px solid ${i === cw ? "var(--ink)" : "var(--border)"}`, fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>
                <span style={{ width: 16, height: 16, borderRadius: "999px", background: c.dot, border: "1px solid rgba(35,32,28,.2)" }} />
                {c.key}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <Button variant="ink" size="md" fullWidth onClick={() => setLead(true)}>Shop {active.key}</Button>
          </div>
        </Section>

        {/* DETAILS — tap-through accordion */}
        <Section style={{ background: "var(--sand)" }}>
          <Badge tone="wood" uppercase>The craft</Badge>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 30, letterSpacing: "-0.02em", margin: "12px 0 18px" }}>In the details.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DETAILS.map((d, i) => {
              const open = openDetail === i;
              return (
                <div key={d.t} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <button onClick={() => setOpenDetail(open ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 16px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16.5, color: "var(--ink)", textAlign: "left" }}>
                    {d.t}
                    <span style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .3s", color: "var(--wood)", fontSize: 22, lineHeight: 1 }}>+</span>
                  </button>
                  <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.22,1,.36,1)" }}>
                    <div style={{ padding: "0 16px 16px" }}>
                      <img src={d.img} alt={d.t} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: "var(--radius-sm)", display: "block", marginBottom: 12 }} />
                      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-60)", margin: 0 }}>{d.d}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* FINAL CTA */}
        <section style={{ position: "relative", background: "var(--amber)", padding: "52px 22px 56px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 50% at 50% 24%, rgba(255,233,180,.55), transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 46, lineHeight: 0.94, letterSpacing: "-0.03em", color: "var(--ink)", margin: "0 0 22px" }}>Find your shade.</h2>
            <Button variant="ink" size="md" onClick={() => setLead(true)}>Shop the Shade</Button>
            <img src={A + "/product/lineup.png"} alt="The full SHADIEZ lineup" style={{ width: "100%", margin: "32px auto 0", display: "block", filter: "drop-shadow(0 20px 36px rgba(60,40,20,.26))" }} />
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "34px 22px 30px" }}>
          <Logo size={18} color="var(--cream)" />
          <p style={{ fontSize: 13.5, color: "rgba(251,247,240,.6)", margin: "12px 0 18px" }}>Something New Under The Sun.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 20px", fontSize: 13.5, color: "rgba(251,247,240,.8)" }}>
            {["Colorways", "The shade", "Totes", "Shipping", "Returns", "Contact"].map((l) => <span key={l}>{l}</span>)}
          </div>
          <p style={{ fontSize: 11.5, color: "rgba(251,247,240,.5)", margin: "22px 0 0" }}>© 2026 SHADIEZ · Privacy · Terms</p>
        </footer>
      </div>

      {/* STICKY BOTTOM CTA BAR */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 40, padding: "12px 16px calc(12px + env(safe-area-inset-bottom, 18px))", background: "rgba(251,247,240,.82)", backdropFilter: "blur(16px) saturate(1.4)", WebkitBackdropFilter: "blur(16px) saturate(1.4)", borderTop: "1px solid var(--border)" }}>
        <Button variant="warm" size="md" fullWidth onClick={() => setLead(true)}>Shop the Shade — pick your color</Button>
      </div>

      {/* LEAD SHEET (bottom sheet) */}
      <LeadSheet open={lead} onClose={() => setLead(false)} NS={NS} />
    </div>
  );
}

function LeadSheet({ open, onClose, NS }) {
  const { Field, Input, Button } = NS;
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (!open) { const t = setTimeout(() => setSent(false), 250); return () => clearTimeout(t); } }, [open]);
  return (
    <React.Fragment>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(35,32,28,.45)", backdropFilter: "blur(3px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .3s" }} />
      <div role="dialog" aria-modal="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 61, background: "var(--cream)", borderRadius: "20px 20px 0 0", boxShadow: "0 -20px 50px rgba(20,12,6,.4)", transform: open ? "translateY(0)" : "translateY(110%)", transition: "transform .42s cubic-bezier(.22,1,.36,1)", paddingBottom: 24 }}>
        <div style={{ height: 3, background: "var(--wood-bar)" }} />
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 2px" }}><span style={{ width: 38, height: 4, borderRadius: 99, background: "rgba(35,32,28,.2)" }} /></div>
        <div style={{ padding: "10px 22px 0" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "18px 0 8px" }}>
              <div style={{ width: 46, height: 46, borderRadius: 99, background: "rgba(31,58,95,.1)", color: "var(--navy)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 26, margin: 0 }}>Message sent.</h3>
              <p style={{ fontSize: 14, color: "var(--ink-60)", margin: "6px 0 0" }}>We'll be in touch shortly.</p>
            </div>
          ) : (
            <React.Fragment>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: 26, margin: 0 }}>Get in touch</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-60)", margin: "4px 0 16px" }}>Leave your details and we'll get back to you shortly.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                <Field label="Name" htmlFor="mn" required><Input id="mn" /></Field>
                <Field label="Email" htmlFor="me" required><Input id="me" type="email" /></Field>
                <Button type="submit" variant="primary" size="md" fullWidth>Send message</Button>
              </form>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

window.MobileApp = MobileApp;
})();
