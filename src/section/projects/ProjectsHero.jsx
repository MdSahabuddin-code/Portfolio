
import { useEffect } from "react";
import { Link } from "react-router-dom";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/projects/projects-hero.css";
import "../../styles/fireflies.css";

function ProjectsHero() {
  const sectionRef = useSectionParallax(0.25);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("projects-hero-visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      className="projects-hero"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="projects-hero-background" />

      <div className="projects-hero-overlay" />

      {/* Fireflies */}
      <Fireflies count={20} variant="founders" />

      {/* Content */}
      <div className="projects-hero-content">

        <div className="projects-hero-eyebrow">
          <span className="projects-hero-line" />
          <span> S-DEVWORKS / OUR CREATIVE UNIVERSE </span>
        </div>

        <h1 className="projects-hero-title">
          <span className="projects-title-line">
            We Create
          </span>

          <span className="projects-title-highlight">
            Digital
          </span>

          <span className="projects-title-line">
            Experiences.
          </span>
        </h1>

        <p className="projects-hero-description">
          From ambitious ideas to meaningful digital
          experiences. Explore the work, creativity,
          and technology behind everything we build.
        </p>

        <div className="projects-hero-actions">
          <a
            href="#project-collection"
            className="projects-hero-primary"
          >
            Explore Our Work
            <span>↗</span>
          </a>

          <Link
            to="/contact"
            className="projects-hero-secondary"
          >
            Start a Project
          </Link>
        </div>

        <div className="projects-hero-footer">

          <div className="projects-hero-scroll">
            <span className="projects-scroll-icon">
              ↓
            </span>

            <span>SCROLL TO DISCOVER</span>
          </div>

          <span className="projects-hero-index">
            SELECTED WORK — 2026
          </span>

        </div>
      </div>

      {/* Decorative watermark */}
      <div className="projects-hero-watermark">
        PROJECTS
      </div>

      <div className="projects-hero-corner">
        01 / 04
      </div>

    </section>
  );
}

export default ProjectsHero;
