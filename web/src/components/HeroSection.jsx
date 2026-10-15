import { useState } from 'react';
import { hero } from '../data/site.js';
import { useCinematicHero } from '../hooks/useCinematicHero.js';
import { prefersReducedMotion } from '../lib/scroll.js';
import HeroOverlay from './HeroOverlay.jsx';

/**
 * Hero: a film the visitor scrubs with the page scroll.
 *
 * The section stands a few viewports tall and pins a full-height stage; the
 * scroll position inside it drives the video timeline and the four text states
 * (see useCinematicHero). The clip is never autoplayed — scrolling down moves
 * it towards its last frame, scrolling back up returns through the sequence —
 * and the section releases straight into About Us.
 */
export default function HeroSection() {
  // Read once: with reduced motion the hero is a poster, never a timeline.
  const [reducedMotion] = useState(() => prefersReducedMotion());
  const cinematic = useCinematicHero({ states: hero.states.length, enabled: !reducedMotion });

  const states = reducedMotion ? hero.states.slice(0, 1) : hero.states;
  const showsPoster = reducedMotion || cinematic.failed;

  return (
    <section
      id="home"
      className="hero-cinematic"
      data-static={reducedMotion ? 'true' : undefined}
      ref={cinematic.containerRef}
    >
      <div className="hero-cinematic__stage">
        <div className="hero-cinematic__media">
          {showsPoster ? (
            <img
              className="hero-cinematic__video"
              src={hero.poster}
              alt={hero.posterAlt}
              width="640"
              height="480"
              decoding="async"
            />
          ) : (
            <video
              ref={cinematic.videoRef}
              className="hero-cinematic__video"
              src={hero.video}
              poster={hero.poster}
              preload="auto"
              muted
              playsInline
              loop={false}
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="hero-cinematic__veil" aria-hidden="true" />
        <div className="hero-cinematic__scrim" aria-hidden="true" />

        <HeroOverlay
          states={states}
          registerLayer={cinematic.registerLayer}
          isStatic={reducedMotion}
        />
      </div>
    </section>
  );
}
