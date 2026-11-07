"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * Status bar:
 *  - `progress` scales with page scroll (direct mapping, no easing: it is a readout, not an animation)
 *  - `indicator` slides under the link marked [data-id=active]
 */
export function useStatusBarMotion(
  list: RefObject<HTMLElement | null>,
  indicator: RefObject<HTMLElement | null>,
  progress: RefObject<HTMLElement | null>,
  active: string,
) {
  // Scroll progress line
  useEffect(() => {
    const el = progress.current;
    if (!el) return;
    const setScale = gsap.quickSetter(el, "scaleX");
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScale(self.progress),
    });
    setScale(st.progress);
    return () => st.kill();
  }, [progress]);

  // Sliding active indicator
  useIsoLayoutEffect(() => {
    const ul = list.current;
    const ind = indicator.current;
    if (!ul || !ind) return;
    const place = (animate: boolean) => {
      const link = ul.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!link) return;
      const instant = !animate || window.matchMedia(MQ.reduced).matches;
      gsap.to(ind, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        duration: instant ? 0 : motion.duration.base,
        ease: motion.ease,
        overwrite: true,
      });
    };
    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [list, indicator, active]);
}
