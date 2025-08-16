'use client';

import React, { useMemo, useState } from "react";

/** Datentypen */
type CountryCode = "ALL" | "DE" | "AT" | "CH";

type Supplier = {
  id: string;
  name: string;
  city: string;
  country: Exclude<CountryCode, "ALL">;
  categories: string[];
  minOrder: number;
  shipping: number;
  badges: string[];
  logo: string;
  url: string;
};

/** Mockdaten */
const MOCK_SUPPLIERS: Supplier[] = [
  { id: "1", name: "BioKiste Berlin", city: "Berlin", country: "DE", categories: ["Gemüsekiste","Abo"], minOrder: 25, shipping: 3.9, badges: ["Abo verfügbar","Regional"], logo: "https://images.unsplash.com/photo-1514511547113-1be72277b32f?q=80&w=400&auto=format&fit=crop", url: "https://example.com/biokiste-berlin" },
  { id: "2", name: "Alpen BioBox", city: "München", country: "DE", categories: ["Gemüsekiste","Obstkiste","Familie"], minOrder: 29, shipping: 0, badges: ["Gratis Lieferung","Saisonal"], logo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&auto=format&fit=crop", url: "https://example.com/alpen-biobox" },
  { id: "3", name: "Vienne Bio Panier", city: "Wien", country: "AT", categories: ["Abo","Vegan"], minOrder: 22, shipping: 4.5, badges: ["Vegan","Demeter"], logo: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=400&auto=format&fit=crop", url: "https://example.com/vienne-bio" },
  { id: "4", name: "Züri Grünkorb", city: "Zürich", country: "CH", categories: ["Obstkiste","Büro-Obst"], minOrder: 35, shipping: 5.9, badges: ["Büro-Obst","Regional"], logo: "https://images.unsplash.com/photo-1604908176997-4316517b1a8b?q=80&w=400&auto=format&fit=crop", url: "https://example.com/zueri-gruenkorb" },
  { id: "5", name: "RheinBio", city: "Köln", country: "DE", categories: ["Gemüsekiste","Vegan"], minOrder: 24, shipping: 2.9, badges: ["EU-Bio","Abo verfügbar"], logo: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop", url: "https://example.com/rheinbio" },
  { id: "6", name: "AlpGreen", city: "Bern", country: "CH", categories: ["Gemüsekiste","Regional"], minOrder: 27, shipping: 0, badges: ["Gratis Lieferung","Bioland"], logo: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?q=80&w=400&auto=format&fit=crop", url: "https://example.com/alpgreen" }
];

const ALL_CATEGORIES = ["Gemüsekiste","Obstkiste","Abo","Vegan","Familie","Büro-Obst","Regional"] as const;

function clsx(...x: (string | false | null | undefined)[]) {
  return x.filter(Boolean).join(" ");
}

/** FIX: akzeptiert jetzt id/… alle div-Props */
function GlassCard(
  { className = "", children, ...rest }: React.ComponentPropsWithoutRef<'div'>
) {
  return (
    <div
      {...rest}
      className={clsx(
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-full text-sm",
        active ? "bg-white/90 text-slate-900" : "bg-white/10 text-white/90 hover:bg-white/20",
        "border border-white/20 transition"
      )}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/15 border border-white/20 text-white/90">
      {children}
    </span>
  );
}

export default function GlassStarter() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<CountryCode>("ALL");
  const [activeCats, setActiveCats] = useState<string[]>([]);

  const results = useMemo(() => {
    return MOCK_SUPPLIERS.filter((s) => {
      const matchCountry = country === "ALL" || s.country === country;
      const q = query.toLowerCase();
      const matchQuery = !query || s.city.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
      const matchCats = activeCats.length === 0 || activeCats.every((c) => s.categories.includes(c));
      return matchCountry && matchQuery && matchCats;
    });
  }, [query, country, activeCats]);

  function toggleCat(cat: string) {
    setActiveCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  const COUNTRY_OPTIONS: { label: string; val: CountryCode }[] = [
    { label: "Alle", val: "ALL" },
    { label: "DE", val: "DE" },
    { label: "AT", val: "AT" },
    { label: "CH", val: "CH" },
  ];

  return (
    <div className="min-h-screen text-white bg-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-transparent" />
        <div className="absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full blur-3xl bg-emerald-500/20" />
      </div>

      <Nav />
      <Hero query={query} setQuery={setQuery} />

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <section className="mt-8">
          <GlassCard className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <label className="text-sm text-white/80">Land</label>
                <div className="flex gap-2">
                  {COUNTRY_OPTIONS.map((opt) => (
                    <Chip key={opt.val} active={country === opt.val} onClick={() => setCountry(opt.val)}>
                      {opt.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2 overflow-x-auto">
                {ALL_CATEGORIES.map((cat) => (
                  <Chip key={cat} active={activeCats.includes(cat)} onClick={() => toggleCat(cat)}>
                    {cat}
                  </Chip>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between">
            <h2 className="text-xl md:text-2xl font-semibold">Lieferdienste</h2>
            <p className="text-sm text-white/70">{results.length} Treffer</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((s) => (
              <SupplierCard key={s.id} supplier={s} />
            ))}
          </div>

          {results.length === 0 && (
            <GlassCard className="p-8 mt-6 text-center text-white/80">
              Keine Ergebnisse. Passe deine Filter an.
            </GlassCard>
          )}
        </section>

        <section className="mt-12 mb-16">
          <NewsletterCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/40 border-b border-white/10">
      <div className="mx-auto flex items-center justify-between max-w-6xl px-4 md:px-6 lg:px-8 h-14">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-white/20 border border-white/20" />
          <span className="font-semibold tracking-tight">lieferdienst-bio.de</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#" className="hover:text-white">Lieferdienste</a>
          <a href="#" className="hover:text-white">Regionen</a>
          <a href="#" className="hover:text-white">Kategorien</a>
          <a href="#" className="hover:text-white">Guides</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#newsletter" className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-sm">Newsletter</a>
        </div>
      </div>
    </header>
  );
}

function Hero({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <GlassCard className="p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-semibold">Bio-Lieferdienste in deiner Nähe finden</h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Neutraler Überblick für Deutschland, Österreich und die Schweiz – mit direktem Shop-Link.
          </p>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1 rounded-xl bg-white/15 border border-white/30 px-4 py-3 placeholder-white/60 text-white focus:outline-none"
              placeholder="PLZ oder Ort eingeben"
            />
            <button className="rounded-xl px-5 py-3 bg-white/90 text-slate-900 hover:bg-white">Jetzt finden</button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
            <Badge>DACH-weit</Badge>
            <Badge>Unabhängig</Badge>
            <Badge>Kostenlos</Badge>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="aspect-[16/9] w-full bg-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={supplier.logo} alt={supplier.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{supplier.name}</h3>
            <p className="text-sm text-white/80">
              {supplier.city} • {supplier.country}
            </p>
          </div>
          <div className="text-sm text-white/80 text-right">
            <div>Mindestbestellwert: €{supplier.minOrder}</div>
            <div>Lieferkosten: €{supplier.shipping}</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {supplier.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1 text-xs text-white/70">
            {supplier.categories.map((c) => (
              <span key={c} className="rounded-md px-2 py-1 bg-white/10 border border-white/20">
                {c}
              </span>
            ))}
          </div>
          <a
            href={supplier.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 text-sm hover:bg-white"
          >
            Zum Webshop
          </a>
        </div>
      </div>
    </GlassCard>
  );
}

function NewsletterCTA() {
  return (
    <GlassCard className="p-6 md:p-8" id="newsletter">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Die besten Bio-Angebote deiner Region – 1×/Woche</h3>
          <p className="text-white/80 mt-1">Exklusive Deals • Neue Betriebe • Saisonale Favoriten</p>
        </div>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            required
            placeholder="E-Mail"
            className="flex-1 md:w-72 rounded-xl bg-white/15 border border-white/30 px-4 py-3 placeholder-white/60 text-white focus:outline-none"
          />
          <button className="rounded-xl px-5 py-3 bg-white/90 text-slate-900 hover:bg-white">Anmelden</button>
        </form>
      </div>
    </GlassCard>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="font-semibold mb-2">lieferdienst-bio.de</h4>
          <p className="text-sm text-white/70">Neutrale Übersicht zu Bio-Lieferdiensten in DE/AT/CH.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Kategorien</h4>
          <ul className="space-y-1 text-sm text-white/80">
            {ALL_CATEGORIES.slice(0, 5).map((c) => (
              <li key={c}>
                <a href="#" className="hover:text-white">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Regionen</h4>
          <ul className="space-y-1 text-sm text-white/80">
            {["Berlin", "München", "Hamburg", "Köln", "Zürich", "Wien"].map((r) => (
              <li key={r}>
                <a href="#" className="hover:text-white">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Rechtliches</h4>
          <ul className="space-y-1 text-sm text-white/80">
            <li><a href="#" className="hover:text-white">Impressum</a></li>
            <li><a href="#" className="hover:text-white">Datenschutz</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} lieferdienst-bio.de – Neutral & unabhängig.
      </div>
    </footer>
  );
}
