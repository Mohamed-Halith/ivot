import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { Reminder } from "@/types";

interface ReminderCardProps {
  reminder: Reminder;
  className?: string;
  featured?: boolean;
}

export function ReminderCard({ reminder, className, featured }: ReminderCardProps) {
  const href = `/reminders/${reminder.slug.current}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "glass-card gradient-border shimmer",
        "focus-visible:outline-2 focus-visible:outline-[var(--brand-gold)]",
        featured && "md:flex-row",
        className
      )}
      aria-label={`Read reminder: ${reminder.title}`}
    >
      {/* Cover */}
      <div
        className={cn("relative overflow-hidden", featured ? "h-52 md:h-auto md:w-2/5" : "h-44")}
      >
        {reminder.coverImage ? (
          <Image
            src={urlFor(reminder.coverImage).width(600).height(400).url()}
            alt={reminder.coverImage.alt ?? reminder.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--brand-green)]/30 to-[var(--surface-0)]">
            {reminder.arabicText && (
              <p
                lang="ar"
                dir="rtl"
                className="arabic line-clamp-3 px-6 text-center text-xl leading-loose text-[var(--brand-gold)]/20"
              >
                {reminder.arabicText}
              </p>
            )}
          </div>
        )}

        {/* Topic badge */}
        {reminder.topic && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--surface-0)]/80 px-2.5 py-1 text-[10px] font-semibold text-[var(--brand-gold)] backdrop-blur-sm">
              {reminder.topic.icon && <span aria-hidden="true">{reminder.topic.icon}</span>}
              {reminder.topic.titleTamil}
            </span>
          </div>
        )}

        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-0)]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className={cn(
            "text-foreground/90 leading-snug font-bold transition-colors duration-200 group-hover:text-[var(--brand-gold)]",
            featured ? "text-xl" : "text-base"
          )}
        >
          {reminder.title}
        </h3>

        {reminder.arabicText && (
          <p
            lang="ar"
            dir="rtl"
            className="arabic text-muted-foreground/50 line-clamp-2 text-[14px]"
          >
            {reminder.arabicText}
          </p>
        )}

        {reminder.tamilMeaning && (
          <p lang="ta" className="tamil text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {reminder.tamilMeaning}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-[var(--hairline)] pt-3">
          <time dateTime={reminder.publishedAt} className="text-muted-foreground/40 text-[11px]">
            {format(new Date(reminder.publishedAt), "MMM d, yyyy")}
          </time>
          {reminder.reference && (
            <span className="max-w-[130px] truncate text-[11px] font-medium text-[var(--brand-gold)]/60">
              {reminder.reference}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
