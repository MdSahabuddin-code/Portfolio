
import { useEffect, useRef, useState } from "react";
import "../../styles/studio-intro.css";
import studioBg from "../../assets/images/studio-bg.png";

// ========================================
// TYPEWRITER COMPONENT
// ========================================

function TypewriterText({ text }) {
  const elementRef = useRef(null);
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      setDisplayedText(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [text]);

  // TYPEWRITER ANIMATION
  useEffect(() => {
    if (!started) return;

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <p ref={elementRef} className="studio-description">
      {displayedText}

      {started && displayedText.length < text.length && (
        <span className="typing-cursor">|</span>
      )}
    </p>
  );
}

// ========================================
// STUDIO INTRO COMPONENT
// ========================================

function StudioIntro() {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const shapeOneRef = useRef(null);
  const shapeTwoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    // ========================================
    // INDIVIDUAL SCROLL REVEALS
    // ========================================

    const revealElements = section.querySelectorAll(
      ".studio-topline, .reveal-left, .reveal-right, .studio-column, .studio-bottom"
    );

    let revealObserver;

    if (reducedMotion.matches) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");

              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.35,
          rootMargin: "0px 0px -15% 0px",
        }
      );

      revealElements.forEach((element) => {
        revealObserver.observe(element);
      });
    }

    // ========================================
    // MULTI-LAYER PARALLAX
    // ========================================

    if (reducedMotion.matches) {
      return () => {
        revealObserver?.disconnect();
      };
    }

    let animationFrame;

    function updateParallax() {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();

        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) /
              (window.innerHeight + rect.height)
          )
        );

        const movement = progress - 0.5;
        const intensity = window.innerWidth <= 700 ? 0.8 : 1.5;

        const backgroundY = movement * -220 * intensity;
        const shapeOneY = movement * 350 * intensity;
        const shapeTwoY = movement * -280 * intensity;
        const contentY = movement * 90 * intensity;

        if (backgroundRef.current) {
          backgroundRef.current.style.transform =
            `translate3d(0, ${backgroundY}px, 0) scale(1.15)`;
        }

        if (shapeOneRef.current) {
          shapeOneRef.current.style.transform =
            `translate3d(0, ${shapeOneY}px, 0) rotate(-18deg)`;
        }

        if (shapeTwoRef.current) {
          shapeTwoRef.current.style.transform =
            `translate3d(0, ${shapeTwoY}px, 0) rotate(20deg)`;
        }

        if (contentRef.current) {
          contentRef.current.style.transform =
            `translate3d(0, ${contentY}px, 0)`;
        }
      });
    }

    window.addEventListener("scroll", updateParallax, {
      passive: true,
    });

    window.addEventListener("resize", updateParallax);

    updateParallax();

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      revealObserver?.disconnect();

      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="studio-intro"
      id="about"
      ref={sectionRef}
    >
      {/* LAYER 1: AMBIENT BACKGROUND */}

      <div
        className="studio-parallax-bg"
        ref={backgroundRef}
        aria-hidden="true"
      >
        <img src={studioBg} alt="" />
      </div>

      {/* LAYER 2: ABSTRACT SHAPES */}

      <div className="studio-visuals" aria-hidden="true">
        <div
          className="studio-shape studio-shape-one"
          ref={shapeOneRef}
        >
          <div className="studio-shape-inner" />
          <div className="studio-shape-core" />
        </div>

        <div
          className="studio-shape studio-shape-two"
          ref={shapeTwoRef}
        >
          <div className="studio-shape-inner" />
          <div className="studio-shape-core" />
        </div>
      </div>

      {/* LAYER 3: FOREGROUND CONTENT */}

      <div
        className="studio-container"
        ref={contentRef}
      >
        {/* TOP LABEL */}

        <div className="studio-topline">
          <span>02 / WHO WE ARE</span>
          <span>S-DEVWORKS STUDIO</span>
        </div>

        {/* ANIMATED HEADING */}

        <div className="studio-heading">
          <h2>
            <span className="heading-line reveal-left">
              <span className="heading-text">
                WE TURN IDEAS INTO
              </span>
            </span>

            <span className="heading-line gold-line reveal-right">
              <span className="heading-text">
                DIGITAL EXPERIENCES.
              </span>
            </span>
          </h2>
        </div>

        {/* STUDIO CONTENT */}

        <div className="studio-content">
          <div className="studio-column">
            <span className="studio-label">
              OUR STUDIO
            </span>

            <h3>Two developers. One vision.</h3>

            <TypewriterText
              text="S-DevWorks is a collaborative development studio where creativity meets technology. We build digital experiences with purpose, precision and attention to detail."
            />
          </div>

          <div className="studio-column">
            <span className="studio-label">
              OUR APPROACH
            </span>

            <h3>Think. Design. Develop.</h3>

            <TypewriterText
              text="From the first idea to the final implementation, we focus on thoughtful design, clean development and solutions that solve real problems."
            />
          </div>
        </div>

        {/* BOTTOM STATEMENT */}

        <div className="studio-bottom">
          <span>CREATIVITY × TECHNOLOGY</span>
          <span>BUILT WITH PURPOSE ↗</span>
        </div>
      </div>
    </section>
  );
}

export default StudioIntro;
