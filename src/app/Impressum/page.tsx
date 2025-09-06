import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | lieferdienst-bio.de",
  description: "Impressum für die private, nicht kommerzielle Website lieferdienst-bio.de.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Impressum</h1>
      <div className="glass card" style={{ padding: 20, maxWidth: 900 }}>
        <p><strong>Diensteanbieter:</strong><br/>lieferdienst-bio.de (privates, nicht-kommerzielles Informationsangebot)</p>
        <p style={{ marginTop: 12 }}>
          <strong>Kontakt:</strong><br/>
          E-Mail: <a href="mailto:hello@lieferdienst-bio.de" className="link">hello@lieferdienst-bio.de</a>
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Verantwortungsbereich:</strong><br/>
          Redaktionelle Inhalte und Pflege dieser Website.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Keine kommerzielle Nutzung:</strong><br/>
          Dieses Angebot verfolgt keine Gewinnerzielungsabsicht. Es bestehen keine entgeltlichen Verträge über Werbung,
          Affiliate-Links oder vergleichbare Kooperationen.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Haftung für Inhalte:</strong><br/>
          Die Inhalte wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
          können wir jedoch keine Gewähr übernehmen. Bei Kenntnis von Rechtsverletzungen werden entsprechende Inhalte
          umgehend entfernt.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Haftung für Links:</strong><br/>
          Externe Links führen zu Inhalten fremder Anbieter. Für diese Inhalte ist der jeweilige Anbieter verantwortlich.
          Rechtsverstöße waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden werden solche Links
          unverzüglich entfernt.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Urheberrecht:</strong><br/>
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem Urheberrecht. Jede vom Urheberrechtsgesetz nicht
          zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung der jeweiligen Rechteinhaber.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Barrierefreiheit:</strong><br/>
          Hinweise zur digitalen Barrierefreiheit finden Sie in unserer <a className="link" href="/barrierefreiheit">Erklärung zur Barrierefreiheit</a>.
        </p>
      </div>
    </main>
  );
}

