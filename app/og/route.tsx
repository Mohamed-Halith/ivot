import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getReminderBySlug } from "@/sanity/queries/reminders";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  let title = "Ihsan: Voice of Truth";
  let arabic = "";
  let topic = "";

  if (slug) {
    const reminder = await getReminderBySlug(slug);
    if (reminder) {
      title = reminder.title;
      arabic = reminder.arabicText ?? "";
      topic = reminder.topic?.title ?? "";
    }
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A3C34",
        padding: "60px",
        fontFamily: "serif",
      }}
    >
      {/* Brand */}
      <div
        style={{
          color: "#C9A84C",
          fontSize: 18,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        Ihsan: Voice of Truth
      </div>

      {/* Arabic text */}
      {arabic && (
        <div
          style={{
            color: "white",
            fontSize: 42,
            textAlign: "center",
            direction: "rtl",
            lineHeight: 1.8,
            marginBottom: 28,
            maxWidth: 900,
          }}
        >
          {arabic.length > 100 ? arabic.slice(0, 100) + "…" : arabic}
        </div>
      )}

      {/* Title */}
      <div
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>

      {/* Topic */}
      {topic && (
        <div
          style={{
            color: "#C9A84C",
            fontSize: 16,
            marginTop: 20,
            opacity: 0.9,
          }}
        >
          {topic}
        </div>
      )}

      {/* Decorative line */}
      <div
        style={{
          width: 60,
          height: 2,
          backgroundColor: "#C9A84C",
          marginTop: 36,
          opacity: 0.6,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
