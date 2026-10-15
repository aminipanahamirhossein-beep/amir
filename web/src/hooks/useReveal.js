import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/scroll.js';

/**
 * Fade-and-rise entrance for any element, applied to the element itself so it
 * never introduces a wrapper node into a grid. Returns the pieces to spread.
 */
export function useReveal({ delay = 0 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (visible) return undefined;

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return {
    ref,
    className: `reveal${visible ? ' is-visible' : ''}`,
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  };
}
