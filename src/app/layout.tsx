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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Hintergrund-Layer (Gradient + Foto, vollflächig) */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            backgroundImage:
              "radial-gradient(60% 40% at 50% 15%, rgba(0,0,0,0.10), rgba(0,0,0,0)), url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Vollbreiter, fixer, gläserner Header */}
        <header className="site-header header-bar">
          <div className="container site-nav">
            <Link href="/" className="flex items-center" aria-label="lieferdienst-bio.de">
              <Image src="/logo.png" alt="lieferdienst-bio.de Logo" width={36} height={36} priority />
            </Link>

            <nav className="flex items-center gap-3">
              <Link href="/lieferdienste" className="btn">Liste</Link>
              <Link href="/guides" className="btn">Guides</Link>
              <Link href="/kontakt" className="btn btn-primary">Kontakt</Link>
            </nav>
          </div>
        </header>

        {/* Abstand unter fixem Header */}
        <main style={{ paddingTop: 88 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
