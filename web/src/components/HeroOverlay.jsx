import ArrowIcon from './ArrowIcon.jsx';
import SectionLink from './SectionLink.jsx';

/**
 * Typographic overlay of the cinematic hero: one layer per text state, all
 * stacked in the same box so the scroll timeline can crossfade between them
 * without anything jumping. Every layer keeps the ATELIER type system — only
 * the opening state is the page's heading.
 */
export default function HeroOverlay({ states, registerLayer, isStatic = false }) {
  return (
    <div className="hero-states">
      {states.map((state, index) => {
        const Heading = index === 0 ? 'h1' : 'p';

        return (
          <div key={state.id} className="hero-state" ref={isStatic ? null : registerLayer(index)}>
            <p className="eyebrow hero-state__eyebrow">{state.eyebrow}</p>

            <Heading className="hero-state__title">
              {state.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </Heading>

            <p className="hero-state__copy lede">{state.paragraph}</p>

            {state.cta ? (
              <SectionLink section="projects" className="arrow-link hero-state__cta">
                <span>{state.cta}</span>
                <ArrowIcon className="arrow-link__arrow" />
              </SectionLink>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
