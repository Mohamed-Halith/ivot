import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ReminderCard } from "@/components/reminder/ReminderCard";
import { getTopicBySlug, getAllTopicSlugs } from "@/sanity/queries/topics";
import { getRemindersByTopic } from "@/sanity/queries/reminders";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — ${topic.titleTamil}`,
    description: topic.description ?? `Reminders about ${topic.title} from the Qur'an and Hadith`,
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const [topic, reminders] = await Promise.all([getTopicBySlug(slug), getRemindersByTopic(slug)]);
  if (!topic) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground mb-8 flex items-center gap-1 text-xs"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href="/topics" className="hover:text-foreground transition-colors">
          Topics
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-foreground">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-3">
          {topic.icon && (
            <span className="text-4xl" aria-hidden="true">
              {topic.icon}
            </span>
          )}
          <div>
            <h1 className="text-foreground text-3xl font-bold">{topic.title}</h1>
            <p lang="ta" className="tamil text-muted-foreground text-lg">
              {topic.titleTamil}
            </p>
          </div>
        </div>
        {topic.description && <p className="text-muted-foreground max-w-xl">{topic.description}</p>}
        <p className="text-muted-foreground text-sm">
          {reminders.length} reminder{reminders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Reminders grid */}
      {reminders.length === 0 ? (
        <div className="text-muted-foreground py-20 text-center">
          <p className="mb-3 text-4xl">🌙</p>
          <p>No reminders yet for this topic. Coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <ReminderCard key={reminder._id} reminder={reminder} />
          ))}
        </div>
      )}
    </div>
  );
}
