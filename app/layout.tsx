import type { Metadata } from "next";
import { Fraunces, Inter, Heebo, Frank_Ruhl_Libre } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LeadDialogProvider } from "@/components/lead-dialog";
import { CookieNotice } from "@/components/cookie-notice";
import { Preloader } from "@/components/preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Hebrew faces for the legal pages (RTL). Heebo mirrors Inter's clean sans;
// Frank Ruhl Libre is a Hebrew serif that echoes Fraunces for headings.
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
