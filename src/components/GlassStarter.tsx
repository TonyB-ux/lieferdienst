// src/components/GlassStarter.tsx
import Link from "next/link";
import Image from "next/image";
import GuidesRow from "./GuidesRow"; // deine dynamische Guides-Komponente (falls vorhanden)

export default function GlassStarter() {
  return (
    <>
      {/* Background */}
      <div className="bg-layer" />
      <div className="bg-photo" />

      {/* Header */}
      <header className="site-header container">
        <div className="glass site-nav">
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <Image src="/logo-lb.svg" alt="lieferdienst-bio.de" width={28} height={28} priority />
            <span style={{fontWeight:700}}>lieferdienst-bio.de</span>
          </div>
          <nav style={{display:"flex", gap:12}}>
            <Link className="btn" href="/lieferdienste">Liste</Link>
            <Link className="btn" href="/guides">Guides</Link>
            <Link className="btn" href="/kontakt">Kontakt</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container" style={{marginTop: 16}}>
        <div className="grid-cols">
          {/* Hero */}
          <section className="glass col-span-6" style={{padding:24}}>
            <h1 className="h1">Finde den passenden Bio-Lieferservice – schnell, neutral, DACH-weit.</h1>
            <p className="muted" style={{marginTop:12, maxWidth:640}}>
              Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit direktem Link zum Webshop.
            </p>
            <div style={{display:"flex", gap:8, marginTop:14, flexWrap:"wrap"}}>
              <span className="badge">Neutral & unabhängig</span>
              <span className="badge">DACH-weit</span>
              <span className="badge">Direkte Links</span>
            </div>
            <div style={{display:"flex", gap:10, marginTop:18, flexWrap:"wrap"}}>
              <Link href="/lieferdienste" className="btn btn-primary">Lieferdienste ansehen</Link>
              <Link href="/guides" className="btn">Alle Guides</Link>
            </div>
          </section>

          {/* Schnellstart */}
          <section className="glass col-span-3" style={{padding:20}}>
            <h2 className="h2">Schnellstart</h2>
            <ul className="muted" style={{margin:"12px 0 16px 18px", lineHeight:1.6}}>
              <li>Neutral & unabhängig – kein Marktplatz</li>
              <li>DACH-weit – verifizierte Betriebe</li>
              <li>Direkte Webshop-Links</li>
            </ul>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <Link className="btn" href="/lieferdienste?land=DE">Deutschland</Link>
              <Link className="btn" href="/lieferdienste?land=AT">Österreich</Link>
              <Link className="btn" href="/lieferdienste?land=CH">Schweiz</Link>
            </div>
          </section>

          {/* Regionen */}
          <section className="glass col-span-3" style={{padding:20}}>
            <h2 className="h2">Regionen & Städte</h2>
            <p className="muted">Finde Anbieter in deiner Nähe – von Berlin bis Zürich.</p>
            <Link className="btn btn-primary" href="/lieferdienste" style={{marginTop:12}}>Zur Liste</Link>
          </section>

          {/* Kategorien */}
          <section className="glass col-span-3" style={{padding:20}}>
            <h2 className="h2">Kategorien</h2>
            <p className="muted">Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?</p>
            <Link className="btn" href="/lieferdienste?q=Gem%C3%BCsekiste" style={{marginTop:12}}>Entdecken</Link>
          </section>

          {/* Direkt zum Shop */}
          <section className="glass col-span-3" style={{padding:20}}>
            <h2 className="h2">Direkt zum Shop</h2>
            <p className="muted">Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.</p>
            <Link className="btn btn-primary" href="/lieferdienste" style={{marginTop:12}}>Jetzt stöbern</Link>
          </section>

          {/* Guides Row */}
          <section className="glass col-span-12" style={{padding:20}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
              <h2 className="h2" style={{margin:0}}>Guides & Ratgeber</h2>
              <Link className="btn" href="/guides">Alle Guides</Link>
            </div>
            {/* dynamisch; falls du eine statische Variante willst, sag Bescheid */}
            <GuidesRow />
          </section>
        </div>
      </main>
    </>
  );
}
