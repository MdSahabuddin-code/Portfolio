
import ProjectsBackground from "../components/ProjectsBackground";

import ProjectsHero from "../section/projects/ProjectsHero";
import FeaturedProject from "../section/projects/FeaturedProject";
import ProjectCollection from "../section/projects/ProjectCollection";

function Projects() {
  return (
    <main className="projects-page">
      <ProjectsBackground />

      <ProjectsHero />
      <FeaturedProject />
      <ProjectCollection />
    </main>
  );
}

export default Projects;
