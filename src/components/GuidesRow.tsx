// src/components/GuidesRow.tsx
import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { getGuides } from "@/lib/wp";
import GuideSlider from "@/components/GuideSlider";

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

export default async function GuidesRow({ showHeading = true }: { showHeading?: boolean }) {
  // 9 = 3 Seiten à 3 Cards im Slider
  const posts = await getGuides(9);

  // Fallback, wenn WP (noch) nichts liefert
  if (!posts?.length) {
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
              <Link href={g.href} className="btn btn-ghost">
                Lesen
              </Link>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Slider-Variante mit optionalem Header
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6">
      {showHeading && (
        <header className="mb-3 flex items-end justify-between">
          <h2 className="font-serif text-xl font-bold">Guides & Ratgeber</h2>
          <Link href="/guides" className="text-sm underline">
            Alle ansehen
          </Link>
        </header>
      )}
      <GuideSlider posts={posts} />
    </section>
  );
}
