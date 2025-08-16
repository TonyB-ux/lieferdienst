import { NextResponse } from "next/server";

export async function GET() {
  // Mini-XML zum Funktionstest
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://lieferdienst-bio.de/</loc></url>
  <url><loc>https://lieferdienst-bio.de/lieferdienste</loc></url>
</urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
