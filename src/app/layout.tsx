// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react"; // ⬅️ wichtig: für GA4
import NavLinks from "@/components/NavLinks";
import ConsentProvider from "@/components/ConsentProvider";
import ConsentBanner from "@/components/ConsentBanner";
import GA4 from "@/components/GA4";
import ConsentEvents from "@/components/ConsentEvents";


// robust: relative Imports (entspricht deiner aktuellen Struktur)
import SkipLink from "../components/SkipLink";
import SiteFooter from "../components/SiteFooter";

// Font-Variante
import { poppins } from "../fonts/poppins";

export const metadata: Metadata = {
  title: "lieferdienst-bio.de",
  description:
    "Bio-Lieferservices in DE/AT/CH – neutraler Überblick, direkte Webshop-Links, Kategorien & Regionen.",
  metadataBase: new URL("https://lieferdienst-bio.de"),
  alternates: { canonical: "/" },
  themeColor: "#0c2740",
  openGraph: {
    title: "lieferdienst-bio.de",
    description: "Finde den passenden Bio-Lieferservice – schnell, neutral, DACH-weit.",
    url: "https://lieferdienst-bio.de",
    siteName: "lieferdienst-bio.de",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${poppins.variable} antialiased`}>
        {/* Hintergrund */}
        <div className="bg-photo" aria-hidden />
        <div className="bg-layer" aria-hidden />

        <SkipLink />

        <ConsentProvider>
          {/* GA4 nutzt useSearchParams → muss in Suspense */}
          <Suspense fallback={null}>
            <GA4 />
          </Suspense>

          <ConsentEvents />
         
          {/* Fixer Header */}
          <header className="site-header">
            <div className="container site-bar">
              {/* Logo links – klickbar */}
              <Link href="/" className="brand" aria-label="lieferdienst-bio.de">
                <Image
                  src="/logo.png"
                  alt="lieferdienst-bio.de Logo"
                  width={60}
                  height={39}
                  priority
                />
              </Link>

              {/* Eine einzige Nav */}
              <NavLinks />
            </div>
          </header>

          {/* Inhalt unter dem fixen Header */}
          <main id="main" className="page-main">{children}</main>

          {/* Footer jetzt innerhalb des Providers */}
          <SiteFooter />

          {/* Consent-Banner am Ende */}
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
