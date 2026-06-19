import { groq } from "next-sanity";
import { client, isSanityConfigured } from "../lib/client";
import type { SiteSettings } from "@/types";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    groq`*[_type == "siteSettings"][0] {
      _id, brandName, tagline, logo, bio, instagramUrl, youtubeUrl, defaultOgImage, footerText
    }`,
    {},
    { next: { revalidate: 3600, tags: ["siteSettings"] } }
  );
}
