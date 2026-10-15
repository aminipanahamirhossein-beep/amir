/** Shared scroll behaviour: honours the user's motion preference everywhere. */

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function scrollToSection(section) {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

  if (section === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
}
