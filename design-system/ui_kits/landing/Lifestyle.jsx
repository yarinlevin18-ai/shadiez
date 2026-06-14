// SHADIEZ landing — LIFESTYLE. A full-bleed golden-hour band, then the
// matching-tote trio ("Made for the long way home").
(() => {
const { ProductCard, Button } = window.SHADIEZDesignSystem_4d9f8a;

function Lifestyle() {
  const Reveal = window.Reveal;
  const kits = [
    { src: "../../assets/kits/kit-cream.jpg", k: "Cream" },
    { src: "../../assets/kits/kit-blue.jpg", k: "Dusty Blue" },
    { src: "../../assets/kits/kit-burgundy.jpg", k: "Burgundy" },
  ];
  return (
    <section id="details">
      {/* full-bleed band */}
      <div className="ds-grain" style={{ position: "relative", height: "70vh", minHeight: 420, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <img src="../../assets/lifestyle/golden-hour.png" alt="Two SHADIEZ shades on the beach at golden hour"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(35,32,28,.1) 0%, rgba(35,32,28,0) 40%, rgba(35,32,28,.55) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 32px 56px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(34px,5vw,72px)", lineHeight: 0.98, letterSpacing: "-0.025em", color: "var(--cream)", margin: 0, textShadow: "0 2px 30px rgba(35,32,28,.4)" }}>
            Long afternoons,<br/>claimed.
          </h2>
        </div>
      </div>

      {/* matching-tote trio */}
      <div style={{ padding: "clamp(72px,10vw,130px) 0", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.0, letterSpacing: "-0.02em", textAlign: "center", margin: "0 0 44px" }}>
              Made for the long way home.
            </h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {kits.map((x, idx) => (
              <Reveal key={x.k} delay={idx * 0.08}>
                <ProductCard image={x.src} eyebrow="Shade + tote" name={x.k} meta="Matching canvas tote" ratio="1 / 1" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Lifestyle = Lifestyle;
})();
