
import "../../styles/hero.css";
import "../../styles/fireflies.css";

import heroBg from "../../assets/images/hero-bg.png";
import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

function Hero() {
  const sectionRef = useSectionParallax(1.2);

  return (
    <section className="hero" ref={sectionRef}>
      {/* Background image */}
      <div className="hero-background">
        <img src={heroBg} alt="" />
      </div>

      {/* Dark / light overlay */}
      <div className="hero-overlay"></div>

      {/* Floating fireflies */}
      <Fireflies count={22} variant="hero" />

      {/* Existing particles */}
      <div className="hero-particles" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <p className="hero-subtitle">
          WELCOME TO S-DEVWORKS
        </p>

        <h1>
          WE DESIGN.
          <br />
          WE <span>DEVELOP.</span>
          <br />
          WE CREATE.
        </h1>

        <p className="hero-description">
          Two developers. One vision.
          Building innovative digital experiences
          through creativity and technology.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="hero-btn primary-btn">
            Explore Our Work ↗
          </a>

          <a href="#founders" className="hero-btn secondary-btn">
            Meet Our Team
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;
