// src/lib/wp.ts
import { GraphQLClient, gql } from "graphql-request";

const endpoint = process.env.WP_GRAPHQL_ENDPOINT || "";

export const wp = new GraphQLClient(endpoint, {
  headers: { "Content-Type": "application/json" },
});

// Helper: fängt WPGraphQL-Fehler ab, damit Seiten nicht mit 500 sterben
async function safeRequest<T>(query: any, variables?: Record<string, unknown>): Promise<T | null> {
  try {
    return await wp.request<T>(query, variables);
  } catch (e) {
    console.error("WPGraphQL error:", e);
    return null;
  }
}

/* =========================
   Lieferbetriebe (CPT)
   ========================= */

export const LIEFERBETRIEBE_QUERY = gql`
  query Lieferbetriebe($first: Int = 24) {
    lieferbetriebe(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        featuredImage { node { sourceUrl altText } }
        acf {
          webshopUrl
          stadt
          land
          kategorien
          mindestbestellwert
          lieferkosten
          badges
          liefergebiet
        }
      }
    }
  }
`;

export type LieferbetriebNode = {
  id: string;
  title: string;
  slug: string;
  content?: string; // <- wichtig: in Detail-Query vorhanden
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  acf?: {
    webshopUrl?: string;
    stadt?: string;
    land?: string | string[];
    kategorien?: string[];
    mindestbestellwert?: number;
    lieferkosten?: number;
    badges?: string[];
    liefergebiet?: string;
  };
};

type LieferbetriebeResponse = { lieferbetriebe?: { nodes?: LieferbetriebNode[] } };

export async function fetchLieferbetriebe(first = 24): Promise<LieferbetriebNode[]> {
  const data = await safeRequest<LieferbetriebeResponse>(LIEFERBETRIEBE_QUERY, { first });
  return data?.lieferbetriebe?.nodes ?? [];
}

export const LIEFERBETRIEB_BY_SLUG = gql`
  query LieferbetriebBySlug($slug: ID!) {
    lieferbetrieb(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      featuredImage { node { sourceUrl altText } }
      acf {
        webshopUrl stadt land kategorien
        mindestbestellwert lieferkosten badges liefergebiet
      }
    }
  }
`;

export const LIEFERBETRIEBE_SLUGS = gql`
  query {
    lieferbetriebe(first: 100, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export async function fetchLieferbetriebBySlug(slug: string) {
  const data = await safeRequest<{ lieferbetrieb?: LieferbetriebNode }>(LIEFERBETRIEB_BY_SLUG, { slug });
  return data?.lieferbetrieb ?? null;
}

export async function fetchLieferbetriebSlugs(): Promise<string[]> {
  const data = await safeRequest<{ lieferbetriebe?: { nodes?: { slug: string }[] } }>(LIEFERBETRIEBE_SLUGS);
  return (data?.lieferbetriebe?.nodes ?? []).map(n => n.slug).filter(Boolean);
}

/* =========================
   Guides (WP Beiträge, Kategorie "guides")
   ========================= */

export type GuideNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  // Falls ACF-Felder für Guides: Feldgruppe in GraphQL anzeigen und hier typisieren
  acf?: { intro?: string; readingTime?: number };
};

type GuidesResponse = { posts?: { nodes?: GuideNode[] } };
type GuideBySlugResponse = { post?: GuideNode };

export const GUIDES_QUERY = gql`
  query Guides($first: Int = 6) {
    posts(first: $first, where: { categoryName: "guides", status: PUBLISH }) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage { node { sourceUrl altText } }
        # ACF-Beispiel (aktivieren wenn vorhanden):
        # acf { intro readingTime }
        # oder Alias:
        # acf: guideFields { intro readingTime }
      }
    }
  }
`;

export const GUIDE_BY_SLUG = gql`
  query GuideBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      featuredImage { node { sourceUrl altText } }
      # ACF-Beispiel:
      # acf { intro readingTime }
      # oder: acf: guideFields { intro readingTime }
    }
  }
`;

export const GUIDE_SLUGS = gql`
  query GuideSlugs {
    posts(first: 100, where: { categoryName: "guides", status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export async function fetchGuides(first = 3): Promise<GuideNode[]> {
  const data = await safeRequest<GuidesResponse>(GUIDES_QUERY, { first });
  return data?.posts?.nodes ?? [];
}

export async function fetchGuideBySlug(slug: string): Promise<GuideNode | null> {
  const data = await safeRequest<GuideBySlugResponse>(GUIDE_BY_SLUG, { slug });
  return data?.post ?? null;
}

export async function fetchGuideSlugs(): Promise<string[]> {
  const data = await safeRequest<{ posts?: { nodes?: { slug: string }[] } }>(GUIDE_SLUGS);
  return (data?.posts?.nodes ?? []).map(n => n.slug).filter(Boolean);
}
