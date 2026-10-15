import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';
import ArrowIcon from './ArrowIcon.jsx';

export default function ProjectCard({ project, delay = 0 }) {
  const reveal = useReveal({ delay });

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={reveal.ref}
      className={`project-card ${reveal.className}`}
      style={reveal.style}
    >
      <div className="figure project-card__figure">
        <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
      </div>
      <div>
        <div className="project-card__head">
          <h3 className="project-card__title">{project.title}</h3>
          <ArrowIcon className="project-card__arrow" width={22} />
        </div>
        <p className="project-card__meta meta">
          {project.category} / {project.year}
        </p>
      </div>
    </Link>
  );
}
