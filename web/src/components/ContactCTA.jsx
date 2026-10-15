import { contactCta } from '../data/site.js';
import ArrowLink from './ArrowLink.jsx';
import SectionIndex from './SectionIndex.jsx';
import { useReveal } from '../hooks/useReveal.js';

export default function ContactCTA() {
  const grid = useReveal();

  return (
    <section id="contact" className="contact-cta">
      <div className="container">
        <SectionIndex index={contactCta.index} />

        <div ref={grid.ref} className={`contact-cta__grid ${grid.className}`} style={grid.style}>
          <h2 className="contact-cta__title">
            {contactCta.headingLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p className="contact-cta__copy">{contactCta.paragraph}</p>

          <ArrowLink to="/contact" className="arrow-link--muted contact-cta__link">
            {contactCta.cta}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
