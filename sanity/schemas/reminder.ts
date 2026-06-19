import { defineField, defineType } from "sanity";

export const reminderSchema = defineType({
  name: "reminder",
  title: "Reminder",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (Tamil + English)",
      type: "string",
      description: 'e.g. "தனிமை — Solitude"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "arabicText",
      title: "Arabic Text (Qur'an / Hadith)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      description: 'e.g. "Al-Qur\'an 4:103" or "Sahih Bukhari 6412"',
    }),
    defineField({
      name: "tamilMeaning",
      title: "Tamil Meaning",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "englishMeaning",
      title: "English Meaning",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "reflection",
      title: "Reflection / Teaching",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "dua",
      title: "Dua (optional)",
      type: "object",
      fields: [
        defineField({ name: "arabic", title: "Arabic", type: "text", rows: 3 }),
        defineField({ name: "transliteration", title: "Transliteration", type: "text", rows: 2 }),
        defineField({ name: "tamil", title: "Tamil Meaning", type: "text", rows: 3 }),
        defineField({ name: "english", title: "English Meaning", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "reelEmbed",
      title: "Social Media Reel",
      type: "object",
      fields: [
        defineField({
          name: "instagramUrl",
          title: "Instagram Reel URL",
          type: "url",
          description: "Paste the Instagram post URL here",
        }),
        defineField({
          name: "youtubeUrl",
          title: "YouTube Short URL",
          type: "url",
          description: "Paste the YouTube video URL here",
        }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this reminder prominently on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
        defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2 }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      topic: "topic.title",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, topic, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: topic,
      };
    },
  },
});
