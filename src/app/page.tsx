// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bio-Lieferdienste in deiner Nähe | lieferdienst-bio.de",
  description:
    "Finde Bio-Lieferservices in DE/AT/CH. Cleanes, neutrales Branchen-Verzeichnis mit Suche, Kategorien und direktem Webshop-Link.",
  alternates: { canonical: "https://lieferdienst-bio.de/" },
  openGraph: {
    title: "Bio-Lieferdienste in deiner Nähe",
    description:
      "Neutral & datenbasiert: suche nach Stadt, Land oder Kategorie – mit direktem Webshop-Link.",
    url: "https://lieferdienst-bio.de/",
    siteName: "lieferdienst-bio.de",
    type: "website",
  },
};

type WithChildren = { children: React.ReactNode; className?: string };

function GlassCard({ children, className }: WithChildren) {
  return (
    <div
      className={[
        "glass rounded-2xl border border-white/20",
        "shadow-lg shadow-black/20",
        "bg-white/[0.06] backdrop-blur-xl",
        className || "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Pill({ children }: WithChildren) {
  return (
    <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-white/10 border border-white/20 text-white/90">
      {children}
    </span>
  );
}

export default function Home() {
  const topCities = ["Berlin", "München", "Hamburg", "Köln", "Zürich", "Wien"];
  const quickCats = ["Gemüsekiste", "Obstkiste", "Abo", "Vegan", "Regional"];

  return (
    <main className="relative min-h-screen text-white">
      {/* Hintergrund */}
      <div className="hero-gradient pointer-events-none" aria-hidden />
      <div className="noise-overlay pointer-events-none" aria-hidden />

      {/* Navigation – super clean */}
      <header className="max-w-6xl mx-auto px-5 pt-6 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-white/90">
          lieferdienst-bio.de
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
          <Link href="/lieferdienste" className="hover:text-white">
            Liste
          </Link>
          <a
            href="https://lieferdienst-bio.de/lieferdienste?q=Gemüsekiste"
            className="hover:text-white"
          >
            Kategorien
          </a>
          <a
            href="mailto:info@lieferdienst-bio.de"
            className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 hover:bg-white"
          >
            Kontakt
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-10">
        <GlassCard className="px-6 md:px-10 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Bio-Lieferdienste in deiner Nähe finden
              </h1>
              <p className="mt-3 text-white/80">
                Neutraler Überblick für Deutschland, Österreich & Schweiz – mit
                direktem Webshop-Link.
              </p>

              {/* Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Neutral", "Datenbasiert", "DACH-weit"].map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
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
                placeholder="Stadt oder Anbieter (z. B. Berlin, Biokiste …)"
                className="w-full rounded-xl bg-white/10 border border-white/25 px-4 py-3 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                autoComplete="off"
              />
              <div className="flex gap-3">
                <select
                  name="land"
                  className="flex-1 rounded-xl bg-white/10 border border-white/25 px-3 py-3 text-white focus:outline-none"
                  defaultValue=""
                >
                  <option value="">Land</option>
                  <option value="DE">DE</option>
                  <option value="AT">AT</option>
                  <option value="CH">CH</option>
                </select>
                <button
                  className="px-5 py-3 rounded-xl bg-white/90 text-slate-900 hover:bg-white"
                  aria-label="Suche starten"
                >
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

      {/* Kategorien & Nutzen */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-5 pb-10">
        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold">Schnell Kategorien entdecken</h3>
          <p className="mt-2 text-white/80 text-sm">
            Direkt zu beliebten Themen springen.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickCats.map((c) => (
              <Link
                key={c}
                href={`/lieferdienste?q=${encodeURIComponent(c)}`}
                className="px-3 py-1.5 rounded-full text-sm bg-white/10 border border-white/20 hover:bg-white/20"
              >
                {c}
              </Link>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold">Neutral & unabhängig</h3>
          <p className="mt-2 text-white/80 text-sm">
            Kein Marktplatz, kein Pay-to-Win. Wir zeigen dir verifizierte
            Lieferdienste – mit direktem Shop-Link.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <Pill>DACH-weit</Pill>
            <Pill>Datenbasiert</Pill>
            <Pill>Direkte Links</Pill>
            <Pill>Filter & Suche</Pill>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold">Beliebt diese Woche</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li>🥕 Gemüsekiste groß – Trend ↑</li>
            <li>🍎 Obstkiste Familie – Preis/Leistung</li>
            <li>🌱 Vegan-Abo – stark in Städten</li>
          </ul>
          <div className="mt-5">
            <Link
              href="/lieferdienste"
              className="inline-block px-4 py-2 rounded-lg bg-white/90 text-slate-900 hover:bg-white"
            >
              Zur Liste
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Newsletter / Lead-Magnet */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <GlassCard className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Die besten Bio-Angebote deiner Region – 1×/Woche
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Exklusive Deals, neue Betriebe & saisonale Favoriten.
              </p>
            </div>
            <form
              action="https://example.com/newsletter" // hier später dein Provider
              method="POST"
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                required
                placeholder="E-Mail"
                className="flex-1 md:w-72 rounded-xl bg-white/10 border border-white/25 px-4 py-3 placeholder-white/60 text-white focus:outline-none"
              />
              <button className="px-4 py-3 rounded-xl bg-white/90 text-slate-900 hover:bg-white">
                Abonnieren
              </button>
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

      {/* Structured Data – SearchAction */}
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
              target:
                "https://lieferdienst-bio.de/lieferdienste?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  );
}
