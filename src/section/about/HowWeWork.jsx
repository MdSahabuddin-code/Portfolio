
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/about/how-we-work.css";
import "../../styles/fireflies.css";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "UNDERSTAND THE VISION",
    description:
      "Every project begins with a conversation. We take time to understand your idea, your goals, and the people you're building for.",
    detail: "LISTEN · EXPLORE · DEFINE",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "SHAPE THE EXPERIENCE",
    description:
      "We turn ideas into a clear direction, planning the structure, user experience, and visual language before development begins.",
    detail: "PLAN · STRUCTURE · CREATE",
  },
  {
    number: "03",
    title: "Develop",
    subtitle: "BRING IDEAS TO LIFE",
    description:
      "With a clear direction in place, we build the experience with thoughtful code, attention to detail, and a focus on usability.",
    detail: "BUILD · REFINE · IMPROVE",
  },
  {
    number: "04",
    title: "Deliver",
    subtitle: "MAKE IT READY FOR THE WORLD",
    description:
      "We test, polish, and prepare the final product for launch, making sure every detail is ready for the people who will use it.",
    detail: "TEST · POLISH · LAUNCH",
  },
];

function HowWeWork() {
  const sectionRef = useSectionParallax(0.35);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("how-we-work-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="how-we-work" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="how-we-work-container">
        <header className="how-we-work-header">
          <div className="how-we-work-eyebrow">
            <span className="how-we-work-eyebrow-line" />
            <span>04 / THE PROCESS</span>
          </div>

          <div className="how-we-work-heading-grid">
            <h2 className="how-we-work-title">
              From First
              <br />
              <span>Thought to</span>
              <br />
              <em>Final Creation.</em>
            </h2>

            <div className="how-we-work-intro">
              <span className="how-we-work-intro-label">
                A THOUGHTFUL APPROACH
              </span>

              <p>
                Great digital experiences don't happen by accident.
                They grow through a process of understanding,
                creativity, collaboration, and continuous refinement.
              </p>

              <span className="how-we-work-intro-note">
                FOUR STEPS. ONE SHARED VISION.
              </span>
            </div>
          </div>
        </header>

        <div className="how-we-work-process">
          <div className="how-we-work-track" aria-hidden="true">
            <span className="how-we-work-track-fill" />
          </div>

          <div className="how-we-work-grid">
            {processSteps.map((step, index) => (
              <article
                className="process-step"
                key={step.number}
                style={{ "--step-delay": `${0.25 + index * 0.18}s` }}
              >
                <div className="process-step-top">
                  <span className="process-step-number">
                    {step.number}
                  </span>
                  <span className="process-step-dot" />
                </div>

                <div className="process-step-content">
                  <span className="process-step-subtitle">
                    {step.subtitle}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>

                <div className="process-step-bottom">
                  <span>{step.detail}</span>
                  <span className="process-step-arrow">↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="how-we-work-footer">
          <span className="how-we-work-footer-line" />
          <p>
            No shortcuts.
            <span> No unnecessary complexity.</span>
            <br />
            Just thoughtful work, from beginning to end.
          </p>
        </div>
      </div>

      <div className="how-we-work-background-number">04</div>
    </section>
  );
}

export default HowWeWork;
