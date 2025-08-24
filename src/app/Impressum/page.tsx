export const metadata = {
    title: "Impressum | lieferdienst-bio.de",
    robots: { index: true, follow: true },
  };
  
  export default function ImpressumPage() {
    return (
      <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
        <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Impressum</h1>
        <div className="glass card" style={{ padding: 20, maxWidth: 800 }}>
          <p><strong>Verantwortlich:</strong> (Firma/Name, Anschrift)</p>
          <p style={{ marginTop: 12 }}>E-Mail: hello@lieferdienst-bio.de</p>
          <p style={{ marginTop: 12 }}>USt-ID: …</p>
        </div>
      </main>
    );
  }
  