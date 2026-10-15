import ProjectCard from '../components/ProjectCard.jsx';
import SectionIndex from '../components/SectionIndex.jsx';
import { projects } from '../data/projects.js';

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-head">
          <SectionIndex index="02" />
          <h1 className="page-title">Projects</h1>
          <p className="page-lede">
            Built and ongoing work across residential, cultural, commercial and public projects —
            from single houses to civic buildings.
          </p>
          <p className="page-count">{projects.length} projects / 2020 — 2023</p>
        </div>

        <div className="portfolio__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={(index % 3) * 90} />
          ))}
        </div>
      </div>
    </div>
  );
}
