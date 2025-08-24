// src/app/guides/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { fetchGuides } from "@/lib/wp";

export const revalidate = 600; // ISR 10min

export const metadata: Metadata = {
  title: "Guides & Ratgeber | lieferdienst-bio.de",
  robots: { index: true, follow: true },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass card ${className}`}>{children}</div>;
}

export default async function GuidesIndex() {
  const guides = await fetchGuides(12);

  return (
    <main className="container guides-index" style={{ paddingTop: 96, paddingBottom: 48 }}>
      <h1 className="h2" style={{ marginBottom: 12, color: "#002f03" }}>Guides & Ratgeber</h1>

      <div className="guides-grid" role="list">
        {guides.length === 0 ? (
          <Card className="guide-card" role="listitem">
            <h3 className="guide-title">Noch keine Beiträge vorhanden</h3>
            <p className="guide-excerpt">
              Sobald Inhalte in WordPress (Kategorie „guides“) veröffentlicht sind, erscheinen sie hier.
            </p>
          </Card>
        ) : (
          guides.map((g) => (
            <Card key={g.id} className="guide-card" role="listitem">
              {g.featuredImage?.node?.sourceUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="guide-img"
                  src={g.featuredImage.node.sourceUrl}
                  alt={g.featuredImage.node.altText || g.title}
                />
              )}
              <h3 className="guide-title">{g.title}</h3>
              {g.excerpt && (
                <div className="guide-excerpt" dangerouslySetInnerHTML={{ __html: g.excerpt }} />
              )}
              <div className="guide-actions">
                <Link href={`/guides/${g.slug}`} className="btn btn-ghost">Lesen</Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
