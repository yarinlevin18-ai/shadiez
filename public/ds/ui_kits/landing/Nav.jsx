// SHADIEZ landing — frosted nav. Transparent over the hero, frosts in on scroll.
(() => {
const { Logo, Button } = window.SHADIEZDesignSystem_4d9f8a;

function Nav({ onContact, scrolled }) {
  const links = ["Shade", "Colorways", "Details"];
  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 400ms, backdrop-filter 400ms, box-shadow 400ms, border-color 400ms",
        background: scrolled ? "rgba(251,247,240,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <nav style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px" }}>
        <a href="#top" aria-label="SHADIEZ — home" style={{ color: scrolled ? "var(--ink)" : "var(--cream)", transition: "color 400ms" }}>
          <Logo size={19} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
            {links.map((l) => (
              <li key={l}>
                <a href={"#" + l.toLowerCase()} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: scrolled ? "var(--ink)" : "rgba(251,247,240,0.92)", transition: "color 400ms, opacity 200ms" }}
                   onMouseEnter={(e)=>e.currentTarget.style.opacity=.7} onMouseLeave={(e)=>e.currentTarget.style.opacity=1}>{l}</a>
              </li>
            ))}
          </ul>
          {scrolled
            ? <Button variant="primary" size="sm" onClick={onContact}>Contact us</Button>
            : <Button variant="glass" size="sm" onClick={onContact}>Contact us</Button>}
        </div>
      </nav>
    </header>
  );
}
window.Nav = Nav;
})();
