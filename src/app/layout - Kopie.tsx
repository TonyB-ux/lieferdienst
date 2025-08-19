// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "lieferdienst-bio.de",
  description:
    "Bio-Lieferservices in DE/AT/CH – neutraler Überblick, direkte Webshop-Links, Kategorien & Regionen.",
  metadataBase: new URL("https://lieferdienst-bio.de"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "lieferdienst-bio.de",
    description: "Finde den passenden Bio-Lieferservice – schnell, neutral, DACH-weit.",
    url: "https://lieferdienst-bio.de",
    siteName: "lieferdienst-bio.de",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        {/* Hintergrund (klar, ohne Opacity) */}
        <div className="bg-photo" aria-hidden />
        <div className="bg-layer" aria-hidden />

        {/* Fixer Header */}
        <header className="site-header">
          {/* Zeile 1: Brand + Desktop-Nav */}
          <div className="container site-nav">
            <Link href="/" className="brand" aria-label="lieferdienst-bio.de">
              <Image src="/logo.png" alt="lieferdienst-bio.de Logo" width={32} height={32} priority />
            </Link>

            {/* Desktop-Navigation */}
            <nav className="nav-desktop" aria-label="Hauptnavigation">
              <Link href="/lieferdienste" className="btn btn-sm">Liste</Link>
              <Link href="/guides" className="btn btn-sm">Guides</Link>
              <Link href="/kontakt" className="btn btn-primary btn-sm">Kontakt</Link>
            </nav>
          </div>

          {/* Zeile 2: Mobile-CTA (nur mobil sichtbar) */}
          <nav className="mobile-cta-bar" aria-label="Schnellzugriff">
            <Link href="/lieferdienste" className="btn btn-cta">Liste</Link>
            <Link href="/guides" className="btn btn-cta">Guides</Link>
            <Link href="/kontakt" className="btn btn-cta btn-primary">Kontakt</Link>
          </nav>
        </header>

        {/* Inhalt unter Header */}
        <main className="page-main">{children}</main>
      </body>
    </html>
  );
}
