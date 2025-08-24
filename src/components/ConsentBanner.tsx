"use client";

import React, { useState, useEffect } from "react";
import { useConsent } from "./ConsentProvider";

export default function ConsentBanner() {
  const { consent, setConsent, showBanner, closeBanner } = useConsent();
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  useEffect(() => {
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }, [consent]);

  if (!showBanner) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    closeBanner();
  };
  const rejectNonEssential = () => {
    setConsent({ analytics: false, marketing: false });
    closeBanner();
  };
  const saveSelection = () => {
    setConsent({ analytics, marketing });
    closeBanner();
  };

  return (
    <div className="consent-backdrop" role="dialog" aria-modal="true" aria-labelledby="cc-title">
      <div className="consent-modal glass">
        <h3 id="cc-title" className="card-title" style={{ marginBottom: 8 }}>Cookies & Datenschutz</h3>
        <p className="card-text" style={{ marginBottom: 12 }}>
          Wir verwenden notwendige Cookies, um die Seite zu betreiben. Optional kannst du Analytics und Marketing erlauben.
        </p>

        <div className="consent-switches">
          <label className="switch">
            <input type="checkbox" checked disabled />
            <span>Notwendig (immer aktiv)</span>
          </label>
          <label className="switch">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>Analytics</span>
          </label>
          <label className="switch">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>Marketing</span>
          </label>
        </div>

        <div className="cc-actions">
          <button className="btn" onClick={rejectNonEssential}>Nur notwendig</button>
          <button className="btn" onClick={saveSelection}>Auswahl speichern</button>
          <button className="btn btn-primary" onClick={acceptAll}>Alle akzeptieren</button>
        </div>

        <p className="muted" style={{ marginTop: 10, fontSize: "0.9rem" }}>
          Mehr Infos in <a className="link" href="/datenschutz">Datenschutz</a> & <a className="link" href="/impressum">Impressum</a>.
        </p>
      </div>
    </div>
  );
}
