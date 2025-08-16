// src/app/lieferdienste/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  fetchLieferbetriebBySlug,
  fetchLieferbetriebSlugs,
  type LieferbetriebNode,
} from "../../../lib/wp";

export const revalidate = 3600; // ISR

/** Für statisches Vorbauen (SSG/ISR) – im Dev on-demand */
export async function generateStaticParams() {
  const slugs = await fetchLieferbetriebSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** SEO pro Profil – in Next 15 params awaiten */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;               // ⬅️ wichtig
  const s = await fetchLieferbetriebBySlug(slug);
  if (!s) return { title: "Lieferdienst nicht gefunden" };

  const land = Array.isArray(s.acf?.land) ? s.acf.land[0] : s.acf?.land;
  const title =
    `${s.title} – Bio-Lieferdienst` +
    (s.acf?.stadt ? ` ${s.acf.stadt}` : "") +
    (land ? `, ${land}` : "");
  const description =
    s.acf?.liefergebiet ||
    `Infos, Webshop & Konditionen von ${s.title}.`;

  return {
    title,
    description,
    alternates: { canonical: `/lieferdienste/${s.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/lieferdienste/${s.slug}`,
      images: s.featuredImage?.node?.sourceUrl
        ? [{ url: s.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }   // ⬅️ als Promise tippen
) {
  const { slug } = await params;                      // ⬅️ und awaiten
  const s = (await fetchLieferbetriebBySlug(slug)) as LieferbetriebNode | null;
  if (!s) return <div className="text-white p-6">Nicht gefunden.</div>;

  const img = s.featuredImage?.node?.sourceUrl || null;
  const alt = s.featuredImage?.node?.altText || s.title || "";
  const land = Array.isArray(s.acf?.land) ? s.acf.land[0] : s.acf?.land;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-white">
      <Link href="/lieferdienste" className="text-white/80 underline">
        ← Zurück zur Liste
      </Link>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl overflow-hidden bg-white/10">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={alt} className="w-full h-full object-cover" />
          ) : (
            <div className="p-6 text-white/60">Kein Bild</div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{s.title}</h1>
          <p className="text-white/80 mt-1">
            {s.acf?.stadt ?? "—"}{land ? ` • ${land}` : ""}
          </p>

          {s.acf?.liefergebiet && (
            <p className="mt-2 text-white/80 text-sm">{s.acf.liefergebiet}</p>
          )}

          <div className="mt-4 text-sm text-white/80 space-y-1">
            <div>
              MBW: {s.acf?.mindestbestellwert != null ? `€${s.acf.mindestbestellwert}` : "—"}
            </div>
            <div>
              Lieferkosten: {s.acf?.lieferkosten != null ? `€${s.acf.lieferkosten}` : "—"}
            </div>
          </div>

          {(s.acf?.kategorien ?? []).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1 text-[11px]">
              {(s.acf?.kategorien ?? []).map((c: string) => (
                <span key={c} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20">
                  {c}
                </span>
              ))}
            </div>
          )}

          {(s.acf?.badges ?? []).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
              {(s.acf?.badges ?? []).map((b: string) => (
                <span key={b} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20">
                  {b}
                </span>
              ))}
            </div>
          )}

          {s.acf?.webshopUrl && (
            <a
              href={s.acf.webshopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 px-4 py-2 rounded-lg bg-white/90 text-slate-900"
            >
              Zum Webshop
            </a>
          )}
        </div>
      </div>

      {s.content && (
        <article
          className="prose prose-invert mt-8"
          dangerouslySetInnerHTML={{ __html: s.content }}
        />
      )}

      {/* JSON-LD (strukturierte Daten) */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: s.title,
            url: s.acf?.webshopUrl || undefined,
            areaServed: land,
            address: s.acf?.stadt
              ? { "@type": "PostalAddress", addressLocality: s.acf.stadt }
              : undefined,
            potentialAction: s.acf?.webshopUrl
              ? { "@type": "Action", name: "Zum Webshop", target: s.acf.webshopUrl }
              : undefined,
          }),
        }}
      />
    </main>
  );
}
