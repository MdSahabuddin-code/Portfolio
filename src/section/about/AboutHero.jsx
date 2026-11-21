
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/about/about-hero.css";
import "../../styles/fireflies.css";

function AboutHero() {
  const sectionRef = useSectionParallax(1);

  // Entrance reveal animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("about-hero-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="about-hero" ref={sectionRef}>

      {/* Floating Fireflies */}
      <Fireflies count={18} variant="founders" />

      {/* Main Content */}
      <div className="about-hero-container">

        <div className="about-hero-eyebrow">
          <span className="about-hero-line"></span>
          <span>THE STUDIO / OUR STORY</span>
        </div>

        <h1 className="about-hero-title">
          Beyond Code.
          <br />
          <span>Creating Digital</span>
          <br />
          Experiences.
        </h1>

        <div className="about-hero-bottom">

          <p className="about-hero-description">
            We are S-DevWorks, an independent digital studio
            combining thoughtful design and modern development
            to create meaningful digital experiences.
          </p>

          <div className="about-hero-scroll">
            <span className="scroll-circle">↓</span>
            <span>SCROLL TO EXPLORE</span>
          </div>

        </div>

      </div>

      {/* Decorative Number */}
      <div className="about-hero-number">
        01
      </div>

    </section>
  );
}

export default AboutHero;
