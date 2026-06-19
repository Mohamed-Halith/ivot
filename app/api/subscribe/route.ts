import { NextRequest, NextResponse } from "next/server";
import { subscribeAction } from "@/lib/actions";

// Fallback REST endpoint for non-JS form submissions
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const result = await subscribeAction(formData);
  if (result.success) {
    return NextResponse.json({ ok: true, message: result.message });
  }
  return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
}
