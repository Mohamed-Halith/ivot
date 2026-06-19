import { cn } from "@/lib/utils";

interface DuaBlockProps {
  label?: string;
  arabic?: string;
  transliteration?: string;
  tamil?: string;
  english?: string;
  className?: string;
}

export function DuaBlock({
  label,
  arabic,
  transliteration,
  tamil,
  english,
  className,
}: DuaBlockProps) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-xl border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/5 p-6",
        className
      )}
    >
      {label && (
        <p className="text-xs font-semibold tracking-widest text-[var(--brand-gold)] uppercase">
          دعاء · {label}
        </p>
      )}

      {arabic && (
        <p
          lang="ar"
          dir="rtl"
          className="arabic text-foreground text-center text-xl leading-loose md:text-2xl"
        >
          {arabic}
        </p>
      )}

      {transliteration && (
        <p className="text-muted-foreground text-center text-sm leading-relaxed italic">
          {transliteration}
        </p>
      )}

      {tamil && (
        <div>
          <p className="text-muted-foreground mb-1 text-xs font-medium">Tamil</p>
          <p lang="ta" className="tamil text-foreground text-sm leading-relaxed">
            {tamil}
          </p>
        </div>
      )}

      {english && (
        <div>
          <p className="text-muted-foreground mb-1 text-xs font-medium">English</p>
          <p lang="en" className="text-muted-foreground text-sm leading-relaxed italic">
            {english}
          </p>
        </div>
      )}
    </div>
  );
}
