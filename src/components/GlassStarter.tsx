// src/components/GlassStarter.tsx
import GuidesRow from "@/components/GuidesRow";
import Image from "next/image";
import NextLink from "next/link";

export default function GlassStarter() {
  return (
    <main className="relative z-0">
      <div className="container" style={{ paddingTop: 16, paddingBottom: 32 }}>
        {/* Reihe 1: Hero + 2 Karten */}
        <div className="grid-cols">
          {/* HERO */}
          <section className="col-span-6 hero">
            <div className="hero-inner">
              <h1 className="h1">
                Finde den<br />
                passenden<br />
                Bio-<br />
                Lieferservice –<br />
                schnell,<br />
                neutral, DACH-<br />
                weit.
              </h1>

              <p className="muted">
                Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit
                direktem Link zum Webshop.
              </p>

              <div className="row section">
                <span className="pill">Neutral & unabhängig</span>
                <span className="pill">DACH-weit</span>
                <span className="pill">Direkte Links</span>
              </div>

              <div className="row-cta">
                <NextLink href="/lieferdienste" className="btn btn-primary">
                  <Image
                    src="/img/lieferwagen.png"
                    alt=""                 // dekorativ
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="icon-left"
                    priority
                    sizes="24px"
                  />
                  Lieferdienste entdecken
                </NextLink>
                <NextLink href="/guides" className="btn">Alle Beiträge</NextLink>
              </div>
            </div>
          </section>

          {/* Schnellstart */}
          <section className="col-span-3 card">
            <h2 className="card-title">Schnellstart</h2>
            <ul className="card-text" style={{ marginTop: 6 }}>
              <li>Neutral & unabhängig – kein Marktplatz</li>
              <li>DACH-weit – verifizierte Betriebe</li>
              <li>Direkte Webshop-Links</li>
            </ul>
            <div className="row section">
              <NextLink href="/lieferdienste?land=DE" className="pill">Deutschland</NextLink>
              <NextLink href="/lieferdienste?land=AT" className="pill">Österreich</NextLink>
              <NextLink href="/lieferdienste?land=CH" className="pill">Schweiz</NextLink>
            </div>
          </section>

          {/* Regionen & Städte */}
          <section className="col-span-3 card">
            <h2 className="card-title">Regionen & Städte</h2>
            <p className="card-text">Finde Anbieter in deiner Nähe – von Berlin bis Zürich.</p>
            <div className="section">
              <NextLink href="/lieferdienste" className="btn">Zur Liste</NextLink>
            </div>
          </section>

          {/* Reihe 2: 2 Karten */}
          <section className="col-span-3 card">
            <h2 className="card-title">Kategorien</h2>
            <p className="card-text">Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?</p>
            <div className="section">
              <NextLink href="/lieferdienste" className="btn">Entdecken</NextLink>
            </div>
          </section>

          <section className="col-span-3 card">
            <h2 className="card-title">Direkt zum Shop</h2>
            <p className="card-text">Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.</p>
            <div className="section">
              <NextLink href="/lieferdienste" className="btn btn-primary">Jetzt stöbern</NextLink>
            </div>
          </section>
        </div>

        {/* Guides & Ratgeber – nur **ein** Grid (kommt aus <GuidesRow/>) */}
        <section id="home-guides" className="home-guides" aria-labelledby="guides-heading" style={{ marginTop: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 id="guides-heading" className="card-title" style={{ fontSize: "1.25rem" }}>
              Guides & Ratgeber
            </h2>
            <NextLink href="/guides" className="btn">Alle Guides</NextLink>
          </div>

          {/* kein zusätzlicher wrapper mit role="list" */}
          <GuidesRow />
        </section>
      </div>
    </main>
  );
}
