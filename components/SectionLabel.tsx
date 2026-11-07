import { sectionLabel, type SectionId } from "@/lib/sections";

/** Monospace micro-label: "// 01 _INDEX [01/05]" */
export function SectionLabel({ id, className = "" }: { id: SectionId; className?: string }) {
  const { num, code, total } = sectionLabel(id);
  return (
    <p className={`text-label uppercase text-dim ${className}`}>
      <span className="text-accent" aria-hidden="true">
        {"//"}
      </span>{" "}
      <span data-scramble-in>
        {num} _{code}
      </span>{" "}
      <span aria-hidden="true">
        [{num}/{total}]
      </span>
    </p>
  );
}
