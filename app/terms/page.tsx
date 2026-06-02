import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service — SHADIEZ",
  description: "The terms that govern your use of the SHADIEZ website.",
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "June 2, 2026"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mb-2 font-serif text-4xl font-light tracking-wide text-ink md:text-5xl">
            Terms of Service
          </h1>
          <p className="mb-12 font-sans text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-10 font-sans text-[15px] leading-relaxed text-ink/85">
            <Section title="1. Agreement">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access
                to and use of the SHADIEZ website at{" "}
                <strong>shadiez.com</strong> and any related services
                (collectively, the &ldquo;Site&rdquo;), operated by SHADIEZ
                (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By
                using the Site, you agree to these Terms. If you do not agree,
                please do not use the Site.
              </p>
            </Section>

            <Section title="2. What the Site is">
              <p>
                The Site currently provides information about our products and
                lets you join our contact list to be notified about upcoming
                releases. The Site does not currently process orders or
                payments. When we begin selling products through the Site,
                additional terms (a purchase agreement, shipping policy, return
                policy) will apply to those transactions.
              </p>
            </Section>

            <Section title="3. Eligibility">
              <p>
                You must be at least sixteen (16) years old to use the Site, or
                the minimum age required to consent to data processing in your
                country, whichever is higher.
              </p>
            </Section>

            <Section title="4. Acceptable use">
              <p>You agree not to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  Use the Site for any unlawful purpose or in violation of these
                  Terms
                </li>
                <li>
                  Attempt to interfere with or compromise the Site&rsquo;s
                  security, integrity, or availability
                </li>
                <li>
                  Scrape, copy, or republish material from the Site without
                  permission
                </li>
                <li>
                  Submit false information, impersonate anyone, or otherwise
                  misrepresent yourself
                </li>
                <li>
                  Use any automated system, bot, or script to access the Site
                  for commercial purposes
                </li>
              </ul>
            </Section>

            <Section title="5. Intellectual property">
              <p>
                All content on the Site — including text, graphics, logos,
                photographs, the SHADIEZ wordmark, product designs, 3D models,
                and the look and feel of the Site — is owned by SHADIEZ or our
                licensors and is protected by copyright, trademark, and other
                intellectual property laws. You may not copy, modify,
                distribute, sell, or create derivative works from any part of
                the Site without our prior written permission.
              </p>
              <p className="mt-3">
                We grant you a limited, non-exclusive, non-transferable,
                revocable licence to access and use the Site for personal,
                non-commercial purposes.
              </p>
            </Section>

            <Section title="6. Your submissions">
              <p>
                If you submit any feedback, suggestion, or idea through the
                contact form or otherwise, you grant us a worldwide,
                royalty-free, perpetual licence to use it for any purpose
                without obligation or compensation to you. We may, but are not
                obliged to, credit you.
              </p>
            </Section>

            <Section title="7. Product photos and descriptions">
              <p>
                We do our best to portray our products accurately, but real
                colours, textures, and finishes may vary slightly from what you
                see on screen. Once we begin selling products, the controlling
                description is the product description on the order page at the
                time of purchase.
              </p>
            </Section>

            <Section title="8. Disclaimers">
              <p>
                The Site is provided &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; without warranty of any kind, whether express
                or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement. We do not warrant that the Site will be
                uninterrupted, error-free, secure, or free of viruses or other
                harmful components.
              </p>
              <p className="mt-3">
                Our products are designed for personal use as a portable
                sun-shade. They are not certified medical UV-protective devices.
                You are responsible for taking appropriate sun-safety precautions
                (sunscreen, clothing, hydration).
              </p>
            </Section>

            <Section title="9. Limitation of liability">
              <p>
                To the maximum extent permitted by law, in no event will
                SHADIEZ, its directors, employees, agents, or affiliates be
                liable for any indirect, incidental, special, consequential, or
                punitive damages — including but not limited to loss of profits,
                data, use, or goodwill — arising from your access to or use of
                the Site, even if we have been advised of the possibility of
                such damages.
              </p>
              <p className="mt-3">
                Our total liability to you for any claim arising from or
                relating to the Site shall not exceed the greater of (a) the
                amount you paid us in the twelve (12) months preceding the
                claim, or (b) one hundred US dollars (US $100).
              </p>
              <p className="mt-3">
                Nothing in these Terms excludes or limits our liability for
                death, personal injury caused by negligence, fraud, or any
                liability that cannot be excluded under applicable law.
              </p>
            </Section>

            <Section title="10. Indemnification">
              <p>
                You agree to indemnify and hold harmless SHADIEZ from any
                claims, damages, losses, or expenses (including reasonable legal
                fees) arising from your violation of these Terms or your misuse
                of the Site.
              </p>
            </Section>

            <Section title="11. Third-party links">
              <p>
                The Site may link to third-party websites or services that we
                do not control. We are not responsible for the content,
                privacy practices, or policies of any third-party site.
              </p>
            </Section>

            <Section title="12. Termination">
              <p>
                We may suspend or terminate your access to the Site at any
                time, with or without notice, if we believe you have violated
                these Terms.
              </p>
            </Section>

            <Section title="13. Governing law and jurisdiction">
              <p>
                These Terms are governed by the laws of the State of Israel,
                without regard to its conflict-of-laws principles. Any dispute
                arising out of or relating to these Terms or the Site shall be
                resolved exclusively in the competent courts of Tel Aviv–Jaffa,
                Israel, and you consent to the personal jurisdiction of those
                courts.
              </p>
              <p className="mt-3">
                If you are a consumer in the European Union, United Kingdom, or
                another jurisdiction whose mandatory law gives you the right to
                bring proceedings in your country of residence, nothing in this
                section affects that right.
              </p>
            </Section>

            <Section title="14. Changes">
              <p>
                We may update these Terms from time to time. The current
                version is always posted at this URL, with the &ldquo;Last
                updated&rdquo; date at the top. Continued use of the Site after
                changes are posted means you accept the updated Terms.
              </p>
            </Section>

            <Section title="15. Entire agreement">
              <p>
                These Terms, together with our{" "}
                <Link
                  href="/privacy"
                  className="text-navy underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>
                , constitute the entire agreement between you and SHADIEZ
                regarding the Site and supersede any prior agreements.
              </p>
            </Section>

            <Section title="16. Contact">
              <p>
                Questions about these Terms? Email{" "}
                <a
                  href="mailto:hello@shadiez.com"
                  className="text-navy underline-offset-2 hover:underline"
                >
                  hello@shadiez.com
                </a>
                .
              </p>
            </Section>
          </div>

          <div className="mt-16 border-t border-border/40 pt-8 text-center">
            <Link
              href="/"
              className="font-sans text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              ← Back to SHADIEZ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-xl font-light tracking-wide text-ink md:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  )
}
