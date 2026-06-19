import { defineField, defineType } from "sanity";

export const duaCollectionSchema = defineType({
  name: "duaCollection",
  title: "Dua Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "duas",
      title: "Duas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label / Name", type: "string" }),
            defineField({ name: "arabic", title: "Arabic", type: "text", rows: 3 }),
            defineField({
              name: "transliteration",
              title: "Transliteration",
              type: "text",
              rows: 2,
            }),
            defineField({ name: "tamil", title: "Tamil Meaning", type: "text", rows: 3 }),
            defineField({ name: "english", title: "English Meaning", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "label", subtitle: "arabic" },
            prepare({ title, subtitle }) {
              return { title: title || "Dua", subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
