"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Disabled entirely under prefers-reduced-motion (native scroll).
 * Also handles in-page anchor links: smooth scroll + move focus to the target.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MQ.motionOk).matches) return;

    const lenis = new Lenis({
      duration: motion.lenisDuration,
      easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        onComplete: () => target.focus({ preventScroll: true }),
      });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
