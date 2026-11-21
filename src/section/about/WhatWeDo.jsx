
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/about/what-we-do.css";
import "../../styles/fireflies.css";

const capabilities = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Responsive websites and web applications built to perform smoothly across devices, with a focus on functionality, accessibility, and maintainability.",
    tags: "REACT · JAVASCRIPT · PHP",
  },
  {
    number: "02",
    title: "UI / UX Design",
    description:
      "Thoughtful interfaces and intuitive user experiences that bring clarity to complex ideas and make every interaction feel natural.",
    tags: "USER EXPERIENCE · INTERFACE DESIGN",
  },
  {
    number: "03",
    title: "Backend & Database",
    description:
      "Structured server-side solutions and database systems that support reliable functionality, organised data, and future growth.",
    tags: "JAVA · SQL · API DEVELOPMENT",
  },
  {
    number: "04",
    title: "Creative Solutions",
    description:
      "Practical digital solutions shaped around unique requirements, combining technical thinking with a willingness to explore new possibilities.",
    tags: "IDEAS · PROBLEM SOLVING · INNOVATION",
  },
];

function WhatWeDo() {
  const sectionRef = useSectionParallax(0.3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("what-we-do-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="what-we-do" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="what-we-do-container">
        <header className="what-we-do-header">
          <div className="what-we-do-eyebrow">
            <span className="what-we-do-eyebrow-line" />
            <span>05 / WHAT WE DO</span>
          </div>

          <div className="what-we-do-heading-grid">
            <h2 className="what-we-do-title">
              Ideas Into
              <br />
              <span>Digital</span>
              <br />
              <em>Experiences.</em>
            </h2>

            <div className="what-we-do-intro">
              <span className="what-we-do-intro-label">
                OUR CAPABILITIES
              </span>

              <p>
                We bring together design thinking and development
                to create digital experiences that are purposeful,
                functional, and built around real needs.
              </p>

              <p className="what-we-do-intro-secondary">
                Our capabilities continue to grow with every project,
                challenge, and opportunity to learn.
              </p>
            </div>
          </div>
        </header>

        <div className="what-we-do-content">
          <div className="what-we-do-side-note">
            <span>WHAT WE BRING</span>
            <span className="what-we-do-side-line" />
            <span>OUR EXPERTISE / 2026</span>
          </div>

          <div className="what-we-do-list">
            {capabilities.map((item, index) => (
              <article
                className="capability-item"
                key={item.number}
                style={{ "--capability-delay": `${0.2 + index * 0.15}s` }}
              >
                <div className="capability-top">
                  <span className="capability-number">{item.number}</span>
                  <span className="capability-arrow">↗</span>
                </div>

                <div className="capability-main">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="capability-tags">{item.tags}</span>
                </div>

                <span className="capability-bottom-line" />
              </article>
            ))}
          </div>
        </div>

        <div className="what-we-do-closing">
          <div className="what-we-do-closing-mark">S.</div>

          <div className="what-we-do-closing-content">
            <span>THE WORK IS JUST THE BEGINNING.</span>

            <p>
              We are here to turn thoughtful ideas into
              <em> something meaningful.</em>
            </p>
          </div>
        </div>
      </div>

      <div className="what-we-do-background-number">05</div>
    </section>
  );
}

export default WhatWeDo;
