// src/app/guides/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { fetchGuides } from "../../lib/wp";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Guides & Ratgeber | lieferdienst-bio.de",
  description: "Tipps, Vergleiche und regionale Übersichten rund um Bio-Lieferdienste.",
  alternates: { canonical: "https://lieferdienst-bio.de/guides" },
};

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["glass", className].filter(Boolean).join(" ")}>{children}</div>;
}

export default async function GuidesIndex() {
  const guides = await fetchGuides(24);

  return (
    <main className="relative min-h-screen">
      <div className="hero-gradient" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      <section className="max-w-6xl mx-auto px-5 pt-10 pb-16">
        <h1 className="text-3xl font-semibold text-white mb-4">Guides & Ratgeber</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <GlassCard key={g.id} className="p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {g.featuredImage?.node?.sourceUrl && (
                <img
                  src={g.featuredImage.node.sourceUrl}
                  alt={g.featuredImage.node.altText || g.title}
                  className="w-full h-40 object-cover rounded-lg mb-3 border border-white/10"
                />
              )}
              <h3 className="text-white font-semibold">{g.title}</h3>
              {g.excerpt && (
                <div
                  className="text-muted text-sm mt-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: g.excerpt }}
                />
              )}
              <Link href={`/guides/${g.slug}`} className="btn-ghost mt-4 inline-block">
                Lesen
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>
    </main>
  );
}
