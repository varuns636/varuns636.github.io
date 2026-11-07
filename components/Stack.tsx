import { stackGroups, techCount } from "@/lib/content";
import { pad2 } from "@/lib/format";
import { Section } from "./Section";

export function Stack() {
  return (
    <Section id="stack" title="Tools I reach for">
      <p data-reveal className="mt-8 max-w-measure text-lead text-dim">
        {pad2(techCount)} technologies across four disciplines. No percentage bars: I&apos;d rather show the work.
      </p>

      <div className="mt-16 space-y-16">
        {stackGroups.map((g) => (
          <div key={g.code}>
            <div data-reveal className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <h3 className="text-label uppercase text-paper">
                <span className="text-accent" aria-hidden="true">
                  {"//"}
                </span>{" "}
                _{g.code} <span className="text-dim">[{pad2(g.items.length)}]</span>
              </h3>
              <p className="text-body text-dim">{g.note}</p>
            </div>
            <ul className="mt-4 grid grid-cols-2 border-l border-t border-line md:grid-cols-3 lg:grid-cols-4">
              {g.items.map((t) => (
                <li
                  key={t}
                  data-reveal
                  className="corner-ticks flex min-h-tap items-center border-b border-r border-line px-4 py-5 text-body text-paper transition-colors duration-fast ease-out hover:bg-panel"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
