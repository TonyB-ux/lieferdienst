// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bio-Lieferdienste in deiner Nähe | lieferdienst-bio.de",
  description:
    "Finde Bio-Lieferservices in DE/AT/CH. Neutrales Branchen-Verzeichnis mit Suche, Kategorien und direktem Webshop-Link.",
  alternates: { canonical: "https://lieferdienst-bio.de/" },
  openGraph: {
    title: "Bio-Lieferdienste in deiner Nähe",
    description:
      "Neutral & datenbasiert: Suche nach Stadt, Land oder Kategorie – mit direktem Webshop-Link.",
    url: "https://lieferdienst-bio.de/",
    siteName: "lieferdienst-bio.de",
    type: "website",
  },
};

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["glass", className].filter(Boolean).join(" ")}>{children}</div>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

export default function Home() {
  const topCities = ["Berlin", "München", "Hamburg", "Köln", "Zürich", "Wien"];
  const quickCats = ["Gemüsekiste", "Obstkiste", "Abo", "Vegan", "Regional"];

  return (
    <main className="relative min-h-screen">
      {/* Hintergrund */}
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-5 pt-6 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-white/90">
          lieferdienst-bio.de
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
          <Link href="/lieferdienste" className="hover:text-white">
            Liste
          </Link>
          <Link href="/lieferdienste?q=Gem%C3%BCsekiste" className="hover:text-white">
            Kategorien
          </Link>
          <a
            href="mailto:info@lieferdienst-bio.de"
            className="btn-ghost"
            style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
          >
            Kontakt
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-10">
        <GlassCard className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
                Bio-Lieferdienste in deiner Nähe finden
              </h1>
              <p className="mt-3 text-muted">
                Neutraler Überblick für Deutschland, Österreich & Schweiz – mit
                direktem Webshop-Link.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>Neutral</Chip>
                <Chip>Datenbasiert</Chip>
                <Chip>DACH-weit</Chip>
              </div>
            </div>

            {/* Suche */}
            <form
              action="/lieferdienste"
              method="GET"
              className="w-full md:max-w-md flex flex-col gap-3"
            >
              <input
                name="q"
                className="input w-full"
                placeholder="Stadt oder Anbieter (z. B. Berlin, Biokiste …)"
                autoComplete="off"
              />
              <div className="flex gap-3">
                <select name="land" defaultValue="" className="select flex-1">
                  <option value="">Land</option>
                  <option value="DE">DE</option>
                  <option value="AT">AT</option>
                  <option value="CH">CH</option>
                </select>
                <button className="btn-primary" aria-label="Suche starten">
                  Suchen
                </button>
              </div>

              <div className="text-xs text-white/70">
                Schnellzugriff:&nbsp;
                {topCities.map((city, i) => (
                  <Link
                    key={city}
                    href={`/lieferdienste?q=${encodeURIComponent(city)}`}
                    className="underline text-white/90 hover:text-white"
                  >
                    {city}
                    {i < topCities.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </div>
            </form>
          </div>
        </GlassCard>
      </section>

      {/* Drei Info-Kacheln */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-5 pb-10">
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white">Schnell Kategorien entdecken</h3>
          <p className="mt-2 text-muted text-sm">Direkt zu beliebten Themen springen.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickCats.map((c) => (
              <Link key={c} href={`/lieferdienste?q=${encodeURIComponent(c)}`} className="chip">
                {c}
              </Link>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white">Neutral & unabhängig</h3>
          <p className="mt-2 text-muted text-sm">
            Kein Marktplatz, kein Pay-to-Win. Wir zeigen verifizierte Lieferdienste mit direktem
            Shop-Link.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <Chip>DACH-weit</Chip>
            <Chip>Datenbasiert</Chip>
            <Chip>Direkte Links</Chip>
            <Chip>Filter & Suche</Chip>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white">Beliebt diese Woche</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li>🥕 Gemüsekiste groß – Trend ↑</li>
            <li>🍎 Obstkiste Familie – Preis/Leistung</li>
            <li>🌱 Vegan-Abo – stark in Städten</li>
          </ul>
          <div className="mt-5">
            <Link href="/lieferdienste" className="btn-ghost">
              Zur Liste
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <GlassCard className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Die besten Bio-Angebote deiner Region – 1×/Woche
              </h3>
              <p className="text-muted text-sm mt-1">
                Exklusive Deals, neue Betriebe & saisonale Favoriten.
              </p>
            </div>
            <form action="https://example.com/newsletter" method="POST" className="flex gap-2 w-full md:w-auto">
              <input type="email" required placeholder="E-Mail" className="input md:w-72" />
              <button className="btn-primary">Abonnieren</button>
            </form>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 pb-10 text-sm text-white/70">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p>© {new Date().getFullYear()} lieferdienst-bio.de</p>
          <div className="flex gap-4">
            <Link href="/lieferdienste" className="hover:text-white">
              Lieferdienste
            </Link>
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>

      {/* SearchAction Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "lieferdienst-bio.de",
            url: "https://lieferdienst-bio.de/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://lieferdienst-bio.de/lieferdienste?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  );
}
