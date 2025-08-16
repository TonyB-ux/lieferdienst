import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lieferdienst-bio.de – Biolieferdienste in DE/AT/CH finden",
  description:
    "Neutrale Übersicht zu Bio-Lieferdiensten in Deutschland, Österreich und der Schweiz. Finde den passenden Anbieter für deine Region mit direktem Shop-Link.",
  keywords: [
    "Biolieferdienst",
    "Bio Lieferservice",
    "Gemüsekiste bestellen",
    "Biokiste Abo",
    "Bio-Lieferservice Deutschland",
    "Bio-Lieferung Österreich",
    "Biokiste Schweiz",
  ],
  authors: [{ name: "lieferdienst-bio.de" }],
  openGraph: {
    title: "lieferdienst-bio.de – Biolieferdienste in DE/AT/CH finden",
    description:
      "Neutrale Branchenplattform für Bio-Lieferservices in Deutschland, Österreich und der Schweiz.",
    url: "https://www.lieferdienst-bio.de",
    siteName: "lieferdienst-bio.de",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "lieferdienst-bio.de",
    description: "Finde deinen Bio-Lieferdienst in DE/AT/CH – neutral & unabhängig.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
