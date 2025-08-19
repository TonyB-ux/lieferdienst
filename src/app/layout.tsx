// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist as FontGeist, Geist_Mono as FontGeistMono, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/components/NavLinks";

const geistSans = FontGeist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = FontGeistMono({
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
        {/* Hintergrund */}
        <div className="bg-photo" aria-hidden />
        <div className="bg-layer" aria-hidden />

        {/* Fixer Header */}
        <header className="site-header">
          <div className="container site-bar">
            {/* Logo links – klickbar */}
            <Link href="/" className="brand" aria-label="lieferdienst-bio.de">
              <Image src="/logo.png" alt="lieferdienst-bio.de Logo" width={32} height={32} priority />
            </Link>

            {/* Menü rechts – Desktop + mobile CTA-Bar via Komponente */}
            <NavLinks />
          </div>
        </header>

        {/* Inhalt unter Header */}
        <main className="page-main">{children}</main>
      </body>
    </html>
  );
}
