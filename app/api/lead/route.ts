import { NextResponse } from "next/server"

// Run on the Node runtime. Lead volume on a landing page is tiny.
export const runtime = "nodejs"

// Same email shape the dialog sends. Server is the source of truth — the dialog
// validates on the client too, but never trust that alone.
type LeadBody = {
  name?: unknown
  email?: unknown
  phone?: unknown // optional
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Customer reach-outs are forwarded here. Delivered via FormSubmit (formsubmit.co)
// — a free, no-API-key form-to-email relay. The address lives server-side only, so
// it never appears in the page source. Configurable via LEAD_TO_EMAIL.
const LEAD_TO = (process.env.LEAD_TO_EMAIL || "shadiezsales@gmail.com").trim()

export async function POST(req: Request) {
  // ── Parse + validate ─────────────────────────────────────────────────────
  let body: LeadBody
  try {
    body = (await req.json()) as LeadBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  const email = typeof body.email === "string" ? body.email.trim() : ""
  const phone = typeof body.phone === "string" ? body.phone.trim() : ""

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 })
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    )
  }
  if (phone.length > 40) {
    return NextResponse.json({ error: "Phone looks too long." }, { status: 400 })
  }

  // ── Forward to the inbox via FormSubmit ───────────────────────────────────
  // FormSubmit refuses requests that look like a local HTML file — it needs an
  // Origin/Referer from a real site. A server-side fetch sends neither, so we add
  // them from the incoming request (falling back to the production domain).
  const site =
    req.headers.get("origin") ||
    (() => {
      try {
        return new URL(req.url).origin
      } catch {
        return "https://www.shadiez.com"
      }
    })()
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(LEAD_TO)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: site,
          Referer: `${site}/`,
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "—",
          _subject: `New SHADIEZ lead — ${name}`,
          _replyto: email, // replies go straight to the prospect
          _template: "table",
          _captcha: "false",
        }),
      },
    )

    if (!res.ok) {
      console.error("[lead] FormSubmit HTTP error", res.status)
      return NextResponse.json(
        { error: "Couldn't send right now. Try again in a moment." },
        { status: 502 },
      )
    }

    // FormSubmit replies { success: "true" | true, message }. On the very first
    // submission to a new address it instead emails a one-time activation link;
    // once the inbox owner clicks it, every later submission is forwarded.
    const data = (await res.json().catch(() => null)) as
      | { success?: boolean | string; message?: string }
      | null
    const ok =
      data?.success === true || String(data?.success).toLowerCase() === "true"
    if (!ok) {
      // Most common reason: form not yet activated. Log it; still accept the
      // submission so the visitor isn't shown an error for an owner-side step.
      console.warn("[lead] FormSubmit not-confirmed response", data?.message)
    }
  } catch (err) {
    console.error("[lead] Unexpected error", err)
    return NextResponse.json(
      { error: "Couldn't send right now. Try again in a moment." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
