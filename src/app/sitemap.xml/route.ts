import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de";

  // Versuche dynamische Detailseiten einzubinden – bei Fehler nur statische URLs
  let slugs: string[] = [];
  try {
    const r = await fetch(`${base}/api/slugs`, { next: { revalidate: 300 } });
    const j = await r.json();
    slugs = Array.isArray(j?.slugs) ? j.slugs : [];
  } catch {
    // ignore – wir liefern zumindest die statischen URLs unten
  }

  const dynamic = slugs
    .map(
      (s) =>
        `<url><loc>${base}/lieferdienste/${s}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${base}/lieferdienste</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  ${dynamic}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // optionales Caching für Edge
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=600",
    },
  });
}
