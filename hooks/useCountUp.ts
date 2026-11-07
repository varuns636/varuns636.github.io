"use client";

import type { RefObject } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";
import { formatStat } from "@/lib/format";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * Counts every [data-count] inside `scope` from 0 to its value when scrolled into view. Once.
 * Element attributes: data-count (number), data-decimals (int), data-suffix (string).
 * Server HTML already holds the final value, so no-JS and reduced motion need no work.
 */
export function useCountUp(scope: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const suffix = el.dataset.suffix ?? "";
          const format = (n: number) => formatStat(n, decimals, suffix);
          const state = { n: 0 };
          el.textContent = format(0);

          gsap.to(state, {
            n: target,
            duration: motion.duration.slow,
            ease: motion.ease,
            onUpdate: () => {
              el.textContent = format(state.n);
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
