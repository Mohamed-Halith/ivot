"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/reminders", label: "Reminders" },
  { href: "/topics", label: "Topics" },
  { href: "/duas", label: "Duas" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-[var(--hairline)] bg-[var(--surface-0)]/90 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" className="group flex flex-col leading-[1.1]" aria-label="Ihsan home">
            <span lang="ar" className="arabic text-base leading-tight text-[var(--brand-gold)]">
              إحسان
            </span>
            <span className="text-muted-foreground text-[9px] font-bold tracking-[0.25em] uppercase transition-colors group-hover:text-[var(--brand-gold)]">
              Voice of Truth
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                    "after:absolute after:bottom-1 after:left-1/2 after:h-px after:-translate-x-1/2 after:rounded-full after:bg-[var(--brand-gold)]",
                    "after:transition-all after:duration-300",
                    active
                      ? "text-[var(--brand-gold)] after:w-4"
                      : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-4"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-cmd-palette"))}
              aria-label="Open search"
              className="text-muted-foreground hover:text-foreground inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2 transition-all duration-200 hover:bg-white/5"
            >
              <Search className="h-[17px] w-[17px]" />
              <span className="text-muted-foreground/40 hidden text-[10px] font-medium sm:inline">
                ⌘K
              </span>
            </button>
            <ThemeToggle />
            <button
              className="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/5 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[var(--surface-0)]/95 backdrop-blur-2xl" />
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex h-full flex-col items-center justify-center gap-2 pt-16"
            >
              {navLinks.map((link, i) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-8 py-4 text-3xl font-bold tracking-tight transition-colors",
                        active
                          ? "text-[var(--brand-gold)]"
                          : "text-foreground/60 hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    window.dispatchEvent(new CustomEvent("open-cmd-palette"));
                  }}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-xl border border-[var(--hairline)] px-5 py-3 text-sm transition-colors"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
