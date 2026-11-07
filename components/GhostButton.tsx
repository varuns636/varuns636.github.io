import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "children"> & { code?: string; children: string };

/** 1px outlined link-button. Inverts on hover/focus, leans toward the pointer, label re-decodes. Min 44px tall. */
export function GhostButton({ code, children, className = "", ...rest }: Props) {
  return (
    <a
      {...rest}
      data-magnetic
      className={`group inline-flex min-h-tap items-center gap-3 border border-line-strong px-5 py-3 text-ui uppercase text-paper transition-colors duration-fast ease-out hover:border-paper hover:bg-paper hover:text-ink focus-visible:border-paper ${className}`}
    >
      {code && (
        <span className="text-dim transition-colors duration-fast ease-out group-hover:text-ink" aria-hidden="true">
          [{code}]
        </span>
      )}
      <span data-hover-scramble>{children}</span>
    </a>
  );
}
