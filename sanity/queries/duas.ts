import { groq } from "next-sanity";
import { client, isSanityConfigured } from "../lib/client";
import type { DuaCollection } from "@/types";

export async function getAllDuaCollections(): Promise<DuaCollection[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "duaCollection"] | order(_createdAt asc) {
      _id, title, slug, description, duas, coverImage
    }`,
    {},
    { next: { revalidate: 60, tags: ["duaCollection"] } }
  );
}
