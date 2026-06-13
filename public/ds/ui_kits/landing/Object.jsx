// SHADIEZ landing — THE OBJECT. Editorial split: words + a detail collage.
(() => {
const { Badge, SpecRow, Button } = window.SHADIEZDesignSystem_4d9f8a;

function Reveal({ children, delay = 0, style }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }); }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(28px)", transition: `opacity 1.1s cubic-bezier(.22,1,.36,1) ${delay}s, transform 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`, ...style }}>{children}</div>
  );
}
window.Reveal = Reveal;

function ObjectSection({ onShop }) {
  return (
    <section id="shade" style={{ padding: "clamp(80px,12vw,150px) 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <Reveal><Badge tone="wood" uppercase>The object</Badge></Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(34px,4.4vw,60px)", lineHeight: 1.0, letterSpacing: "-0.025em", margin: "16px 0 0" }}>
              Built like furniture.<br/>Carried like a bag.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.55, color: "var(--ink-60)", maxWidth: "44ch", margin: "20px 0 0" }}>
              A walnut frame and cream canvas that props up at an adjustable notch — shading your head and shoulders while you lie on your towel. You don't sit in it. It shades you.
            </p>
          </Reveal>
          <Reveal delay={0.22} style={{ marginTop: 26 }}>
            <SpecRow items={["Solid walnut", "Cream canvas", "Folds flat"]} />
          </Reveal>
          <Reveal delay={0.3} style={{ marginTop: 30 }}>
            <Button variant="warm" size="lg" onClick={onShop}>Shop the Shade</Button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14, aspectRatio: "1 / 1" }}>
            <figure style={{ margin: 0, gridRow: "1 / 3", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
              <img src="../../assets/details/notch-pin.png" alt="Brass pivot pin and notched recline detail" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </figure>
            <figure style={{ margin: 0, borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
              <img src="../../assets/details/corner.png" alt="Brass-screwed frame corner" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </figure>
            <figure style={{ margin: 0, borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}>
              <img src="../../assets/details/frame-joint.png" alt="The folding frame joint and canvas" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.ObjectSection = ObjectSection;
})();
