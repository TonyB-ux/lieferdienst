// src/app/guides/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGuideBySlug, fetchGuideSlugs } from "../../../lib/wp";

export const revalidate = 1800;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await fetchGuideSlugs();
    return (slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

function strip(html?: string) {
  return html ? html.replace(/<[^>]*>/g, "").trim() : "";
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const { slug } = params;
    const g = await fetchGuideBySlug(slug);

    const desc = strip(g?.excerpt);
    const ogImg = g?.featuredImage?.node?.sourceUrl
      ? [{ url: g.featuredImage.node.sourceUrl }]
      : undefined;

    return {
      title: g?.title || "Guide",
      description: desc || undefined,
      alternates: { canonical: `https://lieferdienst-bio.de/guides/${slug}` },
      openGraph: { title: g?.title, description: desc || undefined, images: ogImg },
    };
  } catch {
    return { title: "Guide" };
  }
}

export default async function GuidePage(
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const g = await fetchGuideBySlug(slug);

  if (!g) {
    // Keine Daten -> 404 statt 500
    return notFound();
  }

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <article className="max-w-3xl mx-auto px-5 py-10 prose prose-invert">
        <Link href="/guides" className="underline text-white/80 hover:text-white">
          ← Alle Guides
        </Link>
        <h1 className="mb-2">{g.title}</h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {g.featuredImage?.node?.sourceUrl && (
          <img
            src={g.featuredImage.node.sourceUrl}
            alt={g.featuredImage.node.altText || g.title}
            className="w-full rounded-lg border border-white/10"
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: g.content || "" }} />
      </article>
    </main>
  );
}
