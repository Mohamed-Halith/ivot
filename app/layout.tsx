import type { Metadata } from "next";
import { Outfit, Amiri, Noto_Sans_Tamil } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-noto-sans-tamil",
  subsets: ["tamil"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ihsan: Voice of Truth | Qur'an & Hadith Reminders in Tamil",
    template: "%s | Ihsan: Voice of Truth",
  },
  description:
    "A library of Qur'an and Hadith reminders with Tamil meaning and reflection. Grow closer to Allah through daily remembrance.",
  openGraph: {
    siteName: "Ihsan: Voice of Truth",
    locale: "ta_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ta"
      suppressHydrationWarning
      className={`${outfit.variable} ${amiri.variable} ${notoSansTamil.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
