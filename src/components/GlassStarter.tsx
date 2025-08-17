// src/components/GlassStarter.tsx
import Link from "next/link";
import GuidesRow from "@/components/GuidesRow";

/**
 * Hinweis:
 * - Der Wrapper nutzt sowohl die Klasse `glass` (falls du sie in globals.css definiert hast),
 *   als auch Tailwind-Utilities als Fallback.
 * - Alle Links zeigen auf bestehende Routen (/lieferdienste, /guides).
 * - GuidesRow rendert automatisch die 3 neuesten Guides (oder Fallback-Teaser).
 */

export default async function GlassStarter() {
  return (
    <main className="relative z-0">
      {/* Seite: max Breite + Paddings */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 pb-16 pt-6">
        {/* Top-Reihe: Hero + Kacheln */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* HERO (2 Spalten) */}
          <section
            className="lg:col-span-2 rounded-2xl glass
                       bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-6 md:p-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Finde den
              <br />
              passenden
              <br />
              Bio-
              <br />
              Lieferservice –
              <br />
              schnell,
              <br />
              neutral, DACH-
              <br />
              weit.
            </h1>

            <p className="text-slate-700 mt-5 leading-relaxed">
              Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit
              direktem Link zum Webshop.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10">
                Neutral & unabhängig
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10">
                DACH-weit
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10">
                Direkte Links
              </span>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                href="/lieferdienste"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 text-white px-5 py-3 font-semibold shadow hover:bg-emerald-600 transition"
              >
                Lieferdienste ansehen
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center justify-center rounded-xl bg-white/90 text-slate-900 px-5 py-3 font-semibold ring-1 ring-black/10 hover:bg-white transition"
              >
                Alle Guides
              </Link>
            </div>
          </section>

          {/* SCHNELLSTART */}
          <section
            className="rounded-2xl glass bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-6 md:p-6"
          >
            <h3 className="font-semibold text-slate-900">Schnellstart</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Neutral & unabhängig – kein Marktplatz</li>
              <li>• DACH-weit – verifizierte Betriebe</li>
              <li>• Direkte Webshop-Links</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/lieferdienste?land=DE"
                className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10"
              >
                Deutschland
              </Link>
              <Link
                href="/lieferdienste?land=AT"
                className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10"
              >
                Österreich
              </Link>
              <Link
                href="/lieferdienste?land=CH"
                className="text-xs px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10"
              >
                Schweiz
              </Link>
            </div>
          </section>

          {/* REGIONEN & STÄDTE */}
          <section
            className="rounded-2xl glass bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-6 md:p-6"
          >
            <h3 className="font-semibold text-slate-900">Regionen & Städte</h3>
            <p className="text-sm text-slate-700 mt-2">
              Finde Anbieter in deiner Nähe – von Berlin bis Zürich.
            </p>
            <Link
              href="/lieferdienste"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-slate-50 transition"
            >
              Zur Liste
            </Link>
          </section>

          {/* KATEGORIEN */}
          <section
            className="rounded-2xl glass bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-6 md:p-6"
          >
            <h3 className="font-semibold text-slate-900">Kategorien</h3>
            <p className="text-sm text-slate-700 mt-2">
              Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?
            </p>
            <Link
              href="/lieferdienste"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2 font-semibold ring-1 ring-black/10 hover:bg-slate-50 transition"
            >
              Entdecken
            </Link>
          </section>

          {/* DIREKT ZUM SHOP */}
          <section
            className="rounded-2xl glass bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-6 md:p-6"
          >
            <h3 className="font-semibold text-slate-900">Direkt zum Shop</h3>
            <p className="text-sm text-slate-700 mt-2">
              Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.
            </p>
            <Link
              href="/lieferdienste"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-700 text-white px-4 py-2 font-semibold hover:bg-emerald-600 transition"
            >
              Jetzt stöbern
            </Link>
          </section>
        </div>

        {/* Guides & Ratgeber */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 text-lg">Guides & Ratgeber</h3>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold ring-1 ring-black/10 hover:bg-slate-50 transition"
            >
              Alle Guides
            </Link>
          </div>

          <GuidesRow />
        </section>
      </div>
    </main>
  );
}


