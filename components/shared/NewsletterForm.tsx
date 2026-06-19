"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  source?: string;
  className?: string;
  compact?: boolean;
}

const initialState = { success: false, message: "", error: "" } as const;

type ActionState =
  | { success: true; message: string; error?: undefined }
  | { success: false; error: string; message?: undefined }
  | typeof initialState;

export function NewsletterForm({ source = "website", className, compact }: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_prev, formData) => {
      formData.set("source", source);
      return subscribeAction(formData);
    },
    initialState
  );

  if (state.success) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 text-[var(--brand-green)] dark:text-[var(--brand-gold)]",
          className
        )}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("space-y-3", className)}
      aria-label="Newsletter signup"
      noValidate
    >
      <input type="hidden" name="source" value={source} />

      {!compact && (
        <Input
          name="name"
          type="text"
          placeholder="Your name (optional)"
          autoComplete="name"
          className="bg-background"
          aria-label="Your name"
        />
      )}

      <div className="flex gap-2">
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          autoComplete="email"
          className="bg-background flex-1"
          aria-label="Email address"
          aria-describedby={state.error ? "newsletter-error" : undefined}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="shrink-0 bg-[var(--brand-green)] text-white hover:bg-[var(--brand-green-light)] dark:bg-[var(--brand-gold)] dark:text-gray-800 dark:hover:bg-[var(--brand-gold-light)]"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </div>

      {state.error && (
        <p id="newsletter-error" className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
