// src/components/GuidesRow.tsx
import Link from "next/link";

export default function GuidesRow() {
  const items = [
    { href: "/guides/biolieferdienst-berlin", title: "Die 7 besten Anbieter in Berlin" },
    { href: "/guides/gemuesekiste-groessen", title: "Gemüsekiste – welche Größe passt?" },
    { href: "/guides/bio-abo-vs-einzelkauf", title: "Bio-Abo vs. Einzelkauf" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((g) => (
        <div key={g.href} className="glass p-5">
          <h3 className="text-white font-semibold">{g.title}</h3>
          <p className="text-muted text-sm mt-1">
            Kurzer, hilfreicher Guide – ideal für Einsteiger.
          </p>
          <Link href={g.href} className="btn-ghost mt-4 inline-block">Lesen</Link>
        </div>
      ))}
    </div>
  );
}
