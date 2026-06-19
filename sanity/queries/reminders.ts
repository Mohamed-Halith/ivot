import { groq } from "next-sanity";
import { client, isSanityConfigured } from "../lib/client";
import type { Reminder, SearchIndexEntry } from "@/types";

const reminderFields = groq`
  _id,
  title,
  slug,
  "topic": topic->{_id, title, titleTamil, slug},
  arabicText,
  reference,
  tamilMeaning,
  englishMeaning,
  reflection,
  dua,
  reelEmbed,
  coverImage,
  publishedAt,
  featured,
  seo
`;

export async function getAllReminders(): Promise<Reminder[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "reminder"] | order(publishedAt desc) { ${reminderFields} }`,
    {},
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getFeaturedReminder(): Promise<Reminder | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    groq`*[_type == "reminder" && featured == true] | order(publishedAt desc)[0] { ${reminderFields} }`,
    {},
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getLatestReminders(limit = 6): Promise<Reminder[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "reminder"] | order(publishedAt desc)[0...$limit] { ${reminderFields} }`,
    { limit },
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getReminderBySlug(slug: string): Promise<Reminder | null> {
  if (!isSanityConfigured) return null;
  return client.fetch(
    groq`*[_type == "reminder" && slug.current == $slug][0] { ${reminderFields} }`,
    { slug },
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getRemindersByTopic(topicSlug: string): Promise<Reminder[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "reminder" && topic->slug.current == $topicSlug] | order(publishedAt desc) { ${reminderFields} }`,
    { topicSlug },
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getRelatedReminders(
  topicId: string,
  excludeId: string,
  limit = 3
): Promise<Reminder[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "reminder" && topic._ref == $topicId && _id != $excludeId] | order(publishedAt desc)[0...$limit] { ${reminderFields} }`,
    { topicId, excludeId, limit },
    { next: { revalidate: 60, tags: ["reminder"] } }
  );
}

export async function getSearchIndex(): Promise<SearchIndexEntry[]> {
  if (!isSanityConfigured) return [];
  return client.fetch(
    groq`*[_type == "reminder"] { "slug": slug.current, title, arabicText, tamilMeaning, englishMeaning, "topicTitle": topic->title }`,
    {},
    { next: { revalidate: 300, tags: ["reminder"] } }
  );
}

export async function getAllReminderSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  const results = await client.fetch<Array<{ slug: { current: string } }>>(
    groq`*[_type == "reminder"]{ slug }`,
    {},
    { next: { revalidate: 300, tags: ["reminder"] } }
  );
  return results.map((r) => r.slug.current);
}
