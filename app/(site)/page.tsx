import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { ReminderCard } from "@/components/reminder/ReminderCard";
import { TopicCard } from "@/components/topic/TopicCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeaturedReminder, getLatestReminders } from "@/sanity/queries/reminders";
import { getAllTopics } from "@/sanity/queries/topics";
import { getSiteSettings } from "@/sanity/queries/settings";

export const metadata: Metadata = {
  title: "Ihsan: Voice of Truth | Qur'an & Hadith Reminders in Tamil",
  description:
    "A searchable library of Qur'an and Hadith reminders with Tamil meaning, reflection, and duas.",
};

export default async function HomePage() {
  const [settings, featuredReminder, latestReminders, topics] = await Promise.all([
    getSiteSettings(),
    getFeaturedReminder(),
    getLatestReminders(6),
    getAllTopics(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--surface-0)]">
        {/* Deep green radial behind */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 60%, rgba(26,60,52,0.55) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        {/* Gold glow top */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand-gold)]/20 to-transparent"
          aria-hidden="true"
        />

        {/* Floating large Arabic */}
        <p
          lang="ar"
          className="arabic animate-float pointer-events-none absolute top-[10%] right-[6%] text-[180px] leading-none text-white/[0.03] select-none md:text-[240px]"
          aria-hidden="true"
        >
          ب
        </p>
        <p
          lang="ar"
          className="arabic animate-float-alt pointer-events-none absolute bottom-[12%] left-[4%] text-[140px] leading-none text-white/[0.025] select-none md:text-[180px]"
          aria-hidden="true"
        >
          م
        </p>

        <div className="relative z-10 container mx-auto max-w-4xl px-4 pt-24 pb-32 text-center">
          {/* Eyebrow */}
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--hairline-gold)] bg-[var(--brand-gold-dim)] px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
            <span aria-hidden="true">✦</span>
            <span>Qur&apos;an · Hadith · Tamil</span>
            <span aria-hidden="true">✦</span>
          </div>

          {/* Display heading */}
          <h1
            className="animate-slide-up text-foreground mb-5 leading-[0.95] font-bold tracking-[-0.04em]"
            style={{ fontSize: "clamp(52px, 9vw, 112px)", animationDelay: "0.05s" }}
          >
            {settings?.brandName?.split(":")[0] ?? "Ihsan"}
          </h1>

          {/* Sub-heading */}
          <p
            className="animate-slide-up text-muted-foreground mb-4 text-lg font-light tracking-[0.15em] md:text-xl"
            style={{ animationDelay: "0.12s" }}
          >
            Voice of Truth
          </p>

          {/* Tamil tagline */}
          <p
            lang="ta"
            className="tamil animate-slide-up text-muted-foreground/70 mx-auto mb-10 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {settings?.tagline ?? "குர்ஆன் மற்றும் ஹதீஸ் — தமிழில் நினைவூட்டல்கள்"}
          </p>

          {/* CTAs */}
          <div
            className="animate-slide-up flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/reminders"
              className={cn(
                buttonVariants({ size: "lg" }),
                "btn-gold gap-2 rounded-xl px-8 text-sm font-bold"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Browse Reminders
            </Link>
            <Link
              href="/topics"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-[var(--hairline)] bg-[var(--surface-1)] px-8 text-sm backdrop-blur-sm transition-all hover:border-[var(--hairline-hover)] hover:bg-[var(--surface-2)]"
              )}
            >
              Explore Topics
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="text-muted-foreground/30 absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce flex-col items-center gap-1 md:flex">
          <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── Featured reminder ── */}
      {featuredReminder && (
        <AnimatedSection className="container mx-auto px-4 py-20 md:py-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-[var(--brand-gold)]/20 to-transparent" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--brand-gold)]/60 uppercase">
              Featured Reminder
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-[var(--brand-gold)]/20 to-transparent" />
          </div>
          <ReminderCard reminder={featuredReminder} featured />
        </AnimatedSection>
      )}

      {/* ── Topics bento ── */}
      {topics.length > 0 && (
        <section className="border-t border-[var(--hairline)] py-20 md:py-28">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-[var(--brand-gold)]/60 uppercase">
                  Browse
                </p>
                <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                  Topics
                </h2>
              </div>
              <Link
                href="/topics"
                className="group text-muted-foreground flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--brand-gold)]"
              >
                All topics
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </AnimatedSection>

            {/* Bento asymmetric grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {topics.slice(0, 6).map((topic, i) => (
                <AnimatedSection
                  key={topic._id}
                  delay={i * 0.05}
                  className={cn(
                    i === 0 && "sm:col-span-2 lg:col-span-2",
                    i === 3 && "sm:col-span-2 lg:col-span-1"
                  )}
                >
                  <TopicCard topic={topic} index={i} large={i === 0} className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Latest reminders ── */}
      {latestReminders.length > 0 && (
        <section className="border-t border-[var(--hairline)] py-20 md:py-28">
          <div className="container mx-auto px-4">
            <AnimatedSection className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-[var(--brand-gold)]/60 uppercase">
                  Latest
                </p>
                <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                  Reminders
                </h2>
              </div>
              <Link
                href="/reminders"
                className="group text-muted-foreground flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--brand-gold)]"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </AnimatedSection>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestReminders.map((reminder, i) => (
                <AnimatedSection key={reminder._id} delay={i * 0.06}>
                  <ReminderCard reminder={reminder} className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {latestReminders.length === 0 && !featuredReminder && (
        <section className="container mx-auto px-4 py-36 text-center">
          <div className="mx-auto max-w-sm space-y-5">
            <p
              lang="ar"
              className="arabic animate-float block text-5xl text-[var(--brand-gold)]/30"
            >
              إن شاء الله
            </p>
            <h2 className="text-foreground text-xl font-bold">Content coming soon</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The reminder library is being prepared. Subscribe below to be first to know.
            </p>
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ── */}
      <section
        id="newsletter"
        className="relative overflow-hidden border-t border-[var(--hairline)]"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(26,60,52,0.45) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-lg space-y-6 text-center">
            <p className="text-[10px] font-bold tracking-[0.25em] text-[var(--brand-gold)]/60 uppercase">
              Weekly Reminders
            </p>
            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
              Stay close to what matters
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              One curated reminder every week. No noise — just remembrance.
            </p>
            <div className="mx-auto max-w-sm">
              <NewsletterForm
                source="homepage"
                compact
                className="[&_input]:rounded-xl [&_input]:border-[var(--hairline)] [&_input]:bg-[var(--surface-1)]"
              />
            </div>
            <p lang="ar" className="arabic mt-4 text-xl text-[var(--brand-gold)]/20">
              آمين
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
