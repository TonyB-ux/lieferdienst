// src/lib/wp.ts
import { GraphQLClient, gql } from "graphql-request";

/** GraphQL-Client sicher aus ENV holen */
function getClient() {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new Error("WP_GRAPHQL_ENDPOINT fehlt (.env.local) – Dev-Server neu starten!");
  }
  return new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      // Optional bei Basic-Auth:
      // Authorization: "Basic " + Buffer.from("USER:PASS").toString("base64"),
    },
  });
}

/** Gemeinsamer Typ für Einträge */
export type LieferbetriebNode = {
  id: string;
  title?: string;
  slug?: string;
  content?: string | null;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
  acf?: {
    webshopUrl?: string;
    stadt?: string;
    land?: string | string[];
    kategorien?: string[] | null;
    mindestbestellwert?: number | null;
    lieferkosten?: number | null;
    badges?: string[] | null;
    liefergebiet?: string | null;
  };
};

/* ---------- LISTE ---------- */

export const LIEFERBETRIEBE_QUERY = gql`
  query Lieferbetriebe($first: Int = 24) {
    lieferbetriebe(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        featuredImage { node { sourceUrl altText } }
        acf {
          webshopUrl stadt land kategorien
          mindestbestellwert lieferkosten badges liefergebiet
        }
      }
    }
  }
`;

type LieferbetriebeResponse = {
  lieferbetriebe?: { nodes?: LieferbetriebNode[] };
};

export async function fetchLieferbetriebe(first = 24): Promise<LieferbetriebNode[]> {
  const wp = getClient();
  const data = await wp.request<LieferbetriebeResponse>(LIEFERBETRIEBE_QUERY, { first });
  return data.lieferbetriebe?.nodes ?? [];
}

/* ---------- DETAIL ---------- */

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

export async function fetchLieferbetriebBySlug(slug: string): Promise<LieferbetriebNode | null> {
  const wp = getClient();
  const data = await wp.request<{ lieferbetrieb?: LieferbetriebNode }>(LIEFERBETRIEB_BY_SLUG, { slug });
  return data.lieferbetrieb ?? null;
}

export async function fetchLieferbetriebSlugs(): Promise<string[]> {
  const wp = getClient();
  const data = await wp.request<{ lieferbetriebe?: { nodes?: { slug?: string | null }[] } }>(
    LIEFERBETRIEBE_SLUGS
  );
  return (data.lieferbetriebe?.nodes ?? [])
    .map((n) => n.slug || "")
    .filter((s): s is string => Boolean(s));
}
