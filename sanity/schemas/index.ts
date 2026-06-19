import { topicSchema } from "./topic";
import { reminderSchema } from "./reminder";
import { duaCollectionSchema } from "./duaCollection";
import { siteSettingsSchema } from "./siteSettings";
import { subscriberSchema } from "./subscriber";

export const schemaTypes = [
  topicSchema,
  reminderSchema,
  duaCollectionSchema,
  siteSettingsSchema,
  subscriberSchema,
];
