import type { Metadata } from "next"
import { LegalDoc, type LegalContent } from "@/components/legal/legal-doc"

export const metadata: Metadata = {
  title: "Returns & Cancellations / מדיניות החזרים וביטולים — SHADIEZ",
  description:
    "SHADIEZ returns, cancellations, and refunds policy under Israeli consumer law.",
  robots: { index: true, follow: true },
}

// NOTE: Hebrew text transcribed from the previous site (shadiez.co.il/returns/).
// The contact email read "info@shadiez.com" in the source but the site's verified
// address is info@shadiez.co.il — using the verified one here. Please proofread the
// end of section 2 ("הרחבת מדיניות ההחזרה"), which was partly cut off in the source.
const content: LegalContent = {
  he: {
    eyebrow: "מדיניות",
    title: "מדיניות החזרים וביטולים",
    updated: "עודכן לאחרונה: 2 ביוני 2026",
    intro:
      "המדיניות להלן מבוססת על הדין הישראלי, ואינה גורעת מזכויות הצרכן לפי חוק הגנת הצרכן, התשמ\"א-1981. צוות SHADIEZ מחויב לשירות הוגן, שקוף וזמין, ונשמח לסייע בכל שאלה או בעיה.",
    sections: [
      {
        title: "1. ביטול עסקה לפי חוק (עסקת מכר מרחוק)",
        blocks: [
          {
            kind: "ul",
            items: [
              "ניתן לבטל את העסקה בתוך **14 ימים** ממועד קבלת המוצר או ממועד קבלת מסמך הגילוי (לפי המאוחר).",
              "במקרה של ביטול מחמת חרטה – ייגבו **דמי ביטול עד 5% או 100 ₪** (הנמוך מביניהם).",
              "ההחזר יבוצע לאמצעי התשלום שבו בוצעה העסקה, בתוך **14 ימי עסקים** ממועד קבלת הודעת הביטול.",
            ],
          },
        ],
      },
      {
        title: "2. הרחבת מדיניות ההחזרה – עד 30 יום",
        blocks: [
          {
            kind: "p",
            text: "בנוסף להוראות החוק, אנו מאפשרים החזרת מוצר **עד 30 ימים** מיום קבלתו, בתנאי שלא נעשה בו שימוש והוא במצב חדש כפי שסופק. ההחלטה מתקבלת על ידי צוות SHADIEZ ובכפוף לעמידה בתנאים הנ\"ל.",
          },
          {
            kind: "ul",
            items: [
              "ביטול מחמת חרטה – המשלוח חזרה על חשבון הלקוח.",
              "ביטול עקב פגם, אי-התאמה או איחור באספקה – האיסוף יבוצע על חשבוננו, ללא דמי ביטול.",
            ],
          },
        ],
      },
      {
        title: "3. מצב המוצר בעת ההחזרה",
        blocks: [
          {
            kind: "ul",
            items: [
              "יש להחזיר את המוצר באריזה המקורית, כשהוא שלם, נקי וללא סימני שימוש.",
              "אם נעשה במוצר שימוש או נגרם בלאי / נזק – החברה רשאית להפחית משווי ההחזר או לחייב בתשלום חלקי / מלא בהתאם לשווי הנזק.",
            ],
          },
        ],
      },
      {
        title: "4. מוצר פגום או בלאי שמקורו בנו",
        blocks: [
          {
            kind: "ul",
            items: [
              "במקרה של מוצר פגום או בלאי שנובע מאחריותנו – נדאג לאיסוף המוצר על חשבוננו.",
              "לרשותך האפשרות לבחור בין: **החלפה, תיקון או החזר כספי מלא**.",
              "יש לדווח על הפגם תוך **48 שעות** מקבלת המוצר, בצירוף תמונות לזיהוי מהיר.",
            ],
          },
        ],
      },
      {
        title: "5. אופן ביצוע ההחזרה",
        blocks: [
          {
            kind: "ul",
            items: [
              "יש ליצור קשר עם שירות הלקוחות: info@shadiez.co.il · 055-2501184.",
              "ההחזר יבוצע באמצעות שליח מטעמנו או בדואר רשום לכתובת: א.מ אגם, כפר אביב, מיקוד 7924100.",
              "ההחזר הכספי יבוצע לאחר קבלת המוצר ובדיקתו.",
            ],
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Returns & Cancellations",
    updated: "Last updated: June 2, 2026",
    intro:
      "The policy below is based on Israeli law and does not derogate from consumer rights under the Consumer Protection Law, 5741-1981. The SHADIEZ team is committed to fair, transparent, and accessible service, and we're happy to help with any question or issue.",
    sections: [
      {
        title: "1. Statutory cancellation (distance-selling transaction)",
        blocks: [
          {
            kind: "ul",
            items: [
              "You may cancel the transaction within **14 days** of receiving the product or of receiving the disclosure document (whichever is later).",
              "In the case of cancellation due to a change of mind, a **cancellation fee of up to 5% or ₪100** (whichever is lower) will be charged.",
              "The refund will be made to the payment method used for the transaction, within **14 business days** of receiving the cancellation notice.",
            ],
          },
        ],
      },
      {
        title: "2. Extended return policy – up to 30 days",
        blocks: [
          {
            kind: "p",
            text: "In addition to the statutory provisions, we allow a product to be returned **within 30 days** of receipt, provided it has not been used and is in new condition as supplied. The decision is made by the SHADIEZ team and subject to meeting the above conditions.",
          },
          {
            kind: "ul",
            items: [
              "Cancellation due to a change of mind – return shipping is at the customer's expense.",
              "Cancellation due to a defect, non-conformity, or late delivery – pickup is at our expense, with no cancellation fee.",
            ],
          },
        ],
      },
      {
        title: "3. Product condition on return",
        blocks: [
          {
            kind: "ul",
            items: [
              "The product must be returned in its original packaging, intact, clean, and with no signs of use.",
              "If the product has been used or has incurred wear / damage, the company may reduce the refund value or charge a partial / full amount according to the value of the damage.",
            ],
          },
        ],
      },
      {
        title: "4. Defective product or wear caused by us",
        blocks: [
          {
            kind: "ul",
            items: [
              "In the case of a defective product or wear arising from our responsibility, we will arrange pickup of the product at our expense.",
              "You may choose between: **replacement, repair, or a full refund**.",
              "The defect must be reported within **48 hours** of receiving the product, with photos for quick identification.",
            ],
          },
        ],
      },
      {
        title: "5. How to make a return",
        blocks: [
          {
            kind: "ul",
            items: [
              "Contact customer service: info@shadiez.co.il · 055-2501184.",
              "The return is made via our courier or by registered mail to: A.M. Agam, Kfar Aviv, ZIP 7924100.",
              "The refund will be issued after the product is received and inspected.",
            ],
          },
        ],
      },
    ],
  },
}

export default function ReturnsPage() {
  return <LegalDoc content={content} />
}
