import * as React from "react";
import { cn } from "@/lib/utils";

/** Small pill label that sits above every section heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#222] bg-white px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[#111] shadow-xs",
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/** Highlighted phrase with the brand's yellow underline. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-primary">
      {children}
      <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[4px] w-full rounded-full bg-[#FFD43B]" />
    </span>
  );
}

// Line height is baked into the font-size utility: tailwind-merge drops a separate
// `leading-*` class whenever a font-size class follows it.
export const SECTION_TITLE =
  "font-heading font-extrabold text-[#111] text-[clamp(32px,4vw,52px)]/[1.08] tracking-[-0.035em]";

export const SECTION_LEAD = "font-sans text-[15px] sm:text-[16px] leading-[1.7] text-[#555]";
