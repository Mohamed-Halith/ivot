import Link from "next/link";
import { InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { OrnamentDivider } from "@/components/shared/OrnamentDivider";

interface FooterProps {
  footerText?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

const exploreLinks = [
  { href: "/reminders", label: "All Reminders" },
  { href: "/topics", label: "Browse Topics" },
  { href: "/duas", label: "Duas" },
  { href: "/about", label: "About" },
];

export function Footer({ footerText, instagramUrl, youtubeUrl }: FooterProps) {
  return (
    <footer className="mt-auto bg-gradient-to-b from-[#212529] to-[#1a1f24] text-white/80">
      <OrnamentDivider className="container mx-auto px-4" />

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand column */}
          <div className="space-y-4">
            <div>
              <p lang="ar" className="arabic mb-1 text-xl leading-tight text-[var(--brand-gold)]">
                إحسان
              </p>
              <p className="text-[9px] font-bold tracking-[0.22em] text-white/30 uppercase">
                Voice of Truth
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Qur&apos;an &amp; Hadith reminders in Tamil — a permanent library for daily
              remembrance.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 pt-1">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="text-white/30 transition-colors duration-200 hover:text-[var(--brand-gold)]"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch on YouTube"
                  className="text-white/30 transition-colors duration-200 hover:text-[var(--brand-gold)]"
                >
                  <YoutubeIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Explore links */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
              Explore
            </p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors duration-200 hover:pl-1 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter CTA */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--brand-gold)] uppercase">
              Stay connected
            </p>
            <p className="text-sm leading-relaxed text-white/50">
              Get weekly Qur&apos;an &amp; Hadith reminders in your inbox.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-gold)]/20 bg-[var(--brand-gold)]/10 px-4 py-2 text-sm font-medium text-[var(--brand-gold)] transition-all duration-200 hover:bg-[var(--brand-gold)]/20"
            >
              Subscribe →
            </Link>
            <p lang="ar" className="arabic pt-2 text-2xl text-white/10">
              بِسْمِ اللّٰهِ
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/25 sm:flex-row">
          <p>{footerText ?? "May Allah accept our efforts. آمين"}</p>
          <p>© {new Date().getFullYear()} Ihsan: Voice of Truth</p>
        </div>
      </div>
    </footer>
  );
}
