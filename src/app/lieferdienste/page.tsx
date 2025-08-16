// src/app/lieferdienste/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { fetchLieferbetriebe } from "../../lib/wp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bio-Lieferdienste in DE/AT/CH",
  description:
    "Finde Bio-Lieferservices nach Stadt und Land. Übersicht mit Webshop-Link, Mindestbestellwert und Lieferkosten.",
  alternates: { canonical: "/lieferdienste" },
};

type Node = {
  id: string;
  title?: string;
  slug?: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  acf?: {
    webshopUrl?: string;
    stadt?: string;
    land?: string | string[];
    kategorien?: string[] | null;
    mindestbestellwert?: number | null;
    lieferkosten?: number | null;
    badges?: string[] | null;
    liefergebiet?: string | null;
  };
};

function normLand(v: string | string[] | undefined) {
  if (!v) return "";
  return Array.isArray(v) ? v[0] : v;
}

export default async function Page({
  searchParams,
}: {
  // Next 15: searchParams kommt als Promise
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp =
    (await (searchParams ?? Promise.resolve({}))) as Record<
      string,
      string | string[] | undefined
    >;

  // q/land robust extrahieren (string oder string[])
  const qRaw = sp.q;
  const landRaw = sp.land;
  const q =
    (Array.isArray(qRaw) ? qRaw[0] : qRaw)?.toString().trim().toLowerCase() ??
    "";
  const landFilter =
    (Array.isArray(landRaw) ? landRaw[0] : landRaw)
      ?.toString()
      .trim()
      .toUpperCase() ?? "";

  const all = (await fetchLieferbetriebe(200)) as Node[];

  const items = all.filter((s) => {
    const land = normLand(s.acf?.land);
    const matchesLand = !landFilter || land === landFilter;
    const hay = `${s.title ?? ""} ${s.acf?.stadt ?? ""} ${
      s.acf?.liefergebiet ?? ""
    }`.toLowerCase();
    const matchesQ = !q || hay.includes(q);
    return matchesLand && matchesQ;
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-semibold">Lieferdienste</h1>

      <form action="/lieferdienste" method="GET" className="mt-4 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Stadt oder Anbieter..."
          className="flex-1 px-3 py-2 rounded-lg text-slate-900"
        />
        <select
          name="land"
          defaultValue={landFilter}
          className="px-3 py-2 rounded-lg text-slate-900"
        >
          <option value="">Land</option>
          <option value="DE">DE</option>
          <option value="AT">AT</option>
          <option value="CH">CH</option>
        </select>
        <button className="px-4 py-2 rounded-lg bg-white/90 text-slate-900">
          Filtern
        </button>
      </form>

      <p className="text-white/70 mt-2">{items.length} Einträge</p>

      <div className="grid gap-5 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const img =
            s.featuredImage?.node?.sourceUrl &&
            s.featuredImage.node.sourceUrl.trim().length > 0
              ? s.featuredImage.node.sourceUrl
              : null;
          const alt = s.featuredImage?.node?.altText || s.title || "";
          const land = normLand(s.acf?.land);
          const kategorien = (s.acf?.kategorien ?? []) as string[];
          const badges = (s.acf?.badges ?? []) as string[];

          return (
            <div
              key={s.id}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4"
            >
              <div className="aspect-[16/9] bg-white/10 overflow-hidden rounded-xl">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-white/60 text-xs">
                    Kein Bild
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-white/80">
                  {s.acf?.stadt ?? "—"}
                  {land ? ` • ${land}` : ""}
                </p>

                {badges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    {badges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {kategorien.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-white/80">
                    {kategorien.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    <div>
                      MBW:{" "}
                      {s.acf?.mindestbestellwert != null
                        ? `€${s.acf.mindestbestellwert}`
                        : "—"}
                    </div>
                    <div>
                      Lieferkosten:{" "}
                      {s.acf?.lieferkosten != null
                        ? `€${s.acf.lieferkosten}`
                        : "—"}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {s.acf?.webshopUrl && (
                      <a
                        className="px-3 py-1.5 rounded-lg bg白/90 text-slate-900 text-sm"
                        href={appendUtm(s.acf.webshopUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Zum Webshop
                      </a>
                    )}
                    {s.slug && (
                      <Link
                        href={`/lieferdienste/${s.slug}`}
                        className="px-3 py-1.5 rounded-lg border border-white/40 text-sm"
                      >
                        Profil
                      </Link>
                    )}
                  </div>
                </div>

                {s.acf?.liefergebiet && (
                  <p className="mt-2 text-xs text-white/70">
                    {s.acf.liefergebiet}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ItemList-Schema für die ersten 10 Elemente */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: items.slice(0, 10).map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: s.slug ? `/lieferdienste/${s.slug}` : undefined,
            })),
          }),
        }}
      />
    </main>
  );
}

function appendUtm(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "lieferdienst-bio");
    u.searchParams.set("utm_medium", "referral");
    u.searchParams.set("utm_campaign", "directory");
    return u.toString();
  } catch {
    return url;
  }
}
