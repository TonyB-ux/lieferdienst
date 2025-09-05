// src/app/guides/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { getGuides } from "@/lib/wp";
import Image from "next/image";

export const revalidate = 600; // ISR 10min

export const metadata: Metadata = {
  title: "Guides & Ratgeber | lieferdienst-bio.de",
  robots: { index: true, follow: true },
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: ReactNode;
};

function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div {...rest} className={`glass card ${className}`}>
      {children}
    </div>
  );
}

export default async function GuidesIndexPage() {
  const posts = await getGuides(24);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://lieferdienst-bio.de/guides/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <main className="container guides-index" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Guides & Ratgeber</h1>

      <div className="guides-grid" role="list">
        {!posts?.length ? (
          <Card className="guide-card" role="listitem">
            <h3 className="guide-title">Noch keine Beiträge vorhanden</h3>
            <p className="guide-excerpt">
              Sobald Inhalte in WordPress (Kategorie „guides“) veröffentlicht sind, erscheinen sie hier.
            </p>
          </Card>
        ) : (
          posts.map((p: any) => (
            <Card key={p.id} className="guide-card" role="listitem">
              <div className="guide-img relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={p.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                  alt={p.featuredImage?.node?.sourceUrl ? (p.featuredImage?.node?.altText ?? p.title) : ""}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="guide-title">{p.title}</h3>
              {p.excerpt && (
                <div className="guide-excerpt" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
              )}
              <div className="guide-actions">
                <Link href={`/guides/${p.slug}`} className="btn btn-ghost">Lesen</Link>
              </div>
            </Card>
          ))
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </main>
  );
}
