
import { useEffect, useState } from "react";
import "../../styles/hero.css";
import heroBg from "../../assets/images/hero-bg.png";


function Hero() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollOffset(
        Math.min(window.scrollY * 0.3, 180)
      );
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero">

      {/* Background */}
      <div
        className="hero-background"
        style={{
          transform: `translate3d(0, ${scrollOffset}px, 0)`,
        }}
      >
        <img src={heroBg} alt="" />
      </div>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Animated Particles */}
      <div className="hero-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Hero Content */}
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

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}

export default Hero;
