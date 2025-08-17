// src/app/page.tsx
import Link from "next/link";
import GuidesRow from "@/components/GuidesRow";

export default function HomePage() {
  return (
    <>
          {/* Header */}


      <main className="container">
        {/* Hero */}
        <section className="hero">
          <div className="glass hero-card">
            <h1 className="hero-title">Finde den passenden Bio-Lieferservice – schnell, neutral, DACH-weit.</h1>
            <p className="hero-sub">Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit direktem Link zum Webshop.</p>

            <div className="pills mb-3">
              <span className="pill">Neutral & unabhängig</span>
              <span className="pill">DACH-weit</span>
              <span className="pill">Direkte Links</span>
            </div>

            <div>
              <Link href="/lieferdienste" className="btn btn-primary">Lieferdienste ansehen</Link>
              <Link href="/guides" className="btn btn-ghost" style={{marginLeft:10}}>Alle Guides</Link>
            </div>
          </div>
        </section>

        {/* Drei Nutzen-Karten */}
        <section className="section">
          <div className="grid-3">
            <div className="glass card">
              <h3>Schnellstart</h3>
              <ul className="muted mt-1" style={{margin:0,paddingLeft:"18px"}}>
                <li>Neutral & unabhängig – kein Marktplatz</li>
                <li>DACH-weit – verifizierte Betriebe</li>
                <li>Direkte Webshop-Links</li>
              </ul>
              <div className="pills mt-3">
                <Link href="/lieferdienste?land=DE" className="pill">Deutschland</Link>
                <Link href="/lieferdienste?land=AT" className="pill">Österreich</Link>
                <Link href="/lieferdienste?land=CH" className="pill">Schweiz</Link>
              </div>
            </div>

            <div className="glass card">
              <h3>Regionen & Städte</h3>
              <p className="muted mt-1">Finde Anbieter in deiner Nähe – von Berlin bis Zürich.</p>
              <Link href="/lieferdienste" className="btn btn-ghost mt-3">Zur Liste</Link>
            </div>

            <div className="glass card">
              <h3>Kategorien</h3>
              <p className="muted mt-1">Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?</p>
              <Link href="/lieferdienste?q=Gem%C3%BCsekiste" className="btn btn-ghost mt-3">Entdecken</Link>
            </div>
          </div>
        </section>

        {/* Direkt zum Shop */}
        <section className="section">
          <div className="glass card">
            <h3>Direkt zum Shop</h3>
            <p className="muted mt-1">Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.</p>
            <Link href="/lieferdienste" className="btn btn-primary mt-3">Jetzt stöbern</Link>
          </div>
        </section>

        {/* Guides */}
        <section className="section">
          <div className="section-title">
            <h2>Guides & Ratgeber</h2>
            <Link href="/guides" className="btn btn-ghost">Alle Guides</Link>
          </div>
          <GuidesRow />
        </section>

        <div className="spacer" />
      </main>
    </>
  );
}
