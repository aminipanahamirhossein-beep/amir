import { useReveal } from '../hooks/useReveal.js';
import ServiceIcon from './ServiceIcon.jsx';

export default function ServiceItem({ service, delay = 0 }) {
  const reveal = useReveal({ delay });

  return (
    <article
      ref={reveal.ref}
      className={`service-item ${reveal.className}`}
      style={reveal.style}
    >
      <ServiceIcon name={service.icon} />
      <h3 className="service-item__title">{service.title}</h3>
      <p className="service-item__text">{service.description}</p>
    </article>
  );
}
