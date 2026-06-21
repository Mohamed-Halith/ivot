import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types";

interface TopicCardProps {
  topic: Topic;
  className?: string;
  index?: number;
  large?: boolean;
}

export function TopicCard({ topic, className, large = false }: TopicCardProps) {
  return (
    <Link
      href={`/topics/${topic.slug.current}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "glass-card gradient-border",
        "border border-[var(--hairline)]",
        large ? "min-h-[200px] p-7" : "min-h-[150px] p-5",
        "transition-all duration-300",
        "focus-visible:outline-2 focus-visible:outline-[var(--brand-gold)]",
        className
      )}
      aria-label={`Browse ${topic.title} reminders`}
    >
      {/* Subtle green glow behind on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(26,60,52,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          {topic.icon && (
            <span
              className="block text-3xl transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              {topic.icon}
            </span>
          )}
          {topic.reminderCount !== undefined && topic.reminderCount > 0 && (
            <span className="text-muted-foreground/50 rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[10px] font-semibold">
              {topic.reminderCount}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3
            className={cn(
              "text-foreground/90 font-bold transition-colors duration-200 group-hover:text-[var(--brand-gold)]",
              large ? "text-lg" : "text-sm"
            )}
          >
            {topic.title}
          </h3>
          {topic.titleTamil && (
            <p
              lang="ta"
              className={cn("tamil text-muted-foreground/50", large ? "text-sm" : "text-xs")}
            >
              {topic.titleTamil}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
