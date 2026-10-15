import ArrowLink from '../components/ArrowLink.jsx';
import SectionIndex from '../components/SectionIndex.jsx';
import Statistics from '../components/Statistics.jsx';
import { about, studioPage } from '../data/site.js';

export default function StudioPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <SectionIndex index="01" />
          <p className="eyebrow">{studioPage.eyebrow}</p>
          <h1 className="page-title">{studioPage.heading}</h1>
          <p className="page-lede">{studioPage.lede}</p>
        </div>

        <div className="studio__grid">
          <div className="about__text">
            <h2>{about.heading}</h2>
            <p>{about.paragraph}</p>
            <ul className="capabilities">
              {studioPage.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>

          <div className="figure about__figure">
            <img
              src="/images/about-studio-interior.jpg"
              alt="Interior of a studio space with a concrete wall and natural light"
              loading="lazy"
              decoding="async"
            />
          </div>

          <Statistics className="studio__facts" />
        </div>

        <div className="principles">
          {studioPage.principles.map((principle) => (
            <article className="principle" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>

        <div className="studio__cta">
          <h2>Have a project in mind?</h2>
          <ArrowLink to="/contact" className="arrow-link--muted">
            Start a conversation
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
