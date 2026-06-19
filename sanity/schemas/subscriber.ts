import { defineField, defineType } from "sanity";

export const subscriberSchema = defineType({
  name: "subscriber",
  title: "Subscriber",
  type: "document",
  // Read-only in Studio — managed via API
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "confirmed",
      title: "Confirmed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Subscribed At",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where did this subscriber come from? (e.g. homepage, reminder page)",
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "confirmed" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? "✅ Confirmed" : "⏳ Pending" };
    },
  },
});
