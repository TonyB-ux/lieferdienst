// src/app/guides/[slugs]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getGuideBySlug, getGuideSlugs } from "@/lib/wp";

export const revalidate = 600; // ISR 10 min

// Statische Pfade (Ordner heißt [slugs] => Key = "slugs")
export async function generateStaticParams(): Promise<{ slugs: string }[]> {
  const slugs = await getGuideSlugs(50).catch(() => []);
  return slugs.map((s) => ({ slugs: s }));
}

// Helper: HTML → Plaintext für Meta
const stripHtml = (html?: string | null) =>
  (html ?? "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

// ⬇️ Next.js 15: params ist ein Promise → im Parameter als Promise typisieren und direkt awaiten
export async function generateMetadata(
  { params }: { params: Promise<{ slugs: string }> }
): Promise<Metadata> {
  const { slugs } = await params; // ✅ params awaiten
  const post = await getGuideBySlug(slugs).catch(() => null);
  if (!post) {
    return { title: "Guide nicht gefunden | lieferdienst-bio.de", robots: { index: false, follow: true } };
  }
  const title = post.title ?? "Guide";
  const description = post.excerpt ? stripHtml(post.excerpt).slice(0, 160) : undefined;
  const images = post.featuredImage?.node?.sourceUrl ? [{ url: post.featuredImage.node.sourceUrl }] : undefined;

  return {
    title: `${title} | lieferdienst-bio.de`,
    description,
    alternates: { canonical: `https://lieferdienst-bio.de/guides/${slugs}` },
    openGraph: { title, description, images, type: "article" },
    twitter: { card: "summary_large_image", title, description, images },
    robots: { index: true, follow: true },
  };
}

export default async function GuideDetailPage(
  { params }: { params: Promise<{ slugs: string }> }
) {
  const { slugs } = await params; // ✅ params awaiten
  const post = await getGuideBySlug(slugs).catch(() => null);
  if (!post) return notFound();

  const img = post.featuredImage?.node?.sourceUrl || "/file.svg";
  const hasRealImg = Boolean(post.featuredImage?.node?.sourceUrl);
  const imgAlt = hasRealImg ? (post.featuredImage?.node?.altText ?? post.title ?? "Bild") : "";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <article className="prose prose-neutral max-w-none">
        <Link href="/guides" className="text-sm underline">
          ← Alle Guides
        </Link>

        <header className="mb-6">
          <h1 className="font-serif text-3xl font-bold">{post.title}</h1>
          <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={img} alt={imgAlt} fill className="object-cover" />
          </div>
        </header>

        {/* WP liefert HTML */}
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>Für diesen Guide liegt noch kein Inhalt vor.</p>
        )}

        {/* JSON-LD (minimal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              image: img ? [img] : undefined,
              mainEntityOfPage: `https://lieferdienst-bio.de/guides/${slugs}`,
            }),
          }}
        />
      </article>
    </main>
  );
}
