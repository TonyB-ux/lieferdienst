import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, reason: "missing_env", hint: "Set WP_GRAPHQL_ENDPOINT in .env.local and restart dev server" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ generalSettings { title } }" }),
    });
    const json = await res.json();
    return NextResponse.json({ ok: true, endpoint, data: json });
  } catch (e: any) {
    return NextResponse.json({ ok: false, endpoint, error: String(e?.message ?? e) }, { status: 500 });
  }
}
