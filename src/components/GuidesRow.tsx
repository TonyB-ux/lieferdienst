// src/components/GuidesRow.tsx
import Link from "next/link";
import { fetchGuides } from "@/lib/wp";
import type { HTMLAttributes, ReactNode } from "react";

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

export default async function GuidesRow() {
  const guides = await fetchGuides(3);

  // Fallback, wenn WP (noch) nichts liefert
  if (!guides.length) {
    const fallback = [
      { href: "/lieferdienste?q=Berlin", title: "Biolieferdienst in Berlin: Die 7 besten Anbieter" },
      { href: "/lieferdienste?q=Gem%C3%BCsekiste", title: "Gemüsekiste – welche Größe passt?" },
      { href: "/lieferdienste?q=Bio", title: "Nachhaltig online Bio bestellen – so geht’s" },
    ];

    return (
      <div className="guides-grid" role="list">
        {fallback.map((g) => (
          <Card key={g.href} className="guide-card" role="listitem">
            <h3 className="guide-title">{g.title}</h3>
            <div className="guide-actions">
              <Link href={g.href} className="btn btn-ghost">Lesen</Link>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="guides-grid" role="list">
      {guides.map((g: any) => (
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
