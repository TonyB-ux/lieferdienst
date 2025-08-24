"use client";

import Link from "next/link";
import { useConsent } from "../components/ConsentProvider";

export default function SiteFooter() {
  const { openBanner } = useConsent();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <strong>lieferdienst-bio.de</strong>
          <div className="muted" style={{ marginTop: 6 }}>
            Neutraler Überblick über Bio-Lieferservices in DE/AT/CH.
          </div>
        </div>

        <nav className="footer-nav">
          <Link href="/lieferdienste">Liste</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/kontakt">Kontakt</Link>
          <button className="link" onClick={openBanner}>Cookie-Einstellungen</button>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
