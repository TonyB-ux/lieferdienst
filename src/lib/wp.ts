// src/lib/wp.ts
import { GraphQLClient, gql } from "graphql-request";

/* ============================================================================
   GraphQL Client
   ========================================================================== */

const endpoint = process.env.WP_GRAPHQL_ENDPOINT || "";

export const wp = new GraphQLClient(endpoint, {
  headers: { "Content-Type": "application/json" },
});

/** Generische Request-Hilfe mit klarer Fehlerbehandlung (kein any) */
async function safeRequest<T, V extends Record<string, unknown> | undefined = undefined>(
  query: string,
  variables?: V
): Promise<T | null> {
  try {
    // graphql-request akzeptiert undefined für variables
    return await wp.request<T>(query, variables as V);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("WPGraphQL error:", e);
    return null;
  }
}

/* ============================================================================
   Gemeinsame Typen
   ========================================================================== */

export type ImageNode = {
  sourceUrl?: string | null;
  altText?: string | null;
};
export type FeaturedImage = {
  node?: ImageNode | null;
};

/* ============================================================================
   Lieferbetriebe (CPT)
   ========================================================================== */

export type LieferbetriebACF = {
  webshopUrl?: string | null;
  stadt?: string | null;
  land?: string | string[] | null; // ACF select (einfach/mehrfach)
  kategorien?: string[] | null;
  mindestbestellwert?: number | null;
  lieferkosten?: number | null;
  badges?: string[] | null;
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

type LieferbetriebeListResponse = {
  lieferbetriebe?: { nodes?: LieferbetriebNode[] | null } | null;
};
type LieferbetriebBySlugResponse = {
  lieferbetrieb?: LieferbetriebNode | null;
};
type LieferbetriebeSlugsResponse = {
  lieferbetriebe?: { nodes?: { slug: string }[] | null } | null;
};

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

export async function fetchLieferbetriebe(first = 24): Promise<LieferbetriebNode[]> {
  const data = await safeRequest<LieferbetriebeListResponse, { first: number }>(
    LIEFERBETRIEBE_QUERY,
    { first }
  );
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
`;

export async function fetchLieferbetriebBySlug(slug: string): Promise<LieferbetriebNode | null> {
  const data = await safeRequest<LieferbetriebBySlugResponse, { slug: string }>(
    LIEFERBETRIEB_BY_SLUG,
    { slug }
  );
  return data?.lieferbetrieb ?? null;
}

export const LIEFERBETRIEBE_SLUGS = gql`
  query LieferbetriebeSlugs {
    lieferbetriebe(first: 1000, where: { status: PUBLISH }) {
      nodes { slug }
    }
  }
`;

export async function fetchLieferbetriebSlugs(): Promise<string[]> {
  const data = await safeRequest<LieferbetriebeSlugsResponse>(
    LIEFERBETRIEBE_SLUGS,
    undefined
  );
  const nodes = data?.lieferbetriebe?.nodes ?? [];
  return nodes.map((n) => n.slug).filter(Boolean);
}

/* ============================================================================
   Guides (WP Posts) – Kategorie per ENV-ID (Fallback: Slug "guides")
   ========================================================================== */

const GUIDES_CATEGORY_ID = Number.parseInt(process.env.GUIDES_CATEGORY_ID || "0", 10);

export type GuideNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: FeaturedImage | null;
  // Optional: ACF-Felder, falls vorhanden
  // acf?: { intro?: string | null; readingTime?: number | null } | null;
};

type GuidesResponse = { posts?: { nodes?: GuideNode[] | null } | null };
type GuideBySlugResponse = { post?: GuideNode | null };
type GuideSlugsResponse = { posts?: { nodes?: { slug: string }[] | null } | null };

/**
 * Nutzt bevorzugt categoryIn (ID aus ENV), fällt auf categoryName "guides" zurück.
 * So bekommst du wirklich alle Beiträge in deiner gewünschten Kategorie.
 */
export const GUIDES_QUERY = gql`
  query Guides($first: Int = 6, $catIds: [Int], $catName: String) {
    posts(
      first: $first
      where: { status: PUBLISH, categoryIn: $catIds, categoryName: $catName }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage { node { sourceUrl altText } }
        # Optional: ACF-Felder hier rein nehmen, wenn freigeschaltet
        # acf { intro readingTime }
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
      # Optional: ACF-Felder
      # acf { intro readingTime }
    }
  }
`;

export const GUIDE_SLUGS = gql`
  query GuideSlugs($catIds: [Int], $catName: String) {
    posts(
      first: 1000
      where: { status: PUBLISH, categoryIn: $catIds, categoryName: $catName }
    ) {
      nodes { slug }
    }
  }
`;

export async function fetchGuides(first = 3): Promise<GuideNode[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? ({ first, catIds: [GUIDES_CATEGORY_ID], catName: null } as const)
      : ({ first, catIds: null, catName: "guides" } as const);

  const data = await safeRequest<GuidesResponse, typeof variables>(GUIDES_QUERY, variables);
  return data?.posts?.nodes ?? [];
}

export async function fetchGuideBySlug(slug: string): Promise<GuideNode | null> {
  const data = await safeRequest<GuideBySlugResponse, { slug: string }>(GUIDE_BY_SLUG, { slug });
  return data?.post ?? null;
}

export async function fetchGuideSlugs(): Promise<string[]> {
  const variables =
    GUIDES_CATEGORY_ID > 0
      ? ({ catIds: [GUIDES_CATEGORY_ID], catName: null } as const)
      : ({ catIds: null, catName: "guides" } as const);

  const data = await safeRequest<GuideSlugsResponse, typeof variables>(GUIDE_SLUGS, variables);
  const nodes = data?.posts?.nodes ?? [];
  return nodes.map((n) => n.slug).filter(Boolean);
}
