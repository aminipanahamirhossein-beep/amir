import { featuredProjects } from '../data/projects.js';
import ArrowLink from './ArrowLink.jsx';
import ProjectCard from './ProjectCard.jsx';
import SectionIndex from './SectionIndex.jsx';
import { useReveal } from '../hooks/useReveal.js';

export default function FeaturedProjects() {
  const head = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionIndex index="02" />
        <div ref={head.ref} className={`section-head ${head.className}`} style={head.style}>
          <h2>Featured Projects</h2>
          <ArrowLink to="/projects" className="arrow-link--muted">
            View All Projects
          </ArrowLink>
        </div>
        <div className="projects__grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
