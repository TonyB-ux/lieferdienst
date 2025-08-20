export const metadata = {
    title: "Kontakt | lieferdienst-bio.de",
    description:
      "Schreib uns – Fragen, Feedback oder Partnerschaftsanfragen rund um lieferdienst-bio.de.",
  };
  
  export default function KontaktPage() {
    return (
      <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
        <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Kontakt</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          Wir freuen uns über Feedback, Korrekturen und Partneranfragen.
        </p>
  
        <div className="glass card" style={{ padding: 20, maxWidth: 720 }}>
          <p>
            E-Mail:{" "}
            <a href="mailto:hello@lieferdienst-bio.de" className="link">
              hello@lieferdienst-bio.de
            </a>
          </p>
          <p style={{ marginTop: 12 }}>
            Oder nutze unsere Guides und Liste, um direkt loszulegen.
          </p>
        </div>
      </main>
    );
  }

  