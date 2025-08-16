// src/app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lieferdienst-bio.de";

  // Versuch, Slugs dynamisch zu holen – bei Fehler: nur statische URLs
  let urls: string[] = [];
  try {
    const r = await fetch(`${base}/api/slugs`, { next: { revalidate: 60 } });
    const j = await r.json();
    urls = Array.isArray(j?.slugs) ? j.slugs : [];
  } catch {}

  const dynamic = urls
    .map(
      (s) => `<url><loc>${base}/lieferdienste/${s}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${base}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>${base}/lieferdienste</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
    ${dynamic}
  </urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
