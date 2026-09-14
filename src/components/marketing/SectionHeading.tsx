import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * The one heading treatment used across the site: a small tracked eyebrow
 * over a serif display line. Consistency here is what makes the pages read
 * as one publication rather than a set of templates.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-[0.6875rem] font-semibold uppercase tracking-[0.18em]",
            dark ? "text-[#C5A869]" : "text-[#8A8175]",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-brand-serif mt-4 text-balance",
          dark ? "text-[#F3F3ED]" : "text-[#181512]",
        )}
        style={{ fontSize: "var(--step-h2)", lineHeight: 1.15 }}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-pretty leading-relaxed",
            dark ? "text-[#C9C2B8]" : "text-[#675E54]",
          )}
          style={{ fontSize: "var(--step-body)" }}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
