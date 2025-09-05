// src/components/GlassStarter.tsx
import Image from "next/image";
import NextLink from "next/link";

export default function GlassStarter() {
  return (
    <main className="relative z-0">
      <div className="container" style={{ paddingTop: 16, paddingBottom: 32 }}>
        {/* === Hero oben, Karten darunter === */}
        <div className="grid-cols" style={{ alignItems: "start" }}>
          {/* HERO */}
          <section className="col-span-12 hero">
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
                <span className="pill">Neutral &amp; unabhängig</span>
                <span className="pill">DACH-weit</span>
                <span className="pill">Direkte Links</span>
              </div>

              <div className="row-cta">
                <NextLink href="/lieferdienste" className="btn btn-primary">
                  <Image
                    src="/img/lieferwagen.png"
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="icon-left"
                    priority
                    sizes="24px"
                  />
                  Lieferdienste entdecken
                </NextLink>

                <NextLink href="/guides" className="btn">
                  Alle Beiträge
                </NextLink>
              </div>
            </div>
            {/* Dekoratives Logo rechts im Hero */}
            <Image
              src="/logo.png"
              alt=""
              width={180}
              height={116}
              priority={false}
              className="hero-logo"
            />
          </section>

          {/* Rechte Spalte: 2 Karten mit gleicher Höhe (untereinander gekoppelt) */}
          <div className="col-span-12 under-hero-grid" style={{ marginTop: 16 }}>
            {/* Schnellstart */}
            <section className="card">
              <h2 className="card-title">Schnellstart</h2>
              <ul className="card-text" style={{ marginTop: 6 }}>
                <li>Neutral &amp; unabhängig – kein Marktplatz</li>
                <li>DACH-weit – verifizierte Betriebe</li>
                <li>Direkte Webshop-Links</li>
              </ul>
              <div className="row section" style={{ marginTop: 8 }}>
                {/* kleines Icon */}
                <Image src="/logo_pin_horizontal.svg" alt="" width={28} height={28} aria-hidden="true" />
                <NextLink href="/lieferdienste?land=DE" className="pill">Deutschland</NextLink>
                <NextLink href="/lieferdienste?land=AT" className="pill">Österreich</NextLink>
                <NextLink href="/lieferdienste?land=CH" className="pill">Schweiz</NextLink>
              </div>
            </section>

            {/* Regionen & Städte */}
            <section className="card">
              <h2 className="card-title">Regionen &amp; Städte</h2>
              <p className="card-text">Finde Anbieter in deiner Nähe – von Berlin bis Zürich.</p>
              <div className="section">
                <NextLink href="/lieferdienste" className="btn">Zur Liste</NextLink>
              </div>
            </section>

            {/* Kategorien */}
            <section className="card">
              <h2 className="card-title">Kategorien</h2>
              <p className="card-text">Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?</p>
              <div className="section">
                <NextLink href="/lieferdienste" className="btn">Entdecken</NextLink>
              </div>
            </section>

            {/* Direkt zum Shop */}
            <section className="card">
              <h2 className="card-title">Direkt zum Shop</h2>
              <p className="card-text">Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.</p>
              <div className="section">
                <NextLink href="/lieferdienste" className="btn btn-primary">Jetzt stöbern</NextLink>
              </div>
            </section>
          </div>
        </div>

        {/* WICHTIG:
           Die frühere „Guides & Ratgeber“-Sektion wurde entfernt.
           Die Guides kommen jetzt ausschließlich aus <GuidesRow /> in src/app/page.tsx. */}
      </div>
    </main>
  );
}
