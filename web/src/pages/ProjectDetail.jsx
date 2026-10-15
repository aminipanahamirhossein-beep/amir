import { useParams } from 'react-router-dom';
import ArrowLink from '../components/ArrowLink.jsx';
import NotFound from './NotFound.jsx';
import { getNextProject, getProject } from '../data/projects.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const next = getNextProject(project.slug);

  return (
    <div className="page">
      <div className="container">
        <ArrowLink to="/projects" back className="arrow-link--muted detail__back">
          All Projects
        </ArrowLink>

        <div className="detail__head">
          <div className="detail__head-main">
            <p className="eyebrow">
              {project.category} / {project.year}
            </p>
            <h1 className="detail__title">{project.title}</h1>
            <p className="page-lede">{project.summary}</p>
          </div>

          <dl className="detail__facts">
            {project.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt className="fact__label">{fact.label}</dt>
                <dd className="fact__value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="figure detail__figure">
          <img src={project.image} alt={project.imageAlt} decoding="async" />
        </div>

        <div className="detail__layout">
          <div className="detail__aside">
            <div>
              <h2 className="eyebrow">Scope</h2>
              <ul className="detail__list">
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="detail__body">
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="detail__gallery">
          {project.gallery.map((image, index) => (
            <div className="figure" key={image}>
              <img
                src={image}
                alt={`${project.title} — view ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {next && (
          <div className="detail__next">
            <div>
              <p className="eyebrow">Next project</p>
              <h2 className="detail__next-title">{next.title}</h2>
            </div>
            <ArrowLink to={`/projects/${next.slug}`} className="arrow-link--muted">
              View project
            </ArrowLink>
          </div>
        )}
      </div>
    </div>
  );
}
