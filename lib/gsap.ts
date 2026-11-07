"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { breakpoints, motion } from "@/tailwind.config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
  gsap.defaults({ ease: motion.ease, duration: motion.duration.base });
}

/** Media queries shared by every hook. Pass to gsap.matchMedia(). */
export const MQ = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: `(min-width: ${breakpoints.md}px) and (pointer: fine) and (prefers-reduced-motion: no-preference)`,
} as const;

export { gsap, ScrollTrigger };
