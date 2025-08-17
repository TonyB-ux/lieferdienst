// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de"),
  title: "lieferdienst-bio.de",
  description:
    "Bio-Lieferservices in DE/AT/CH – neutraler Überblick, direkte Webshop-Links, Kategorien & Regionen.",
  icons: {
    icon: "/icon.png",                 // wird von Next automatisch verlinkt
    shortcut: "/favicon.ico",          // Fallback / klassisches Favicon
    apple: "/apple-touch-icon.png",    // iOS Home-Screen Icon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Fixes, performantes, iOS-taugliches Hintergrundbild */}
        <div className="site-bg" aria-hidden="true" />

        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              <Image
                src="/brand/logo-mark.svg"
                alt="lieferdienst-bio.de"
                width={28}
                height={28}
                priority
                className="brand-mark"
              />
              <Image
                src="/brand/logo-word.svg"
                alt="lieferdienst-bio.de"
                width={180}
                height={20}
                priority
                className="brand-word"
              />
            </Link>

            <nav className="main-nav">
              <Link href="/lieferdienste" className="nav-link">Liste</Link>
              <Link href="/guides" className="nav-link">Guides</Link>
              <Link href="/#kontakt" className="btn-ghost">Kontakt</Link>
            </nav>
          </div>
        </header>

        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}
