import { services } from '../data/site.js';
import SectionIndex from './SectionIndex.jsx';
import ServiceItem from './ServiceItem.jsx';
import { useReveal } from '../hooks/useReveal.js';

export default function ServicesSection() {
  const heading = useReveal();

  return (
    <section id="services" className="section">
      <div className="container">
        <SectionIndex index={services.index} />
        <div className="services__grid">
          <h2 ref={heading.ref} className={heading.className} style={heading.style}>
            {services.heading}
          </h2>
          <div className="services__items">
            {services.items.map((service, index) => (
              <ServiceItem key={service.title} service={service} delay={index * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
