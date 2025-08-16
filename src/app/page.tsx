// src/app/page.tsx
import Link from "next/link";
import GuidesRow from "../components/GuidesRow";

export const revalidate = 3600;

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["glass", className].filter(Boolean).join(" ")}>{children}</div>;
}

export default async function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* dekorative Layer */}
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-5 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, var(--primary) 0%, color-mix(in oklab, var(--accent), #fff 25%) 100%)",
              border: "1px solid var(--glass-border)",
              boxShadow: "var(--glass-shadow)",
            }}
          />
          <Link href="/" className="text-white font-semibold tracking-wide">
            lieferdienst-bio.de
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
          <a href="/lieferdienste" className="hover:text-white">Liste</a>
          <a href="/guides" className="hover:text-white">Guides</a> {/* ⇦ NEU */}
          <a
            href="mailto:info@lieferdienst-bio.de"
            className="btn-ghost"
            style={{ paddingTop: ".5rem", paddingBottom: ".5rem" }}
          >
            Kontakt
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-6 pb-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white">
              Finde den passenden Bio-Lieferservice – schnell, neutral, DACH-weit.
            </h1>
            <p className="text-muted mt-3">
              Wir zeigen dir verifizierte Bio-Betriebe in Deutschland, Österreich und der Schweiz – mit
              direktem Link zum Webshop.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <a href="/lieferdienste" className="btn-solid">Lieferdienste ansehen</a>
              <a href="/guides" className="btn-ghost">Alle Guides</a>
            </div>
          </div>

          <GlassCard className="p-5 md:p-6">
            <h3 className="text-white font-semibold">Schnellstart</h3>
            <ul className="text-sm text-muted mt-3 space-y-2">
              <li>• Neutral & unabhängig – kein Marktplatz, keine Bevorzugung</li>
              <li>• DACH-weit – über 90 Lieferbetriebe in der Übersicht</li>
              <li>• Direkte Webshop-Links – ohne Umwege</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <a href="/lieferdienste?land=DE" className="btn-ghost">Deutschland</a>
              <a href="/lieferdienste?land=AT" className="btn-ghost">Österreich</a>
              <a href="/lieferdienste?land=CH" className="btn-ghost">Schweiz</a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Info-Kacheln */}
      <section className="max-w-6xl mx-auto px-5 pb-10 grid md:grid-cols-3 gap-5">
        <GlassCard className="p-5">
          <h3 className="text-white font-semibold">Regionen & Städte</h3>
          <p className="text-muted text-sm mt-2">
            Finde Anbieter in deiner Nähe – von Berlin bis Zürich.
          </p>
          <a href="/lieferdienste" className="btn-ghost mt-4 inline-block">Zur Liste</a>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-white font-semibold">Kategorien</h3>
          <p className="text-muted text-sm mt-2">
            Gemüsekiste, Abo, Vegan, Familienbox – was passt zu dir?
          </p>
          <a href="/lieferdienste?q=Gem%C3%BCsekiste" className="btn-ghost mt-4 inline-block">
            Entdecken
          </a>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-white font-semibold">Direkt zum Shop</h3>
          <p className="text-muted text-sm mt-2">
            Verifizierte Bio-Betriebe mit direkter Weiterleitung zum Webshop.
          </p>
          <a href="/lieferdienste" className="btn-ghost mt-4 inline-block">Jetzt stöbern</a>
        </GlassCard>
      </section>

      {/* Guides & Ratgeber (NEU) */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Guides & Ratgeber</h2>
          <a href="/guides" className="btn-ghost">Alle Guides</a>
        </div>
        <GuidesRow />
      </section>

      {/* Footer Mini */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-8 text-sm text-white/70">
          © {new Date().getFullYear()} lieferdienst-bio.de ·
          <span className="mx-2">·</span>
          <a className="underline" href="/impressum">Impressum</a>
          <span className="mx-2">·</span>
          <a className="underline" href="/datenschutz">Datenschutz</a>
        </div>
      </footer>
    </main>
  );
}
