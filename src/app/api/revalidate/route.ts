// src/app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type RevalidateBody = {
  path?: string;       // z.B. "/guides" oder "/guides/mein-guide"
  slug?: string;       // z.B. "mein-betrieb" -> wird zu "/lieferdienste/mein-betrieb"
  paths?: string[];    // optional: mehrere Pfade auf einmal
};

export async function POST(req: Request) {
  // Secret aus der Query lesen, z.B. /api/revalidate?secret=...
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, reason: "bad-secret" }, { status: 401 });
  }

  // Body optional und typsicher parsen
  let body: RevalidateBody = {};
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    // kein Body → bleibt {}
  }

  // Zielpfade sammeln
  const targets = new Set<string>();

  // mehrere Pfade
  if (Array.isArray(body.paths)) {
    for (const p of body.paths) if (typeof p === "string" && p.startsWith("/")) targets.add(p);
  }

  // einzelner Pfad
  if (typeof body.path === "string" && body.path.startsWith("/")) {
    targets.add(body.path);
  }

  // slug -> /lieferdienste/<slug>
  if (typeof body.slug === "string" && body.slug.trim()) {
    targets.add(`/lieferdienste/${body.slug.trim()}`);
  }

  // Fallback: wenn nichts angegeben wurde, nimm /guides
  if (targets.size === 0) {
    targets.add("/guides");
  }

  // Revalidieren
  for (const p of targets) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, revalidated: Array.from(targets) });
}
