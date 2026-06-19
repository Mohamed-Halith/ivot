"use client";
import { useState, useMemo } from "react";
import { SearchBox } from "@/components/shared/SearchBox";
import { ReminderCard } from "@/components/reminder/ReminderCard";
import { buildSearchIndex, searchReminders } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { Reminder, Topic } from "@/types";

interface RemindersClientProps {
  reminders: Reminder[];
  topics: Topic[];
}

export function RemindersClient({ reminders, topics }: RemindersClientProps) {
  const [query, setQuery] = useState("");
  const [activeTopicSlug, setActiveTopicSlug] = useState<string | null>(null);

  useMemo(() => {
    buildSearchIndex(
      reminders.map((r) => ({
        slug: r.slug.current,
        title: r.title,
        arabicText: r.arabicText,
        tamilMeaning: r.tamilMeaning,
        englishMeaning: r.englishMeaning,
        topicTitle: r.topic?.title,
      }))
    );
  }, [reminders]);

  const filtered = useMemo(() => {
    let result = reminders;
    if (activeTopicSlug) result = result.filter((r) => r.topic?.slug.current === activeTopicSlug);
    if (query.trim()) {
      const hits = new Set(searchReminders(query).map((r) => r.slug));
      result = result.filter((r) => hits.has(r.slug.current));
    }
    return result;
  }, [reminders, activeTopicSlug, query]);

  return (
    <div className="space-y-8">
      {/* Search */}
      <SearchBox
        onSearch={setQuery}
        placeholder="Search in Tamil, Arabic, English…"
        className="max-w-xl"
      />

      {/* Topic filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {[
          { slug: null, title: "All", icon: "🌟" },
          ...topics.map((t) => ({ slug: t.slug.current, title: t.title, icon: t.icon })),
        ].map((item) => {
          const active = activeTopicSlug === item.slug;
          return (
            <button
              key={item.slug ?? "all"}
              onClick={() => setActiveTopicSlug(active ? null : item.slug)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                active
                  ? "border-[var(--brand-green)] bg-[var(--brand-green)] text-white shadow-md"
                  : "text-muted-foreground border-border hover:text-foreground bg-transparent hover:border-[var(--brand-gold)]/50"
              )}
            >
              {item.icon && (
                <span aria-hidden="true" className="text-[13px]">
                  {item.icon}
                </span>
              )}
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="text-muted-foreground text-sm">
        <span className="text-foreground font-semibold">{filtered.length}</span> of{" "}
        {reminders.length} reminders
        {activeTopicSlug && (
          <span> in {topics.find((t) => t.slug.current === activeTopicSlug)?.title}</span>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="space-y-4 py-24 text-center">
          <p className="text-5xl">🔍</p>
          <p className="text-foreground font-semibold">No reminders found</p>
          <p className="text-muted-foreground text-sm">Try a different keyword or topic</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((reminder) => (
            <ReminderCard key={reminder._id} reminder={reminder} />
          ))}
        </div>
      )}
    </div>
  );
}
