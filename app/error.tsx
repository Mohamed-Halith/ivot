"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 px-4 text-center">
      <p className="text-6xl">⚠️</p>
      <div className="space-y-2">
        <h2 className="text-foreground text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-xs text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
