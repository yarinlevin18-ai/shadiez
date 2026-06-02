import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy — SHADIEZ",
  description: "How SHADIEZ collects, uses, and protects your information.",
  robots: { index: true, follow: true },
}

// Updated date — bump this whenever the policy text changes so visitors and
// regulators can see when terms last shifted.
const LAST_UPDATED = "June 2, 2026"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mb-2 font-serif text-4xl font-light tracking-wide text-ink md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-12 font-sans text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-10 font-sans text-[15px] leading-relaxed text-ink/85">
            <Section title="Who we are">
              <p>
                SHADIEZ (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
                designs and sells portable beach sun-shades. This Privacy Policy
                explains what personal information we collect through our
                website, why we collect it, and what choices you have. If you
                have questions, write to us at{" "}
                <a
                  href="mailto:hello@shadiez.com"
                  className="text-navy underline-offset-2 hover:underline"
                >
                  hello@shadiez.com
                </a>
                .
              </p>
            </Section>

            <Section title="What we collect">
              <p>
                When you use our &ldquo;Get on the list&rdquo; / Contact form,
                we collect the information you give us:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Your name</li>
                <li>Your email address</li>
                <li>
                  Your phone number, only if you choose to provide it
                  (it&rsquo;s optional)
                </li>
              </ul>
              <p className="mt-3">
                We do not currently run analytics, advertising trackers, or
                third-party cookies. Our hosting provider may log standard
                technical information (IP address, user agent, request time) for
                security and performance, which is normal for any website.
              </p>
            </Section>

            <Section title="How we use it">
              <p>We use your information to:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  Notify you when our next drop, restock, or relevant news is
                  ready
                </li>
                <li>Reply to any question or message you send us</li>
                <li>Improve the website and our products</li>
              </ul>
              <p className="mt-3">
                We do not sell your information, ever. We do not share it with
                advertisers or data brokers.
              </p>
            </Section>

            <Section title="Legal basis (EU/UK visitors)">
              <p>
                For visitors in the EU, UK, or other GDPR-covered regions, the
                legal basis for processing your data is your consent (GDPR Art.
                6(1)(a)) when you voluntarily submit the contact form. You may
                withdraw consent at any time by emailing us.
              </p>
            </Section>

            <Section title="Who we share it with">
              <p>
                We use a small number of trusted vendors to operate the site.
                Each receives only what they need to deliver the service:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Resend</strong> — to deliver lead emails to our inbox.
                  Resend processes the form fields you submit. See{" "}
                  <a
                    href="https://resend.com/legal/privacy-policy"
                    className="text-navy underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    resend.com privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Our hosting provider</strong> — to serve the website
                  and process requests.
                </li>
              </ul>
              <p className="mt-3">
                We may disclose information when legally required (court order,
                fraud investigation) or to protect rights and safety.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep contact-form submissions for as long as you remain
                interested in hearing from us, or until you ask us to delete
                them. Email us and we&rsquo;ll remove your record within thirty
                (30) days.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                Depending on where you live, you may have the right to:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Ask us what data we hold about you</li>
                <li>Ask us to correct it</li>
                <li>Ask us to delete it</li>
                <li>Object to our processing of it</li>
                <li>Request a portable copy</li>
                <li>
                  Lodge a complaint with your local data protection authority
                </li>
              </ul>
              <p className="mt-3">
                California residents have additional rights under the CCPA/CPRA,
                including the right to know, delete, and opt out of any
                &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
                information. We do not sell or share personal information as
                defined under those laws.
              </p>
              <p className="mt-3">
                To exercise any of these rights, email{" "}
                <a
                  href="mailto:hello@shadiez.com"
                  className="text-navy underline-offset-2 hover:underline"
                >
                  hello@shadiez.com
                </a>
                .
              </p>
            </Section>

            <Section title="Security">
              <p>
                We use encryption in transit (HTTPS) and access controls on the
                inbox where leads are received. No transmission over the
                internet is ever fully secure, so we cannot guarantee absolute
                security, but we work to protect your information.
              </p>
            </Section>

            <Section title="Children">
              <p>
                Our website is not directed to children under sixteen (16). We
                do not knowingly collect personal information from children. If
                you believe a child has submitted information, email us and
                we&rsquo;ll delete it.
              </p>
            </Section>

            <Section title="International transfers">
              <p>
                Our vendors (including Resend) may be located outside your
                country, including in the United States. Where required, we
                rely on appropriate safeguards (such as Standard Contractual
                Clauses) for international data transfers.
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will revise the &ldquo;Last updated&rdquo; date at the top.
                Material changes will be communicated by email where reasonable
                or by a clear notice on the site.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions or requests about this policy? Email{" "}
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
