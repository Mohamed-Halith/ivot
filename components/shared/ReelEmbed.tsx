"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { cn } from "@/lib/utils";

interface ReelEmbedProps {
  instagramUrl?: string;
  youtubeUrl?: string;
  className?: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

function getInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/);
  return match?.[2] ?? null;
}

export function ReelEmbed({ instagramUrl, youtubeUrl, className }: ReelEmbedProps) {
  const [active, setActive] = useState<"youtube" | "instagram" | null>(null);
  const [loaded, setLoaded] = useState(false);

  const ytId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;
  const igId = instagramUrl ? getInstagramId(instagramUrl) : null;

  if (!ytId && !igId) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
        Watch the Reminder
      </p>

      {/* Source selector */}
      {ytId && igId && (
        <div className="flex gap-2">
          <Button
            variant={active === "youtube" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActive("youtube");
              setLoaded(false);
            }}
            className="gap-1.5"
          >
            <YoutubeIcon className="h-4 w-4" />
            YouTube
          </Button>
          <Button
            variant={active === "instagram" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActive("instagram");
              setLoaded(false);
            }}
            className="gap-1.5"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </Button>
        </div>
      )}

      {/* Lazy load placeholder */}
      {active === null && (
        <button
          onClick={() => {
            setActive(ytId ? "youtube" : "instagram");
          }}
          className="group border-border bg-muted relative mx-auto flex aspect-[9/16] max-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border transition-colors hover:border-[var(--brand-gold)]"
          aria-label="Load video"
        >
          <div className="text-muted-foreground flex flex-col items-center gap-3 transition-colors group-hover:text-[var(--brand-gold)]">
            <Play className="h-12 w-12" />
            <span className="text-sm">Tap to watch</span>
          </div>
        </button>
      )}

      {/* YouTube embed */}
      {active === "youtube" && ytId && (
        <div className="relative mx-auto aspect-[9/16] max-h-[500px] w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title="YouTube reminder video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            onLoad={() => setLoaded(true)}
          />
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <span className="animate-pulse text-sm text-white">Loading…</span>
            </div>
          )}
        </div>
      )}

      {/* Instagram embed */}
      {active === "instagram" && igId && (
        <div className="mx-auto w-full max-w-sm">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/reel/${igId}/`}
            data-instgrm-version="14"
          />
          <script async src="//www.instagram.com/embed.js" />
        </div>
      )}
    </div>
  );
}
