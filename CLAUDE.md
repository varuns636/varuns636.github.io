@AGENTS.md

# Varun portfolio: project conventions

Dark "terminal dossier / ops console" portfolio. Next.js 16 (App Router) + TypeScript,
Tailwind v4, GSAP + ScrollTrigger, Lenis. No UI libraries, no Framer Motion.

## Build status

All five sections are built: Hero, About (bio, stat strip, service record), Projects (expandable case
files plus "also on file"), Stack, and Contact (with footer). The fixed StatusBar doubles as the section nav.

Content came from the previous static portfolio at `../Portfolio` and the project READMEs.
Empty `points`, `stack` or `links` arrays in `lib/content.ts` hide those blocks on a case file.
`public/varun-s-resume.pdf` is the public résumé (no phone number). Never copy anything from `../Portfolio/private/`.

## Deployment

- Live at https://varuns636.github.io (repo `varuns636/varuns636.github.io`). Pushing to `main` runs
  `.github/workflows/deploy.yml`, which does `npm ci`, `npm run build`, then uploads `out/` to Pages.
- `next.config.ts` uses `output: "export"`. That means no server features: no route handlers, no ISR, no `cookies()`.
  `cacheComponents` and `partialPrefetching` are off because PPR cannot run in export mode.
- The old static portfolio now lives in the private repo `varuns636/portfolio` and is no longer hosted.

## Content decisions

- MetroMates was removed at the user's request (2026-11-23). Do not add it back.
- The user does not want the "Also on file" list (Programming in C, small-model benchmark) or the
  "1.7B params" stat on the site. Keep them out.

Last verified: Lighthouse mobile 97 / 100 / 100 / 100, desktop 100 performance.

## File layout

- `tailwind.config.ts`: **single source of truth** for design and motion tokens.
  It exports the Tailwind config (default), plus `palette`, `breakpoints` and `motion`,
  which JS and GSAP code import directly. Tailwind v4 loads it through `@config` in
  `app/globals.css`.
- `app/globals.css`: base element styles, focus ring, and the custom utilities
  `text-outline`, `bg-grain` and `bg-scanlines`, plus motion pre-states. Use `theme(colors.x)`
  for colours. The JS config emits **no** `--color-*` CSS variables, so `var(--color-x)` does not work.
- `components/`: presentational components. Client components only when they need a hook.
- `hooks/`: all GSAP, Lenis and cursor logic. Components never call `gsap` directly.
- `lib/gsap.ts`: registers plugins (ScrollTrigger, ScrambleTextPlugin), sets defaults, exports `MQ` media queries.
- `lib/sections.ts`: section registry (id + code). Drives the micro-labels, and later the status bar.
- `lib/content.ts`: all copy, links, projects, stack and stats. Keep text out of JSX.
  Stats derive from the data (`projects.length`, `techCount`, `recognition.length`) so they stay true.
- `lib/format.ts`: `formatStat` / `pad2`. Integers render two-digit ("06"). Server HTML and the count-up share this.

## Design tokens (tailwind.config.ts)

| Token | Value | Use |
|---|---|---|
| `ink` | #0A0A0B | page background |
| `panel` | #111113 | raised surfaces |
| `line` | #26262A | default 1px borders |
| `line-strong` | #3A3A40 | hover borders, wordmark outline |
| `paper` | #EDEBE6 | primary text |
| `dim` | #8F8C86 | secondary text (AA on ink) |
| `accent` | #E02020 | crimson. Use sparingly: name box, `//` in labels, focus ring, cursor active state |

- Fonts: `font-display` = Anton (heavy condensed, headings only). `font-mono` = JetBrains Mono (everything else).
- Type scale: `text-label` 14px uppercase micro-labels (the floor, labels only). `text-body` 16px.
  `text-ui` 16px for buttons and links. `text-lead`. `text-name`. `text-wordmark` (31vw).
  **Running text is never below 16px.**
- Spacing: `px-gutter`, `py-section`, `min-h-tap` (44px), `px-box-x`/`py-box-y` (em-based accent box padding), `statusbar`.
- `max-w-shell` (90rem) content width, `max-w-prose` (38rem), `max-w-measure` (46rem) for body copy.
- `text-h2`, `text-h3`, `text-stat`: Anton display sizes for section titles, case-file titles, stat numbers.
- `min-h-hero`: viewport minus the status bar.
- Grid templates live in the config (`grid-cols-pair/record/log/about/case/case-sm/detail/contact`).
  Never write `grid-cols-[...]` arbitrary values in JSX.
- **Accent is never used for small text.** Crimson on ink is 4.1:1, which fails AA below 24px.
  Use it for borders, the name box, decorative `//` (aria-hidden) and the focus ring.
  Active and "winner" states use an accent border with paper text.
- Border radius is overridden to 0 globally. No rounded corners, gradients, glass, or emoji.
- Borders are always `border` (1px) in `line` or `line-strong`.
- z-index: `z-statusbar` 40, `z-overlay` 50, `z-cursor` 60.
- Micro-label format: `// 01 _INDEX [01/05]`. Always render with `<SectionLabel id=... />`.

## Animation conventions

