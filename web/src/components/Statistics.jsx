import { statistics } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';

/** Studio statistics, stacked with hairline separators. */
export default function Statistics({ className = '' }) {
  const reveal = useReveal();

  return (
    <dl ref={reveal.ref} className={`stats ${className} ${reveal.className}`.trim()} style={reveal.style}>
      {statistics.map((stat) => (
        <div className="stat" key={stat.caption}>
          <dt className="stat__value">{stat.value}</dt>
          <dd className="stat__caption">{stat.caption}</dd>
        </div>
      ))}
    </dl>
  );
}
