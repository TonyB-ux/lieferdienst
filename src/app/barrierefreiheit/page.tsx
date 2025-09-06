import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Barrierefreiheit | lieferdienst-bio.de",
  description:
    "Erklärung zur Barrierefreiheit von lieferdienst-bio.de gemäß der Richtlinie (EU) 2016/2102 und den Anforderungen nach WCAG.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/barrierefreiheit" },
};

export default function BarrierefreiheitPage() {
  return (
    <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Erklärung zur Barrierefreiheit</h1>

      <div className="glass card" style={{ padding: 20, maxWidth: 900 }}>
        <p>
          lieferdienst-bio.de ist bemüht, seine Website im Einklang mit den
          Vorgaben der Europäischen Norm EN 301 549 sowie den Web Content Accessibility Guidelines (WCAG) 2.2
          auf Konformitätsstufe AA barrierefrei zugänglich zu machen.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>Stand der Vereinbarkeit</h2>
        <p>
          Diese Website ist weitgehend konform mit WCAG 2.2 AA. Einzelne Inhalte befinden sich noch in Überarbeitung.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>Nicht barrierefreie Inhalte</h2>
        <ul>
          <li>Einige Bilder aus externen Quellen können noch unvollständige Alternativtexte besitzen.</li>
          <li>Kontraste einzelner Textelemente auf Hintergrundbildern können je nach Geräteeinstellung variieren.</li>
          <li>Externe Inhalte (z. B. verlinkte Webshops) liegen außerhalb unseres Einflussbereichs.</li>
        </ul>

        <h2 className="h3" style={{ marginTop: 20 }}>Feedback und Kontakt</h2>
        <p>
          Sind Ihnen Barrieren aufgefallen? Schreiben Sie uns bitte an
          {" "}
          <a className="link" href="mailto:hello@lieferdienst-bio.de">hello@lieferdienst-bio.de</a>.
          Wir antworten in der Regel innerhalb von 5 Werktagen.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>Durchsetzungsverfahren</h2>
        <p>
          Wenn Ihre Anfrage innerhalb angemessener Frist nicht beantwortet wird, können Sie sich an die zuständige
          Schlichtungsstelle gemäß den Barrierefreiheitsgesetzen Ihres Bundeslandes wenden.
        </p>

        <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>
          Stand dieser Erklärung: {new Date().toLocaleDateString("de-DE")}
        </p>

        <p style={{ marginTop: 16 }}>
          <Link href="/" className="link">Zur Startseite</Link>
        </p>
      </div>
    </main>
  );
}

