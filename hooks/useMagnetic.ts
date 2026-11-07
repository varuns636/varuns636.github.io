"use client";

import { useEffect } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";

type Mover = { x: (v: number) => void; y: (v: number) => void };

/**
 * Desktop only. [data-magnetic] elements lean toward the pointer (clamped to
 * motion.magnet.max px) and settle back when it leaves.
 */
export function useMagnetic() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const { strength, max } = motion.magnet;
      const movers = new WeakMap<HTMLElement, Mover>();
      const mover = (el: HTMLElement) => {
        let m = movers.get(el);
        if (!m) {
          const opts = { duration: motion.duration.base, ease: motion.ease };
          m = { x: gsap.quickTo(el, "x", opts), y: gsap.quickTo(el, "y", opts) };
          movers.set(el, m);
        }
        return m;
      };
      const clamp = gsap.utils.clamp(-max, max);
      let current: HTMLElement | null = null;

      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
        if (current && current !== el) {
          mover(current).x(0);
          mover(current).y(0);
        }
        current = el;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const m = mover(el);
        m.x(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        m.y(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    });
    return () => mm.revert();
  }, []);
}
