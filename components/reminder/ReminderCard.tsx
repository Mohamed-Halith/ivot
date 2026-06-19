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
        "group border-border/60 flex flex-col overflow-hidden rounded-2xl border",
        "glass-card gradient-border shimmer",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8",
        "focus-visible:outline-2 focus-visible:outline-[var(--brand-gold)]",
        featured && "md:flex-row",
        className
      )}
      aria-label={`Read reminder: ${reminder.title}`}
    >
      {/* Cover image / placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-[var(--brand-green)]/20 to-[var(--brand-green)]/5",
          featured ? "h-52 md:h-auto md:w-2/5" : "h-44"
        )}
      >
        {reminder.coverImage ? (
          <Image
            src={urlFor(reminder.coverImage).width(600).height(400).url()}
            alt={reminder.coverImage.alt ?? reminder.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {reminder.arabicText && (
              <p
                lang="ar"
                dir="rtl"
                className="arabic line-clamp-3 px-6 text-center text-2xl leading-loose text-[var(--brand-gold)]/30"
              >
                {reminder.arabicText}
              </p>
            )}
          </div>
        )}
        {/* Topic badge overlay */}
        {reminder.topic && (
          <div className="absolute top-3 left-3">
            <span className="bg-background/80 text-foreground border-border/50 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
              {reminder.topic.icon && <span aria-hidden="true">{reminder.topic.icon}</span>}
              {reminder.topic.titleTamil}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3
          className={cn(
            "text-foreground leading-snug font-bold transition-colors duration-200",
            "group-hover:text-[var(--brand-gold)]",
            featured ? "text-xl" : "text-base"
          )}
        >
          {reminder.title}
        </h3>

        {reminder.arabicText && (
          <p
            lang="ar"
            dir="rtl"
            className="arabic text-muted-foreground/70 line-clamp-2 text-[15px]"
          >
            {reminder.arabicText}
          </p>
        )}

        {reminder.tamilMeaning && (
          <p lang="ta" className="tamil text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {reminder.tamilMeaning}
          </p>
        )}

        <div className="border-border/40 mt-auto flex items-center justify-between border-t pt-3">
          <time dateTime={reminder.publishedAt} className="text-muted-foreground/60 text-[11px]">
            {format(new Date(reminder.publishedAt), "MMM d, yyyy")}
          </time>
          {reminder.reference && (
            <span className="max-w-[130px] truncate text-[11px] font-medium text-[var(--brand-gold)]/70">
              {reminder.reference}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
