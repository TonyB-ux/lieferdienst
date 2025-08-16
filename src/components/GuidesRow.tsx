// src/components/GuidesRow.tsx
import Link from "next/link";
import { fetchGuides } from "../lib/wp";

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["glass", className].filter(Boolean).join(" ")}>{children}</div>;
}

export default async function GuidesRow() {
  const guides = await fetchGuides(3);

  if (!guides.length) {
    const fallback = [
      { href: "/lieferdienste?q=Berlin", title: "Biolieferdienst in Berlin: Die 7 besten Anbieter" },
      { href: "/lieferdienste?q=Gem%C3%BCsekiste", title: "Gemüsekiste – welche Größe passt?" },
      { href: "/lieferdienste?q=Abo", title: "Bio-Abo vs. Einzelkauf: Was lohnt sich?" },
    ];
    return (
      <div className="grid md:grid-cols-3 gap-5">
        {fallback.map((g) => (
          <GlassCard key={g.href} className="p-5">
            <h3 className="text-white font-semibold">{g.title}</h3>
            <p className="text-muted text-sm mt-1">Kurzer Guide – ideal für Einsteiger.</p>
            <Link href={g.href} className="btn-ghost mt-4 inline-block">Jetzt lesen</Link>
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {guides.map((g) => (
        <GlassCard key={g.id} className="p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {g.featuredImage?.node?.sourceUrl && (
            <img
              src={g.featuredImage.node.sourceUrl}
              alt={g.featuredImage.node.altText || g.title}
              className="w-full h-36 object-cover rounded-lg mb-3 border border-white/10"
            />
          )}
          <h3 className="text-white font-semibold line-clamp-2">{g.title}</h3>
          {g.excerpt && (
            <div
              className="text-muted text-sm mt-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: g.excerpt }}
            />
          )}
          <Link href={`/guides/${g.slug}`} className="btn-ghost mt-4 inline-block">Lesen</Link>
        </GlassCard>
      ))}
    </div>
  );
}
