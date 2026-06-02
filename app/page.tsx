import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProductShowcase } from "@/components/product-showcase";
import { LifestyleBand } from "@/components/lifestyle-band";
import { TaglineMarquee } from "@/components/tagline-marquee";
import { CollectionsGrid } from "@/components/collections-grid";
import { DetailsSection } from "@/components/details-section";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { SectionReveal } from "@/components/patterns/section-reveal";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      {/* Hero: no SectionReveal — it's the entry point, already visible. */}
      <HeroSection />
      <SectionReveal>
        <ProductShowcase />
      </SectionReveal>
      <SectionReveal>
        <LifestyleBand />
      </SectionReveal>
      {/* Slim brand beat — no SectionReveal; it's a thin always-running band. */}
      <TaglineMarquee />
      <SectionReveal>
        <CollectionsGrid />
      </SectionReveal>
      <SectionReveal>
        <DetailsSection />
      </SectionReveal>
      <SectionReveal>
        <FinalCTA />
      </SectionReveal>
      <SectionReveal>
        <Footer />
      </SectionReveal>
    </main>
  );
}
