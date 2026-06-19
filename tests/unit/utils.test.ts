import { describe, it, expect } from "vitest";
import { cn, truncate } from "@/lib/utils";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("deduplicates tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
  it("handles conditional classes", () => {
    expect(cn("base", false && "no", "yes")).toBe("base yes");
  });
});

describe("truncate()", () => {
  it("does not truncate short strings", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });
  it("truncates long strings with ellipsis", () => {
    const result = truncate("hello world", 7);
    expect(result).toContain("…");
    expect(result.length).toBeLessThanOrEqual(8);
  });
});
