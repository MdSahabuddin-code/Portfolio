
import { useEffect, useRef } from "react";

import projectsData from "../../data/projectsData";
import Fireflies from "../../components/FireFlies";

import "../../styles/projects/featured-projects.css";

function FeaturedProject({ onProjectClick }) {
  const sectionRef = useRef(null);

  const featuredProject = projectsData.find(
    (project) => project.featured
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("featured-project-visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!featuredProject) return null;

  return (
    <section
      className="featured-project-section"
      ref={sectionRef}
    >
      {/* Decorative particles */}
      <Fireflies count={16} variant="projects" />

      <div className="featured-project-container">

        {/* Section heading */}
        <div className="featured-project-heading">
          <div className="featured-project-label">
            <span>02</span>
            <span className="featured-heading-line" />
            <span>FEATURED PROJECT</span>
          </div>

          <p>
            A closer look at the work
            that defines our approach.
          </p>
        </div>

        {/* Featured project */}
        <div className="featured-project-layout">

          {/* Project image */}
          <div className="featured-project-image-wrapper">
            <img
              src={featuredProject.thumbnail}
              alt={featuredProject.title}
              className="featured-project-image"
            />

            <div className="featured-image-overlay" />

            <span className="featured-image-index">
              01 / FEATURED
            </span>

            <button
              className="featured-image-open"
              onClick={() => onProjectClick?.(featuredProject)}
              aria-label={`View details for ${featuredProject.title}`}
            >
              ↗
            </button>
          </div>

          {/* Project information */}
          <div className="featured-project-information">

            <span className="featured-project-category">
              {featuredProject.category} — {featuredProject.year}
            </span>

            <h2>{featuredProject.title}</h2>

            <h3>{featuredProject.subtitle}</h3>

            <p className="featured-project-description">
              {featuredProject.description}
            </p>

            {/* Technologies */}
            <div className="featured-project-technologies">
              {featuredProject.technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>

            {/* Explore button */}
            <button
              className="featured-project-link"
              onClick={() => onProjectClick?.(featuredProject)}
            >
              EXPLORE PROJECT
              <span>↗</span>
            </button>

          </div>
        </div>

        {/* Bottom details */}
        <div className="featured-project-bottom">
          <span>SELECTED WORK / S-DEVWORKS</span>
          <span>{featuredProject.year}</span>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProject;
