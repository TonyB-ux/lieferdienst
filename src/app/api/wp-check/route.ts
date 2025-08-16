import { NextResponse } from "next/server";

type WPResponse = {
  data?: { generalSettings?: { title?: string | null } };
  errors?: unknown;
};

export async function GET() {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "WP_GRAPHQL_ENDPOINT missing" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ generalSettings { title } }" }),
    });
    const json = (await res.json()) as WPResponse;
    return NextResponse.json({
      ok: true,
      endpoint,
      title: json.data?.generalSettings?.title ?? null,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
