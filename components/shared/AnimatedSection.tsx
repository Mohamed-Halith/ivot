"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  amount = 0.12,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  const yOffset = direction === "up" ? 28 : direction === "down" ? -28 : 0;
  const xOffset = direction === "left" ? 28 : direction === "right" ? -28 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset, y: yOffset, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
