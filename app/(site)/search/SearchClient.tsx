"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchBox } from "@/components/shared/SearchBox";
import { buildSearchIndex, searchReminders } from "@/lib/search";
import { cn } from "@/lib/utils";
import type { SearchIndexEntry } from "@/types";

interface SearchClientProps {
  index: SearchIndexEntry[];
}

export function SearchClient({ index }: SearchClientProps) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);

  // Build the search index once
  useEffect(() => {
    buildSearchIndex(index);
  }, [index]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchReminders(query);
  }, [query]);

  return (
    <div className="space-y-8">
      <SearchBox
        onSearch={setQuery}
        autoFocus
        placeholder="Search reminders in Tamil, Arabic, English…"
        className="w-full"
      />

      {query && (
        <p className="text-muted-foreground text-sm">
          {results.length === 0 ? (
            <span>
              No results found for{" "}
              <span className="text-foreground font-semibold">&quot;{query}&quot;</span>
            </span>
          ) : (
            <span>
              <span className="text-foreground font-semibold">{results.length}</span> result
              {results.length !== 1 ? "s" : ""} for{" "}
              <span className="text-foreground font-semibold">&quot;{query}&quot;</span>
            </span>
          )}
        </p>
      )}

      {results.length > 0 && (
        <ul className="space-y-3" role="list">
          {results.map((entry, i) => (
            <li
              key={entry.slug}
              className="reveal in-view"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <Link
                href={`/reminders/${entry.slug}`}
                className={cn(
                  "group border-border/60 flex flex-col gap-2 rounded-2xl border p-5",
                  "glass-card gradient-border shimmer",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/6",
                  "focus-visible:outline-2 focus-visible:outline-[var(--brand-gold)]"
                )}
              >
                <span className="text-foreground font-bold transition-colors group-hover:text-[var(--brand-gold)]">
                  {entry.title}
                </span>
                {entry.topicTitle && (
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--brand-gold)]/8 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--brand-gold)]/70">
                    {entry.topicTitle}
                  </span>
                )}
                {entry.tamilMeaning && (
                  <span
                    lang="ta"
                    className="tamil text-muted-foreground line-clamp-2 text-sm leading-relaxed"
                  >
                    {entry.tamilMeaning}
                  </span>
                )}
                {entry.arabicText && (
                  <span
                    lang="ar"
                    dir="rtl"
                    className="arabic line-clamp-1 block text-right text-sm text-[var(--brand-gold)]/50"
                  >
                    {entry.arabicText}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!query && (
        <div className="space-y-4 py-20 text-center">
          <div className="animate-float inline-block text-5xl">🔍</div>
          <p className="text-foreground font-semibold">Search the library</p>
          <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed">
            Search by title, Arabic text, Tamil meaning, or topic
          </p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="space-y-4 py-20 text-center">
          <div className="text-5xl">🌿</div>
          <p className="text-foreground font-semibold">No results found</p>
          <p className="text-muted-foreground text-sm">
            Try a different keyword or browse by topic
          </p>
          <Link
            href="/topics"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--brand-gold)] hover:underline"
          >
            Browse topics →
          </Link>
        </div>
      )}
    </div>
  );
}
