"use client";

import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { about, recognition, stats } from "@/lib/content";
import { formatStat } from "@/lib/format";
import { Section } from "./Section";

export function About() {
  const statsRef = useRef<HTMLDListElement>(null);
  useCountUp(statsRef);

  return (
    <Section id="about" title={about.title}>
      <div className="mt-16 grid gap-16 lg:grid-cols-about lg:gap-24">
        {/* Bio */}
        <div>
          <div className="max-w-measure space-y-6 text-lead">
            {about.bio.map((p, i) => (
              <p key={i} data-reveal className={i === 0 ? "text-paper" : "text-dim"}>
                {p}
              </p>
            ))}
          </div>

          <dl data-reveal className="mt-12 max-w-measure border-t border-line">
            {about.record.map(({ k, v }) => (
              <div key={k} className="grid gap-1 border-b border-line py-4 md:grid-cols-record md:gap-6">
                <dt className="text-label uppercase text-dim">{k}</dt>
                <dd className="text-body text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stat strip */}
        <dl ref={statsRef} className="grid grid-cols-1 border-l border-t border-line md:grid-cols-3 lg:grid-cols-1 lg:self-start">
          {stats.map((s) => {
            const final = formatStat(s.value, s.decimals, s.suffix);
            return (
              <div key={s.label} data-reveal className="corner-ticks flex flex-col gap-3 border-b border-r border-line p-5 md:p-6">
                <dt className="order-2 text-label uppercase text-dim">{s.label}</dt>
                <dd className="order-1 font-display text-stat text-paper">
                  <span className="sr-only">{final}</span>
                  <span
                    aria-hidden="true"
                    data-count={s.value}
                    data-decimals={s.decimals}
                    data-suffix={s.suffix}
                  >
                    {final}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Service record */}
      <div className="mt-24">
        <h3 data-reveal className="text-label uppercase text-dim">
          <span className="text-accent" aria-hidden="true">
            {"//"}
          </span>{" "}
          Service record: hackathons & wins
        </h3>
        <ol className="mt-6 border-t border-line">
          {recognition.map((r) => (
            <li
              key={r.title}
              data-reveal
              className="grid gap-2 border-b border-line py-5 md:grid-cols-log md:items-baseline md:gap-8"
            >
              <span className="text-label uppercase text-dim">{r.date}</span>
              <span>
                <span className="block text-body text-paper">{r.title}</span>
                <span className="block text-body text-dim">{r.where}</span>
              </span>
              <span
                className={`justify-self-start border px-2 py-1 text-label uppercase md:justify-self-end ${
                  r.tag === "Winner" ? "border-accent text-paper" : "border-line-strong text-dim"
                }`}
              >
                {r.tag}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
