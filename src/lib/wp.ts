// src/lib/wp.ts
import { GraphQLClient, gql } from "graphql-request";

/* ============================================================================
   GraphQL Client
   ========================================================================== */

const endpoint =
  process.env.WP_GRAPHQL_ENDPOINT ||
  process.env.NEXT_PUBLIC_WP_GRAPHQL ||
  "";

export const wp = new GraphQLClient(endpoint, {
  headers: { "Content-Type": "application/json" },
});

/** Generischer Request mit klarer Typisierung & Fehlern */
async function safeRequest<T, V extends Record<string, unknown> | undefined = undefined>(
  query: string,
  variables?: V
): Promise<T> {
  if (!endpoint) {
    throw new Error("WP_GRAPHQL_ENDPOINT (oder NEXT_PUBLIC_WP_GRAPHQL) ist nicht gesetzt.");
  }
  try {
    return await wp.request<T, V>(query, variables as V);
  } catch (err: any) {
    // graphql-request liefert oft ein Objekt mit response.errors
    const msg =
      err?.response?.errors?.[0]?.message ||
      err?.message ||
      "Unbekannter WPGraphQL-Fehler";
    throw new Error(msg);
  }
}

/* ============================================================================
   Konfiguration
   ========================================================================== */

export const GUIDES_CATEGORY_ID =
  parseInt(
    (process.env.NEXT_PUBLIC_GUIDES_CATEGORY_ID ||
      process.env.GUIDES_CATEGORY_ID ||
      "0") as string,
    10
  ) || 0;

export const GUIDES_CATEGORY_SLUG =
  process.env.NEXT_PUBLIC_GUIDES_CATEGORY_SLUG || "guides";

/* ============================================================================
   Typen (Auszug)
   ========================================================================== */

export type FeaturedImage = {
  node?: { sourceUrl?: string | null; altText?: string | null } | null;
};

export type GuideNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: FeaturedImage | null;
};

type GuidesResponse = { posts?: { nodes?: GuideNode[] | null } | null };
type GuideBySlugResponse = { post?: GuideNode | null };
type GuideSlugsResponse = { posts?: { nodes?: { slug: string }[] | null } | null };

/** — Lieferbetriebe (falls anderswo genutzt) — */
export type LieferbetriebACF = {
  /** Beispiel-Felder; erweitere hier bei Bedarf */
  region?: string | null;
  kategorie?: string | null;
  liefergebiet?: string | null;
};

export type LieferbetriebNode = {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  featuredImage?: FeaturedImage | null;
  acf?: LieferbetriebACF | null;
};

/* ============================================================================
   GraphQL – Guides
   ========================================================================== */

/** Liste der Guides (geordnet nach Datum absteigend) */
const GUIDES = gql`
  query Guides($first: Int = 6, $catIds: [ID], $catName: String) {
    posts(
      first: $first
      where: {
        status: PUBLISH
        categoryIn: $catIds
        categoryName: $catName
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage { node { sourceUrl altText } }
      }
    }
  }
`;

/** Einzelner Guide via Slug */
const GUIDE_BY_SLUG = gql`
  query GuideBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      excerpt
      featuredImage { node { sourceUrl altText } }
    }
  }
`;

/** Slugs für SSG/ISR */
const GUIDE_SLUGS = gql`
  query GuideSlugs($catIds: [ID], $catName: String) {
    posts(
      first: 50
      where: {
        status: PUBLISH
        categoryIn: $catIds
        categoryName: $catName
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes { slug }
    }
  }
`;

/* ============================================================================
   Public API – Guides
   ========================================================================== */

/**
 * Guides holen (default: 3).
 * - Wenn GUIDES_CATEGORY_ID > 0 → filtert per ID (als String).
 * - Sonst per Kategoriename "guides" (oder ENV-Override).
 */
export async function fetchGuides(first = 3): Promise<GuideNode[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? { first, catIds: [String(GUIDES_CATEGORY_ID)], catName: null }
      : { first, catIds: null, catName: GUIDES_CATEGORY_SLUG };

  const data = await safeRequest<GuidesResponse, typeof variables>(GUIDES, variables);
  return data?.posts?.nodes ?? [];
}

/** Einzelnen Guide per Slug holen */
export async function fetchGuideBySlug(slug: string): Promise<GuideNode | null> {
  const data = await safeRequest<GuideBySlugResponse, { slug: string }>(GUIDE_BY_SLUG, { slug });
  return data?.post ?? null;
}

/** Alle Guide-Slugs für Routenaufbau */
export async function fetchGuideSlugs(): Promise<string[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? ({ catIds: [String(GUIDES_CATEGORY_ID)], catName: null } as const)
      : ({ catIds: null, catName: GUIDES_CATEGORY_SLUG } as const);

  const data = await safeRequest<GuideSlugsResponse, typeof variables>(GUIDE_SLUGS, variables);
  const nodes = data?.posts?.nodes ?? [];
  return nodes.map((n) => n.slug).filter(Boolean);
}
