import { NextResponse } from "next/server"
import { Resend } from "resend"

// Run on the Node runtime — Resend's SDK uses Node APIs that aren't available
// on Edge. (Keeps things simple; lead volume on a landing page is tiny.)
export const runtime = "nodejs"

// Same email shape the dialog sends. Mirror it carefully — the dialog form
// validates on the client too, this is the server source of truth.
type LeadBody = {
  name?: unknown
  email?: unknown
  phone?: unknown // optional
}

// Minimal email regex — good enough to reject obvious typos client/server-side.
// We rely on Resend + a real human eyeballing the inbox for everything else.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

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

  // ── Env check ────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const from = process.env.LEAD_FROM_EMAIL ?? "SHADIEZ Leads <onboarding@resend.dev>"

  if (!apiKey || !to) {
    // Don't leak which one is missing to the client. Log clearly on the server.
    console.error("[lead] Missing RESEND_API_KEY or LEAD_TO_EMAIL env vars")
    return NextResponse.json(
      { error: "Server isn't configured to receive leads yet." },
      { status: 500 },
    )
  }

  // ── Send ─────────────────────────────────────────────────────────────────
  const resend = new Resend(apiKey)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = phone ? escapeHtml(phone) : ""
  const submittedAt = new Date().toISOString()

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#F3ECE0;color:#2B2723;border-radius:8px;">
      <h2 style="margin:0 0 16px;font-weight:400;font-size:20px;letter-spacing:0.02em;">New SHADIEZ lead</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6b6258;width:88px;">Name</td><td style="padding:6px 0;">${safeName}</td></tr>
        <tr><td style="padding:6px 0;color:#6b6258;">Email</td><td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#1F3A5F;">${safeEmail}</a></td></tr>
        ${
          safePhone
            ? `<tr><td style="padding:6px 0;color:#6b6258;">Phone</td><td style="padding:6px 0;">${safePhone}</td></tr>`
            : ""
        }
        <tr><td style="padding:6px 0;color:#6b6258;">Submitted</td><td style="padding:6px 0;color:#6b6258;">${submittedAt}</td></tr>
      </table>
    </div>
  `.trim()

  const text = [
    `New SHADIEZ lead`,
    ``,
    `Name:  ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Submitted: ${submittedAt}`,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New SHADIEZ lead — ${name}`,
      replyTo: email, // Reply goes straight to the prospect.
      html,
      text,
    })
    if (error) {
      console.error("[lead] Resend error", error)
      return NextResponse.json(
        { error: "Couldn't send right now. Try again in a moment." },
        { status: 502 },
      )
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
