import { describe, it, expect, beforeEach } from "vitest";
import { buildSearchIndex, searchReminders } from "@/lib/search";
import type { SearchIndexEntry } from "@/types";

const sampleEntries: SearchIndexEntry[] = [
  {
    slug: "solitude",
    title: "தனிமை — Solitude",
    tamilMeaning: "தனிமையில் அல்லாஹ்வை நினைவு கூர்",
    englishMeaning: "Remember Allah in solitude",
    topicTitle: "Tawakkul",
  },
  {
    slug: "prayer",
    title: "தொழுகை — Prayer",
    tamilMeaning: "தொழுகை கடமை",
    englishMeaning: "Prayer is obligatory",
    topicTitle: "Salah",
  },
  {
    slug: "anger",
    title: "கோபம் — Anger",
    tamilMeaning: "கோபத்தை கட்டுப்படுத்து",
    englishMeaning: "Control your anger",
    topicTitle: "Character",
  },
];

describe("Search index", () => {
  beforeEach(() => buildSearchIndex(sampleEntries));

  it("returns all entries when query is empty", () => {
    const results = searchReminders("");
    expect(results.length).toBeGreaterThan(0);
  });

  it("finds by English keyword", () => {
    const results = searchReminders("prayer");
    expect(results.some((r) => r.slug === "prayer")).toBe(true);
  });

  it("finds by Tamil keyword", () => {
    const results = searchReminders("தனிமை");
    expect(results.some((r) => r.slug === "solitude")).toBe(true);
  });

  it("returns empty for unmatched query", () => {
    const results = searchReminders("xyzzy1234notarealword");
    expect(results).toHaveLength(0);
  });
});
