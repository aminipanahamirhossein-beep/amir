import { about } from '../data/site.js';
import ArrowLink from './ArrowLink.jsx';
import SectionIndex from './SectionIndex.jsx';
import Statistics from './Statistics.jsx';
import { useReveal } from '../hooks/useReveal.js';

export default function AboutSection() {
  const text = useReveal();
  const figure = useReveal({ delay: 100 });

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionIndex index={about.index} />

        <div className="about__grid">
          <div ref={text.ref} className={`about__text ${text.className}`} style={text.style}>
            <h2>{about.heading}</h2>
            <p>{about.paragraph}</p>
            <ArrowLink to="/about" className="arrow-link--muted">
              {about.linkLabel}
            </ArrowLink>
          </div>

          <div
            ref={figure.ref}
            className={`figure about__figure ${figure.className}`}
            style={figure.style}
          >
            <img src={about.image} alt={about.imageAlt} loading="lazy" decoding="async" />
          </div>

          <Statistics className="about__stats" />
        </div>
      </div>
    </section>
  );
}
