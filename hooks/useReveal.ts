"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

const START = "top 88%";

/**
 * Scroll-triggered entrances inside `scope`. Each fires once and never replays.
 *  [data-reveal]       20px rise + fade; elements entering together are staggered
 *  [data-mask]         clip-path wipe upward + rise (section titles)
 *  [data-scramble-in]  text decodes into place (micro-labels)
 *  [data-line]         1px hairline draws left to right
 * Reduced motion: final state immediately.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const { duration: d, rise, stagger, scrambleChars } = motion;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root);

      mm.add(MQ.motionOk, () => {
        const reveals = q("[data-reveal]");
        gsap.set(reveals, { autoAlpha: 0, y: rise });
        ScrollTrigger.batch(reveals, {
          start: START,
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: d.slow, stagger, overwrite: true }),
        });

        q("[data-mask]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 1, clipPath: "inset(0% 0% 100% 0%)", y: rise },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: d.slow,
              scrollTrigger: { trigger: el, start: START, once: true },
            },
          );
        });

        q("[data-scramble-in]").forEach((el) => {
          const text = el.textContent ?? "";
          ScrollTrigger.create({
            trigger: el,
            start: START,
            once: true,
            onEnter: () =>
              gsap.to(el, { duration: d.slow, scrambleText: { text, chars: scrambleChars, speed: 0.6 } }),
          });
        });

        q("[data-line]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: d.slow, scrollTrigger: { trigger: el, start: "top 95%", once: true } },
          );
        });
      });

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-reveal], [data-mask], [data-line]"), { autoAlpha: 1, y: 0, clearProps: "clipPath,transform" });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
