import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { VerseBlock } from "@/components/reminder/VerseBlock";
import { DuaBlock } from "@/components/dua/DuaBlock";
import { ReelEmbed } from "@/components/shared/ReelEmbed";
import { ShareBar } from "@/components/shared/ShareBar";
import { ReminderCard } from "@/components/reminder/ReminderCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { Badge } from "@/components/ui/badge";
import {
  getReminderBySlug,
  getRelatedReminders,
  getAllReminderSlugs,
} from "@/sanity/queries/reminders";
import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl } from "@/lib/utils";
import { PortableTextRenderer } from "@/components/shared/PortableTextRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllReminderSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reminder = await getReminderBySlug(slug);
  if (!reminder) return {};

  const title = reminder.seo?.metaTitle ?? reminder.title;
  const description =
    reminder.seo?.metaDescription ??
    (reminder.tamilMeaning ? reminder.tamilMeaning.slice(0, 160) : reminder.title);
  const ogImageUrl = reminder.seo?.ogImage
    ? urlFor(reminder.seo.ogImage).width(1200).height(630).url()
    : absoluteUrl(`/og?slug=${slug}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: reminder.publishedAt,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImageUrl] },
  };
}

export default async function ReminderDetailPage({ params }: Props) {
  const { slug } = await params;
  const reminder = await getReminderBySlug(slug);
  if (!reminder) notFound();

  const related = await getRelatedReminders(reminder.topic._id, reminder._id, 3);
  const pageUrl = absoluteUrl(`/reminders/${slug}`);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: reminder.title,
    datePublished: reminder.publishedAt,
    author: { "@type": "Organization", name: "Ihsan: Voice of Truth" },
    publisher: {
      "@type": "Organization",
      name: "Ihsan: Voice of Truth",
      url: absoluteUrl("/"),
    },
    description: reminder.tamilMeaning?.slice(0, 160) ?? reminder.title,
    url: pageUrl,
    ...(reminder.coverImage && {
      image: urlFor(reminder.coverImage).width(1200).height(630).url(),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto max-w-2xl px-4 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mb-8 flex items-center gap-1 text-xs"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link href="/reminders" className="hover:text-foreground transition-colors">
            Reminders
          </Link>
          {reminder.topic && (
            <>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link
                href={`/topics/${reminder.topic.slug.current}`}
                className="hover:text-foreground transition-colors"
              >
                {reminder.topic.title}
              </Link>
            </>
          )}
        </nav>

        {/* Header */}
        <header className="mb-10 space-y-4">
          {reminder.topic && (
            <Link href={`/topics/${reminder.topic.slug.current}`}>
              <Badge variant="secondary" className="w-fit">
                {reminder.topic.icon && (
                  <span className="mr-1" aria-hidden="true">
                    {reminder.topic.icon}
                  </span>
                )}
                {reminder.topic.titleTamil} · {reminder.topic.title}
              </Badge>
            </Link>
          )}

          <h1 className="text-foreground text-3xl leading-tight font-bold md:text-4xl">
            {reminder.title}
          </h1>

          <time dateTime={reminder.publishedAt} className="text-muted-foreground text-sm">
            {format(new Date(reminder.publishedAt), "MMMM d, yyyy")}
          </time>
        </header>

        {/* Cover image */}
        {reminder.coverImage && (
          <div className="bg-muted relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={urlFor(reminder.coverImage).width(800).height(450).url()}
              alt={reminder.coverImage.alt ?? reminder.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* Verse block — the heart of the page */}
        <VerseBlock
          arabic={reminder.arabicText}
          reference={reminder.reference}
          tamilMeaning={reminder.tamilMeaning}
          englishMeaning={reminder.englishMeaning}
          className="mb-10"
        />

        {/* Reflection */}
        {reminder.reflection && reminder.reflection.length > 0 && (
          <section className="prose prose-gray dark:prose-invert mb-10 max-w-none">
            <h2 className="text-muted-foreground not-prose mb-4 text-xs font-semibold tracking-widest uppercase">
              Reflection
            </h2>
            <PortableTextRenderer value={reminder.reflection} />
          </section>
        )}

        {/* Dua */}
        {reminder.dua && (reminder.dua.arabic || reminder.dua.tamil) && (
          <section className="mb-10">
            <h2 className="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
              Dua / துஆ
            </h2>
            <DuaBlock
              arabic={reminder.dua.arabic}
              transliteration={reminder.dua.transliteration}
              tamil={reminder.dua.tamil}
              english={reminder.dua.english}
            />
          </section>
        )}

        {/* Reel embed */}
        {reminder.reelEmbed &&
          (reminder.reelEmbed.instagramUrl || reminder.reelEmbed.youtubeUrl) && (
            <section className="mb-10">
              <ReelEmbed
                instagramUrl={reminder.reelEmbed.instagramUrl}
                youtubeUrl={reminder.reelEmbed.youtubeUrl}
              />
            </section>
          )}

        {/* Share bar */}
        <div className="border-border mb-10 border-t py-6">
          <ShareBar url={pageUrl} title={reminder.title} arabicText={reminder.arabicText} />
        </div>

        {/* Related reminders */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-foreground mb-5 text-lg font-semibold">
              More from {reminder.topic?.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <ReminderCard key={r._id} reminder={r} />
              ))}
            </div>
          </section>
        )}

        {/* Subscribe CTA */}
        <section className="space-y-4 rounded-xl bg-[var(--brand-green)] p-8 text-center text-white">
          <h2 className="text-xl font-semibold">Never miss a reminder</h2>
          <p className="text-sm text-white/75">
            Get weekly Qur&apos;an &amp; Hadith reminders in your inbox.
          </p>
          <div className="mx-auto max-w-sm">
            <NewsletterForm
              source={`reminder-${slug}`}
              compact
              className="[&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/50"
            />
          </div>
        </section>
      </article>
    </>
  );
}
