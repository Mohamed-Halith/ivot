"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";
import type { SearchIndexEntry, Topic } from "@/types";

const STATIC_PAGES = [
  {
    kind: "page" as const,
    title: "Home",
    description: "Qur'an & Hadith Reminders in Tamil",
    icon: "🏠",
    href: "/",
  },
  {
    kind: "page" as const,
    title: "Reminders",
    description: "Browse all reminders",
    icon: "📖",
    href: "/reminders",
  },
  {
    kind: "page" as const,
    title: "Topics",
    description: "Browse by topic",
    icon: "🏷️",
    href: "/topics",
  },
  {
    kind: "page" as const,
    title: "Duas",
    description: "Daily supplications",
    icon: "🤲",
    href: "/duas",
  },
  {
    kind: "page" as const,
    title: "About",
    description: "About Ihsan: Voice of Truth",
    icon: "ℹ️",
    href: "/about",
  },
];

type PageItem = {
  kind: "page";
  title: string;
  description: string;
  icon: string;
  href: string;
  idx: number;
};
type TopicItem = {
  kind: "topic";
  title: string;
  titleTamil?: string;
  icon?: string;
  href: string;
  idx: number;
};
type ReminderItem = {
  kind: "reminder";
  title: string;
  tamilMeaning?: string;
  arabicText?: string;
  topicTitle?: string;
  href: string;
  idx: number;
};
type PaletteItem = PageItem | TopicItem | ReminderItem;

type FuseItem =
  | { kind: "page"; title: string; description: string; icon: string; href: string }
  | { kind: "topic"; title: string; titleTamil?: string; icon?: string; href: string }
  | {
      kind: "reminder";
      title: string;
      tamilMeaning?: string;
      arabicText?: string;
      topicTitle?: string;
      href: string;
    };

interface CommandPaletteProps {
  reminders: SearchIndexEntry[];
  topics: Topic[];
}

