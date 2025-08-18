// src/components/GuidesRow.tsx
import Link from "next/link";
import { fetchGuides } from "@/lib/wp";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // Artikel-Element ist semantisch schöner und verhält sich als Grid-Item sauber
  return <article className={`glass card ${className}`}>{children}</article>;
}

export default async function GuidesRow() {
  const guides = await fetchGuides(3);

  // Fallback-Daten, falls WP nichts liefert
  const fallback = [
    { href: "/lieferdienste?q=Berlin", title: "Biolieferdienst in Berlin: Die 7 besten Anbieter" },
    { href: "/lieferdienste?q=Gem%C3%BCsekiste", title: "Gemüsekiste – welche Größe passt?" },
    { href: "/lieferdienste?q=Abo", title: "Bio-Abo vs. Einzelkauf: Was lohnt sich?" },
  ];

  // Wrapper als <ul> = stabileres Grid; Inline-Styles erzwingen Grid auch ohne CSS
  return (
    <ul
      className="guides-grid"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 22, listStyle: "none", margin: 0, padding: 0 }}
    >
      {(guides.length ? guides : []).map((g: any) => (
        <li key={g.id} style={{ minWidth: 0 }}>
          <Card>
            {g.featuredImage?.node?.sourceUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="guide-img" src={g.featuredImage.node.sourceUrl} alt={g.featuredImage.node.altText || g.title} />
            ) : null}

            <h3 style={{ margin: "0 0 6px" }}>{g.title}</h3>

            {g.excerpt ? (
              <div className="muted" style={{ marginTop: 6 }} dangerouslySetInnerHTML={{ __html: g.excerpt }} />
            ) : null}

            <div style={{ marginTop: 12 }}>
              <Link href={`/guides/${g.slug}`} className="btn btn-ghost">Lesen</Link>
            </div>
          </Card>
        </li>
      ))}

      {/* Falls keine Guides da sind, zeige 3 Fallback-Karten */}
      {!guides.length &&
        fallback.map((g) => (
          <li key={g.href} style={{ minWidth: 0 }}>
            <Card>
              <h3 style={{ margin: "0 0 6px" }}>{g.title}</h3>
              <p className="muted" style={{ marginTop: 6 }}>Kurzer Guide – ideal für Einsteiger.</p>
              <div style={{ marginTop: 12 }}>
                <Link href={g.href} className="btn btn-ghost">Jetzt lesen</Link>
              </div>
            </Card>
          </li>
        ))}
    </ul>
  );
}
