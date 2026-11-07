"use client";

import { useRef } from "react";
import { useCursor } from "@/hooks/useCursor";

/** Crosshair cursor. Rendered hidden; useCursor only activates it on desktop. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useCursor(ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active="false"
      className="group pointer-events-none invisible fixed left-0 top-0 z-cursor hidden md:block"
    >
      <span className="absolute left-0 top-1/2 h-px w-full bg-paper transition-colors duration-fast ease-out group-data-[active=true]:bg-accent" />
      <span className="absolute left-1/2 top-0 h-full w-px bg-paper transition-colors duration-fast ease-out group-data-[active=true]:bg-accent" />
      <span
        data-cursor-readout
        className="absolute left-full top-full ml-2 mt-2 whitespace-nowrap text-label text-dim transition-opacity duration-fast ease-out group-data-[active=true]:opacity-0"
      />
    </div>
  );
}
