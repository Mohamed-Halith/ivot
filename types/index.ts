// All shared TypeScript types for the Ihsan project

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface Topic {
  _id: string;
  _type: "topic";
  title: string;
  titleTamil: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  order?: number;
  coverImage?: SanityImage;
  reminderCount?: number;
}

export interface DuaBlock {
  arabic?: string;
  transliteration?: string;
  tamil?: string;
  english?: string;
}

export interface ReelEmbed {
  instagramUrl?: string;
  youtubeUrl?: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Reminder {
  _id: string;
  _type: "reminder";
  title: string;
  slug: { current: string };
  topic: Topic;
  arabicText?: string;
  reference?: string;
  tamilMeaning?: string;
  englishMeaning?: string;
  reflection?: PortableTextBlock[];
  dua?: DuaBlock;
  reelEmbed?: ReelEmbed;
  coverImage?: SanityImage;
  publishedAt: string;
  featured?: boolean;
  seo?: SeoFields;
}

export interface DuaCollection {
  _id: string;
  _type: "duaCollection";
  title: string;
  slug: { current: string };
  description?: string;
  duas: DuaBlock[];
  coverImage?: SanityImage;
}

export interface SiteSettings {
  _id: string;
  brandName: string;
  tagline: string;
  logo?: SanityImage;
  bio?: PortableTextBlock[];
  instagramUrl?: string;
  youtubeUrl?: string;
  defaultOgImage?: SanityImage;
  footerText?: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  confirmed: boolean;
  createdAt: string;
  source?: string;
}

// Portable Text block type (simplified)
export interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{ _type: string; _key: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
}

// Search index entry
export interface SearchIndexEntry {
  slug: string;
  title: string;
  arabicText?: string;
  tamilMeaning?: string;
  englishMeaning?: string;
  topicTitle?: string;
}

// Newsletter form
export interface NewsletterFormValues {
  email: string;
  name?: string;
}
