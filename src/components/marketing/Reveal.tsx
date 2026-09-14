"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's single reveal gesture: a 12px rise and fade, once, on entry.
 *
 * Deliberately fails open. The element renders visible by default and is
 * only hidden after the effect confirms it can observe and restore it, so
 * content is never stranded at opacity 0 for crawlers, for users without
 * JavaScript, or while hydration is still in flight. Reduced motion is
 * handled in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "pending" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Already on screen at mount: show it without the gesture.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("in");
      return;
    }

    setState("pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        // Reveal when the element enters, and also when it is already above
        // the fold. A fast scroll, an anchor jump, or a restored scroll
        // position can carry an element past the viewport without it ever
        // being reported as intersecting, which would strand it at opacity 0.
        const passed = entry.boundingClientRect.top < window.innerHeight;
        if (entry.isIntersecting || passed) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("js-reveal", className)}
      data-reveal={state === "idle" ? undefined : state}
      style={delay ? ({ "--reveal-delay": `${delay * 1000}ms` } as never) : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
