// src/lib/wp.ts
import { GraphQLClient, gql } from "graphql-request";

/* ============================================================================
   GraphQL Client + Helper
   ========================================================================== */

const endpoint =
  process.env.WP_GRAPHQL_ENDPOINT ||
  process.env.NEXT_PUBLIC_WP_GRAPHQL ||
  "";

export const wp = new GraphQLClient(endpoint, {
  headers: { "Content-Type": "application/json" },
});

/**
 * safeRequest – schlanke Variante kompatibel mit graphql-request (rest args)
 * - ohne Variablen: wp.request<T>(query)
 * - mit Variablen:  wp.request<T>(query, variables)
 */
async function safeRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!endpoint) {
    throw new Error("WP_GRAPHQL_ENDPOINT (oder NEXT_PUBLIC_WP_GRAPHQL) ist nicht gesetzt.");
  }
  try {
    if (typeof variables !== "undefined") {
      // Rest-Param-Signatur – per any cast TS-Strictness umgehen
      return await wp.request<T>(query, variables as any);
    }
    return await wp.request<T>(query);
  } catch (err: any) {
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

/** Fallback-Kategorie für Lieferbetriebe, falls kein CPT vorhanden ist */
export const LIEFERBETRIEBE_CATEGORY_SLUG =
  process.env.NEXT_PUBLIC_LIEFERBETRIEBE_CATEGORY_SLUG || "lieferdienste";

/* ============================================================================
   Typen
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

/** Lieferbetrieb – ACF Felder, exakt auf deine Pages abgestimmt */
export type LieferbetriebACF = {
  region?: string | null;
  kategorie?: string | null;
  liefergebiet?: string | null;
  land?: string | string[] | null;
  stadt?: string | null;
  mindestbestellwert?: number | string | null;
  lieferkosten?: number | string | null;
  badges?: string[] | null;
  kategorien?: string[] | null;
  webshopUrl?: string | null;

  /** Sicherheitsnetz: weitere ACF-Felder brechen den Build nicht */
  [k: string]: unknown;
};

export type LieferbetriebNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: FeaturedImage | null;
  acf?: LieferbetriebACF | null;
};

type LieferbetriebeCPTResponse = {
  lieferbetriebs?: { nodes?: LieferbetriebNode[] | null } | null;
};
type LieferbetriebCPTBySlugResponse = { lieferbetrieb?: LieferbetriebNode | null };
type LieferbetriebePostResponse = { posts?: { nodes?: LieferbetriebNode[] | null } | null };

/* ============================================================================
   GraphQL – GUIDES
   ========================================================================== */

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
   Public API – GUIDES
   ========================================================================== */

export async function fetchGuides(first = 3): Promise<GuideNode[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? { first, catIds: [String(GUIDES_CATEGORY_ID)], catName: null }
      : { first, catIds: null, catName: GUIDES_CATEGORY_SLUG };

  const data = await safeRequest<GuidesResponse>(GUIDES, variables);
  return data?.posts?.nodes ?? [];
}

export async function fetchGuideBySlug(slug: string): Promise<GuideNode | null> {
  const data = await safeRequest<GuideBySlugResponse>(GUIDE_BY_SLUG, { slug });
  return data?.post ?? null;
}

export async function fetchGuideSlugs(): Promise<string[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? { catIds: [String(GUIDES_CATEGORY_ID)], catName: null }
      : { catIds: null, catName: GUIDES_CATEGORY_SLUG };

  const data = await safeRequest<GuideSlugsResponse>(GUIDE_SLUGS, variables);
  const nodes = data?.posts?.nodes ?? [];
  return nodes.map((n) => n.slug).filter(Boolean);
}
// Alias für die Routen-Datei /guides/[slug]/page.tsx
export async function fetchAllGuideSlugs(): Promise<string[]> {
  return fetchGuideSlugs();
}


