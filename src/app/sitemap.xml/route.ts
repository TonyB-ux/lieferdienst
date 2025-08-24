// src/app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de";

  let lb: string[] = [];
  let gs: string[] = [];

  try {
    const r = await fetch(`${base}/api/slugs`, { next: { revalidate: 300 } });
    const j = await r.json();
    lb = Array.isArray(j?.slugs) ? j.slugs : [];
  } catch {}

  try {
    const r = await fetch(`${base}/api/guide-slugs`, { next: { revalidate: 300 } });
    const j = await r.json();
    gs = Array.isArray(j?.slugs) ? j.slugs : [];
  } catch {}

  const lbXml = lb.map(
    (s) => `<url><loc>${base}/lieferdienste/${s}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
  ).join("");

  const gsXml = gs.map(
    (s) => `<url><loc>${base}/guides/${s}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${base}/lieferdienste</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>${base}/guides</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>
  ${lbXml}
  ${gsXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=600",
    },
  });
}
// src/app/sitemap.ts
import { fetchGuideSlugs } from "@/lib/wp";

export default async function sitemap() {
  const base = "https://lieferdienst-bio.de";
  const slugs = await fetchGuideSlugs();

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/guides`, lastModified: new Date() },
    ...(slugs || []).map((s) => ({
      url: `${base}/guides/${s}`,
      changeFrequency: "weekly",
    })),
  ];
}