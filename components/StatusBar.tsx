"use client";

import { useRef } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClock } from "@/hooks/useClock";
import { useStatusBarMotion } from "@/hooks/useStatusBarMotion";
import { SECTIONS, SECTION_IDS } from "@/lib/sections";
import { pad2 } from "@/lib/format";
import { profile } from "@/lib/content";

/**
 * Fixed ops-console bar pinned to the viewport bottom. Doubles as the section nav.
 * Top edge: scroll-progress hairline + accent indicator that slides to the active section.
 * Rises in with the hero intro ([data-boot]).
 */
export function StatusBar() {
  const active = useActiveSection(SECTION_IDS);
  const time = useClock();
  const list = useRef<HTMLOListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  useStatusBarMotion(list, indicator, progress, active);

  return (
    <nav
      aria-label="Sections"
      data-boot
      data-reveal
      className="fixed inset-x-0 bottom-0 z-statusbar h-statusbar border-t border-line bg-ink text-label uppercase"
    >
      <span
        ref={progress}
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-dim"
      />
      <div className="mx-auto flex h-full max-w-shell items-center justify-between gap-4 px-gutter">
        <span className="hidden text-dim lg:block">
          <span className="text-accent" aria-hidden="true">
            &#9632;
          </span>{" "}
          {profile.fullName} {"//"} Dossier
        </span>

        <div className="relative h-full">
          <span
            ref={indicator}
            aria-hidden="true"
            className="absolute -top-px left-0 h-px w-0 bg-accent"
          />
          <ol ref={list} className="flex h-full items-stretch">
          {SECTIONS.map((s, i) => {
            const isActive = s.id === active;
            return (
              <li key={s.id} className="flex">
                <a
                  href={`#${s.id}`}
                  data-id={s.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex min-w-tap items-center justify-center gap-2 px-2 transition-colors duration-fast ease-out hover:text-paper md:px-3 ${
                    isActive ? "text-paper" : "text-dim"
                  }`}
                >
                  {pad2(i + 1)}
                  <span className="hidden md:inline" data-hover-scramble>
                    _{s.code}
                  </span>
                </a>
              </li>
            );
          })}
          </ol>
        </div>

        <span className="text-dim" aria-label={time ? `Bengaluru time ${time}` : undefined}>
          BLR <span className="text-paper">{time ?? "--:--"}</span>
        </span>
      </div>
    </nav>
  );
}
