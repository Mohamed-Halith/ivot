import type { MetadataRoute } from "next";
import { getAllReminderSlugs } from "@/sanity/queries/reminders";
import { getAllTopicSlugs } from "@/sanity/queries/topics";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [reminderSlugs, topicSlugs] = await Promise.all([
    getAllReminderSlugs(),
    getAllTopicSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    {
      url: `${BASE_URL}/reminders`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/duas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const reminderPages: MetadataRoute.Sitemap = reminderSlugs.map((slug) => ({
    url: `${BASE_URL}/reminders/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const topicPages: MetadataRoute.Sitemap = topicSlugs.map((slug) => ({
    url: `${BASE_URL}/topics/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...reminderPages, ...topicPages];
}
