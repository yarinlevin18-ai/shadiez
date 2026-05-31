import { Logo } from "@/components/logo"

// Inline IG mark — the lucide-react v1.17 we ship doesn't export Instagram, and we
// don't want an icon dep upgrade just for the footer.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Colorways", href: "#colorways" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Wordmark + tagline */}
          <div className="text-center md:text-left">
            <div className="text-lg text-ink">
              <Logo />
            </div>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Something New Under The Sun
            </p>
          </div>

          {/* Right cluster: nav + social, kept on a single row on md+. */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
            <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3 md:justify-end">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm tracking-wide text-muted-foreground transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="https://instagram.com/"
              aria-label="SHADIEZ on Instagram"
              className="text-muted-foreground transition-colors hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p className="font-sans text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SHADIEZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
