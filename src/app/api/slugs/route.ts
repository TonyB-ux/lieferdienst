import { NextResponse } from "next/server";
import { fetchLieferbetriebSlugs } from "../../../lib/wp";

export async function GET() {
  try {
    const slugs = await fetchLieferbetriebSlugs();
    return NextResponse.json({ ok: true, count: slugs.length, slugs });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
