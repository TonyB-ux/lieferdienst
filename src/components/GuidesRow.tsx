// src/components/GuidesRow.tsx
import Link from "next/link";
import { fetchGuides } from "@/lib/wp";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass card ${className}`}>{children}</div>;
}

export default async function GuidesRow() {
  const guides = await fetchGuides(3);

  // Fallback wenn WP (noch) nichts liefert
  if (!guides.length) {
    const fallback = [
      { href: "/lieferdienste?q=Berlin", title: "Biolieferdienst in Berlin: Die 7 besten Anbieter" },
      { href: "/lieferdienste?q=Gem%C3%BCsekiste", title: "Gemüsekiste – welche Größe passt?" },
      { href: "/lieferdienste?q=Abo", title: "Bio-Abo vs. Einzelkauf: Was lohnt sich?" },
    ];

    return (
      <div className="guides-grid">
        {fallback.map((g) => (
          <Card key={g.href} className="guide-card">
            <h3 className="guide-title">{g.title}</h3>
            <p className="guide-excerpt">Kurzer Guide – ideal für Einsteiger.</p>
            <div className="guide-actions">
              <Link href={g.href} className="btn btn-ghost">Lesen</Link>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="guides-grid">
      {guides.map((g) => (
        <Card key={g.id} className="guide-card">
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
            <div
              className="guide-excerpt"
              // Excerpt aus WP enthält meist <p> – hier bewusst inline
              dangerouslySetInnerHTML={{ __html: g.excerpt }}
            />
          )}

          <div className="guide-actions">
            <Link href={`/guides/${g.slug}`} className="btn btn-ghost">Lesen</Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
