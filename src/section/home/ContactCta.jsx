
import { useEffect, useRef, useState } from "react";

import "../../styles/contact-cta.css";
import "../../styles/fireflies.css";

import Fireflies from "../../components/FireFlies";
import useSectionParallax from "../../hooks/useSectionParallax";

const firstLine = "Let's build something";
const secondLine = "remarkable.";
const totalLength = firstLine.length + secondLine.length;

const ContactCTA = () => {
  const sectionRef = useSectionParallax(1.1);
  const revealRef = useRef(null);

  const [typingStarted, setTypingStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);

  const typingComplete = typedCount >= totalLength;

  /* ========================================
     START ANIMATION ONLY WHEN CTA IS VISIBLE
  ======================================== */

  useEffect(() => {
    const container = revealRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypingStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  /* ========================================
     TYPEWRITER ANIMATION
  ======================================== */

  useEffect(() => {
    if (!typingStarted) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      setTypedCount(totalLength);
      return;
    }

    let current = 0;

    const interval = window.setInterval(() => {
      current += 1;

      setTypedCount(current);

      if (current >= totalLength) {
        window.clearInterval(interval);
      }
    }, 75);

    return () => window.clearInterval(interval);
  }, [typingStarted]);

  return (
    <section
      className="contact-cta"
      ref={sectionRef}
    >
      {/* Background glow */}
      <div className="cta-glow"></div>

      {/* Floating fireflies */}
      <Fireflies
        count={18}
        variant="founders"
      />

      {/* Decorative background typography */}
      <div className="cta-decoration">
        S—DEVWORKS
      </div>

      {/* Main content */}
      <div
        className={`cta-container ${
          typingStarted ? "cta-started" : ""
        } ${
          typingComplete ? "cta-complete" : ""
        }`}
        ref={revealRef}
      >
        {/* Top information */}
        <div className="cta-top">
          <span className="cta-eyebrow">
            HAVE A PROJECT IN MIND?
          </span>

          <span className="cta-number">
            S—01
          </span>
        </div>

        {/* Main content */}
        <div className="cta-content">
          <h2
            className="cta-heading"
            aria-label={`${firstLine} ${secondLine}`}
          >
            {/* First line */}
            <span
              className="cta-heading-line"
              aria-hidden="true"
            >
              {firstLine.slice(
                0,
                Math.min(typedCount, firstLine.length)
              )}

              {typingStarted &&
                typedCount <= firstLine.length && (
                  <span className="cta-cursor"></span>
                )}
            </span>

            {/* Second gold line */}
            <span
              className="cta-heading-line cta-heading-gold"
              aria-hidden="true"
            >
              {secondLine.slice(
                0,
                Math.max(0, typedCount - firstLine.length)
              )}

              {typingStarted &&
                typedCount > firstLine.length &&
                !typingComplete && (
                  <span className="cta-cursor"></span>
                )}
            </span>
          </h2>

          {/* Description */}
          <p className="cta-description">
            We partner with ambitious people to create
            meaningful digital experiences. Have an idea?
            We'd love to hear about it.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="cta-bottom">
          <a
            href="/contact"
            className="cta-button"
          >
            <span>Start a project</span>
            <span className="cta-arrow">↗</span>
          </a>

          <span className="cta-brand">
            S-DEVWORKS
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
