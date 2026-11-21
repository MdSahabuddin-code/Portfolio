
import { useEffect } from "react";
import { Link } from "react-router-dom";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/services/process-contact.css";
import "../../styles/fireflies.css";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your idea, business goals, requirements, and the problem you want to solve.",
    detail: "LISTEN / UNDERSTAND",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the project scope, features, technology, and a practical direction before development begins.",
    detail: "DEFINE / STRATEGISE",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "We bring the plan to life through thoughtful design, development, testing, and continuous refinement.",
    detail: "DESIGN / BUILD / TEST",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We prepare the finished solution for launch, provide the agreed handover, and offer support as discussed.",
    detail: "LAUNCH / SUPPORT",
  },
];

function ProcessContact() {
  const sectionRef = useSectionParallax(0.25);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("process-contact-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="process-contact" ref={sectionRef}>
      <Fireflies count={20} variant="founders" />

      <div className="process-contact-container">

        {/* PROCESS INTRO */}
        <div className="process-heading">
          <div className="process-eyebrow">
            <span className="process-eyebrow-line" />
            <span>05 / HOW WE WORK</span>
          </div>

          <div className="process-heading-content">
            <h2>
              A Clear Process.
              <br />
              <em>Meaningful Results.</em>
            </h2>

            <p>
              Good solutions come from a thoughtful process.
              We keep every project organised, collaborative,
              and focused on delivering something useful.
            </p>
          </div>
        </div>

        {/* PROCESS TIMELINE */}
        <div className="process-timeline">
          <div className="process-track">
            <div className="process-track-progress" />
          </div>

          <div className="process-steps">
            {processSteps.map((step) => (
              <article className="process-step" key={step.number}>
                <div className="process-step-marker">
                  <span>{step.number}</span>
                </div>

                <div className="process-step-content">
                  <span className="process-step-detail">
                    {step.detail}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CONTACT INVITATION */}
        <div className="process-contact-cta">
          <div className="process-cta-decoration">
            S—DEVWORKS
          </div>

          <div className="process-cta-content">
            <span className="process-cta-eyebrow">
              HAVE A PROJECT IN MIND?
            </span>

            <h2>
              Have an Idea?
              <br />
              <em>Let's Build It.</em>
            </h2>

            <p>
              Whether you have a clear plan or just the beginning
              of an idea, let's start a conversation and explore
              what we can create together.
            </p>

            <Link
              to="/contact"
              className="process-cta-button"
            >
              <span>START A CONVERSATION</span>
              <span className="process-cta-arrow">↗</span>
            </Link>
          </div>

          <div className="process-cta-bottom">
            <span>YOUR IDEA. OUR DEVELOPMENT.</span>
            <span>LET'S CREATE SOMETHING MEANINGFUL.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProcessContact;
