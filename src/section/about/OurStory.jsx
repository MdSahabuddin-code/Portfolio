
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/about/our-story.css";
import "../../styles/fireflies.css";

function OurStory() {
  const sectionRef = useSectionParallax(0.6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("our-story-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="our-story" ref={sectionRef}>
      <Fireflies count={16} variant="founders" />

      <div className="our-story-container">

        {/* LEFT — EDITORIAL HEADING */}
        <div className="our-story-heading">
          <div className="our-story-eyebrow story-reveal" style={{ "--delay": "0s" }}>
            <span className="our-story-line" />
            <span>02 / THE BEGINNING</span>
          </div>

          <h2 className="our-story-title">
            <span className="story-title-line">
              <span> A Studio </span>
            </span>
            <span className="story-title-line">
              <span>Built on</span>
            </span>
            <span className="story-title-line story-title-accent">
              <span>Curiosity.</span>
            </span>
          </h2>

          <p className="our-story-heading-note story-reveal" style={{ "--delay": "0.65s" }}>
            Every meaningful journey begins with the decision
            to create something of your own.
          </p>
        </div>

        {/* RIGHT — STORY CONTENT */}
        <div className="our-story-content">
          <span className="our-story-index story-reveal" style={{ "--delay": "0.3s" }}>
            OUR STORY
          </span>

          <p className="our-story-lead story-reveal" style={{ "--delay": "0.45s" }}>
            We didn't start with a big company or a perfect plan.
            We started with an ambition — to build something of our own.
          </p>

          <p className="story-reveal" style={{ "--delay": "0.6s" }}>
            After spending time learning and working within a business,
            I realised that I wanted to create something that reflected
            my own ideas, creativity, and abilities. I wanted to build
            something I could truly call mine.
          </p>

          <p className="story-reveal" style={{ "--delay": "0.75s" }}>
            Around the same time, a friend shared a similar ambition.
            He wanted to build a career through freelance work and
            development. We both wanted to turn our skills into
            meaningful opportunities.
          </p>

          <p className="story-reveal" style={{ "--delay": "0.9s" }}>
            That shared ambition became the starting point of
            <strong> S-DevWorks</strong> — Standard Development Works.
          </p>

          <p className="story-reveal" style={{ "--delay": "1.05s" }}>
            We decided to bring our abilities together, work on real
            projects, learn through experience, and grow one step at
            a time. We know there is a lot to learn and plenty of
            challenges ahead, but that's part of the journey.
          </p>

          <div className="our-story-signature story-reveal" style={{ "--delay": "1.25s" }}>
            <span className="our-story-signature-line" />
            <p>
              Two minds. One ambition.
              <br />
              <strong>Something of our own.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="our-story-bottom story-reveal" style={{ "--delay": "1.4s" }}>
        <span>STANDARD DEVELOPMENT WORKS</span>
        <span>BUILT TO CREATE WHAT'S NEXT.</span>
      </div>

      <div className="our-story-number">02</div>
    </section>
  );
}

export default OurStory;
