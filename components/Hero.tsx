"use client";

import { useRef } from "react";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { profile, heroActions } from "@/lib/content";
import { SectionLabel } from "./SectionLabel";
import { GhostButton } from "./GhostButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);

  return (
    <section
      ref={ref}
      id="index"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative flex min-h-hero flex-col overflow-hidden border-b border-line outline-none"
    >
      {/* Outlined wordmark, wider than the viewport so it bleeds off both edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
      >
        {/* Separate layer so GSAP's transform never fights the centring translate. */}
        <div data-parallax>
          <p data-reveal className="whitespace-nowrap font-display text-wordmark uppercase text-outline">
            Portfolio
          </p>
        </div>
      </div>

      {/* Top rail */}
      <header className="relative mx-auto flex w-full max-w-shell items-start justify-between gap-8 px-gutter pt-8">
        <div data-reveal>
          <SectionLabel id="index" />
        </div>
        <dl data-reveal className="hidden gap-x-4 gap-y-1 text-label uppercase md:grid md:grid-cols-pair">
          {profile.meta.map(({ k, v }) => (
            <div key={k} className="contents">
              <dt className="text-dim">{k}:</dt>
              <dd className="text-paper">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Headline block */}
      <div className="relative mx-auto flex w-full max-w-shell flex-1 flex-col justify-center px-gutter py-16">
        <h1 id="hero-title" className="flex flex-col items-start gap-4">
          <span className="sr-only">
            {profile.greeting} {profile.name}
          </span>
          <span aria-hidden="true" data-reveal data-scramble={profile.greeting} className="text-lead text-dim">
            {profile.greeting}
          </span>
          <span
            aria-hidden="true"
            className="relative inline-block px-box-x py-box-y font-display text-name uppercase text-paper"
          >
            <span data-wipe data-reveal className="absolute inset-0 bg-accent" />
            {/* Invisible sizer keeps the box stable while letters scramble. */}
            <span className="invisible">{profile.name}</span>
            <span data-reveal data-scramble={profile.name.toUpperCase()} className="absolute inset-0 px-box-x py-box-y">
              {profile.name}
            </span>
          </span>
        </h1>

        <p data-reveal className="mt-8 max-w-prose text-lead text-paper">
          {profile.tagline}
          <span aria-hidden="true" className="caret animate-caret" />
        </p>

        <div data-reveal className="mt-10 flex flex-wrap gap-4">
          {heroActions.map((a) => (
            <GhostButton key={a.href} href={a.href} code={a.code}>
              {a.label}
            </GhostButton>
          ))}
        </div>
      </div>

      {/* Bottom rail */}
      <div className="relative border-t border-line">
        <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-4 px-gutter py-4 text-label uppercase text-dim">
          <span data-reveal>{profile.footnote}</span>
          <a
            data-reveal
            href="#about"
            className="inline-flex min-h-tap items-center transition-colors duration-fast ease-out hover:text-paper"
          >
            <span data-hover-scramble>Scroll</span>&nbsp;[&darr;]
          </a>
        </div>
      </div>
    </section>
  );
}
