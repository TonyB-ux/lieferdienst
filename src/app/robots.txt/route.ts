import { NextResponse } from "next/server";

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://lieferdienst-bio.de/sitemap.xml
Host: https://lieferdienst-bio.de
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
