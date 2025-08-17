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
  // Icons/Favicons: Next nutzt automatisch /src/app/icon.(png|svg) & /src/app/apple-touch-icon.png, falls vorhanden.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* --- Fester Hintergrund-Layer (iOS-freundlich) --- */}
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

        {/* --- Fixer Header (Glasmorph) --- */}
        <header
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            backdropFilter: "saturate(140%) blur(14px)",
            WebkitBackdropFilter: "saturate(140%) blur(14px)",
            background: "rgba(255,255,255,0.7)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between"
            style={{ maxWidth: 1120, padding: "12px 20px" }}
          >
            {/* Logo (ohne Text) */}
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
              <Link
                href="/lieferdienste"
                className="px-3 py-1.5 rounded-lg text-slate-800"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Liste
              </Link>
              <Link
                href="/guides"
                className="px-3 py-1.5 rounded-lg text-slate-800"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Guides
              </Link>
              <Link
                href="/kontakt"
                className="px-3 py-1.5 rounded-lg text-white"
                style={{
                  background: "linear-gradient(180deg,#1e513e,#1b4332)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Kontakt
              </Link>
            </nav>
          </div>
        </header>

        {/* --- Inhalt: Start unter dem fixen Header --- */}
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
