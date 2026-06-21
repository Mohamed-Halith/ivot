import Link from "next/link";
import { InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";

interface FooterProps {
  footerText?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

const exploreLinks = [
  { href: "/reminders", label: "All Reminders" },
  { href: "/topics", label: "Browse Topics" },
  { href: "/duas", label: "Duas" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
];

export function Footer({ footerText, instagramUrl, youtubeUrl }: FooterProps) {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--hairline)]">
      {/* Subtle radial glow behind footer */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand-gold)]/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-[var(--brand-green)]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 pt-16 pb-10 md:px-8">
        {/* Large wordmark */}
        <div className="mb-14 border-b border-[var(--hairline)] pb-10">
          <p
            lang="ar"
            className="arabic text-center text-[clamp(48px,8vw,96px)] leading-none text-[var(--brand-gold)]/10 select-none"
            aria-hidden="true"
          >
            إحسان
          </p>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-5">
            <div>
              <p lang="ar" className="arabic mb-0.5 text-xl leading-tight text-[var(--brand-gold)]">
                إحسان
              </p>
              <p className="text-muted-foreground/40 text-[9px] font-bold tracking-[0.25em] uppercase">
                Voice of Truth
              </p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Qur&apos;an &amp; Hadith reminders in Tamil — a permanent library for daily
              remembrance.
            </p>
            <div className="flex items-center gap-4 pt-1">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="text-muted-foreground/40 transition-colors hover:text-[var(--brand-gold)]"
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
                  className="text-muted-foreground/40 transition-colors hover:text-[var(--brand-gold)]"
                >
                  <YoutubeIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--brand-gold)]/60 uppercase">
              Explore
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                >
                  <span className="h-px w-0 bg-[var(--brand-gold)] transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Subscribe */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--brand-gold)]/60 uppercase">
              Stay Connected
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Weekly reminders delivered to your inbox. No noise — just remembrance.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-gold)]/20 bg-[var(--brand-gold)]/8 px-4 py-2.5 text-sm font-semibold text-[var(--brand-gold)] transition-all hover:border-[var(--brand-gold)]/35 hover:bg-[var(--brand-gold)]/15"
            >
              Subscribe free →
            </Link>
            <p lang="ar" className="arabic text-muted-foreground/20 pt-1 text-xl">
              بِسْمِ اللّٰهِ
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-muted-foreground/30 mt-12 flex flex-col items-center justify-between gap-2 border-t border-[var(--hairline)] pt-6 text-[11px] sm:flex-row">
          <p>{footerText ?? "May Allah accept our efforts. آمين"}</p>
          <p>© {new Date().getFullYear()} Ihsan: Voice of Truth</p>
        </div>
      </div>
    </footer>
  );
}
