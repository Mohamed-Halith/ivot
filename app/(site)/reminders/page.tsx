import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllReminders } from "@/sanity/queries/reminders";
import { getAllTopics } from "@/sanity/queries/topics";
import { RemindersClient } from "./RemindersClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "All Reminders",
  description:
    "Browse all Qur'an and Hadith reminders with Tamil meaning. Filter by topic and search by keyword.",
};

export default async function RemindersPage() {
  const [reminders, topics] = await Promise.all([getAllReminders(), getAllTopics()]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page header */}
        <div className="mb-10 space-y-2">
          <h1 className="text-foreground text-3xl font-bold">Reminders</h1>
          <p className="text-muted-foreground">
            {reminders.length} reminder{reminders.length !== 1 ? "s" : ""} — search or filter by
            topic
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          }
        >
          <RemindersClient reminders={reminders} topics={topics} />
        </Suspense>
      </div>
    </div>
  );
}
