// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lieferdienst-bio.de – Bio-Lieferservices in DE/AT/CH",
  description:
    "Neutraler Überblick über Bio-Lieferdienste in Deutschland, Österreich und der Schweiz. Verifizierte Betriebe, direkte Shop-Links & Guides.",
  metadataBase: new URL("https://lieferdienst-bio.de"),
  alternates: { canonical: "https://lieferdienst-bio.de" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Optional: Palettenwechsel via className auf <html> (z. B. "theme-edel")
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
