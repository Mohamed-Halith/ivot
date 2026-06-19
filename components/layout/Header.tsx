"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/reminders", label: "Reminders" },
  { href: "/topics", label: "Topics" },
  { href: "/duas", label: "Duas" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Brand */}
        <Link href="/" className="group flex flex-col leading-[1.1]" aria-label="Ihsan home">
          <span lang="ar" className="arabic text-base leading-tight text-[var(--brand-gold)]">
            إحسان
          </span>
          <span className="text-muted-foreground text-[9px] font-bold tracking-[0.22em] uppercase transition-colors group-hover:text-[var(--brand-gold)]">
            Voice of Truth
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                  "after:h-[2px] after:rounded-full after:bg-[var(--brand-gold)]",
                  "after:transition-all after:duration-300 after:ease-out",
                  active
                    ? "text-foreground after:w-5"
                    : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all"
          >
            <Search className="h-[17px] w-[17px]" />
          </Link>
          <ThemeToggle />
          <button
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "border-border/40 max-h-64 border-t" : "max-h-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl border-l-2 px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "text-foreground border-[var(--brand-gold)] bg-[var(--brand-green)]/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
