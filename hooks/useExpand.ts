"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";

/**
 * Animates a collapsible panel's height between 0 and auto.
 * The panel must start with `h-0 overflow-hidden`. Reduced motion: instant.
 * On open, [data-panel-item] children rise in, staggered.
 */
export function useExpand(panel: RefObject<HTMLElement | null>, open: boolean) {
  const first = useRef(true);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return; // initial state comes from CSS
    }
    const reduced = window.matchMedia(MQ.reduced).matches;
    const tween = gsap.to(el, {
      height: open ? "auto" : 0,
      duration: reduced ? 0 : motion.duration.base,
      ease: motion.ease,
      overwrite: true,
      onComplete: () => ScrollTrigger.refresh(),
    });
    const items = el.querySelectorAll<HTMLElement>("[data-panel-item]");
    const itemsTween =
      open && !reduced
        ? gsap.fromTo(
            items,
            { autoAlpha: 0, y: motion.riseSm },
            { autoAlpha: 1, y: 0, duration: motion.duration.base, stagger: motion.stagger, delay: motion.duration.fast / 2 },
          )
        : null;
    return () => {
      tween.kill();
      if (itemsTween) {
        itemsTween.kill();
        gsap.set(items, { clearProps: "opacity,visibility,transform" });
      }
    };
  }, [panel, open]);
}
