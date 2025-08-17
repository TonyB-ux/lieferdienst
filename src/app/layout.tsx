import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "lieferdienst-bio.de",
  description: "Bio-Lieferdienste in DE/AT/CH – neutral & unabhängig.",
  // Favicon (SVG) zentral setzen
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
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
            {/* Logo statt Text */}
            <Link href="/" className="brand" aria-label="lieferdienst-bio.de">
              {/* horizontaler Einzeiler */}
              {/* Lege /logo_pin_horizontal.svg in /public ab */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_pin_horizontal.svg"
                alt="lieferdienst-bio.de"
                className="h-8 w-auto"
              />
            </Link>

            <nav className="nav">
              <Link href="/lieferdienste">Liste</Link>
              <Link href="/guides">Guides</Link>
              <a className="btn btn-ghost" href="mailto:info@lieferdienst-bio.de">
                Kontakt
              </a>
            </nav>
          </div>
        </header>

        {/* Inhalt: bekommt Top-Padding = Headerhöhe */}
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
