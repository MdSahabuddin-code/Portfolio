
import { useEffect, useRef } from "react";
import "../../styles/founders.css";
import "../../styles/fireflies.css";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import founderOne from "../../assets/Founders/1.jpeg";

function Founders() {
  const sectionRef = useSectionParallax(1.1);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealElements = section.querySelectorAll(
      ".founders-topline, .founders-heading, .founder-image, .founder-info, .founders-bottom"
    );

    const staggerGroups = section.querySelectorAll(
      ".founder-skills span, .founder-links a"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            // Stagger skills and social links
            if (entry.target.classList.contains("founder-info")) {
              const items = entry.target.querySelectorAll(
                ".founder-skills span, .founder-links a"
              );

              items.forEach((item, index) => {
                item.style.transitionDelay = `${140 + index * 55}ms`;
                item.classList.add("is-visible");
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    if (prefersReducedMotion) {
      revealElements.forEach((element) =>
        element.classList.add("is-visible")
      );

      staggerGroups.forEach((element) =>
        element.classList.add("is-visible")
      );

      observer.disconnect();
      return;
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  return (
    <section
      className="founders-section"
      id="founders"
      ref={sectionRef}
    >
      {/* AMBIENT BACKGROUND */}

      <div className="founders-background" aria-hidden="true">
        <span className="founder-orb founder-orb-one"></span>
        <span className="founder-orb founder-orb-two"></span>
        <span className="founder-ring"></span>
      </div>

      {/* FLOATING FIREFLIES */}

      <Fireflies count={18} variant="founders" />

      {/* MAIN CONTENT */}

      <div className="founders-container">
        <div className="founders-topline">
          <span>03 / THE PEOPLE</span>
          <span>S-DEVWORKS STUDIO</span>
        </div>

        <div className="founders-heading">
          <h2>
            MEET THE MINDS
            <span>BEHIND THE WORK.</span>
          </h2>

          <p>
            Two developers. One vision.
            Building meaningful digital experiences
            through creativity and technology.
          </p>
        </div>

        <div className="founders-grid">

          {/* FOUNDER ONE */}

          <article className="founder-card founder-one">
            <div className="founder-image">
              <div className="founder-image-placeholder">
                <img src={founderOne} alt="Founder of S-DevWorks" />
              </div>

              <span className="founder-number">01</span>
            </div>

            <div className="founder-info">
              <span className="founder-role">
                CO-FOUNDER / DEVELOPER
              </span>

              <h3>MD. Sahabuddin</h3>

              <p>
                Full-stack developer with a 9.24 CGPA (MCA), specialising in Java, 
                Python, C#, and ML-driven web apps. 
                From client builds to data-backed tools like an IPL win predictor, 
                I turn complex problems into fast, reliable software.
              </p>

              <div className="founder-skills">
                <span>Java</span>
                <span>AI & Machine Learning</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>JavaScript</span>
                <span>PHP</span>
                <span>Frontend</span>
                <span>Backend</span>
              </div>

              <div className="founder-links">
                <a href="https://github.com/MdSahabuddin-code" target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>

                <a href="https://www.linkedin.com/in/md-sahabuddin-programmer" target="_blank" rel="noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

          {/* FOUNDER TWO */}

          <article className="founder-card founder-two">
            <div className="founder-image">
              <div className="founder-image-placeholder">
                <span>FOUNDER 02</span>
              </div>

              <span className="founder-number">02</span>
            </div>

            <div className="founder-info">
              <span className="founder-role">
                CO-FOUNDER / DEVELOPER
              </span>

              <h3>Debjit Das</h3>

              <p>
                Focused on creating engaging interfaces,
                thoughtful user experiences and modern
                responsive applications.
              </p>

              <div className="founder-skills">
                <span>HTML</span>
                <span>CSS</span>
                <span>React</span>
                <span>UI Design</span>
              </div>

              <div className="founder-links">
                <a href="#" target="_blank" rel="noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>

                <a href="#" target="_blank" rel="noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>

        </div>

        <div className="founders-bottom">
          <span>TWO DEVELOPERS. ONE VISION.</span>
          <span>BUILT WITH PURPOSE ↗</span>
        </div>
      </div>
    </section>
  );
}

export default Founders;
