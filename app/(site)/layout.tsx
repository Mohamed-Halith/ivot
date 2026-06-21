import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { getSiteSettings } from "@/sanity/queries/settings";
import { getSearchIndex } from "@/sanity/queries/reminders";
import { getAllTopics } from "@/sanity/queries/topics";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, reminders, topics] = await Promise.all([
    getSiteSettings(),
    getSearchIndex(),
    getAllTopics(),
  ]);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        footerText={settings?.footerText}
        instagramUrl={settings?.instagramUrl}
        youtubeUrl={settings?.youtubeUrl}
      />
      <CommandPalette reminders={reminders} topics={topics} />
    </>
  );
}
