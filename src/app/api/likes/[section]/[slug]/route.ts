import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string }> }
) {
  try {
    const { section, slug } = await params;
    const count = (await kv.get<number>(`likes:${section}:${slug}`)) ?? 0;
    return NextResponse.json({ likes: count });
  } catch {
    return NextResponse.json({ likes: 0 });
  }
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ section: string; slug: string }> }
) {
  try {
    const { section, slug } = await params;
    const count = await kv.incr(`likes:${section}:${slug}`);
    return NextResponse.json({ likes: count });
  } catch {
    return NextResponse.json({ likes: 0 });
  }
}
