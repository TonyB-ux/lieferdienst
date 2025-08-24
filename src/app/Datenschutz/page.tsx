"use client";

import { useEffect } from "react";

export const metadata = {
  title: "Datenschutz | lieferdienst-bio.de",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  // Optionaler „Open Consent“-Trigger per CustomEvent
  useEffect(() => {
    function openConsent() {
      const ev = new CustomEvent("open-consent");
      window.dispatchEvent(ev);
    }
    (window as any).__openConsent = openConsent;
    return () => { delete (window as any).__openConsent; };
  }, []);

  return (
    <main className="container" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Datenschutz</h1>
      <div className="glass card" style={{ padding: 20, maxWidth: 800 }}>
        <p>Hier steht deine Datenschutzerklärung. Hinweise zu Cookies, Tracking und Widerruf.</p>
        <p style={{ marginTop: 12 }}>
          Du kannst deine Auswahl jederzeit ändern:&nbsp;
          <button className="link" onClick={() => (window as any).__openConsent?.()}>
            Cookie-Einstellungen öffnen
          </button>
        </p>
      </div>
    </main>
  );
}
