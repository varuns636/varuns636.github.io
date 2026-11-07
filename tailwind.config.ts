import type { Config } from "tailwindcss";

/**
 * Single source of truth for design + motion tokens.
 * Tailwind consumes the default export (via `@config` in app/globals.css).
 * GSAP hooks import `motion` / `breakpoints` directly so JS and CSS never drift.
 */

export const palette = {
  ink: "#0A0A0B", // page background
  panel: "#111113", // raised surface (cards, status bar)
  line: "#26262A", // 1px hairlines
  "line-strong": "#3A3A40", // hover / emphasis borders
  paper: "#EDEBE6", // primary text
  dim: "#8F8C86", // secondary text (5.9:1 on ink, AA)
  accent: "#E02020", // crimson, use sparingly
} as const;

export const breakpoints = {
  md: 768, // below this: no custom cursor, no grain/scanlines
} as const;

/** All durations in seconds for GSAP. Spec: 200-600ms, ease-out only. */
export const motion = {
  duration: { fast: 0.2, base: 0.4, slow: 0.6 },
  ease: "power3.out",
  rise: 20, // px, section reveal offset
  stagger: 0.08, // s between staggered children
  scrambleChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_<>",
  riseSm: 10, // px, offset for small items inside an opened panel
  cursor: { size: 20, sizeActive: 44 }, // px
  magnet: { strength: 0.3, max: 10 }, // fraction of pointer offset, px clamp
  scrub: 0.4, // s of smoothing on scroll-linked tweens
  parallax: -12, // xPercent the hero wordmark drifts across the hero's scroll
  copiedHold: 1.5, // s the "Copied" state stays before reverting
  lenisDuration: 0.6, // keep smooth-scroll inertia inside the 600ms budget
} as const;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    screens: {
      md: `${breakpoints.md}px`,
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...palette,
    },
    // Hard edges everywhere. `rounded-*` intentionally resolves to 0.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Floor is 14px for uppercase micro-labels, 16px for any running text.
        label: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        body: ["1rem", { lineHeight: "1.7" }],
        ui: ["1rem", { lineHeight: "1", letterSpacing: "0.08em" }], // buttons, links
        lead: ["clamp(1.0625rem, 0.95rem + 0.5vw, 1.25rem)", { lineHeight: "1.6" }],
        h2: ["clamp(2.75rem, 1.5rem + 6vw, 7rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        h3: ["clamp(1.875rem, 1.3rem + 2.4vw, 3.25rem)", { lineHeight: "1", letterSpacing: "0.01em" }],
        stat: ["clamp(3rem, 2rem + 4vw, 5.5rem)", { lineHeight: "1" }],
        name: ["clamp(4rem, 2rem + 11vw, 11rem)", { lineHeight: "0.9", letterSpacing: "0.01em" }],
        wordmark: ["31vw", { lineHeight: "0.8", letterSpacing: "-0.01em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3rem)",
        section: "clamp(6rem, 14vw, 11rem)",
        statusbar: "2.75rem",
        tap: "2.75rem", // 44px minimum touch target
        "box-x": "0.1em", // accent highlight box padding, scales with the text
        "box-y": "0.04em",
      },
      minHeight: {
        hero: "calc(100svh - 2.75rem)", // viewport minus status bar
      },
      maxWidth: {
        shell: "90rem",
        prose: "38rem",
        measure: "46rem", // longest comfortable line for 16px mono
      },
      gridTemplateColumns: {
        pair: "auto auto", // key/value meta
        record: "9rem minmax(0, 1fr)", // label column + value
        log: "8rem minmax(0, 1fr) auto", // date / entry / tag
        about: "minmax(0, 1fr) minmax(0, 26rem)", // bio / stat strip
        case: "auto minmax(0, 1fr) auto", // file no / title / toggle (md+)
        "case-sm": "minmax(0, 1fr) auto", // file no + toggle, title below (mobile)
        detail: "minmax(0, 2fr) minmax(0, 1fr)", // case-file body / sidebar
        contact: "4rem 9rem minmax(0, 1fr) auto", // code / channel / value / arrow
      },
      borderWidth: {
        hair: "1px",
      },
      transitionDuration: {
        fast: "200ms",
        base: "400ms",
        slow: "600ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      zIndex: {
        statusbar: "40",
        overlay: "50",
        cursor: "60",
      },
      keyframes: {
        caret: { "50%": { opacity: "0" } },
      },
      animation: {
        caret: "caret 1s steps(1) infinite", // terminal caret; disabled under reduced motion
      },
      opacity: {
        grain: "0.04",
        scan: "0.025",
      },
    },
  },
};

export default config;
