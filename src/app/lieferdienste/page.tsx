// src/app/lieferdienste/page.tsx
import Link from "next/link";
import { fetchLieferbetriebe } from "@/lib/wp";

export const revalidate = 3600;

type Search = { q?: string; land?: string };

export default async function LieferdienstePage({
  searchParams,
}: {
  // In Next 15 sind searchParams Promises:
  searchParams?: Promise<Search>;
}) {
  const sp = (await searchParams) || {};
  const qNorm = sp.q?.toLowerCase().trim() ?? "";
  const land = sp.land;

  const items = await fetchLieferbetriebe(60);

  const filtered = items.filter((n) => {
    const hitQ =
      !qNorm ||
      n.title?.toLowerCase().includes(qNorm) ||
      n.slug?.toLowerCase().includes(qNorm) ||
      n.acf?.stadt?.toLowerCase().includes(qNorm);
    const landFromWP = Array.isArray(n.acf?.land) ? n.acf?.land[0] : n.acf?.land;
    const hitLand = !land || landFromWP === land;
    return hitQ && hitLand;
  });

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <section className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-semibold text-white mb-1">Lieferdienste</h1>
        <p className="text-muted mb-6">
          {filtered.length} von {items.length} Treffern
        </p>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const img = s.featuredImage?.node?.sourceUrl || "";
            const stadt = s.acf?.stadt ?? "—";
            const landBadge = Array.isArray(s.acf?.land) ? s.acf?.land[0] : s.acf?.land;

            return (
              <li key={s.id} className="glass p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img ? (
                  <img
                    src={img}
                    alt={s.title}
                    className="w-full h-36 object-cover rounded-lg border border-white/10 mb-3"
                  />
                ) : (
                  <div className="h-36 rounded-lg border border-white/10 mb-3 grid place-items-center text-muted">
                    Kein Bild
                  </div>
                )}

                <h3 className="text-white font-semibold">{s.title}</h3>
                <p className="text-muted text-sm mt-1">
                  {stadt}
                  {landBadge ? ` • ${landBadge}` : ""}
                </p>

                {s.acf?.badges?.length ? (
                  <div className="flex flex-wrap gap-1 mt-2 text-[11px]">
                    {s.acf.badges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex gap-2 mt-4">
                  <Link href={`/lieferdienste/${s.slug}`} className="btn-ghost">
                    Profil
                  </Link>
                  {s.acf?.webshopUrl && (
                    <a
                      href={s.acf.webshopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-solid"
                    >
                      Zum Webshop
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
