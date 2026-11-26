
import { useEffect, useMemo, useRef, useState } from "react";

import projectsData from "../../data/projectsData";

import "../../styles/projects/project-collection.css";

function ProjectCollection({ onProjectClick }) {
  const sectionRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Reveal the collection when it enters the viewport
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("collection-visible");
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Generate categories dynamically
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projectsData.map((project) => project.category)),
    ];

    return ["All Projects", ...uniqueCategories];
  }, []);

  // Search, filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projectsData];

    // Category filter
    if (activeCategory !== "All Projects") {
      result = result.filter(
        (project) => project.category === activeCategory
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter((project) => {
        const searchableContent = [
          project.title,
          project.subtitle,
          project.description,
          project.category,
          ...(project.technologies || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableContent.includes(query);
      });
    }

    // Sorting
    if (sortOrder === "newest") {
      result.sort((a, b) => Number(b.year) - Number(a.year));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => Number(a.year) - Number(b.year));
    } else if (sortOrder === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, searchQuery, sortOrder]);

  return (
    <section
      className="project-collection-section"
      id="project-collection"
      ref={sectionRef}
    >
      <div className="project-collection-container">

        {/* Section Heading */}
        <div className="collection-heading collection-reveal">
          <div className="collection-eyebrow">
            <span>03</span>
            <span className="collection-heading-line" />
            <span>THE COLLECTION</span>
          </div>

          <h2>
            Explore Our <span>Work.</span>
          </h2>

          <p>
            A collection of ideas, experiences, and digital
            solutions crafted with purpose.
          </p>
        </div>

        {/* Search */}
        <div className="collection-search-wrapper collection-reveal">
          <span className="collection-search-icon">⌕</span>

          <input
            type="search"
            placeholder="Search projects, technologies..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search projects"
          />

          {searchQuery && (
            <button
              className="collection-clear-search"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="collection-toolbar collection-reveal">

          <div className="collection-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "collection-category active"
                    : "collection-category"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="collection-sort">
            <label htmlFor="project-sort">SORT BY</label>

            <select
              id="project-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A – Z</option>
            </select>
          </div>

        </div>

        {/* Project Count */}
        <div className="collection-results-info collection-reveal">
          <span>
            SHOWING {filteredProjects.length} PROJECT
            {filteredProjects.length !== 1 ? "S" : ""}
          </span>

          <span>SELECTED WORK / S-DEVWORKS</span>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="project-collection-grid">

            {filteredProjects.map((project, index) => (
              <article
                className="collection-project-card"
                key={project.id}
                style={{ "--card-index": index }}
              >
                {/* Project Image */}
                <div className="collection-project-image">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                  />

                  <div className="collection-project-overlay" />

                  <span className="collection-project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <button
                    className="collection-project-open"
                    onClick={() => onProjectClick?.(project)}
                    aria-label={`View ${project.title}`}
                  >
                    ↗
                  </button>
                </div>

                {/* Project Information */}
                <div className="collection-project-information">

                  <div className="collection-project-meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.subtitle}</p>

                  {/* Technologies */}
                  <div className="collection-project-technologies">
                    {project.technologies?.slice(0, 4).map((technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Project Details */}
                  <button
                    className="collection-project-details"
                    onClick={() => onProjectClick?.(project)}
                  >
                    VIEW PROJECT
                    <span>↗</span>
                  </button>

                </div>
              </article>
            ))}

          </div>
        ) : (
          /* Empty State */
          <div className="collection-empty-state">
            <span>NO PROJECTS FOUND</span>

            <p>
              Try another search term or category.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Projects");
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default ProjectCollection;
