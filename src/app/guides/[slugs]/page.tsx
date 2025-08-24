// src/app/guides/[slugs]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGuideBySlug, fetchGuideSlugs } from "@/lib/wp";

export const revalidate = 1800; // 30min ISR

export async function generateStaticParams(): Promise<{ slugs: string }[]> {
  try {
    const slugs = await fetchGuideSlugs();
    return (slugs || []).map((s) => ({ slugs: s }));
  } catch {
    return [];
  }
}

const strip = (html?: string) =>
  html ? html.replace(/<[^>]*>/g, "").trim() : "";

export async function generateMetadata(
  { params }: { params: { slugs: string } }
): Promise<Metadata> {
  try {
    const slug = params.slugs;
    const g = await fetchGuideBySlug(slug);
    if (!g) {
      return { title: "Guide nicht gefunden | lieferdienst-bio.de", robots: { index: false, follow: true } };
    }

    const desc = strip(g.excerpt)?.slice(0, 160);
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
  } catch {
    return { title: "Guide | lieferdienst-bio.de", robots: { index: false, follow: true } };
  }
}

export default async function GuidePage(
  { params }: { params: { slugs: string } }
) {
  const slug = params.slugs;
  const g = await fetchGuideBySlug(slug);

  if (!g) return notFound();

  const img = g.featuredImage?.node?.sourceUrl;
  const imgAlt = g.featuredImage?.node?.altText || g.title;

  // Strukturierte Daten (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    datePublished: g.date,
    image: img ? [img] : undefined,
    mainEntityOfPage: `https://lieferdienst-bio.de/guides/${slug}`,
  };

  return (
    <main className="relative min-h-screen">
      <article className="max-w-3xl mx-auto px-5 py-10 prose prose-invert">
        <Link href="/guides" className="underline text-white/80 hover:text-white">
          ← Alle Guides
        </Link>
        <h1 className="mb-2">{g.title}</h1>

        {img && (
          <Image
            src={img}
            alt={imgAlt}
            width={1280}
            height={720}
            className="w-full rounded-lg border border-white/10"
            priority
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: g.content || "" }} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
    </main>
  );
}
