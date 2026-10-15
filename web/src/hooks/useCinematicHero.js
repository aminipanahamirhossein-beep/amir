import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven timeline engine for the cinematic hero.
 *
 * The scroll position inside the tall hero wrapper is the single source of
 * truth: it normalises to a 0–1 progress value that drives the video's
 * `currentTime` and every text state overlay. The video is never played — it is
 * scrubbed from a poster-like first frame to its final frame and back — and
 * nothing re-renders React while scrolling: one `requestAnimationFrame` loop
 * reads the layout, eases the progress and writes straight to the DOM, so the
 * sequence stays smooth, deterministic and reversible in both directions.
 */

/** Progress is always clamped to 0–1. */
const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);

/** One 24fps frame: seeking more often than this only queues redundant work. */
const SEEK_STEP = 1 / 24;

/**
 * Share of a state's segment spent crossfading, centred on the boundary with
 * its neighbour: one state hands over to the next with no blank gap and no
 * double exposure, whichever direction the visitor scrolls.
 */
const FADE = 0.16;

/** How quickly the rendered progress settles onto the scroll-derived target. */
const SETTLE = 0.2;

/** The eased progress is close enough to the target to stop scheduling frames. */
const SETTLED = 0.0005;

/** Pixels a text state drifts while fading in (from below) and out (upwards). */
const DRIFT = 22;

export function useCinematicHero({ states, enabled = true }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const layersRef = useRef([]);
  const refFactories = useRef(new Map());
  const [failed, setFailed] = useState(false);

  /** Stable ref callback per text state, so React never re-attaches them. */
  const registerLayer = useCallback((index) => {
    if (!refFactories.current.has(index)) {
      refFactories.current.set(index, (node) => {
        layersRef.current[index] = node;
      });
    }

    return refFactories.current.get(index);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return undefined;

    let rafId = 0;
    let target = 0; // progress derived from the current scroll position
    let rendered = 0; // eased progress actually on screen
    let started = false;
    let duration = 0; // seconds — only trusted once metadata has arrived
    let lastSeek = Number.NEGATIVE_INFINITY; // no seek issued yet
    let paintedState = -1;

    /** Writes one progress value to the video and to every text state. */
    const paint = (progress) => {
      const segment = 1 / states;

      layersRef.current.forEach((layer, index) => {
        if (!layer) return;

        const local = (progress - index * segment) / segment;
        // The opening state is settled from p=0, the last one holds at p=1.
        const entering = index === 0 ? 1 : clamp01((local + FADE) / FADE);
        const leaving = index === states - 1 ? 1 : clamp01((1 - local) / FADE);
        const opacity = Math.min(entering, leaving);
        const drift = (1 - opacity) * DRIFT * (local < 0.5 ? 1 : -1);

        layer.style.opacity = opacity.toFixed(3);
        layer.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0)`;
        // A faded-out state leaves the tab order so its CTA can't trap focus.
        layer.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
        layer.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
      });

      // The scrims read this, so overlay intensity follows the footage.
      container.style.setProperty('--hero-progress', progress.toFixed(4));

      const index = Math.min(states - 1, Math.floor(progress * states));
      if (index !== paintedState) {
        paintedState = index;
        container.dataset.active = String(index);
      }

      if (!duration || !video) return;

      // One seek per animation frame, and only once it moves a whole frame on.
      const time = clamp01(progress) * duration;
      if (Math.abs(time - lastSeek) >= SEEK_STEP) {
        lastSeek = time;
        video.currentTime = Math.min(time, Math.max(duration - SEEK_STEP, 0));
      }
    };

    /** Single layout read per frame, never inside the scroll event itself. */
    const measure = () => {
      const rect = container.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = travel > 0 ? clamp01(-rect.top / travel) : 0;
    };

    const frame = () => {
      rafId = 0;
      measure();

      rendered = started ? rendered + (target - rendered) * SETTLE : target;
      started = true;
      if (Math.abs(target - rendered) < SETTLED) rendered = target;

      paint(rendered);

      if (rendered !== target) schedule();
    };

    function schedule() {
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    /** Duration is only read once the media reports it. */
    const readDuration = () => {
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
        schedule();
      }
    };

    const handleError = () => setFailed(true);

    if (video) {
      // Playback is never the driver: keep the element parked on the timeline.
      video.pause();
      if (video.readyState >= 1) readDuration();
      else video.addEventListener('loadedmetadata', readDuration);
      video.addEventListener('error', handleError);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    measure();
    rendered = target;
    started = true;
    paint(rendered);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (video) {
        video.removeEventListener('loadedmetadata', readDuration);
        video.removeEventListener('error', handleError);
      }
    };
  }, [enabled, states]);

  return { containerRef, videoRef, registerLayer, failed };
}
