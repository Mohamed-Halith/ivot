import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "Ihsan: Voice of Truth",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Qur'an & Hadith reminders in Tamil",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "bio",
      title: "About / Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      initialValue: "May Allah accept our efforts. آمين",
    }),
  ],
  preview: {
    select: { title: "brandName" },
  },
});
