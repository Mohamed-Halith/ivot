import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types";

// Each topic gets a rich gradient — cycles through this array
const topicGradients = [
  "from-[#1A3C34] to-[#343A40]",
  "from-[#212529] to-[#1A3C34]/80",
  "from-[#343A40] to-[#495057]",
  "from-[#1A3C34]/90 to-[#2D6A5E]/70",
  "from-[#495057] to-[#212529]",
  "from-[#343A40] to-[#1A3C34]/60",
  "from-[#212529] to-[#343A40]",
  "from-[#2D6A5E]/80 to-[#212529]",
];

interface TopicCardProps {
  topic: Topic;
  className?: string;
  index?: number;
}

export function TopicCard({ topic, className, index = 0 }: TopicCardProps) {
  const gradient = topicGradients[index % topicGradients.length];

  return (
    <Link
      href={`/topics/${topic.slug.current}`}
      className={cn(
        "group relative flex flex-col items-center justify-center overflow-hidden",
        "min-h-[160px] rounded-2xl p-6 text-center",
        "bg-gradient-to-br",
        gradient,
        "transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/20",
        "border border-white/8",
        "focus-visible:outline-2 focus-visible:outline-[var(--brand-gold)]",
        className
      )}
      aria-label={`Browse ${topic.title} reminders`}
    >
      {/* Subtle inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[var(--brand-gold)]/0 transition-colors duration-300 group-hover:bg-[var(--brand-gold)]/5" />

      <div className="relative space-y-2.5">
        {topic.icon && (
          <span
            className="block text-4xl transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            {topic.icon}
          </span>
        )}
        <h3 className="text-[15px] font-bold text-white transition-colors duration-200 group-hover:text-[var(--brand-gold)]">
          {topic.title}
        </h3>
        <p lang="ta" className="tamil text-sm text-white/60">
          {topic.titleTamil}
        </p>
        {topic.reminderCount !== undefined && topic.reminderCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
            {topic.reminderCount}
          </span>
        )}
      </div>
    </Link>
  );
}
