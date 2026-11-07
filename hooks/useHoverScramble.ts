"use client";

import { useEffect } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";

/**
 * Desktop only. When the pointer enters a link or button, every [data-hover-scramble]
 * inside it re-decodes its own text. Mono font + same length = no layout shift.
 */
export function useHoverScramble() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const onOver = (e: PointerEvent) => {
        const host = (e.target as Element | null)?.closest?.("a, button");
        if (!host || host.contains(e.relatedTarget as Node | null)) return; // only on entering the host
        host.querySelectorAll<HTMLElement>("[data-hover-scramble]").forEach((el) => {
          if (gsap.isTweening(el)) return;
          const text = (el.dataset.text ??= el.textContent ?? "");
          gsap.to(el, {
            duration: motion.duration.base,
            scrambleText: { text, chars: motion.scrambleChars, speed: 0.8 },
          });
        });
      };
      document.addEventListener("pointerover", onOver);
      return () => document.removeEventListener("pointerover", onOver);
    });
    return () => mm.revert();
  }, []);
}
