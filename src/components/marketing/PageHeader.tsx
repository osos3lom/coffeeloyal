"use client";

/**
 * The opener used by every interior page. Keeps the crema ground, the
 * eyebrow/serif pairing and the top spacing identical across the site so the
 * pages read as one publication.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-[#F8F7F3]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#FFFFFF_0%,#F8F7F3_62%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-[var(--gutter)] pb-10 pt-28 md:pb-14 md:pt-40">
        {eyebrow && (
          <p
            className="rise-in text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]"
            style={{ animationDelay: "50ms" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="rise-in font-brand-serif mt-4 max-w-3xl text-balance text-[#181512]"
          style={{ fontSize: "var(--step-h1)", lineHeight: 1.1, animationDelay: "110ms" }}
        >
          {title}
        </h1>
        <hr
          className="hairline-gold rise-in mt-6 max-w-[6rem]"
          style={{ animationDelay: "170ms" }}
        />
        {lede && (
          <p
            className="rise-in mt-5 max-w-xl text-pretty leading-relaxed text-[#675E54]"
            style={{ fontSize: "var(--step-body)", animationDelay: "220ms" }}
          >
            {lede}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
