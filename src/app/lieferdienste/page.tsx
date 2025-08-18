// src/app/lieferdienste/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { fetchLieferbetriebe } from "@/lib/wp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bio-Lieferdienste – Übersicht",
  description:
    "Verifizierte Bio-Lieferdienste in Deutschland, Österreich und der Schweiz – neutraler Überblick, direkte Webshop-Links, Kategorien & Regionen.",
  alternates: { canonical: "https://lieferdienst-bio.de/lieferdienste" },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`glass card ${className}`}>{children}</article>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}

export default async function Page() {
  const list = await fetchLieferbetriebe(24);

  return (
    <main className="relative min-h-screen">
      <section className="container" style={{ paddingTop: 24, paddingBottom: 32 }}>
        <h1 className="h2">Bio-Lieferservices</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Finde verifizierte Anbieter in deiner Region – mit direktem Webshop-Link.
        </p>

        <div className="grid-cols" style={{ marginTop: 16 }}>
          {list.map((s) => {
            // ---------- Robust: ACF defensiv auslesen (typsicher für Vercel)
            const acf: any = s.acf ?? undefined;

            const img = s.featuredImage?.node?.sourceUrl || "";
            const landRaw = acf?.land;
            const land =
              Array.isArray(landRaw) ? String(landRaw?.[0] ?? "") :
              (typeof landRaw === "string" ? landRaw : "");

            const stadt = typeof acf?.stadt === "string" ? acf.stadt : "";
            const liefergebiet = typeof acf?.liefergebiet === "string" ? acf.liefergebiet : "";

            const mbw = acf?.mindestbestellwert;   // number | string | undefined
            const lko = acf?.lieferkosten;         // number | string | undefined

            const badges: string[] = Array.isArray(acf?.badges) ? acf.badges : [];
            const kategorien: string[] = Array.isArray(acf?.kategorien) ? acf.kategorien : [];

            const webshopUrl =
              typeof acf?.webshopUrl === "string" && acf.webshopUrl.length > 0
                ? acf.webshopUrl
                : undefined;
            // ---------- /Robust

            return (
              <Card key={s.id} className="col-span-4 p-0 overflow-hidden">
                {/* Bild */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img || "/next.svg"}
                  alt={s.featuredImage?.node?.altText || s.title || "Bild"}
                  className="w-full h-[180px] object-cover"
                />

                {/* Inhalt */}
                <div style={{ padding: 16 }}>
                  <h2 className="h3" style={{ margin: 0 }}>{s.title}</h2>
                  <p className="text-muted mt-1">
                    {stadt || "—"} {land ? `• ${land}` : ""}
                  </p>

                  {liefergebiet && (
                    <p className="mt-2 text-white/80 text-sm">{liefergebiet}</p>
                  )}

                  {/* Kategorien */}
                  {kategorien.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                      {kategorien.map((c) => (
                        <Chip key={c}>{c}</Chip>
                      ))}
                    </div>
                  )}

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                      {badges.map((b) => (
                        <Chip key={b}>{b}</Chip>
                      ))}
                    </div>
                  )}

                  {/* Eckdaten */}
                  <div className="mt-3 text-sm text-white/80 space-y-1">
                    <div>MBW: {mbw != null && mbw !== "" ? `€${mbw}` : "—"}</div>
                    <div>Lieferkosten: {lko != null && lko !== "" ? `€${lko}` : "—"}</div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <Link href={`/lieferdienste/${s.slug}`} className="btn">Details</Link>
                    {webshopUrl && (
                      <a href={webshopUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Zum Webshop
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
