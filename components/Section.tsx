"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { SectionId } from "@/lib/sections";
import { SectionLabel } from "./SectionLabel";

type Props = {
  id: SectionId;
  title: string;
  children: ReactNode;
};

/**
 * Shared shell for sections 02-05: micro-label, h2, scroll reveals.
 * Descendants with [data-reveal] / [data-mask] / [data-scramble-in] / [data-line] animate in once (see useReveal).
 */
export function Section({ id, title, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className="relative border-b border-line py-section outline-none"
    >
      <div data-line aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line-strong" />
      <div className="mx-auto w-full max-w-shell px-gutter">
        <div data-reveal>
          <SectionLabel id={id} />
        </div>
        <h2 id={`${id}-title`} data-mask className="mt-6 font-display text-h2 uppercase">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
