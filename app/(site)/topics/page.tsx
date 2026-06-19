import type { Metadata } from "next";
import { TopicCard } from "@/components/topic/TopicCard";
import { getAllTopics } from "@/sanity/queries/topics";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Browse Islamic reminders by topic — Salah, Patience, Anger, Pride, Dua, Tawakkul and more.",
};

export default async function TopicsPage() {
  const topics = await getAllTopics();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-foreground mb-2 text-3xl font-bold">Topics</h1>
        <p className="text-muted-foreground">
          {topics.length} topic{topics.length !== 1 ? "s" : ""} — choose one to explore
        </p>
      </div>

      {topics.length === 0 ? (
        <div className="text-muted-foreground py-20 text-center">
          <p className="mb-3 text-4xl">📚</p>
          <p>Topics are being added — check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {topics.map((topic) => (
            <TopicCard key={topic._id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}
