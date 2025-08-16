// src/app/api/guide-slugs/route.ts
import { NextResponse } from "next/server";
import { fetchGuideSlugs } from "../../../lib/wp";

export async function GET() {
  try {
    const slugs = await fetchGuideSlugs();
    return NextResponse.json({ slugs });
  } catch {
    return NextResponse.json({ slugs: [] }, { status: 200 });
  }
}

