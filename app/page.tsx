import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProductShowcase } from "@/components/product-showcase";
import { LifestyleBand } from "@/components/lifestyle-band";
import { TaglineMarquee } from "@/components/tagline-marquee";
import { CollectionsGrid } from "@/components/collections-grid";
import { DetailsSection } from "@/components/details-section";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SectionReveal } from "@/components/patterns/section-reveal";
import { SectionTransition } from "@/components/patterns/section-transition";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      {/* Hero: drives its own scroll-linked entrance + exit (heroFade / heroExitY). */}
      <HeroSection />

      {/* Each section now settles in on arrival and recedes on exit as it passes the
          viewport. Sections that run their own internal parallax use opacity-only
          (lift=0) so the wrapper never translates what they measure; clean content
          sections get the full lift + scale. */}
      <SectionTransition lift={0} scaleFrom={1}>
        <ProductShowcase />
      </SectionTransition>

      <SectionTransition lift={0} scaleFrom={1}>
        <LifestyleBand />
      </SectionTransition>

      {/* Slim brand beat — soft fade that never fully vanishes, so the running loop
          stays as connective tissue. */}
      <SectionTransition lift={0} scaleFrom={1} minOpacity={0.25} edge={0.28}>
        <TaglineMarquee />
      </SectionTransition>

      <SectionTransition lift={56} scaleFrom={0.985}>
        <CollectionsGrid />
      </SectionTransition>

      {/* Details pins + scroll-scrubs its own steps (studio sticky-section) — it must
          NOT sit under a transformed/will-change wrapper, or position:sticky breaks. */}
      <DetailsSection />

      <SectionTransition lift={0} scaleFrom={1}>
        <FinalCTA />
      </SectionTransition>

      {/* Footer: entrance only — nothing scrolls in beneath it to exit toward. */}
      <SectionReveal>
        <Footer />
      </SectionReveal>

      {/* Persistent bottom CTA on phones only — slides in past the hero. */}
      <MobileCtaBar />
    </main>
  );
}
