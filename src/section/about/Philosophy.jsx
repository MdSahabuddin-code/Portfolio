
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/about/philosophy.css";
import "../../styles/fireflies.css";

const principles = [
  {
    number: "01",
    title: "Purpose Before Pixels",
    description:
      "Every meaningful digital experience starts with understanding the problem. We believe in thinking through the purpose before deciding how something should look or work.",
    keyword: "THINK WITH PURPOSE",
  },
  {
    number: "02",
    title: "Design With Intention",
    description:
      "Good design is more than appearance. It's about clarity, thoughtful details, and creating experiences that feel natural and meaningful to the people using them.",
    keyword: "CREATE WITH INTENTION",
  },
  {
    number: "03",
    title: "Build To Evolve",
    description:
      "Technology never stands still, and neither should we. We believe in learning through every challenge, improving our approach, and building with the future in mind.",
    keyword: "GROW THROUGH CREATION",
  },
];

function Philosophy() {
  const sectionRef = useSectionParallax(0.45);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("philosophy-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="philosophy" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="philosophy-container">

        {/* SECTION INTRO */}
        <div className="philosophy-header">
          <div className="philosophy-eyebrow philosophy-reveal">
            <span className="philosophy-eyebrow-line" />
            <span>03 / WHAT DRIVES US</span>
          </div>

          <div className="philosophy-heading-grid">
            <h2 className="philosophy-title">
              More Than
              <br />
              <span>Just Code.</span>
            </h2>

            <p className="philosophy-intro philosophy-reveal">
              Good work is never just about the code.
              It's about the thinking behind it — the purpose,
              the details, and the intention behind every decision.
            </p>
          </div>
        </div>

        {/* PRINCIPLE CARDS */}
        <div className="philosophy-grid">
          {principles.map((principle, index) => (
            <article
              className="philosophy-card philosophy-reveal"
              style={{ "--delay": `${0.25 + index * 0.18}s` }}
              key={principle.number}
            >
              <div className="philosophy-card-top">
                <span className="philosophy-card-number">
                  {principle.number}
                </span>

                <span className="philosophy-card-symbol">
                  ↗
                </span>
              </div>

              <div className="philosophy-card-content">
                <h3>{principle.title}</h3>

                <p>{principle.description}</p>
              </div>

              <div className="philosophy-card-bottom">
                <span>{principle.keyword}</span>
                <span className="philosophy-card-indicator" />
              </div>
            </article>
          ))}
        </div>

        {/* CLOSING STATEMENT */}
        <div className="philosophy-footer philosophy-reveal">
          <span className="philosophy-footer-line" />

          <p>
            Thoughtful ideas.
            <span> Meaningful experiences.</span>
            <br />
            Development with purpose.
          </p>
        </div>
      </div>

      <div className="philosophy-background-number">03</div>
    </section>
  );
}

export default Philosophy;
