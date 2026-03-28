import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string }> }
) {
  try {
    const { section, slug } = await params;
    const count = (await kv.get<number>(`views:${section}:${slug}`)) ?? 0;
    return NextResponse.json({ views: count });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string }> }
) {
  try {
    const { section, slug } = await params;
    const [count] = await Promise.all([
      kv.incr(`views:${section}:${slug}`),
      kv.incr("views:total"),
    ]);
    return NextResponse.json({ views: count });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
