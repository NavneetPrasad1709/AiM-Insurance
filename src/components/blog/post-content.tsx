import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { cn } from "@/lib/utils";

interface PostContentProps {
  /** Markdown-lite plain text (mock data) OR a Portable Text array (Sanity). */
  content: string | unknown[];
  className?: string;
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugify(plainText(value))} className={H2_CLASS}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugify(plainText(value))} className={H3_CLASS}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className={BLOCKQUOTE_CLASS}>{children}</blockquote>
    ),
    normal: ({ children }) => <p className={P_CLASS}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={UL_CLASS}>{children}</ul>,
    number: ({ children }) => <ol className={OL_CLASS}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={LI_CLASS}>{children}</li>,
    number: ({ children }) => <li className={LI_CLASS}>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className={LINK_CLASS}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-heading font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-text-primary">{children}</em>,
  },
};

const H2_CLASS =
  "scroll-mt-32 text-2xl md:text-3xl font-heading font-bold text-white tracking-tight mt-12 mb-4";
const H3_CLASS =
  "scroll-mt-32 text-xl md:text-2xl font-heading font-bold text-white tracking-tight mt-8 mb-3";
const P_CLASS =
  "text-lg md:text-xl leading-[1.75] text-text-primary mb-6";
const UL_CLASS =
  "list-none pl-0 mb-7 space-y-3 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:size-2 [&>li]:before:rounded-full [&>li]:before:bg-cta";
const OL_CLASS =
  "list-decimal pl-7 mb-7 space-y-3 marker:text-cta marker:font-heading marker:font-bold";
const LI_CLASS = "text-lg md:text-xl leading-[1.75] text-text-primary";
const BLOCKQUOTE_CLASS =
  "border-l-4 border-cta pl-6 py-2 my-6 italic text-lg text-text-primary bg-surface rounded-r-lg";
const LINK_CLASS =
  "text-cta underline underline-offset-2 hover:text-cta-hover transition-colors";

function plainText(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const block = value as { children?: Array<{ text?: string }> };
  return (block.children ?? []).map((c) => c.text ?? "").join(" ");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

interface ParsedBlock {
  type: "h2" | "h3" | "p";
  text: string;
}

function parseMarkdownLite(text: string): ParsedBlock[] {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map<ParsedBlock>((chunk) => {
      if (chunk.startsWith("### ")) return { type: "h3", text: chunk.slice(4) };
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3) };
      return { type: "p", text: chunk };
    });
}

function renderInline(text: string): React.ReactNode {
  // Render **bold** and *italic* and `code` runs.
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={`b-${key++}`} className="font-heading font-bold text-white">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      parts.push(
        <em key={`i-${key++}`} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    } else {
      parts.push(
        <code
          key={`c-${key++}`}
          className="rounded bg-surface px-1.5 py-0.5 text-[0.92em] text-cta"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function PostContent({ content, className }: PostContentProps) {
  const wrapperClass = cn(
    "max-w-prose",
    className,
  );

  if (Array.isArray(content)) {
    return (
      <div className={wrapperClass}>
        <PortableText
          value={content as Parameters<typeof PortableText>[0]["value"]}
          components={portableComponents}
        />
      </div>
    );
  }

  const blocks = parseMarkdownLite(content);

  return (
    <div className={wrapperClass}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} id={slugify(block.text)} className={H2_CLASS}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} id={slugify(block.text)} className={H3_CLASS}>
              {block.text}
            </h3>
          );
        }
        return (
          <p key={i} className={P_CLASS}>
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export default PostContent;

/**
 * Helper used by table-of-contents.tsx to extract headings from the same
 * markdown-lite format used in mock posts.
 */
export interface ParsedHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(content: string | unknown[]): ParsedHeading[] {
  if (Array.isArray(content)) {
    const blocks = content as Array<{ style?: string; children?: Array<{ text?: string }> }>;
    return blocks
      .filter((b) => b.style === "h2" || b.style === "h3")
      .map((b) => {
        const text = (b.children ?? []).map((c) => c.text ?? "").join(" ");
        return { id: slugify(text), text, level: b.style === "h3" ? 3 : 2 } as const;
      });
  }
  return parseMarkdownLite(content)
    .filter((b) => b.type !== "p")
    .map((b) => ({
      id: slugify(b.text),
      text: b.text,
      level: b.type === "h3" ? 3 : 2,
    }));
}
