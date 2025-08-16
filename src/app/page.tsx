// src/app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio-Lieferdienste finden – DE/AT/CH | lieferdienst-bio.de",
  description:
    "Finde Bio-Lieferservices in Deutschland, Österreich und der Schweiz. Neutraler Überblick mit direktem Webshop-Link, Filtern und Profi-Tipps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bio-Lieferdienste finden – DE/AT/CH",
    description:
      "Neutraler Überblick über Bio-Lieferservices in deiner Nähe – mit Suche, Filtern und direktem Shop-Link.",
    url: "https://lieferdienst-bio.de/",
    siteName: "lieferdienst-bio.de",
    type: "website",
  },
};

export default function Home() {
  const topCities = ["Berlin", "München", "Hamburg", "Köln", "Zürich", "Wien"];
  const quickCats = ["Gemüsekiste", "Obstkiste", "Abo", "Vegan", "Regional"];

  return (
    <main className="min-h-[70vh] text-white">
      {/* HERO */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Bio-Lieferdienste in deiner Nähe finden
        </h1>
        <p className="mt-3 text-white/80">
          Neutraler Überblick über Bio-Lieferservices in Deutschland, Österreich
          und der Schweiz.
        </p>

        {/* Suchformular: GET → /lieferdienste */}
        <form
          action="/lieferdienste"
          method="GET"
          className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch justify-center"
        >
          <input
            name="q"
            placeholder="Stadt oder Anbieter (z. B. Berlin, Biokiste …)"
            className="flex-1 max-w-[520px] rounded-xl bg-white/15 border border-white/30 px-4 py-3 placeholder-white/60 text-white focus:outline-none"
          />
          <select
            name="land"
            className="rounded-xl bg-white/15 border border-white/30 px-4 py-3 text-white focus:outline-none"
            defaultValue=""
          >
            <option value="">Land</option>
            <option value="DE">DE</option>
            <option value="AT">AT</option>
            <option value="CH">CH</option>
          </select>
          <button className="rounded-xl px-5 py-3 bg-white/90 text-slate-900 hover:bg-white">
            Suchen
          </button>
        </form>

        {/* Direktlinks: Top-Städte */}
        <p className="mt-8 text-white/70">Oder direkt:</p>
        <div className="mt-2 flex flex-wrap gap-3 justify-center text-sm">
          {topCities.map((city) => (
            <Link
              key={city}
              href={`/lieferdienste?q=${encodeURIComponent(city)}`}
              className="underline text-white/90 hover:text-white"
            >
              {city}
            </Link>
          ))}
        </div>

        {/* Schnelle Kategorien */}
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
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

        <div className="mt-8">
          <Link
            href="/lieferdienste"
            className="inline-block rounded-xl px-4 py-2 bg-white/90 text-slate-900"
          >
            Zur Liste
          </Link>
        </div>
      </section>

      {/* SEO: WebSite + SearchAction */}
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
