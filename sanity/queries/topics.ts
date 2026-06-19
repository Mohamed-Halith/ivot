import { groq } from "next-sanity";
import { client, isSanityConfigured } from "../lib/client";
import type { Topic } from "@/types";

export async function getAllTopics(): Promise<Topic[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "topic"] | order(order asc) {
      _id, title, titleTamil, slug, description, icon, order, coverImage,
      "reminderCount": count(*[_type == "reminder" && references(^._id)])
    }`,
    {},
    { next: { revalidate: 60, tags: ["topic"] } }
  );
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    groq`*[_type == "topic" && slug.current == $slug][0] {
      _id, title, titleTamil, slug, description, icon, coverImage,
      "reminderCount": count(*[_type == "reminder" && references(^._id)])
    }`,
    { slug },
    { next: { revalidate: 60, tags: ["topic"] } }
  );
}

export async function getAllTopicSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  const results = await client.fetch<Array<{ slug: { current: string } }>>(
    groq`*[_type == "topic"]{ slug }`,
    {},
    { next: { revalidate: 300 } }
  );
  return results.map((t) => t.slug.current);
}
