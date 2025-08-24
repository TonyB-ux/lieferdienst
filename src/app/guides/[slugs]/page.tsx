// src/app/guides/[slugs]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGuideBySlug, fetchGuideSlugs } from "@/lib/wp";

export const revalidate = 1800; // 30min ISR

export async function generateStaticParams(): Promise<{ slugs: string }[]> {
  const slugs = await fetchGuideSlugs().catch(() => []);
  return (slugs || []).map((s) => ({ slugs: s }));
}

// akzeptiert string | null | undefined
const strip = (html: string | null | undefined): string =>
  html ? html.replace(/<[^>]*>/g, "").trim() : "";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug: string | undefined = params?.slugs ?? params?.slug;
  if (!slug) {
    return { title: "Guide | lieferdienst-bio.de", robots: { index: false, follow: true } };
  }

  const g = await fetchGuideBySlug(slug).catch(() => null);
  if (!g) {
    return { title: "Guide nicht gefunden | lieferdienst-bio.de", robots: { index: false, follow: true } };
  }

  const desc = strip(g.excerpt).slice(0, 160);
  const ogImg = g.featuredImage?.node?.sourceUrl
    ? [{ url: g.featuredImage.node.sourceUrl }]
    : undefined;

  return {
    title: `${g.title} | lieferdienst-bio.de`,
    description: desc,
    alternates: { canonical: `https://lieferdienst-bio.de/guides/${slug}` },
    openGraph: { title: g.title, description: desc, images: ogImg },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage(props: any) {
  const slug: string | undefined = props?.params?.slugs ?? props?.params?.slug;
  if (!slug) return notFound();

  const g = await fetchGuideBySlug(slug).catch(() => null);
  if (!g) return notFound();

  const img = g.featuredImage?.node?.sourceUrl;
  const imgAlt = g.featuredImage?.node?.altText || g.title;

  return (
    <main className="relative min-h-screen">
      <article className="max-w-3xl mx-auto px-5 py-10 prose prose-invert">
        <Link href="/guides" className="underline text-white/80 hover:text-white">
          ← Alle Guides
        </Link>
        <h1 className="mb-2">{g.title}</h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img && (
          <img
            src={img}
            alt={imgAlt}
            className="w-full rounded-lg border border-white/10"
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: g.content || "" }} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: g.title,
              // datePublished weggelassen, weil im Typ nicht vorhanden
              image: img ? [img] : undefined,
              mainEntityOfPage: `https://lieferdienst-bio.de/guides/${slug}`,
            }),
          }}
        />
      </article>
    </main>
  );
}
