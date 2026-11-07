import { contact, links, profile } from "@/lib/content";
import { CopyButton } from "./CopyButton";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title={contact.title}>
      <p data-reveal className="mt-8 max-w-measure text-lead text-dim">
        {contact.note}
      </p>

      <ul className="mt-16 border-t border-line">
        {contact.channels.map((c) => {
          const isEmail = c.href.startsWith("mailto:");
          return (
            <li key={c.k} data-reveal className="flex items-center gap-4 border-b border-line">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid min-h-tap flex-1 grid-cols-pair items-center gap-x-6 gap-y-1 px-2 py-6 transition-colors duration-fast ease-out hover:bg-panel md:grid-cols-contact md:px-4"
              >
                <span className="hidden text-label uppercase text-dim md:block">[{c.code}]</span>
                <span className="text-label uppercase text-dim">
                  <span data-hover-scramble>{c.k}</span>
                </span>
                <span className="col-span-2 break-all text-lead text-paper transition-transform duration-fast ease-out group-hover:translate-x-2 md:col-span-1">
                  {c.v}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-lead text-dim transition duration-fast ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block"
                >
                  &#8599;
                </span>
                {c.external && <span className="sr-only">(opens in new tab)</span>}
              </a>
              {isEmail && (
                <span className="pr-2 md:pr-4">
                  <CopyButton value={links.email} what="Email address" />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <footer className="mt-24 flex flex-col gap-4 text-label uppercase text-dim md:flex-row md:items-center md:justify-between">
        <p>&copy; 2026 {profile.fullName}. Built with Next.js, GSAP &amp; Lenis.</p>
        <a
          href="#index"
          data-magnetic
          className="inline-flex min-h-tap items-center transition-colors duration-fast ease-out hover:text-paper"
        >
          <span data-hover-scramble>Back to top</span>&nbsp;[&uarr;]
        </a>
      </footer>
    </Section>
  );
}
