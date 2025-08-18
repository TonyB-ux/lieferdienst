// src/components/GlassStarter.tsx
import Link from "next/link";
import GuidesRow from "@/components/GuidesRow";

export default async function GlassStarter() {
  return (
    <main className="relative z-0">
      <div className="container" style={{ paddingTop: 16, paddingBottom: 32 }}>
        {/* 12-Spalten-Grid */}
        <div className="grid-cols">
          {/* ROW 1: HERO vollbreit */}
          <section className="col-span-12 hero">
            <h1 className="h1">
              Finde deinen
              passenden
              Bio-
              Lieferservice - 
              schnell und
              einfach<br/> in
               Deutschland, Östereich und der Schweiz.
            </h1>

            <p className="muted">
              Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit
              direktem Link zum Webshop.
            </p>

            <div className="row" style={{ marginTop: 16 }}>
              <span className="pill">Neutral & unabhängig</span>
              <span className="pill">DACH-weit</span>
              <span className="pill">Direkte Links</span>
            </div>

            <div className="row" style={{ marginTop: 18 }}>
              <Link href="/lieferdienste" className="btn btn-primary">Lieferdienste ansehen</Link>
              <Link href="/guides" className="btn">Alle Guides</Link>
            </div>
          </section>

          {/* ROW 2: 3 Kacheln je 4 Spalten */}
          <section className="col-span-4 card">
            <h2 className="card-title">Schnellstart</h2>
            <ul className="card-text" style={{ marginTop: 6 }}>
              <li>Neutral & unabhängig – kein Marktplatz</li>
              <li>DACH-weit – verifizierte Betriebe</li>
              <li>Direkte Webshop-Links</li>
            </ul>
            <div className="row" style={{ marginTop: 12 }}>
              <Link href="/lieferdienste?land=DE" className="pill">Deutschland</Link>
              <Link href="/lieferdienste?land=AT" className="pill">Österreich</Link>
              <Link href="/lieferdienste?land=CH" className="pill">Schweiz</Link>
            </div>
          </section>

          <section className="col-span-4 card">
            <h2 className="card-title">Regionen & Städte</h2>
            <p className="card-text">Finde Anbieter in deiner Nähe – von Berlin bis Zürich.</p>
            <div style={{ marginTop: 12 }}>
              <Link href="/lieferdienste" className="btn">Zur Liste</Link>
            </div>
          </section>

          <section className="col-span-4 card">
            <h2 className="card-title">Kategorien</h2>
            <p className="card-text">Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?</p>
            <div style={{ marginTop: 12 }}>
              <Link href="/lieferdienste" className="btn">Entdecken</Link>
            </div>
          </section>

          {/* ROW 3: WIDE-TEASER vollbreit */}
          <section className="col-span-12 card">
            <h2 className="card-title">Direkt zum Shop</h2>
            <p className="card-text">Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.</p>
            <div style={{ marginTop: 12 }}>
              <Link href="/lieferdienste" className="btn btn-primary">Jetzt stöbern</Link>
            </div>
          </section>
        </div>

        {/* ROW 4: Guides & Ratgeber (eigenes 3-Spalten-Grid innerhalb von <GuidesRow />) */}
        <section style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h2 className="card-title" style={{ fontSize: "1.15rem" }}>Guides & Ratgeber</h2>
            <Link href="/guides" className="btn">Alle Guides</Link>
          </div>

          {/* Kein zusätzlicher Grid-Wrapper – GuidesRow rendert selbst das 3-Spalten-Grid */}
          <GuidesRow />
        </section>
      </div>
    </main>
  );
}
