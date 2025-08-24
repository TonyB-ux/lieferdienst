// src/app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

type Body = { path?: string; tag?: string; slug?: string };

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, reason: "bad-secret" }, { status: 401 });
  }

  let body: Body = {};
  try { body = (await req.json()) as Body; } catch { /* empty body allowed */ }

  // Wenn slug übergeben wurde -> ableiten
  const path =
    typeof body.path === "string" ? body.path :
    typeof body.slug === "string" ? `/guides/${body.slug}` :
    undefined;

  // Standard-Fall: Guides haben sich geändert -> Home + /guides + Tag
  if (!path && !body.tag) {
    revalidatePath("/");
    revalidatePath("/guides");
    revalidateTag("guides");
    return NextResponse.json({ ok: true, revalidated: ["/", "/guides"], tags: ["guides"] });
  }

  if (path) {
    revalidatePath(path);
    // Wenn es eine Guides-Seite ist, aktualisiere zusätzlich Home und Liste
    if (path === "/guides" || path.startsWith("/guides/")) {
      revalidatePath("/");
      revalidateTag("guides");
    }
  }

  if (typeof body.tag === "string" && body.tag) {
    revalidateTag(body.tag);
  }

  return NextResponse.json({ ok: true, path: path ?? null, tag: body.tag ?? null });
}