- Durations: `motion.duration.fast/base/slow` = 0.2 / 0.4 / 0.6s. Never exceed 0.6s.
- Easing: `motion.ease` = `power3.out` (GSAP). CSS equivalent: `ease-out` = cubic-bezier(0.22,1,0.36,1).
- Reveal: rise `motion.rise` (20px) + fade, children stagger `motion.stagger` (0.08s),
  ScrollTrigger `once: true`. Never replay.
- Mark animatable elements with `data-reveal`. While `html[data-motion="on"]` is set, CSS hides them
  so there is no flash before hydration. An inline script in `app/layout.tsx` sets the flag,
  skips it under reduced motion, and removes it after 4s as a no-JS-hydration fallback.
- Hero intro (`useHeroIntro`): `[data-scramble="TEXT"]` scrambles in with ScrambleTextPlugin,
  `[data-wipe]` accent box scales in from the left, then the rest of `[data-reveal]` rises in. Runs once.
- Every hook wraps its work in `gsap.matchMedia()` with `MQ.motionOk`, and sets the final state under `MQ.reduced`.
  Each hook cleans up with `ctx.revert()` / `mm.revert()`.
- Lenis (`useSmoothScroll`) runs on the GSAP ticker and calls `ScrollTrigger.update` on scroll.
  It is not created under reduced motion. It intercepts `a[href^="#"]`, scrolls to the target, then focuses it,
  so every section needs `tabIndex={-1}` and an `id` that matches `lib/sections.ts`.
- Cursor (`useCursor`): only under `MQ.desktop` (>=768px, fine pointer, motion OK). Crosshair is 20px,
  grows to 44px over `a, button, summary, input, [role=button], [data-cursor="grow"]`.
  `html[data-cursor="on"]` hides the native cursor.
- Grain + scanlines (`<Overlay />`): static, desktop only (`hidden md:block`), opacity tokens `grain` 0.05 and `scan` 0.035.

- Scroll reveal (`useReveal`): `<Section>` applies it to every `[data-reveal]` descendant using `ScrollTrigger.batch`,
  start `top 88%`, `once: true`. It sets the hidden state itself, so it does not rely on the CSS pre-state.
- Count-up (`useCountUp`): `[data-count]` + `data-decimals` + `data-suffix`. 0.6s, once. The visible number is aria-hidden,
  and the final value sits in a sr-only sibling.
- Case-file expand (`useExpand`): GSAP tweens height between 0 and `auto` in 0.4s, then calls `ScrollTrigger.refresh()`.
  The panel is `inert` while closed.
- Active section (`useActiveSection`) uses IntersectionObserver, not GSAP. The clock (`useClock`) shows IST and only fills in after mount.

### Motion inventory (data attributes to hooks)

| Attribute / class | Hook | Effect | Scope |
|---|---|---|---|
| `data-reveal` | useReveal | 20px rise + fade, batch stagger, once | all |
| `data-mask` | useReveal | clip-path wipe up + rise (section h2) | all |
| `data-scramble-in` | useReveal | text decodes on enter (micro-label code) | all |
| `data-line` | useReveal | 1px hairline draws left to right (section top) | all |
| `data-scramble`, `data-wipe` | useHeroIntro | hero name decode + accent box wipe | hero |
| `data-boot` | useHeroIntro | rises in with the hero intro (status bar) | page |
| `data-parallax` | useHeroIntro | wordmark drifts `motion.parallax` xPercent, scrub `motion.scrub` | desktop |
| `data-hover-scramble` | useHoverScramble | label re-decodes when its parent `a`/`button` is entered | desktop |
| `data-magnetic` | useMagnetic | leans toward pointer, clamp `motion.magnet.max` px | desktop |
| `data-panel-item` | useExpand | staggered rise when a case file opens | all |
| `data-cursor-readout` | useCursor | live X/Y coordinates beside the crosshair | desktop |
| `corner-ticks` (CSS) | n/a | accent corner brackets slide in on hover | all |
| `caret animate-caret` (CSS) | n/a | blinking block caret after the hero tagline | all |

- The status bar has a scroll-progress hairline (direct mapping, no easing) and an accent indicator that slides to the
  active section (`useStatusBarMotion`).
- Copy-email (`CopyButton` + `useScrambleTo`): the label decodes to "Copied", then reverts after `motion.copiedHold`.
  A hook owning `textContent` requires the element's React children to stay constant.
- "Desktop" means `MQ.desktop`: >=768px, fine pointer, motion OK.
- Under reduced motion, `globals.css` zeroes all CSS transitions and keyframe animations as well.
- Never put a GSAP-transformed element on the same node as Tailwind `translate-*` classes. Use a separate layer
  (see the hero wordmark).

## Accessibility

- Semantic sections with `aria-labelledby`. One `h1` (hero).
- Scrambling text is `aria-hidden`. The real text sits in a `sr-only` sibling.
- Visible focus: 2px accent outline, 4px offset, global `:focus-visible`. Never remove it.
- Touch targets are at least 44px (`min-h-tap`, `min-w-tap`).
- The skip link goes to `#main`. Tab order: skip link, status bar nav, content.
- Case files use the accordion pattern: `h3 > button[aria-expanded][aria-controls]` controls a `role=region`.
- External links carry a sr-only "(opens in new tab)".
