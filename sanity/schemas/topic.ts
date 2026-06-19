import { defineField, defineType } from "sanity";

export const topicSchema = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleTamil",
      title: "Title (Tamil)",
      type: "string",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon / Emoji",
      type: "string",
      description: "A single emoji to represent this topic (e.g. 🤲)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = appears first",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "titleTamil", media: "coverImage" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
