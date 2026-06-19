import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/sanity/queries/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

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
    </>
  );
}
