"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBox({
  className,
  autoFocus,
  onSearch,
  placeholder = "Search reminders…",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query.trim());
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function clear() {
    setQuery("");
    if (onSearch) onSearch("");
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative", className)}
      role="search"
      aria-label="Search reminders"
    >
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="pr-9 pl-9"
        aria-label="Search query"
      />
      {query && (
        <button
          type="button"
          onClick={clear}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
