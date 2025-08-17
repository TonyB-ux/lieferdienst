import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "lieferdienst-bio.de",
  description: "Bio-Lieferdienste in DE/AT/CH – neutral & unabhängig.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        {/* Optional: Hintergrundbild preladen */}
        <link rel="preload" as="image" href="/bg/edel-bio.webp" />
      </head>
      <body>
        {/* Fester Hintergrund (iOS-freundlich) */}
        <div className="site-bg" aria-hidden />

        {/* Fixer Header im Glasmorph-Stil */}
        <header className="site-header">
          <div className="container site-nav">
            <Link href="/" className="brand">lieferdienst-bio.de</Link>
            <nav className="nav">
              <Link href="/lieferdienste">Liste</Link>
              <Link href="/guides">Guides</Link>
              <a className="btn btn-ghost" href="mailto:info@lieferdienst-bio.de">Kontakt</a>
            </nav>
          </div>
        </header>

        {/* Inhalt: bekommt Top-Padding = Headerhöhe */}
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
