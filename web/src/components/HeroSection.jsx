import { hero } from '../data/site.js';
import ArrowIcon from './ArrowIcon.jsx';
import SectionLink from './SectionLink.jsx';
import { useReveal } from '../hooks/useReveal.js';

export default function HeroSection() {
  const content = useReveal();
  const figure = useReveal({ delay: 120 });

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div ref={content.ref} className={`hero__content ${content.className}`} style={content.style}>
          <p className="eyebrow">{hero.eyebrow}</p>

          <h1 className="hero__title">
            {hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className="hero__paragraph lede">{hero.paragraph}</p>

          <SectionLink section="projects" className="arrow-link">
            <span>{hero.cta}</span>
            <ArrowIcon className="arrow-link__arrow" />
          </SectionLink>
        </div>

        <div
          ref={figure.ref}
          className={`figure hero__figure ${figure.className}`}
          style={figure.style}
        >
          <img
            src={hero.image}
            alt={hero.imageAlt}
            width="1900"
            height="1188"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
