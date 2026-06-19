import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Sanity webhook calls this endpoint to trigger ISR revalidation
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { _type?: string };
  const type = body._type;

  // Revalidate the relevant cache tag
  const profile = {};
  if (type === "reminder") revalidateTag("reminder", profile);
  else if (type === "topic") revalidateTag("topic", profile);
  else if (type === "duaCollection") revalidateTag("duaCollection", profile);
  else if (type === "siteSettings") revalidateTag("siteSettings", profile);
  else {
    // Revalidate all on unknown type
    revalidateTag("reminder", profile);
    revalidateTag("topic", profile);
    revalidateTag("duaCollection", profile);
    revalidateTag("siteSettings", profile);
  }

  return NextResponse.json({ revalidated: true, type });
}
