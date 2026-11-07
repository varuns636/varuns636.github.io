"use client";

import { useRef, useState } from "react";
import { useScrambleTo } from "@/hooks/useScrambleTo";
import { motion } from "@/tailwind.config";

const LABEL = { idle: "Copy", done: "Copied", fail: "Failed" } as const;

/** Fallback for browsers or contexts without the async Clipboard API. */
function legacyCopy(value: string) {
  const ta = document.createElement("textarea");
  ta.value = value;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

/** Copies `value` to the clipboard; label decodes to "Copied", then back. */
export function CopyButton({ value, what }: { value: string; what: string }) {
  const [state, setState] = useState<keyof typeof LABEL>("idle");
  const label = useRef<HTMLSpanElement>(null);
  const timer = useRef<number>(undefined);
  useScrambleTo(label, LABEL[state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("done");
    } catch {
      setState(legacyCopy(value) ? "done" : "fail");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), motion.copiedHold * 1000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        data-magnetic
        aria-label={`Copy ${what}`}
        className={`inline-flex min-h-tap min-w-tap items-center justify-center border px-4 text-label uppercase transition-colors duration-fast ease-out hover:border-paper hover:text-paper ${
          state === "done" ? "border-accent text-paper" : "border-line-strong text-dim"
        }`}
      >
        [<span ref={label} aria-hidden="true">{LABEL.idle}</span>]
      </button>
      <span role="status" className="sr-only">
        {state === "done" ? `${what} copied to clipboard` : state === "fail" ? "Copy failed" : ""}
      </span>
    </>
  );
}
