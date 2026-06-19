import Fuse, { type IFuseOptions } from "fuse.js";
import type { SearchIndexEntry } from "@/types";

// Upgrade path note: if the library grows past ~1000 reminders,
// replace this with Algolia (algolia.com) for server-side search.
// The SearchIndexEntry type stays the same — swap the implementation here.

const fuseOptions: IFuseOptions<SearchIndexEntry> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "tamilMeaning", weight: 0.25 },
    { name: "englishMeaning", weight: 0.15 },
    { name: "arabicText", weight: 0.1 },
    { name: "topicTitle", weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<SearchIndexEntry> | null = null;
let indexData: SearchIndexEntry[] = [];

export function buildSearchIndex(entries: SearchIndexEntry[]) {
  indexData = entries;
  fuseInstance = new Fuse(entries, fuseOptions);
}

export function searchReminders(query: string): SearchIndexEntry[] {
  if (!query.trim() || !fuseInstance) return indexData.slice(0, 20);
  return fuseInstance.search(query).map((r) => r.item);
}
