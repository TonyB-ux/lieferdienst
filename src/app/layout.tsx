// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Hintergrundebenen */}
        <div className="bg-layer" aria-hidden />
        <div className="bg-photo" aria-hidden />

        {/* Fixer, vollbreiter, gläserner Header */}
        <header className="site-header header-bar">
          <div className="container site-nav">
            <Link href="/" className="flex items-center" aria-label="lieferdienst-bio.de">
              <Image src="/logo.png" alt="lieferdienst-bio.de Logo" width={32} height={32} priority />
            </Link>

            <nav className="flex items-center gap-2">
              <Link href="/lieferdienste" className="btn btn-sm">Liste</Link>
              <Link href="/guides" className="btn btn-sm">Guides</Link>
              <Link href="/kontakt" className="btn btn-primary btn-sm">Kontakt</Link>
            </nav>
          </div>
        </header>

        {/* Inhalt unter dem fixen Header */}
        <main className="page-main">{children}</main>
      </body>
    </html>
  );
}
