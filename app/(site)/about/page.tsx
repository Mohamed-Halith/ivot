import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { getSiteSettings } from "@/sanity/queries/settings";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ihsan: Voice of Truth — a Tamil Islamic reminders brand bringing the Qur'an and Hadith closer to Tamil speakers.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-16">
        {/* About */}
        <section className="space-y-6">
          <h1 className="text-foreground text-3xl font-bold">About</h1>

          <div className="space-y-4 rounded-xl bg-[var(--brand-green)] p-8 text-white">
            <p lang="ar" dir="rtl" className="arabic text-center text-2xl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-center text-sm text-white/80">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Ihsan: Voice of Truth</strong> is a Tamil Islamic
              reminders brand dedicated to bringing the wisdom of the Qur&apos;an and Hadith closer
              to Tamil-speaking Muslims. Our mission is simple: make authentic Islamic knowledge
              accessible, beautiful, and shareable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every reminder on this site is crafted with care — Arabic text, Tamil meaning, and a
              short reflection to help you internalize the lesson and carry it into your daily life.
            </p>
            <p lang="ta" className="tamil text-muted-foreground leading-relaxed">
              குர்ஆன் மற்றும் ஹதீஸின் வழிகாட்டுதலை தமிழில் கொண்டு சேர்க்கும் ஒரு சிறிய முயற்சி.
              அல்லாஹ் இதை ஏற்றுக்கொள்வானாக.
            </p>
          </div>
        </section>

        {/* Niyyah */}
        <section className="space-y-4 rounded-xl border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/5 p-8">
          <h2 className="text-foreground text-lg font-semibold">Our Intention / நிய்யத்</h2>
          <p className="text-muted-foreground leading-relaxed">
            This project is built purely for the sake of Allah. We ask that every reminder shared,
            every subscriber who grows in their deen, and every person who remembers Allah because
            of this work — be a source of sadaqah jariyah (ongoing reward).
          </p>
          <p lang="ar" dir="rtl" className="arabic text-foreground text-center text-lg">
            اللَّهُمَّ تَقَبَّلْ مِنَّا
          </p>
          <p className="text-muted-foreground text-center text-sm">O Allah, accept from us. آمين</p>
        </section>

        {/* Social */}
        <section className="space-y-5">
          <h2 className="text-foreground text-lg font-semibold">Follow us</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            )}
            {settings?.youtubeUrl && (
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <YoutubeIcon className="h-4 w-4" />
                YouTube
              </a>
            )}
            <Link
              href="/reminders"
              className={cn(
                buttonVariants(),
                "gap-2 bg-[var(--brand-green)] text-white hover:bg-[var(--brand-green-light)]"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Browse reminders
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="space-y-4">
          <h2 className="text-foreground text-lg font-semibold">Subscribe for weekly reminders</h2>
          <p className="text-muted-foreground text-sm">
            No spam — just one curated reminder per week, straight to your inbox.
          </p>
          <NewsletterForm source="about-page" className="max-w-sm" />
        </section>
      </div>
    </div>
  );
}
