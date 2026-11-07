/** Grain + scanlines. Fixed, non-interactive, desktop only (hidden under md). */
export function Overlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-overlay hidden md:block">
      <div className="absolute inset-0 bg-grain opacity-grain" />
      <div className="absolute inset-0 bg-scanlines opacity-scan" />
    </div>
  );
}
