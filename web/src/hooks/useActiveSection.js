import { useEffect, useState } from 'react';

/**
 * Tracks which page section currently occupies the middle of the viewport so
 * the header can underline the matching navigation item.
 */
export function useActiveSection(sectionIds, enabled = true) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return undefined;

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return enabled ? active : null;
}
