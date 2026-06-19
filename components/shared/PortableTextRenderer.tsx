import type { PortableTextBlock } from "@/types";

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

// Minimal portable text renderer — no extra dependency.
// Replace with @portabletext/react if you need rich embeds.
export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="space-y-4">
      {value.map((block) => {
        if (block._type !== "block") return null;

        const text =
          block.children?.map((child) => {
            let content: React.ReactNode = child.text;
            if (child.marks?.includes("strong"))
              content = <strong key={child._key}>{content}</strong>;
            if (child.marks?.includes("em")) content = <em key={child._key}>{content}</em>;
            return content;
          }) ?? [];

        switch (block.style) {
          case "h3":
            return (
              <h3 key={block._key} className="text-lg font-semibold">
                {text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={block._key}
                className="text-muted-foreground border-l-4 border-[var(--brand-gold)] pl-4 italic"
              >
                {text}
              </blockquote>
            );
          default:
            return <p key={block._key}>{text}</p>;
        }
      })}
    </div>
  );
}
