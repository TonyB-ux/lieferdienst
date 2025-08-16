// src/app/lieferdienste/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { fetchLieferbetriebe } from "../../lib/wp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lieferdienste – Übersicht | lieferdienst-bio.de",
  description:
    "Alle Bio-Lieferdienste im Überblick. Suche & filtere nach Stadt, Land oder Kategorie – mit direktem Webshop-Link.",
  alternates: { canonical: "https://lieferdienst-bio.de/lieferdienste" },
};

type Node = Awaited<ReturnType<typeof fetchLieferbetriebe>>[number];

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

function Card({ s }: { s: Node }) {
  const img = s.featuredImage?.node?.sourceUrl || "";
  const title = s.title || "Lieferdienst";
  const land = Array.isArray(s.acf?.land) ? s.acf?.land[0] : s.acf?.land;
  return (
    <GlassCard className="p-5 flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img || "/next.svg"}
        alt={s.featuredImage?.node?.altText || title}
        className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10"
      />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-muted text-sm mt-1">
        {s.acf?.stadt ?? "—"} {land ? `• ${land}` : ""}
      </p>

      <div className="mt-2 flex flex-wrap gap-1 text-xs">
        {s.acf?.kategorien?.slice(0, 3)?.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
        {s.acf?.badges?.slice(0, 2)?.map((b) => (
          <Chip key={b}>{b}</Chip>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Link href={`/lieferdienste/${s.slug}`} className="btn-ghost">
          Details
        </Link>
        {s.acf?.webshopUrl && (
          <a
            href={s.acf.webshopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Zum Webshop
          </a>
        )}
      </div>
    </GlassCard>
  );
}

export default async function LieferdienstePage({
  searchParams,
}: {
  searchParams?: { q?: string; land?: string };
}) {
  const q = (searchParams?.q || "").toLowerCase().trim();
  const landFilter = (searchParams?.land || "").toUpperCase().trim();

  const list = await fetchLieferbetriebe(100);

  // Clientseitige Filterung (schnell & robust)
  const filtered = list.filter((n) => {
    const hay =
      `${n.title} ${n.acf?.stadt} ${n.acf?.kategorien?.join(" ")}`.toLowerCase();
    const qOk = q ? hay.includes(q) : true;

    let landOk = true;
    if (landFilter) {
      const land =
        (Array.isArray(n.acf?.land) ? n.acf?.land[0] : n.acf?.land) || "";
      landOk = land.toUpperCase() === landFilter;
    }
    return qOk && landOk;
  });

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      {/* Mini-Hero + Filter */}
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-4">
        <GlassCard className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Lieferdienste</h1>
          <p className="text-muted mt-1">
            Filtere nach Stadt, Land oder Kategorie und spring direkt zum Webshop.
          </p>

          <form action="/lieferdienste" className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              name="q"
              defaultValue={searchParams?.q || ""}
              className="input"
              placeholder="z. B. Berlin, Biokiste"
            />
            <select
              name="land"
              defaultValue={searchParams?.land || ""}
              className="select"
            >
              <option value="">Land</option>
              <option value="DE">DE</option>
              <option value="AT">AT</option>
              <option value="CH">CH</option>
            </select>
            <button className="btn-primary">Suchen</button>
          </form>
        </GlassCard>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        {filtered.length === 0 ? (
          <GlassCard className="p-6 md:p-8">
            <p className="text-muted">
              Keine Treffer. Passe deine Suche (oben) an oder{" "}
              <Link href="/lieferdienste" className="underline">zeige alle</Link>.
            </p>
          </GlassCard>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <Card key={s.id} s={s} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
