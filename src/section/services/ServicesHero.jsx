
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/services/services-hero.css";
import "../../styles/fireflies.css";

function ServicesHero() {
  const sectionRef = useSectionParallax(0.8);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("services-hero-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="services-hero" ref={sectionRef}>
      <div className="services-hero-atmosphere" />

      <Fireflies count={20} variant="founders" />

      <div className="services-hero-container">
        <div className="services-hero-eyebrow">
          <span className="services-hero-line" />
          <span>01 / WHAT WE OFFER</span>
        </div>

        <div className="services-hero-main">
          <h1 className="services-hero-title">
            What We Do.
            <br />
            <span>How We Create.</span>
            <br />
            <em>What We Build.</em>
          </h1>

          <div className="services-hero-side">
            <span className="services-hero-side-label">
              OUR EXPERTISE
            </span>

            <p>
              From thoughtful design to powerful development,
              we bring ideas to life through digital solutions
              built with purpose, creativity, and attention
              to detail.
            </p>

            <div className="services-hero-scroll">
              <span className="services-scroll-circle">↓</span>
              <span>EXPLORE OUR SERVICES</span>
            </div>
          </div>
        </div>

        <div className="services-hero-bottom">
          <span>DESIGN / DEVELOPMENT / DIGITAL SOLUTIONS</span>
          <span>STANDARD DEVELOPMENT WORKS</span>
        </div>
      </div>

      <div className="services-hero-number">01</div>
    </section>
  );
}

export default ServicesHero;
