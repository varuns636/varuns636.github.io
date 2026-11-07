import { pad2 } from "./format";

/** Section registry. Drives micro-labels, anchors and the status bar nav. */
export const SECTIONS = [
  { id: "index", code: "INDEX" },
  { id: "about", code: "ABOUT" },
  { id: "projects", code: "CASE_FILES" },
  { id: "stack", code: "STACK" },
  { id: "contact", code: "CONTACT" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const SECTION_IDS: readonly SectionId[] = SECTIONS.map((s) => s.id);

/** "// 01 _INDEX [01/05]" */
export function sectionLabel(id: SectionId) {
  const i = SECTIONS.findIndex((s) => s.id === id) + 1;
  return { num: pad2(i), code: SECTIONS[i - 1].code, total: pad2(SECTIONS.length) };
}
