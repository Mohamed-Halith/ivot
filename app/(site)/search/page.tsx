import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";
import { getSearchIndex } from "@/sanity/queries/reminders";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all Qur'an and Hadith reminders in Tamil, Arabic, and English.",
};

export default async function SearchPage() {
  const index = await getSearchIndex();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-foreground text-3xl font-bold">Search</h1>
          <p className="text-muted-foreground">
            Search in Tamil, Arabic, or English across {index.length} reminders.
          </p>
        </div>
        <Suspense>
          <SearchClient index={index} />
        </Suspense>
      </div>
    </div>
  );
}
