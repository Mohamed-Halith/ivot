import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { ReminderCard } from "@/components/reminder/ReminderCard";
import { TopicCard } from "@/components/topic/TopicCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { OrnamentDivider } from "@/components/shared/OrnamentDivider";
import { Badge } from "@/components/ui/badge";
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
      <section className="bg-hero-pattern relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-[var(--brand-green)]">
        {/* Floating decorative orbs */}
        <div
          className="animate-float pointer-events-none absolute top-[15%] left-[8%] h-64 w-64 rounded-full bg-[var(--brand-gold)]/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-float-alt pointer-events-none absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-[var(--brand-green-light)]/15 blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative floating Arabic chars */}
        <div
          className="arabic animate-float pointer-events-none absolute top-[12%] right-[12%] text-[120px] font-bold text-white/5 select-none"
          aria-hidden="true"
        >
          ب
        </div>
        <div
          className="arabic animate-float-alt pointer-events-none absolute bottom-[15%] left-[8%] text-[90px] font-bold text-white/5 select-none"
          aria-hidden="true"
        >
          م
        </div>

        <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center text-white">
          {/* Eyebrow */}
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--brand-gold)] uppercase">
            <span>✦</span>
            <span>Qur&apos;an &amp; Hadith · Tamil</span>
            <span>✦</span>
          </div>

          {/* Main headline */}
          <h1 className="animate-slide-up mb-3 text-5xl leading-[1.05] font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            {settings?.brandName?.split(":")[0] ?? "Ihsan"}
          </h1>
          <p
            className="animate-slide-up mb-6 text-xl font-light text-white/50 md:text-2xl"
            style={{ animationDelay: "0.1s" }}
          >
            Voice of Truth
          </p>

          {/* Tamil tagline */}
          <p
            lang="ta"
            className="tamil animate-slide-up mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
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
                "gap-2 rounded-xl bg-[var(--brand-gold)] px-8 font-bold text-[#1a1a1a] shadow-[var(--brand-gold)]/20 shadow-lg transition-all hover:scale-[1.02] hover:bg-[var(--brand-gold-light)] hover:shadow-[var(--brand-gold)]/30"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Browse Reminders
            </Link>
            <Link
              href="/topics"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-xl border-white/20 px-8 text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white/40 hover:bg-white/10"
              )}
            >
              Explore Topics
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1 text-white/30">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Featured ── */}
      {featuredReminder && (
        <AnimatedSection className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-7 flex items-center gap-3">
            <div className="bg-border/60 h-px max-w-8 flex-1" />
            <Badge className="border-[var(--brand-gold)]/25 bg-[var(--brand-gold)]/15 px-3 font-semibold text-[var(--brand-gold)]">
              ⭐ Featured Reminder
            </Badge>
          </div>
          <ReminderCard reminder={featuredReminder} featured />
        </AnimatedSection>
      )}

      {/* ── Topics ── */}
      {topics.length > 0 && (
        <AnimatedSection as="section" className="border-border/50 border-t py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
                  Explore
                </p>
                <h2 className="text-foreground text-2xl font-bold md:text-3xl">Browse by Topic</h2>
              </div>
              <Link
                href="/topics"
                className="text-muted-foreground group flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--brand-gold)]"
              >
                All topics
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {topics.slice(0, 6).map((topic, i) => (
                <AnimatedSection key={topic._id} delay={`reveal-delay-${Math.min(i + 1, 5)}`}>
                  <TopicCard topic={topic} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <OrnamentDivider className="container mx-auto px-4" />

      {/* ── Latest Reminders ── */}
      {latestReminders.length > 0 && (
        <AnimatedSection as="section" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
                  Fresh
                </p>
                <h2 className="text-foreground text-2xl font-bold md:text-3xl">Latest Reminders</h2>
              </div>
              <Link
                href="/reminders"
                className="text-muted-foreground group flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--brand-gold)]"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestReminders.map((reminder, i) => (
                <AnimatedSection key={reminder._id} delay={`reveal-delay-${Math.min(i + 1, 5)}`}>
                  <ReminderCard reminder={reminder} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Empty state */}
      {latestReminders.length === 0 && !featuredReminder && (
        <section className="container mx-auto px-4 py-28 text-center">
          <div className="mx-auto max-w-sm space-y-5">
            <div className="animate-float inline-block text-6xl">🌙</div>
            <h2 className="text-foreground text-xl font-bold">Coming soon</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The reminder library is being prepared with love.
              <br />
              Subscribe below to be first to know.
            </p>
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section
        id="newsletter"
        className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-green)] via-[#1a3c34] to-[#212529]"
      >
        <div className="bg-hero-pattern absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <div className="mx-auto max-w-lg space-y-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Weekly Reminders
            </div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Stay connected with Allah</h2>
            <p className="leading-relaxed text-white/60">
              One curated reminder every week. No spam, just remembrance.
            </p>
            <div className="mx-auto max-w-sm">
              <NewsletterForm
                source="homepage"
                compact
                className="[&_input]:rounded-xl [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/40"
              />
            </div>
            <p lang="ar" className="arabic mt-4 text-xl text-[var(--brand-gold)]/50">
              آمين
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
