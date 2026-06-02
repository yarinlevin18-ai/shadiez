"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// ─────────────────────────────────────────────────────────────────────────────
// Content model — each legal doc is supplied as a Hebrew (authoritative) + English
// pair. Text supports a tiny inline **bold** marker so we don't need rich content.
// ─────────────────────────────────────────────────────────────────────────────

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }

export type LegalSection = { title: string; blocks: LegalBlock[] }

export type LegalDocLang = {
  eyebrow: string
  title: string
  updated: string
  intro?: string
  sections: LegalSection[]
}

export type LegalContent = { he: LegalDocLang; en: LegalDocLang }

type Lang = "he" | "en"

// Render plain text with **bold** spans.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export function LegalDoc({ content }: { content: LegalContent }) {
  const [lang, setLang] = useState<Lang>("he")
  const isHe = lang === "he"
  const doc = content[lang]

  // Apply faces via the next/font CSS variables directly. Hebrew uses Frank Ruhl
  // Libre (serif) for headings + Heebo (sans) for body; English keeps Fraunces +
  // Inter. Using inline vars sidesteps Tailwind theme-utility generation.
  const headFamily = isHe ? "var(--font-frank-ruhl)" : "var(--font-fraunces)"
  const bodyFamily = isHe ? "var(--font-heebo)" : "var(--font-inter)"

  return (
    <>
      <Header />
      <main className="relative min-h-screen px-6 pt-32 pb-24">
        <div
          className="mx-auto max-w-2xl"
          dir={isHe ? "rtl" : "ltr"}
          lang={lang}
        >
          {/* Language toggle — kept LTR so HE | EN order is stable. */}
          <div className="mb-8 flex" dir="ltr">
            <div
              className={`inline-flex rounded-full border border-border/60 bg-background/60 p-0.5 ${
                isHe ? "ml-auto" : ""
              }`}
            >
              {(["he", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium tracking-wide transition-colors ${
                    lang === l
                      ? "bg-navy text-primary-foreground"
                      : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {l === "he" ? "עברית" : "English"}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-3 font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {doc.eyebrow}
          </p>
          <h1
            style={{ fontFamily: headFamily }}
            className="mb-2 text-4xl font-light tracking-wide text-ink md:text-5xl"
          >
            {doc.title}
          </h1>
          <p className="mb-10 font-sans text-sm text-muted-foreground">
            {doc.updated}
          </p>

          {doc.intro && (
            <p
              style={{ fontFamily: bodyFamily }}
              className="mb-10 text-[15px] leading-relaxed text-ink/85"
            >
              {inline(doc.intro)}
            </p>
          )}

          <div
            style={{ fontFamily: bodyFamily }}
            className="space-y-10 text-[15px] leading-relaxed text-ink/85"
          >
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2
                  style={{ fontFamily: headFamily }}
                  className="mb-3 text-xl font-light tracking-wide text-ink md:text-2xl"
                >
                  {section.title}
                </h2>
                {section.blocks.map((block, j) =>
                  block.kind === "p" ? (
                    <p key={j} className={j > 0 ? "mt-3" : undefined}>
                      {inline(block.text)}
                    </p>
                  ) : (
                    <ul
                      key={j}
                      className={`list-disc space-y-1.5 ps-5 ${j > 0 ? "mt-3" : ""}`}
                    >
                      {block.items.map((item, k) => (
                        <li key={k}>{inline(item)}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>

          {/* Authoritative-version notice. */}
          <p className="mt-12 rounded-md border border-border/40 bg-sand/30 px-4 py-3 font-sans text-xs leading-relaxed text-muted-foreground">
            {isHe
              ? "הנוסח העברי הוא הנוסח המחייב מבחינה משפטית."
              : "This English version is a translation provided for convenience. The Hebrew version is the legally binding text."}
          </p>

          <div className="mt-10 border-t border-border/40 pt-8 text-center">
            <Link
              href="/"
              className="font-sans text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              {isHe ? "חזרה לאתר →" : "← Back to SHADIEZ"}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
