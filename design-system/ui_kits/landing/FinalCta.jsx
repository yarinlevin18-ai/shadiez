// SHADIEZ landing — FINAL CTA + footer. Bright amber sun-field finale that
// bookends the hero, then the footer.
(() => {
const { Logo, Button, WaveMark } = window.SHADIEZDesignSystem_4d9f8a;

function FinalCta({ onShop }) {
  const Reveal = window.Reveal;
  return (
    <React.Fragment>
      <section style={{ position: "relative", background: "var(--amber)", overflow: "hidden", padding: "clamp(90px,13vw,170px) 0" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 50% at 50% 30%, rgba(255,233,180,.55), transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(44px,8vw,108px)", lineHeight: 0.92, letterSpacing: "-0.035em", color: "var(--ink)", margin: 0 }}>
              Find your shade.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ marginTop: 30 }}>
              <Button variant="ink" size="lg" onClick={onShop}>Shop the Shade</Button>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <img src="../../assets/product/lineup.png" alt="The full SHADIEZ lineup — every colorway with its matching tote"
              style={{ display: "block", width: "min(760px, 90%)", margin: "44px auto 0", filter: "drop-shadow(0 30px 50px rgba(60,40,20,.28))" }} />
          </Reveal>
        </div>
      </section>

      <footer style={{ background: "var(--ink)", color: "var(--cream)", padding: "64px 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
            <div>
              <Logo size={20} color="var(--cream)" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(251,247,240,.6)", margin: "14px 0 0", maxWidth: "26ch" }}>Something New Under The Sun.</p>
            </div>
            {[
              { h: "Shop", items: ["Colorways", "The shade", "Totes"] },
              { h: "Help", items: ["Shipping", "Returns", "Warranty"] },
              { h: "Brand", items: ["Craft", "Journal", "Contact"] },
            ].map((col) => (
              <div key={col.h}>
                <h5 style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(251,247,240,.55)", margin: "0 0 14px" }}>{col.h}</h5>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.items.map((it) => (
                    <li key={it}><a href="#top" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(251,247,240,.82)" }}
                      onMouseEnter={(e)=>e.currentTarget.style.color="var(--amber)"} onMouseLeave={(e)=>e.currentTarget.style.color="rgba(251,247,240,.82)"}>{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 48, paddingTop: 22, borderTop: "1px solid rgba(251,247,240,.14)", fontFamily: "var(--font-body)", fontSize: 12.5, color: "rgba(251,247,240,.55)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><WaveMark size={16} color="rgba(251,247,240,.55)" /> © 2026 SHADIEZ</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
window.FinalCta = FinalCta;
})();
