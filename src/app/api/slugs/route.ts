// src/app/api/slugs/route.ts
import { NextResponse } from "next/server";
// relativ von /app/api/slugs/route.ts nach /lib/wp.ts:
import { fetchLieferbetriebSlugs } from "../../../lib/wp";

export async function GET() {
  try {
    const slugs = await fetchLieferbetriebSlugs();
    return NextResponse.json({ ok: true, count: slugs.length, slugs });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
