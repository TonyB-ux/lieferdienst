// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/wp";
import { fetchLieferbetriebSlugs } from "@/lib/wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lieferdienst-bio.de";
  const now = new Date();

  const slugs = await getGuideSlugs(200).catch(() => []);
  const guides: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "weekly", // union-typisiert dank obigem Array-Typ
    priority: 0.6,
  }));

  // Lieferdienste: Index + Detailseiten
  const lSlugs = await fetchLieferbetriebSlugs().catch(() => [] as string[]);
  const lieferdienste: MetadataRoute.Sitemap = lSlugs.map((slug) => ({
    url: `${base}/lieferdienste/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/guides`, lastModified: now, priority: 0.8 },
    { url: `${base}/lieferdienste`, lastModified: now, priority: 0.8 },
    ...guides,
    ...lieferdienste,
  ];
}
