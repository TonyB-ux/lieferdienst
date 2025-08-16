import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, reason: "bad-secret" }, { status: 401 });
  }

  // { path: "/lieferdienste/slug" } ODER { slug: "…" }
  const body = await req.json().catch(() => ({} as any));
  const path =
    typeof body?.path === "string"
      ? body.path
      : typeof body?.slug === "string"
      ? `/lieferdienste/${body.slug}`
      : "/lieferdienste";

  revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: path });
}
