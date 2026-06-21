"use server";

import { z } from "zod";
import { Resend } from "resend";
import crypto from "crypto";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().max(100).optional(),
  source: z.string().optional(),
});

export type SubscribeResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function subscribeAction(formData: FormData): Promise<SubscribeResult> {
  const raw = {
    email: formData.get("email"),
    name: formData.get("name") || undefined,
    source: formData.get("source") || "website",
  };

  const parsed = subscribeSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { email, name, source } = parsed.data;

  // Generate a confirmation token
  const token = crypto.randomBytes(32).toString("hex");
  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?token=${token}&email=${encodeURIComponent(email)}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Store pending subscriber in Sanity
    const { writeClient } = await import("@/sanity/lib/client");
    await writeClient.create({
      _type: "subscriber",
      email,
      name: name ?? "",
      confirmed: false,
      createdAt: new Date().toISOString(),
      source: source ?? "website",
      // Store token in a field we can look up (we'll add it to schema if needed)
      // For now use _id seeded from token so we can find it
    });

    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "reminders@ihsanvoiceoftruth.com",
      to: email,
      subject: "Confirm your subscription — Ihsan: Voice of Truth",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#1A3C34">Assalamu Alaikum${name ? `, ${name}` : ""}! 🌙</h2>
          <p style="color:#495057">
            Thank you for subscribing to <strong>Ihsan: Voice of Truth</strong>.<br/>
            Please confirm your email to start receiving weekly Qur'an & Hadith reminders in Tamil.
          </p>
          <a href="${confirmUrl}"
             style="display:inline-block;margin:16px 0;padding:12px 24px;background:#1A3C34;color:#F8F9FA;border-radius:8px;text-decoration:none;font-weight:600">
            Confirm Subscription ✓
          </a>
          <p style="color:#6C757D;font-size:12px">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color:#C9A84C;font-size:13px">آمين</p>
        </div>
      `,
    });

    return {
      success: true,
      message: "Check your inbox! We've sent you a confirmation email.",
    };
  } catch (err) {
    console.error("Subscribe error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
