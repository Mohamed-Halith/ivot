"use client";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  as?: "div" | "section";
}

export function AnimatedSection({
  children,
  className,
  delay,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={cn("reveal", inView && "in-view", delay, className)}
    >
      {children}
    </Tag>
  );
}
