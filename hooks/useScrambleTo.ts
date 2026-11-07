"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";

/**
 * Scrambles `ref`'s text to `text` whenever `text` changes (skips first render).
 * The element's React children must stay constant: this hook owns its textContent.
 */
export function useScrambleTo(ref: RefObject<HTMLElement | null>, text: string) {
  const first = useRef(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia(MQ.reduced).matches) {
      el.textContent = text;
      return;
    }
    const t = gsap.to(el, {
      duration: motion.duration.base,
      scrambleText: { text, chars: motion.scrambleChars, speed: 0.8 },
      overwrite: true,
    });
    return () => {
      t.kill();
      el.textContent = text;
    };
  }, [ref, text]);
}
