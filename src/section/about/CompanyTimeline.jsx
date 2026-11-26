import { useEffect, useRef } from "react";

import Fireflies from "../../components/FireFlies";
import "../../styles/about/company-timeline.css";
import "../../styles/fireflies.css";

const milestones = [
  {
    year: "01 / BEGINNING",
    title: "Started with a shared ambition",
    description:
      "S-DevWorks began with two developers who wanted to create meaningful opportunities by bringing their abilities together and building something of their own.",
  },
  {
    year: "02 / QUALITY STANDARD",
    title: "Learning through real work",
    description:
      "Every project became an opportunity to improve the way we think, design, develop, test, and communicate — one practical step at a time.",
  },
  {
    year: "03 / BUILDING TOGETHER",
    title: "From ideas to working experiences",
    description:
      "The studio grew around a simple principle: thoughtful design and dependable development should work together, not become separate handoffs.",
  },
  {
    year: "04 / TODAY & BEYOND",
    title: "Creating what comes next",
    description:
      "We continue to build, learn, and evolve with every collaboration, keeping the work personal, purposeful, and ready for the future.",
  },
];

function CompanyTimeline() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("company-timeline-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="company-timeline-section" ref={sectionRef}>
      <Fireflies count={14} variant="founders" />

      <div className="company-timeline-container">
        <header className="company-timeline-header">
          <div className="company-timeline-eyebrow">
            <span className="company-timeline-line" />
            <span>07 / OUR JOURNEY</span>
          </div>
          <h2>
            Built deliberately.
            <br />
            <em>Growing continuously.</em>
          </h2>
          <p>
            A meaningful studio is not created in one moment. It is shaped by the
            work, the lessons, and the people who choose to build it together.
          </p>
        </header>

        <div className="company-timeline-list">
          <div className="company-timeline-track" aria-hidden="true" />
          {milestones.map((milestone, index) => (
            <article className="company-timeline-item" key={milestone.year}>
              <div className="company-timeline-marker">{String(index + 1).padStart(2, "0")}</div>
              <div className="company-timeline-card">
                <span>{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="company-timeline-number" aria-hidden="true">
        07
      </div>
    </section>
  );
}

export default CompanyTimeline;