/* ============================================================================
   GraphQL – LIEFERBETRIEBE (CPT + Fallback auf Posts)
   ========================================================================== */

/** Primär: Custom Post Type „lieferbetrieb“ */
const LIEFERBETRIEBE_CPT = gql`
  query Lieferbetriebe($first: Int = 24) {
    lieferbetriebs(
      first: $first
      where: { status: PUBLISH, orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
        acf {
          region
          kategorie
          liefergebiet
          land
          stadt
          mindestbestellwert
          lieferkosten
          badges
          kategorien
          webshopUrl
        }
      }
    }
  }
`;

const LIEFERBETRIEB_BY_SLUG_CPT = gql`
  query LieferbetriebBySlug($slug: ID!) {
    lieferbetrieb(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      featuredImage { node { sourceUrl altText } }
      acf {
        region
        kategorie
        liefergebiet
        land
        stadt
        mindestbestellwert
        lieferkosten
        badges
        kategorien
        webshopUrl
      }
    }
  }
`;

const LIEFERBETRIEB_SLUGS_CPT = gql`
  query LieferbetriebSlugs {
    lieferbetriebs(first: 200, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

/** Fallback: normale Posts mit Kategorie-Slug (ohne ACF, damit's überall läuft) */
const LIEFERBETRIEBE_POSTS = gql`
  query LieferbetriebePosts($first: Int = 24, $category: String!) {
    posts(
      first: $first
      where: { status: PUBLISH, categoryName: $category, orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        content
        featuredImage { node { sourceUrl altText } }
      }
    }
  }
`;

const LIEFERBETRIEB_POST_BY_SLUG = gql`
  query LieferbetriebPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      featuredImage { node { sourceUrl altText } }
    }
  }
`;

const LIEFERBETRIEB_SLUGS_POSTS = gql`
  query LieferbetriebSlugsPosts($category: String!) {
    posts(first: 200, where: { status: PUBLISH, categoryName: $category }) {
      nodes { slug }
    }
  }
`;

/* ============================================================================
   Public API – LIEFERBETRIEBE
   ========================================================================== */

export async function fetchLieferbetriebe(first = 24): Promise<LieferbetriebNode[]> {
  try {
    const data = await safeRequest<LieferbetriebeCPTResponse>(LIEFERBETRIEBE_CPT, { first });
    return data?.lieferbetriebs?.nodes ?? [];
  } catch {
    const data = await safeRequest<LieferbetriebePostResponse>(LIEFERBETRIEBE_POSTS, {
      first,
      category: LIEFERBETRIEBE_CATEGORY_SLUG,
    });
    return data?.posts?.nodes ?? [];
  }
}

export async function fetchLieferbetriebBySlug(slug: string): Promise<LieferbetriebNode | null> {
  try {
    const data = await safeRequest<LieferbetriebCPTBySlugResponse>(LIEFERBETRIEB_BY_SLUG_CPT, { slug });
    return data?.lieferbetrieb ?? null;
  } catch {
    const data = await safeRequest<{ post?: LieferbetriebNode | null }>(LIEFERBETRIEB_POST_BY_SLUG, { slug });
    return data?.post ?? null;
  }
}

export async function fetchLieferbetriebSlugs(): Promise<string[]> {
  try {
    const data = await safeRequest<{ lieferbetriebs?: { nodes?: { slug: string }[] | null } | null }>(
      LIEFERBETRIEB_SLUGS_CPT
    );
    const nodes = data?.lieferbetriebs?.nodes ?? [];
    return nodes.map((n) => n.slug).filter(Boolean);
  } catch {
    const data = await safeRequest<{ posts?: { nodes?: { slug: string }[] | null } | null }>(
      LIEFERBETRIEB_SLUGS_POSTS,
      { category: LIEFERBETRIEBE_CATEGORY_SLUG }
    );
    const nodes = data?.posts?.nodes ?? [];
    return nodes.map((n) => n.slug).filter(Boolean);
  }
}
