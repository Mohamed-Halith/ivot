"use client";

import { Link2, Share2 } from "lucide-react";
import { TwitterXIcon } from "@/components/shared/SocialIcons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareBarProps {
  url: string;
  title: string;
  arabicText?: string;
}

export function ShareBar({ url, title, arabicText }: ShareBarProps) {
  const shareText = arabicText ? `${title}\n\n${arabicText}\n\n${url}` : `${title}\n\n${url}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied!");
    });
  }

  function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url });
    }
  }

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Share this reminder"
    >
      <span className="text-muted-foreground mr-1 text-xs font-semibold tracking-widest uppercase">
        Share
      </span>

      <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5">
        <Link2 className="h-3.5 w-3.5" />
        Copy link
      </Button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <TwitterXIcon className="h-3.5 w-3.5" />X
        </Button>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        <Button variant="outline" size="sm">
          WhatsApp
        </Button>
      </a>

      {hasNativeShare && (
        <Button variant="outline" size="sm" onClick={nativeShare} className="gap-1.5">
          <Share2 className="h-3.5 w-3.5" />
          More
        </Button>
      )}
    </div>
  );
}
