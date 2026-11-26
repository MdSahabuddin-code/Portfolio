import { useEffect, useRef } from "react";

import "../../styles/about/about-cta.css";

function AboutCta() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("about-cta-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-cta" ref={sectionRef}>
      <div className="about-cta-inner">
        <span className="about-cta-label">08 / START SOMETHING MEANINGFUL</span>
        <h2>
          Have an idea?
          <br />
          <em>Let&apos;s build it.</em>
        </h2>
        <p>
          Tell us a little about what you are working on. We will take the time to
          understand it and explore what we can create together.
        </p>
        <a href="/contact" className="about-cta-button">
          START A CONVERSATION <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export default AboutCta;
