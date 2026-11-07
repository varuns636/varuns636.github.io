"use client";

import { useId, useRef, useState } from "react";
import { useExpand } from "@/hooks/useExpand";
import type { Project } from "@/lib/content";
import { pad2 } from "@/lib/format";

/** Expandable project card. Accordion pattern: h3 > button[aria-expanded] controls a region. */
export function CaseFile({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useExpand(panel, open);

  const fileNo = `FILE ${pad2(index + 1)}`;

  return (
    <article
      data-reveal
      className={`border-b border-line transition-colors duration-fast ease-out ${open ? "bg-panel" : "hover:bg-panel"}`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="grid w-full grid-cols-case-sm items-start gap-x-4 gap-y-3 px-4 py-6 md:grid-cols-case text-left md:gap-x-8 md:px-6 md:py-8"
        >
          <span className="text-label uppercase text-dim md:pt-2">{fileNo}</span>
          <span className="order-last col-span-2 flex flex-col gap-3 md:order-none md:col-span-1">
            <span className="font-display text-h3 uppercase text-paper">{project.title}</span>
            <span className="text-body text-dim">{project.oneLiner}</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1 text-label uppercase text-dim">
              <span>{project.kind}</span>
              <span aria-hidden="true">/</span>
              <span className="text-paper">{project.status}</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`text-label transition-colors md:pt-2 duration-fast ease-out ${open ? "text-paper" : "text-dim"}`}
          >
            {open ? "[-]" : "[+]"}
          </span>
        </button>
      </h3>

      <div
        ref={panel}
        id={panelId}
        role="region"
        aria-label={`${project.title} details`}
        inert={!open}
        className="h-0 overflow-hidden"
      >
        <div className="grid gap-10 border-t border-line px-4 py-8 md:px-6 lg:grid-cols-detail lg:gap-16">
          <div className="max-w-measure">
            <p data-panel-item className="text-body text-paper">
              {project.summary}
            </p>
            {project.points.length > 0 && (
              <ul className="mt-6 space-y-3">
                {project.points.map((pt) => (
                  <li key={pt} data-panel-item className="grid grid-cols-pair justify-start gap-3 text-body text-dim">
                    <span className="text-accent" aria-hidden="true">
                      &gt;
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <dl className="space-y-8">
            {project.stack.length > 0 && (
              <div data-panel-item>
                <dt className="text-label uppercase text-dim">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="border border-line-strong px-2 py-1 text-body text-paper">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {project.links.length > 0 && (
              <div data-panel-item>
                <dt className="text-label uppercase text-dim">Links</dt>
                <dd className="mt-3 flex flex-col items-start gap-1">
                  {project.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-tap items-center gap-2 text-ui uppercase text-paper underline decoration-line-strong underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
                    >
                      <span data-hover-scramble>{l.label}</span> <span aria-hidden="true">&#8599;</span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </article>
  );
}
