import { OrnamentDivider } from "@/components/shared/OrnamentDivider";
import { cn } from "@/lib/utils";

interface VerseBlockProps {
  arabic?: string;
  reference?: string;
  tamilMeaning?: string;
  englishMeaning?: string;
  className?: string;
}

export function VerseBlock({
  arabic,
  reference,
  tamilMeaning,
  englishMeaning,
  className,
}: VerseBlockProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "via-background bg-gradient-to-br from-[var(--brand-green)]/5 to-[var(--brand-gold)]/3",
        "border-border/50 border",
        "space-y-8 p-8 md:p-12",
        className
      )}
    >
      {/* Decorative corner ornament */}
      <div
        className="pointer-events-none absolute top-4 right-4 text-4xl text-[var(--brand-gold)]/20 select-none"
        aria-hidden="true"
      >
        ٭
      </div>
      <div
        className="pointer-events-none absolute bottom-4 left-4 text-4xl text-[var(--brand-gold)]/20 select-none"
        aria-hidden="true"
      >
        ٭
      </div>

      {arabic && (
        <div className="space-y-5 text-center">
          {/* Bismillah-style top ornament */}
          <div className="mb-2 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--brand-gold)]/40" />
            <span className="text-xl text-[var(--brand-gold)]" aria-hidden="true">
              ✦
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--brand-gold)]/40" />
          </div>

          <p
            lang="ar"
            dir="rtl"
            className="arabic-display text-foreground text-3xl font-medium md:text-4xl lg:text-5xl"
          >
            {arabic}
          </p>

          {reference && (
            <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[var(--brand-gold)]/8 px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--brand-gold)] uppercase">
              — {reference}
            </p>
          )}
        </div>
      )}

      {(tamilMeaning || englishMeaning) && arabic && <OrnamentDivider />}

      {tamilMeaning && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
            Tamil · தமிழ்
          </p>
          <p
            lang="ta"
            className="tamil text-foreground border-l-2 border-[var(--brand-gold)]/40 pl-5 text-base leading-relaxed md:text-lg"
          >
            {tamilMeaning}
          </p>
        </div>
      )}

      {englishMeaning && (
        <div className="space-y-3">
          <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
            English
          </p>
          <p
            lang="en"
            className="text-muted-foreground border-border border-l-2 pl-5 text-base leading-relaxed italic"
          >
            {englishMeaning}
          </p>
        </div>
      )}
    </div>
  );
}
