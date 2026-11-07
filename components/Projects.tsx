import { projects } from "@/lib/content";
import { CaseFile } from "./CaseFile";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" title="Case files">
      <p data-reveal className="mt-8 max-w-measure text-lead text-dim">
        Things I&apos;ve built. Open a file for the details.
      </p>

      <div className="mt-16 border-x border-t border-line">
        {projects.map((p, i) => (
          <CaseFile key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
