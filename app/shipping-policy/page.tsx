import type { Metadata } from "next"
import { LegalDoc, type LegalContent } from "@/components/legal/legal-doc"

export const metadata: Metadata = {
  title: "Shipping Policy / מדיניות משלוחים — SHADIEZ",
  description: "SHADIEZ shipping methods, delivery times, and pickup options.",
  robots: { index: true, follow: true },
}

// NOTE: Hebrew text transcribed from the previous site (shadiez.co.il/shipping-policy/).
// A few lines in the source screenshots were low-resolution — please proofread against
// the original, especially the pickup addresses and the "תיאום מסירה ומעקב" section.
const content: LegalContent = {
  he: {
    eyebrow: "מדיניות",
    title: "מדיניות משלוחים",
    updated: "עודכן לאחרונה: 2 ביוני 2026",
    intro:
      "המדיניות שלהלן נועדה להיות ברורה והוגנת, ואינה גורעת מזכויות הצרכן לפי דין.",
    sections: [
      {
        title: "כיסוי ושיטות אספקה",
        blocks: [
          {
            kind: "p",
            text: "אנחנו שולחים לכל רחבי ישראל. המסירה מתבצעת באמצעות שליח עד הבית (HFD) בימי א'–ה' בלבד (אין מסירות בימי שישי, שבת וערבי חג).",
          },
          {
            kind: "p",
            text: "בנוסף, ניתן לבצע איסוף עצמי בתיאום מראש מאחת הכתובות:",
          },
          {
            kind: "ul",
            items: ["א.מ. אגם – כפר אביב", "ארבע ארבעה 4, תל אביב"],
          },
        ],
      },
      {
        title: "עיבוד הזמנות ואיסופים (Processing)",
        blocks: [
          {
            kind: "p",
            text: "האיסופים מתבצעים בימי א' ו-ד'. הזמנה שנקלטה לאחר מועד האיסוף הקרוב תצא באיסוף העוקב. ספירת ימי האספקה מתחילה **מרגע האיסוף** ומסירת ההזמנה לחברת השילוח.",
          },
        ],
      },
      {
        title: "זמני אספקה משוערים",
        blocks: [
          {
            kind: "ul",
            items: [
              "רוב היישובים (מרכז / שפלה / דרום / צפון וכו'): עד **5 ימי עסקים** מרגע קליטת המשלוח במרלו\"ג חברת השילוח (HFD) – לרוב מתבצע יום לאחר האיסוף (ימי האיסוף הם ראשון ורביעי).",
              "אזורים מרוחקים / מעבר לקו / רמת הגולן / אילת והערבה וכד': עד **7 ימי עסקים** מרגע קליטת המשלוח במרלו\"ג חברת השילוח (HFD) – לרוב מתבצע יום לאחר האיסוף (ימי האיסוף הם ראשון ורביעי).",
              "ימי עסקים: א'–ה' (לא כולל שישי, שבת וחגים).",
              "הזמנה מוקדמת (Pre-order): בהזמנה מוקדמת זמני השילוח הנ\"ל חלים מהמועד שבו המוצרים מגיעים למחסן (זמן האספקה עשוי להיות ארוך מהרגיל).",
            ],
          },
        ],
      },
      {
        title: "הבהרה חשובה לגבי עיכובים",
        blocks: [
          {
            kind: "p",
            text: "זמני האספקה הם אומדן בלבד ותלויים בגורמים שלישיים (חברות שליחויות, עומסים, מזג אוויר, סגירת צירים, מצב ביטחוני וכד'). עיכוב באספקה כשלעצמו, גם אם חורג ב-2–3 ימי עסקים, לא יהווה עילה לפיצוי או לביטול, אלא בכפוף לדין.",
          },
        ],
      },
      {
        title: "תיאום מסירה ומעקב",
        blocks: [
          {
            kind: "p",
            text: "עם יציאת המשלוח יישלח עדכון / מספר מעקב. המסירה מתבצעת לכתובת שנמסרה בהזמנה; במידת הצורך יצור השליח קשר לתיאום מסירה. אנא ודאו שפרטי הקשר והכתובת מדויקים.",
          },
        ],
      },
      {
        title: "שינוי כתובת לאחר יציאת המשלוח",
        blocks: [
          {
            kind: "p",
            text: "לפני יציאת המשלוח – ניתן לעדכן כתובת ללא עלות. שינוי כתובת לאחר יציאת המשלוח כפוף ליכולת תפעולית, מאפס את לוח ההפצה (הספירה מתחילה מחדש, עד 3–7 ימי עסקים לפי היעד) ועלול להיות כרוך בחיוב נוסף לפי תעריפי חברת השילוח.",
          },
        ],
      },
      {
        title: "אי-מסירה והחזרת משלוח",
        blocks: [
          {
            kind: "p",
            text: "אם השליח אינו מצליח למסור עקב חוסר תקשורת / אי-זמינות, המשלוח יוחזר למרלו\"ג חברת השילוח. הלקוח יוכל לבחור באיסוף עצמי או בשליחה חוזרת בתשלום נוסף לפי תעריפי חברת השילוח.",
          },
        ],
      },
      {
        title: "כוח עליון",
        blocks: [
          {
            kind: "p",
            text: "אירועים שאינם בשליטתנו (שביתות, עומסי חירום, מזג אוויר קיצוני, סגירת צירים, מצב ביטחוני וכד') עלולים לגרום לעיכוב. נעשה כל מאמץ לעדכן בהתאם – והאמור אינו גורע מזכויותיכם לפי דין.",
          },
        ],
      },
      {
        title: "שירות לקוחות",
        blocks: [
          {
            kind: "p",
            text: "לכל שאלה בנוגע למשלוח / מעקב / תיאום: 055-2501184 · info@shadiez.co.il · וואטסאפ (א'–ה', 9:00–17:00).",
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Shipping Policy",
    updated: "Last updated: June 2, 2026",
    intro:
      "The policy below is intended to be clear and fair, and does not derogate from consumer rights under the law.",
    sections: [
      {
        title: "Coverage & delivery methods",
        blocks: [
          {
            kind: "p",
            text: "We ship throughout Israel. Delivery is made by home courier (HFD) on Sundays–Thursdays only (no deliveries on Fridays, Saturdays, or holiday eves).",
          },
          {
            kind: "p",
            text: "Self-pickup is also available by prior arrangement from one of the following addresses:",
          },
          {
            kind: "ul",
            items: ["A.M. Agam – Kfar Aviv", "Arba Arba'a 4, Tel Aviv"],
          },
        ],
      },
      {
        title: "Order processing & pickups",
        blocks: [
          {
            kind: "p",
            text: "Pickups take place on Sundays and Wednesdays. An order received after the nearest pickup time will go out on the following pickup. Delivery-day counting begins **from the moment of pickup** and handover to the courier company.",
          },
        ],
      },
      {
        title: "Estimated delivery times",
        blocks: [
          {
            kind: "ul",
            items: [
              "Most localities (center / lowlands / south / north, etc.): up to **5 business days** from when the shipment is received at the courier company's distribution center (HFD) — usually one day after pickup (pickup days are Sunday and Wednesday).",
              "Remote areas / beyond the line / the Golan Heights / Eilat and the Arava, etc.: up to **7 business days** from when the shipment is received at the courier company's distribution center (HFD) — usually one day after pickup (pickup days are Sunday and Wednesday).",
              "Business days: Sun–Thu (excluding Fridays, Saturdays, and holidays).",
              "Pre-orders: for pre-orders, the above shipping times apply from the date the products arrive at the warehouse (delivery time may be longer than usual).",
            ],
          },
        ],
      },
      {
        title: "Important note about delays",
        blocks: [
          {
            kind: "p",
            text: "Delivery times are estimates only and depend on third parties (courier companies, traffic loads, weather, road closures, security situation, etc.). A delivery delay in itself — even if it exceeds 2–3 business days — will not constitute grounds for compensation or cancellation, except as required by law.",
          },
        ],
      },
      {
        title: "Delivery coordination & tracking",
        blocks: [
          {
            kind: "p",
            text: "When the shipment goes out, an update / tracking number is sent. Delivery is made to the address provided in the order; if needed, the courier will make contact to coordinate delivery. Please make sure your contact details and address are accurate.",
          },
        ],
      },
      {
        title: "Address change after dispatch",
        blocks: [
          {
            kind: "p",
            text: "Before the shipment goes out, the address can be updated free of charge. An address change after dispatch is subject to operational feasibility, resets the distribution schedule (counting restarts, up to 3–7 business days depending on the destination), and may incur an additional charge per the courier company's rates.",
          },
        ],
      },
      {
        title: "Non-delivery & returned shipments",
        blocks: [
          {
            kind: "p",
            text: "If the courier is unable to deliver due to lack of contact / unavailability, the shipment is returned to the courier company's distribution center. The customer may then choose self-pickup or re-delivery for an additional charge per the courier company's rates.",
          },
        ],
      },
      {
        title: "Force majeure",
        blocks: [
          {
            kind: "p",
            text: "Events beyond our control (strikes, emergency loads, extreme weather, road closures, security situation, etc.) may cause delays. We will make every effort to update accordingly — and the above does not derogate from your rights under the law.",
          },
        ],
      },
      {
        title: "Customer service",
        blocks: [
          {
            kind: "p",
            text: "For any question about shipping / tracking / coordination: 055-2501184 · info@shadiez.co.il · WhatsApp (Sun–Thu, 9:00–17:00).",
          },
        ],
      },
    ],
  },
}

export default function ShippingPolicyPage() {
  return <LegalDoc content={content} />
}
