import type { Metadata } from "next";
import { Schibsted_Grotesk, Hanken_Grotesk, Heebo, Frank_Ruhl_Libre } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LeadDialogProvider } from "@/components/lead-dialog";
import { CookieNotice } from "@/components/cookie-notice";
import { Preloader } from "@/components/preloader";
import "./globals.css";

// Body / UI — Hanken Grotesk (kept on the --font-inter variable so theme mapping stays wired)
const inter = Hanken_Grotesk({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / headings — Schibsted Grotesk (kept on the --font-fraunces variable)
const fraunces = Schibsted_Grotesk({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHADIEZ — Something New Under The Sun",
  description:
    "A portable personal beach sun-shade. Wooden frame, cream canvas, adjustable recline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${heebo.variable} ${frankRuhl.variable} antialiased`}
    >
      <body>
        <Preloader />
        <SmoothScroll>
          <LeadDialogProvider>{children}</LeadDialogProvider>
        </SmoothScroll>
        <CookieNotice />
      </body>
    </html>
  );
}
