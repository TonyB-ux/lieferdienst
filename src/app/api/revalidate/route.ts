// src/app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  // Payload sicher parsen
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const secret = body?.secret as string | undefined;
  const targetPath = (body?.path as string) || "/guides";

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath(targetPath);
    return NextResponse.json({ ok: true, revalidated: true, path: targetPath });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}
