import type { Metadata } from "next"
import { LegalDoc, type LegalContent } from "@/components/legal/legal-doc"

export const metadata: Metadata = {
  title: "Accessibility Statement / הצהרת נגישות — SHADIEZ",
  description:
    "SHADIEZ accessibility statement — Israeli Standard 5568 (WCAG) Level AA.",
  robots: { index: true, follow: true },
}

// NOTE: Hebrew text transcribed from the previous site (shadiez.co.il/accessibility/).
// The source screenshot was CUT OFF after "...בנוגע לרמת או אופן הנגשתו,". The closing
// paragraph and the accessibility-coordinator contact details below are RECONSTRUCTED
// with placeholder contact info — please replace with the real coordinator name and
// confirm the closing wording before publishing. The original also used a "שם אתר"
// placeholder, replaced here with SHADIEZ.
const content: LegalContent = {
  he: {
    eyebrow: "נגישות",
    title: "הצהרת נגישות",
    updated: "עודכן לאחרונה: 2 ביוני 2026",
    intro:
      "SHADIEZ חרט על דגלו לתת שירות שוויוני לאנשים עם צרכים מיוחדים, ומשקיע רבות בהסדרת נגישות השירות במטרה לאפשר לכל אדם ליהנות משירותיו בכבוד ובנוחות.",
    sections: [
      {
        title: "התאמה לתקנות",
        blocks: [
          {
            kind: "p",
            text: "אתר SHADIEZ פועל בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013.",
          },
        ],
      },
      {
        title: "נגישות אתר האינטרנט",
        blocks: [
          {
            kind: "p",
            text: "האתר מונגש בהתאם לתקן ישראלי 5568 \"קווים מנחים לנגישות תכנים באינטרנט\" (מרץ 2013) ברמת נגישות AA.",
          },
          {
            kind: "p",
            text: "אנו עושים מאמצים רבים לאפשר לכל אחד להתאים את השירות לצרכיו. עדיין עשויים להיות רכיבים שאינם נגישים במלואם, נמצאים בתהליך הנגשה או חסרים להם פתרון טכנולוגי הולם כדי להנגישם. ועדיין, אנו משפרים ללא הרף את הנגישות שלנו – מוסיפים, מעדכנים ומשפרים את האפשרויות והתכונות.",
          },
          {
            kind: "p",
            text: "וכל זה בשבילך ולמענך, וכמובן בהתאם לדרישות החוק המשתנות.",
          },
        ],
      },
      {
        title: "פנייה בנושא נגישות",
        blocks: [
          {
            kind: "p",
            text: "אם במהלך הגלישה באתר או קבלת השירות נתקלת בקושי, או אם יש לך הערה בנוגע לרמת או אופן ההנגשה, נשמח שתפנה אלינו. נעשה כל מאמץ למצוא פתרון מתאים ולטפל בפנייה בהקדם.",
          },
          {
            kind: "p",
            text: "רכז/ת הנגישות: צוות SHADIEZ · info@shadiez.co.il · 055-2501184.",
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    updated: "Last updated: June 2, 2026",
    intro:
      "SHADIEZ is committed to providing equal service to people with special needs and invests significantly in making its service accessible, so that everyone can enjoy it with dignity and comfort.",
    sections: [
      {
        title: "Regulatory compliance",
        blocks: [
          {
            kind: "p",
            text: "The SHADIEZ website operates in accordance with the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 5773-2013.",
          },
        ],
      },
      {
        title: "Website accessibility",
        blocks: [
          {
            kind: "p",
            text: "The site is made accessible in accordance with Israeli Standard 5568, \"Web Content Accessibility Guidelines\" (March 2013), at accessibility level AA.",
          },
          {
            kind: "p",
            text: "We make significant efforts to let everyone adapt the service to their needs. There may still be components that are not fully accessible, are in the process of being made accessible, or lack a suitable technological solution. Even so, we continuously improve our accessibility — adding, updating, and improving options and features.",
          },
          {
            kind: "p",
            text: "All of this is for you — and, of course, in line with the changing requirements of the law.",
          },
        ],
      },
      {
        title: "Accessibility contact",
        blocks: [
          {
            kind: "p",
            text: "If, while browsing the site or receiving the service, you encounter a difficulty, or if you have a comment regarding the level or manner of accessibility, we'd be glad to hear from you. We will make every effort to find a suitable solution and address your request promptly.",
          },
          {
            kind: "p",
            text: "Accessibility coordinator: the SHADIEZ team · info@shadiez.co.il · 055-2501184.",
          },
        ],
      },
    ],
  },
}

export default function AccessibilityPage() {
  return <LegalDoc content={content} />
}