export function CommandPalette({ reminders, topics }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const doOpen = useCallback(() => {
    setOpen(true);
    setSelectedIdx(0);
    setTimeout(() => inputRef.current?.focus(), 40);
  }, []);

  const doClose = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const allFuseItems = useMemo(
    (): FuseItem[] => [
      ...STATIC_PAGES,
      ...topics.map((t) => ({
        kind: "topic" as const,
        title: t.title,
        titleTamil: t.titleTamil,
        icon: t.icon,
        href: `/topics/${t.slug.current}`,
      })),
      ...reminders.map((r) => ({
        kind: "reminder" as const,
        title: r.title,
        tamilMeaning: r.tamilMeaning,
        arabicText: r.arabicText,
        topicTitle: r.topicTitle,
        href: `/reminders/${r.slug}`,
      })),
    ],
    [reminders, topics]
  );

  const fuse = useMemo(
    () =>
      new Fuse(allFuseItems, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "titleTamil", weight: 0.3 },
          { name: "tamilMeaning", weight: 0.4 },
          { name: "arabicText", weight: 0.2 },
          { name: "topicTitle", weight: 0.2 },
        ],
        threshold: 0.4,
      }),
    [allFuseItems]
  );

  const groups = useMemo((): { label: string; items: PaletteItem[] }[] => {
    let idx = 0;

    if (!query.trim()) {
      const pageItems: PaletteItem[] = STATIC_PAGES.map((p) => ({ ...p, idx: idx++ }));
      const topicItems: PaletteItem[] = topics.slice(0, 5).map((t) => ({
        kind: "topic" as const,
        title: t.title,
        titleTamil: t.titleTamil,
        icon: t.icon,
        href: `/topics/${t.slug.current}`,
        idx: idx++,
      }));
      return [
        { label: "PAGES", items: pageItems },
        ...(topicItems.length > 0 ? [{ label: "TOPICS", items: topicItems }] : []),
      ];
    }

    const hits = fuse.search(query).map((r) => r.item);
    const pages = hits.filter((h) => h.kind === "page");
    const topicHits = hits.filter((h) => h.kind === "topic");
    const reminderHits = hits.filter((h) => h.kind === "reminder").slice(0, 8);

    const makeItems = (raw: FuseItem[]): PaletteItem[] =>
      raw.map((item) => ({ ...item, idx: idx++ }) as PaletteItem);

    return [
      ...(pages.length > 0 ? [{ label: "PAGES", items: makeItems(pages) }] : []),
      ...(topicHits.length > 0 ? [{ label: "TOPICS", items: makeItems(topicHits) }] : []),
      ...(reminderHits.length > 0 ? [{ label: "REMINDERS", items: makeItems(reminderHits) }] : []),
    ];
  }, [query, fuse, topics]);

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const navigate = useCallback(
    (item: PaletteItem) => {
      router.push(item.href);
      doClose();
    },
    [router, doClose]
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          doClose();
        } else {
          doOpen();
        }
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        doClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems[selectedIdx];
        if (item) navigate(item);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [open, flatItems, selectedIdx, navigate, doOpen, doClose]);

  useEffect(() => {
    window.addEventListener("open-cmd-palette", doOpen);
    return () => window.removeEventListener("open-cmd-palette", doOpen);
  }, [doOpen]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>("[data-selected='true']");
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={doClose}
        aria-hidden="true"
      />

      <div
        className="border-border/60 bg-background relative w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="border-border/40 flex items-center gap-3 border-b px-4 py-3.5">
          <Search className="text-muted-foreground h-4 w-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder="Search reminders, topics, pages…"
            className="text-foreground placeholder:text-muted-foreground/60 flex-1 bg-transparent text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIdx(0);
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="border-border/60 bg-muted/50 text-muted-foreground hidden rounded border px-1.5 py-0.5 text-[10px] font-medium sm:inline-flex">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto overscroll-contain">
          {groups.length === 0 && query && (
            <div className="py-16 text-center">
              <p className="text-foreground font-semibold">No results for &quot;{query}&quot;</p>
              <p className="text-muted-foreground mt-1 text-sm">Try a different keyword</p>
            </div>
          )}

          {groups.map((group) => (
            <div key={group.label}>
              <div className="px-4 pt-3 pb-1">
                <span className="text-muted-foreground/50 text-[10px] font-bold tracking-widest uppercase">
                  {group.label}
                </span>
              </div>
              {group.items.map((item) => {
                const isSelected = item.idx === selectedIdx;
                return (
                  <button
                    key={item.href}
                    data-selected={isSelected}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelectedIdx(item.idx)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      isSelected ? "bg-[var(--brand-green)]/10" : "hover:bg-muted/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm",
                        item.kind === "page" &&
                          "bg-[var(--brand-green)]/15 text-[var(--brand-green)]",
                        item.kind === "topic" &&
                          "bg-[var(--brand-gold)]/15 text-[var(--brand-gold)]",
                        item.kind === "reminder" && "bg-muted/60 text-muted-foreground"
                      )}
                    >
                      {item.kind === "reminder"
                        ? "📖"
                        : (item.icon ?? (item.kind === "topic" ? "🏷️" : "📄"))}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-sm font-medium",
                          isSelected ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        {item.title}
                        {item.kind === "topic" && item.titleTamil && (
                          <span
                            lang="ta"
                            className="tamil text-muted-foreground ml-1.5 font-normal"
                          >
                            · {item.titleTamil}
                          </span>
                        )}
                      </span>
                      {item.kind === "page" && (
                        <span className="text-muted-foreground block truncate text-xs">
                          {item.description}
                        </span>
                      )}
                      {item.kind === "reminder" && item.tamilMeaning && (
                        <span
                          lang="ta"
                          className="tamil text-muted-foreground block truncate text-xs"
                        >
                          {item.tamilMeaning}
                        </span>
                      )}
                    </span>

                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        item.kind === "page" &&
                          "bg-[var(--brand-green)]/10 text-[var(--brand-green)]/70",
                        item.kind === "topic" &&
                          "bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]/70",
                        item.kind === "reminder" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.kind === "page" ? "Page" : item.kind === "topic" ? "Topic" : "Reminder"}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="border-border/40 flex items-center gap-4 border-t px-4 py-2.5">
          <div className="text-muted-foreground/50 flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <kbd className="border-border/50 bg-muted/50 rounded border px-1 py-0.5 text-[9px]">
                ↑↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border-border/50 bg-muted/50 rounded border px-1 py-0.5 text-[9px]">
                ↵
              </kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border-border/50 bg-muted/50 rounded border px-1 py-0.5 text-[9px]">
                ESC
              </kbd>
              close
            </span>
          </div>
          <div className="text-muted-foreground/40 ml-auto flex items-center gap-0.5 text-[11px]">
            <kbd className="border-border/50 bg-muted/50 rounded border px-1 py-0.5 text-[9px]">
              ⌘
            </kbd>
            <kbd className="border-border/50 bg-muted/50 rounded border px-1 py-0.5 text-[9px]">
              K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
