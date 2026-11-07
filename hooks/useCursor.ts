"use client";

import type { RefObject } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

const INTERACTIVE = 'a, button, summary, input, textarea, select, [role="button"], [data-cursor="grow"]';

/**
 * Crosshair cursor. Desktop + fine pointer + motion allowed only.
 * Grows over interactive elements. Native cursor is hidden via html[data-cursor="on"].
 * A child [data-cursor-readout] shows live viewport coordinates.
 */
export function useCursor(ref: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { duration: d, cursor } = motion;
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const html = document.documentElement;
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, width: cursor.size, height: cursor.size });

      const x = gsap.quickTo(el, "x", { duration: d.fast, ease: motion.ease });
      const y = gsap.quickTo(el, "y", { duration: d.fast, ease: motion.ease });
      let active = false;
      let shown = false;
      let last = { x: -1, y: -1 };
      let raf = 0;
      const readout = el.querySelector<HTMLElement>("[data-cursor-readout]");
      const pad = (n: number) => String(Math.round(n)).padStart(4, "0");

      const setActive = (target: Element | null) => {
        const hit = !!target?.closest?.(INTERACTIVE);
        if (hit === active) return;
        active = hit;
        el.dataset.active = String(hit);
        const s = hit ? cursor.sizeActive : cursor.size;
        gsap.to(el, { width: s, height: s, duration: d.fast, overwrite: "auto" });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!shown) {
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: d.fast });
          html.dataset.cursor = "on";
          shown = true;
        }
        x(e.clientX);
        y(e.clientY);
        last = { x: e.clientX, y: e.clientY };
        if (readout) readout.textContent = `X${pad(e.clientX)} Y${pad(e.clientY)}`;
        setActive(e.target as Element | null);
      };
      // Content moves under a still pointer while scrolling: re-check what is under it.
      // A trailing check catches the final position after smooth scroll settles.
      let settle = 0;
      const check = () => setActive(document.elementFromPoint(last.x, last.y));
      const onScroll = () => {
        if (!shown) return;
        window.clearTimeout(settle);
        settle = window.setTimeout(check, motion.duration.fast * 1000);
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          check();
        });
      };
      const onLeave = () => {
        gsap.to(el, { autoAlpha: 0, duration: d.fast });
        shown = false;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
        window.clearTimeout(settle);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        delete html.dataset.cursor;
      };
    });

    return () => mm.revert();
  }, [ref]);
}
