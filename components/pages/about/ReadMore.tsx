"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  /** Height of the preview on phones, e.g. "15rem". */
  collapsedHeight?: string;
  /** Section background, so the preview fades into it. */
  fadeTo: string;
}

// On phones, long text shows a short preview that fades out, with a
// "Read more" toggle. From the md breakpoint up, the full text always shows.
export default function ReadMore({ children, collapsedHeight = "15rem", fadeTo }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function toggle() {
    // Collapsing from far down the text: bring its start back into view.
    if (open) ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setOpen(!open);
  }

  return (
    <div ref={ref} className="scroll-mt-24">
      <div
        className={`relative ${open ? "" : "max-md:max-h-[var(--collapsed)] max-md:overflow-hidden"}`}
        style={{ "--collapsed": collapsedHeight } as React.CSSProperties}
      >
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 md:hidden"
            style={{ background: `linear-gradient(to bottom, transparent, ${fadeTo})` }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="pixel-glitch mx-auto mt-4 flex items-center gap-1.5 rounded-full border border-[#B9752F] px-5 py-2 text-sm font-semibold text-[#2A2522] transition hover:bg-[#E3B67C]/60 md:hidden"
      >
        {open ? "Show less" : "Read more"}
        <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>
    </div>
  );
}
