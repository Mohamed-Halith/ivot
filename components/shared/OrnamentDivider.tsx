import { cn } from "@/lib/utils";

interface OrnamentDividerProps {
  className?: string;
}

export function OrnamentDivider({ className }: OrnamentDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 py-6", className)} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--brand-gold)]/40 to-transparent" />
      <span className="text-lg text-[var(--brand-gold)] select-none">✦</span>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--brand-gold)]/40 to-transparent" />
    </div>
  );
}
