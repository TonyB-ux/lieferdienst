// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lieferdienst-bio.de",
  description:
    "Bio-Lieferservices in DE/AT/CH – neutraler Überblick, direkte Webshop-Links, Kategorien & Regionen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* --- Hintergrund-Layer (Glasmorph + Foto) --- */}
        <div className="bg-layer" aria-hidden />
        <div className="bg-photo" aria-hidden />

        {/* --- Fixer Header (Glasmorph) --- */}
        <header className="fixed top-0 left-0 right-0 z-50 glass">
          <div
            className="mx-auto flex items-center justify-between"
            style={{ maxWidth: 1120, padding: "12px 20px" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="lieferdienst-bio.de">
              <Image
                src="/logo.png"
                alt="lieferdienst-bio.de"
                width={36}
                height={36}
                priority
                className="block"
              />
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-3">
              <Link href="/lieferdienste" className="btn">
                Liste
              </Link>
              <Link href="/guides" className="btn">
                Guides
              </Link>
              <Link href="/kontakt" className="btn-primary">
                Kontakt
              </Link>
            </nav>
          </div>
        </header>

        {/* --- Inhalt: Start unter dem fixen Header --- */}
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
