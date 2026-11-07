"use client";

import type { RefObject } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { motion } from "@/tailwind.config";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * One-shot hero entrance. Runs once on mount, never again.
 *  1. [data-scramble] lines shuffle into their final text
 *  2. [data-wipe] accent box wipes in from the left
 *  3. remaining [data-reveal] children rise 20px + fade, staggered
 *  4. [data-boot] elements anywhere in the page (status bar) rise in with them
 * Desktop: [data-parallax] drifts sideways as the hero scrolls away (scroll-linked).
 * Reduced motion: everything is set to its final state immediately.
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const { duration: d, ease, rise, stagger, scrambleChars } = motion;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        const scramble = gsap.utils.toArray<HTMLElement>("[data-scramble]", root);
        const wipe = root.querySelector<HTMLElement>("[data-wipe]");
        const rest = [
          ...gsap.utils
            .toArray<HTMLElement>("[data-reveal]", root)
            .filter((el) => !el.hasAttribute("data-scramble") && !el.hasAttribute("data-wipe")),
          ...document.querySelectorAll<HTMLElement>("[data-boot]"),
        ];

        const tl = gsap.timeline({ defaults: { ease } });

        scramble.forEach((el, i) => {
          const text = el.dataset.scramble ?? "";
          el.textContent = "";
          tl.set(el, { autoAlpha: 1 }, i === 0 ? 0 : "<0.15").to(
            el,
            {
              duration: i === 0 ? d.base : d.slow,
              scrambleText: { text, chars: scrambleChars, speed: 0.6, revealDelay: 0.1 },
            },
            "<",
          );
          if (i === 0 && wipe) {
            tl.fromTo(
              wipe,
              { autoAlpha: 1, scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: d.base },
              "<0.2",
            );
          }
        });

        tl.fromTo(
          rest,
          { autoAlpha: 0, y: rise },
          { autoAlpha: 1, y: 0, duration: d.slow, stagger },
          "-=0.3",
        );
      });

      mm.add(MQ.desktop, () => {
        gsap.to("[data-parallax]", {
          xPercent: motion.parallax,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: motion.scrub },
        });
      });

      mm.add(MQ.reduced, () => {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
        gsap.set(document.querySelectorAll("[data-boot]"), { autoAlpha: 1, y: 0 });
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
