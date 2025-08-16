// src/app/guides/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { fetchGuideBySlug, fetchGuideSlugs } from "../../../lib/wp";

export const revalidate = 1800;

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["glass", className].filter(Boolean).join(" ")}>{children}</div>;
}

export async function generateStaticParams() {
  const slugs = await fetchGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const g = await fetchGuideBySlug(slug);
  return {
    title: g?.title || "Guide",
    description: g?.excerpt?.replace(/<[^>]*>/g, "") || "",
    alternates: { canonical: `https://lieferdienst-bio.de/guides/${slug}` },
    openGraph: {
      title: g?.title,
      description: g?.excerpt?.replace(/<[^>]*>/g, "") || undefined,
      images: g?.featuredImage?.node?.sourceUrl ? [{ url: g.featuredImage.node.sourceUrl }] : undefined,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = await fetchGuideBySlug(slug);
  if (!g) {
    return (
      <main className="max-w-4xl mx-auto px-5 py-10">
        <GlassCard className="p-6">Guide nicht gefunden.</GlassCard>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <article className="max-w-3xl mx-auto px-5 py-10 prose prose-invert">
        <Link href="/guides" className="underline text-white/80 hover:text-white">← Alle Guides</Link>
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
