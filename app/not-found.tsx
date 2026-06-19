import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 px-4 text-center">
      <p className="text-6xl">🌙</p>
      <div className="space-y-2">
        <h1 className="text-foreground text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          This page doesn&apos;t exist — but the reminders do.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className={cn(buttonVariants())}>
          Go home
        </Link>
        <Link href="/reminders" className={cn(buttonVariants({ variant: "outline" }))}>
          Browse reminders
        </Link>
      </div>
    </div>
  );
}
