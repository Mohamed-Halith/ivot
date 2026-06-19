"use client";
/**
 * Embedded Sanity Studio at /studio
 * The owner logs in here to add/edit reminders, topics, and duas.
 * Marked client-only to avoid SSR conflicts with styled-components.
 */
import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
