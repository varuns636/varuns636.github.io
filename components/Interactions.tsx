"use client";

import { useHoverScramble } from "@/hooks/useHoverScramble";
import { useMagnetic } from "@/hooks/useMagnetic";

/** Page-wide pointer interactions (desktop only, both delegate from document). */
export function Interactions() {
  useHoverScramble();
  useMagnetic();
  return null;
}
