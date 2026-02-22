/**
 * Minimal animated divider between homepage sections.
 * Two thin lines + small diamond, subtle pulse. Static when prefers-reduced-motion.
 * Used only on the Home page.
 */
export function SectionDivider() {
  return (
    <div className="section-divider" role="presentation" aria-hidden>
      <span className="section-divider-line" />
      <span className="section-divider-diamond" />
      <span className="section-divider-line" />
    </div>
  );
}
