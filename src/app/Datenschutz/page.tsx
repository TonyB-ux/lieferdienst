import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | lieferdienst-bio.de",
  description: "Datenschutzerklärung von lieferdienst-bio.de (Cookies, Reichweitenmessung, Kontakt).",
  robots: { index: true, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Datenschutzerklärung</h1>
      <div className="glass card" style={{ padding: 20, maxWidth: 900 }}>
        <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Vorschriften.</p>

        <h2 className="h3" style={{ marginTop: 20 }}>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung ist die Betreiberin/der Betreiber von lieferdienst-bio.de.<br/>
          Kontakt: <a className="link" href="mailto:hello@lieferdienst-bio.de">hello@lieferdienst-bio.de</a>
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>2. Verarbeitete Daten, Zwecke und Rechtsgrundlagen</h2>
        <ul>
          <li><strong>Server-Logfiles</strong> (IP-Adresse in gekürzter/anonymisierter Form, Datum/Uhrzeit, User-Agent): zur Sicherstellung des technischen Betriebs (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO).</li>
          <li><strong>Einwilligungsmanagement</strong>: Wir speichern Ihre Einwilligungsentscheidung (Consent) im Local Storage, um Ihre Auswahl zu berücksichtigen (berechtigtes Interesse/Einwilligung, Art. 6 Abs. 1 lit. a/f DSGVO).</li>
          <li><strong>Reichweitenmessung (optional)</strong>: Google Analytics 4 wird nur nach aktiver Einwilligung geladen. Es wird der Consent Mode genutzt; IP-Anonymisierung ist aktiv (Einwilligung, Art. 6 Abs. 1 lit. a DSGVO).</li>
        </ul>

        <h2 className="h3" style={{ marginTop: 20 }}>3. Cookies & Consent</h2>
        <p>
          Notwendige Cookies/Storage sind für den Betrieb erforderlich. Statistik/Marketing werden erst nach Einwilligung gesetzt. Sie können Ihre Auswahl jederzeit über den Link „Cookie‑Einstellungen“ im Footer ändern.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>4. Einbindung externer Inhalte</h2>
        <p>
          Verlinkte externe Webshops/Angebote liegen außerhalb unseres Verantwortungsbereichs. Beim Aufruf externer Seiten gelten deren Datenschutzbestimmungen.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>5. Speicherdauer</h2>
        <p>
          Logdaten werden serverseitig entsprechend der Standardfristen des Hosters gelöscht. Einwilligungen bleiben gespeichert, bis Sie diese ändern oder den Local Storage löschen.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>6. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO). Bitte wenden Sie sich dazu an <a className="link" href="mailto:hello@lieferdienst-bio.de">hello@lieferdienst-bio.de</a>.
        </p>

        <h2 className="h3" style={{ marginTop: 20 }}>7. Kontakt</h2>
        <p>
          Fragen zum Datenschutz richten Sie bitte an <a className="link" href="mailto:hello@lieferdienst-bio.de">hello@lieferdienst-bio.de</a>.
        </p>

        <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>Stand: {new Date().toLocaleDateString("de-DE")}</p>
      </div>
    </main>
  );
}

