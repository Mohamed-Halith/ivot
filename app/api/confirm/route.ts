import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.redirect(new URL("/?confirm=error", req.url));
  }

  try {
    // Find the subscriber by email and mark as confirmed
    const subscriber = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "subscriber" && email == $email && confirmed == false][0]{ _id }`,
      { email }
    );

    if (subscriber) {
      await writeClient.patch(subscriber._id).set({ confirmed: true }).commit();
    }

    const redirectUrl =
      process.env.RESEND_CONFIRM_REDIRECT_URL ??
      `${process.env.NEXT_PUBLIC_SITE_URL}/?confirm=success`;
    return NextResponse.redirect(new URL(redirectUrl));
  } catch {
    return NextResponse.redirect(new URL("/?confirm=error", req.url));
  }
}
