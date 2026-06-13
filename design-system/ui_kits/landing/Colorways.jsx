// SHADIEZ landing — THE SPECTRUM. The signature colorway selector: pick a
// canvas → the photo crossfades and the whole section floods to that exact hue.
(() => {
const { Badge, ColorwayPicker, Button, SHADIEZ_COLORWAYS } = window.SHADIEZDesignSystem_4d9f8a;

const CW = [
  { key: "Cream",      photo: "../../assets/colorways/cw-cream.jpg",          flood: "var(--cw-cream)" },
  { key: "Coral",      photo: "../../assets/colorways/cw-coral.jpg",          flood: "var(--cw-coral)" },
  { key: "Butter",     photo: "../../assets/colorways/cw-butter.jpg",         flood: "var(--cw-butter)" },
  { key: "Dusty Blue", photo: "../../assets/colorways/cw-dusty-blue.jpg",     flood: "var(--cw-dusty-blue)" },
  { key: "Navy",       photo: "../../assets/colorways/cw-navy-stripe.jpg",    flood: "var(--cw-navy)" },
  { key: "Burgundy",   photo: "../../assets/colorways/cw-burgundy-stripe.jpg",flood: "var(--cw-burgundy)" },
  { key: "Pinstripe",  photo: "../../assets/colorways/cw-pinstripe.jpg",      flood: "var(--cw-pinstripe)" },
];
const STORE = "shadiez-kit-colorway";

function Colorways({ onShop }) {
  const Reveal = window.Reveal;
  const [i, setI] = React.useState(() => {
    try { const s = localStorage.getItem(STORE); const n = CW.findIndex(c => c.key === s); return n >= 0 ? n : 0; } catch { return 0; }
  });
  const select = (idx) => { setI(idx); try { localStorage.setItem(STORE, CW[idx].key); } catch {} };
  const active = CW[i];

  return (
    <section id="colorways" style={{ position: "relative", padding: "clamp(80px,12vw,150px) 0", overflow: "hidden", transition: "background 700ms cubic-bezier(.22,1,.36,1)", background: `color-mix(in srgb, ${active.flood} 26%, var(--cream))` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <Badge tone="wood" uppercase>The spectrum</Badge>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,62px)", lineHeight: 1.0, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
              Seven canvases. One is yours.
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "center" }}>
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "16 / 11", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
              {CW.map((c, idx) => (
                <img key={c.key} src={c.photo} alt={`SHADIEZ shade — ${c.key}`}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(1.05)", transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform 1.1s cubic-bezier(.22,1,.36,1)" }} />
              ))}
              <span style={{ position: "absolute", left: 16, bottom: 14, color: "var(--cream)", fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 22, letterSpacing: ".01em", textShadow: "0 2px 14px rgba(0,0,0,.4)" }}>{active.key}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <ColorwayPicker colorways={SHADIEZ_COLORWAYS} value={i} onChange={(idx) => select(idx)} swatchSize={34} />
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.55, color: "var(--ink-60)", margin: 0, maxWidth: "34ch" }}>
                Each canvas ships with its own matching tote — pick the one that's yours.
              </p>
              <Button variant="ink" size="lg" onClick={onShop} style={{ alignSelf: "flex-start" }}>Shop {active.key}</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.Colorways = Colorways;
})();
