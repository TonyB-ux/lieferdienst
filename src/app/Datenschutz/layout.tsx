import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | lieferdienst-bio.de",
  robots: { index: true, follow: true },
};

export default function DatenschutzLayout({
  children,
}: { children: React.ReactNode }) {
  return <>{children}</>;
}
