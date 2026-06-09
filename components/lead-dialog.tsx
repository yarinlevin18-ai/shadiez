"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Loader2, X } from "lucide-react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT — exposes openLeadDialog() to any component on the page so CTAs in
// hero / final-cta / header can all trigger the same dialog without prop-drilling.
// ─────────────────────────────────────────────────────────────────────────────

type LeadDialogContext = {
  open: boolean
  openDialog: () => void
  closeDialog: () => void
}

const LeadDialogCtx = createContext<LeadDialogContext | null>(null)

/** Hook to open the lead-capture dialog from anywhere. */
export function useLeadDialog(): LeadDialogContext {
  const ctx = useContext(LeadDialogCtx)
  if (!ctx) {
    throw new Error("useLeadDialog must be used inside <LeadDialogProvider>")
  }
  return ctx
}

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER — mounted once in app/layout. Owns open state + the dialog instance.
// ─────────────────────────────────────────────────────────────────────────────

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openDialog = useCallback(() => setOpen(true), [])
  const closeDialog = useCallback(() => setOpen(false), [])

  const value = useMemo<LeadDialogContext>(
    () => ({ open, openDialog, closeDialog }),
    [open, openDialog, closeDialog],
  )

  return (
    <LeadDialogCtx.Provider value={value}>
      {children}
      <LeadDialog open={open} onOpenChange={setOpen} />
    </LeadDialogCtx.Provider>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DIALOG — Radix primitives + motion. Single form with three states:
//   "idle"     — clean form, ready to type
//   "submitting" — POSTing /api/lead
//   "success"  — thank-you panel, auto-closes after 2.5s
//   "error"    — banner above form with retry
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = "idle" | "submitting" | "success" | "error"

function LeadDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
  }>({})
  const closeTimerRef = useRef<number | null>(null)

  // When the dialog closes, reset state on a delay so the user doesn't see the
  // form reflow back to "idle" mid-exit animation.
  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
    if (!next) {
      window.setTimeout(() => {
        setStatus("idle")
        setErrorMsg("")
        setFieldErrors({})
      }, 250)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") ?? "").trim()
    const email = String(fd.get("email") ?? "").trim()
    const phone = String(fd.get("phone") ?? "").trim()

    // Client-side validation. Server validates again — this is just UX polish.
    const fe: { name?: string; email?: string } = {}
    if (!name) fe.name = "Required"
    if (!email) fe.email = "Required"
    else if (!EMAIL_RE.test(email)) fe.email = "Doesn't look like an email"
    if (fe.name || fe.email) {
      setFieldErrors(fe)
      return
    }
    setFieldErrors({})

    setStatus("submitting")
    setErrorMsg("")

    try {
      // Submit straight to FormSubmit from the browser (no API key). The real
      // Origin/Referer + visitor IP are what FormSubmit requires — it rejects
      // server-side calls from datacenter IPs. Delivered to shadiezsales@gmail.com.
      // (To hide the address from page source, swap in FormSubmit's hashed alias
      // once the form is activated.)
      const res = await fetch("https://formsubmit.co/ajax/shadiezsales@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "—",
          _subject: `New SHADIEZ lead — ${name}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      })
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean | string }
        | null
      const ok =
        res.ok &&
        (data?.success === true ||
          String(data?.success).toLowerCase() === "true")
      if (!ok) {
        throw new Error("Couldn't send right now. Please try again in a moment.")
      }
      setStatus("success")
      // Auto-close after the success panel has been read.
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = window.setTimeout(() => handleOpenChange(false), 2500)
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay — warm semi-transparent ink wash + blur. Pulls focus onto
                the panel without going pitch-black; matches the page palette. */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 z-[80] bg-ink/45 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-[81] w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative overflow-hidden rounded-md bg-cream text-ink shadow-[0_40px_80px_-20px_rgba(20,12,6,0.55)] ring-1 ring-ink/10">
                  {/* Top thin wood-tone bar — small brand cue that echoes the
                      product without shouting. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{
                      background:
                        "linear-gradient(90deg,#8A5A38 0%,#A87248 50%,#8A5A38 100%)",
                    }}
                  />

                  {/* Close. Sticks out from the corner; aria-label so screen
                      readers don't read "X". */}
                  <Dialog.Close
                    aria-label="Close"
                    className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </Dialog.Close>

                  <div className="px-7 pb-7 pt-9">
                    {status === "success" ? (
                      <SuccessPanel />
                    ) : (
                      <>
                        <Dialog.Title className="font-serif text-2xl font-light leading-tight tracking-wide md:text-3xl">
                          Get in touch
                        </Dialog.Title>
                        <Dialog.Description className="mt-1.5 font-sans text-sm text-ink/65">
                          Leave your details and we&apos;ll get back to you
                          shortly.
                        </Dialog.Description>

                        {status === "error" && errorMsg && (
                          <div
                            role="alert"
                            className="mt-4 rounded-sm border border-red-300/60 bg-red-50 px-3 py-2 text-xs text-red-900"
                          >
                            {errorMsg}
                          </div>
                        )}

                        <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
                          <Field
                            label="Name"
                            name="name"
                            required
                            autoComplete="name"
                            error={fieldErrors.name}
                            disabled={status === "submitting"}
                          />
                          <Field
                            label="Email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            error={fieldErrors.email}
                            disabled={status === "submitting"}
                          />
                          <Field
                            label="Phone"
                            optional
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            disabled={status === "submitting"}
                          />

                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-navy font-sans text-sm tracking-wide text-primary-foreground shadow-[0_10px_22px_-8px_rgba(31,58,95,0.5)] transition-colors hover:bg-navy/90 disabled:opacity-70"
                          >
                            {status === "submitting" ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending…
                              </>
                            ) : (
                              "Send message"
                            )}
                          </button>

                          <p className="pt-1 text-center text-[11px] text-ink/45">
                            No spam. Unsubscribe any time.
                          </p>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELDS — single small primitive instead of pulling in a forms library. Floating
// label vibe via a small "optional" hint when the field is optional.
// ─────────────────────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
  autoComplete,
  error,
  disabled,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  optional?: boolean
  autoComplete?: string
  error?: string
  disabled?: boolean
}) {
  const id = `lead-${name}`
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="font-sans text-[11px] uppercase tracking-[0.14em] text-ink/55"
        >
          {label}
          {required && <span className="ml-0.5 text-navy">*</span>}
        </label>
        {optional && (
          <span className="font-sans text-[10px] tracking-wide text-ink/35">
            optional
          </span>
        )}
        {error && (
          <span className="font-sans text-[10px] text-red-700">{error}</span>
        )}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        className={`h-11 w-full rounded-[4px] border bg-background/70 px-3 font-sans text-sm text-ink placeholder:text-ink/30 transition-colors focus:bg-background focus:outline-none focus:ring-2 focus:ring-navy/35 ${
          error ? "border-red-400" : "border-ink/15 focus:border-navy/50"
        }`}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SUCCESS — calm confirmation. Same dimensions as the form area so the dialog
// doesn't pop in size when state flips.
// ─────────────────────────────────────────────────────────────────────────────

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
        <Check className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <Dialog.Title className="font-serif text-2xl font-light tracking-wide">
        Message sent.
      </Dialog.Title>
      <Dialog.Description className="mt-2 max-w-[24ch] font-sans text-sm text-ink/65">
        Thanks for reaching out — we&apos;ll be in touch shortly.
      </Dialog.Description>
    </div>
  )
}
