// SHADIEZ landing — HERO. Full-bleed beach photo, oversized kinetic headline,
// amber CTA. The headline does the per-word masked rise on mount.
(() => {
const { Button } = window.SHADIEZDesignSystem_4d9f8a;

function KineticLine({ text, delay }) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span style={{ display: "block", animation: `heroRise 1.4s cubic-bezier(.22,1,.36,1) ${delay}s both` }}>{text}</span>
    </span>
  );
}

function Hero({ onShop }) {
  return (
    <section id="top" className="ds-grain" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <img src="../../assets/lifestyle/beach-recline.jpg" alt="A SHADIEZ sun-shade on a bright beach"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "heroZoom 14s ease-out both" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(35,32,28,.34) 0%, rgba(35,32,28,0) 30%, rgba(35,32,28,.1) 55%, rgba(35,32,28,.72) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 32px 72px", color: "var(--cream)" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(48px, 9vw, 128px)", lineHeight: 0.92, letterSpacing: "-0.035em", margin: 0, color: "var(--cream)", textShadow: "0 2px 40px rgba(35,32,28,.45)" }}>
          <KineticLine text="Something New" delay={0.2} />
          <span style={{ display: "block", fontStyle: "italic", overflow: "hidden" }}>
            <span style={{ display: "block", animation: "heroRise 1.4s cubic-bezier(.22,1,.36,1) 0.42s both" }}>Under The Sun</span>
          </span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 32, animation: "heroFade 1s ease-out 1.1s both" }}>
          <Button variant="warm" size="lg" onClick={onShop}>Shop the Shade</Button>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 15, letterSpacing: ".02em", opacity: .92 }}>Your shade. Anywhere.</span>
        </div>
      </div>
      <a href="#shade" aria-label="Scroll" style={{ position: "absolute", left: "50%", bottom: 26, transform: "translateX(-50%)", zIndex: 3 }}>
        <span style={{ display: "block", width: 1, height: 46, background: "linear-gradient(var(--cream), transparent)", animation: "scrollCue 2.2s ease-in-out infinite" }} />
      </a>
    </section>
  );
}
window.Hero = Hero;
})();
