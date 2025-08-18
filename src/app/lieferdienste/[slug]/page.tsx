// src/app/lieferdienste/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchLieferbetriebBySlug,
  fetchLieferbetriebSlugs,
} from "../../../lib/wp";

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

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

export async function generateStaticParams() {
  const slugs = await fetchLieferbetriebSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = await fetchLieferbetriebBySlug(slug);
  if (!s) return { title: "Lieferdienst nicht gefunden" };
  return {
    title: `${s.title} – Bio-Lieferdienst`,
    description: `Infos, Kategorien & direkter Webshop-Link für ${s.title}.`,
    alternates: {
      canonical: `https://lieferdienst-bio.de/lieferdienste/${slug}`,
    },
    openGraph: {
      title: s.title || "Bio-Lieferdienst",
      description: `Bio-Lieferservice: ${s.title}`,
      images: s.featuredImage?.node?.sourceUrl
        ? [{ url: s.featuredImage.node.sourceUrl }]
        : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await fetchLieferbetriebBySlug(slug);
  if (!s) {
    return (
      <main className="max-w-6xl mx-auto px-5 py-10">
        <div className="hero-gradient" aria-hidden />
        <div className="noise-overlay" aria-hidden />
        <GlassCard className="p-6 md:p-8">
          <p>Dieser Lieferdienst wurde nicht gefunden.</p>
          <Link href="/lieferdienste" className="btn-ghost mt-4 inline-block">
            Zur Liste
          </Link>
        </GlassCard>
      </main>
    );
  }

  const img = s.featuredImage?.node?.sourceUrl || "";

  // ---------- Robust: ACF-Felder sicher lesen (unabhängig von strikten TS-Typen)
  const acf: any = s.acf ?? undefined;

  const landRaw = acf?.land;
  const land =
    Array.isArray(landRaw) ? String(landRaw?.[0] ?? "") :
    (typeof landRaw === "string" ? landRaw : "");

  const stadt = typeof acf?.stadt === "string" ? acf.stadt : "";

  const liefergebiet =
    typeof acf?.liefergebiet === "string" ? acf.liefergebiet : "";

  const mbw  = acf?.mindestbestellwert;   // number | string | undefined
  const lko  = acf?.lieferkosten;         // number | string | undefined

  const kategorien: string[] = Array.isArray(acf?.kategorien) ? acf.kategorien : [];
  const badges: string[]     = Array.isArray(acf?.badges) ? acf.badges : [];

  const webshopUrl =
    typeof acf?.webshopUrl === "string" && acf.webshopUrl.length > 0
      ? acf.webshopUrl
      : undefined;
  // ---------- /Robust

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <section className="max-w-6xl mx-auto px-5 py-10">
        <Link href="/lieferdienste" className="underline text-white/80 hover:text-white">
          ← Zurück zur Liste
        </Link>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <GlassCard className="p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img || "/next.svg"}
              alt={s.featuredImage?.node?.altText || s.title || "Bild"}
              className="w-full h-full max-h-[420px] object-cover"
            />
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <h1 className="text-3xl font-semibold text-white">{s.title}</h1>
            <p className="text-muted mt-1">
              {stadt || "—"} {land ? `• ${land}` : ""}
            </p>

            {liefergebiet && (
              <p className="mt-3 text-white/80 text-sm">{liefergebiet}</p>
            )}

            <div className="mt-4 text-sm text-white/80 space-y-1">
              <div>MBW: {mbw != null && mbw !== "" ? `€${mbw}` : "—"}</div>
              <div>Lieferkosten: {lko != null && lko !== "" ? `€${lko}` : "—"}</div>
            </div>

            {kategorien.length ? (
              <div className="mt-3 flex flex-wrap gap-1">
                {kategorien.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            ) : null}

            {badges.length ? (
              <div className="mt-2 flex flex-wrap gap-1">
                {badges.map((b) => (
                  <Chip key={b}>{b}</Chip>
                ))}
              </div>
            ) : null}

            {webshopUrl && (
              <a
                href={webshopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block mt-5"
              >
                Zum Webshop
              </a>
            )}
          </GlassCard>
        </div>

        {/* Optional: Beschreibung/Content aus WP */}
        {s.content && (
          <GlassCard className="p-6 md:p-8 mt-6 prose prose-invert max-w-none">
            <article dangerouslySetInnerHTML={{ __html: s.content }} />
          </GlassCard>
        )}
      </section>

      {/* JSON-LD (Breadcrumbs + Org) */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Lieferdienste", item: "https://lieferdienst-bio.de/lieferdienste" },
              { "@type": "ListItem", position: 2, name: s.title, item: `https://lieferdienst-bio.de/lieferdienste/${s.slug}` }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: s.title,
            url: `https://lieferdienst-bio.de/lieferdienste/${s.slug}`,
            sameAs: webshopUrl ? [webshopUrl] : [],
            image: s.featuredImage?.node?.sourceUrl || undefined,
            address: stadt ? { "@type": "PostalAddress", addressLocality: stadt } : undefined
          }),
        }}
      />
    </main>
  );
}
