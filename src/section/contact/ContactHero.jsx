
import { useEffect, useState } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/contact/contact-hero.css";
import "../../styles/fireflies.css";

const typewriterPhrases = [
  "WE'D LOVE TO HEAR FROM YOU",
  "HAVE AN IDEA TO SHARE?",
  "LET'S BUILD SOMETHING GREAT",
];

function ContactHero() {
  const sectionRef = useSectionParallax(0.65);

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // SECTION REVEAL

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("contact-hero-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  // TYPEWRITER ANIMATION

  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];

    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentPhrase) {
      delay = 1800;
    }

    if (isDeleting && displayText === "") {
      delay = 350;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentPhrase) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setPhraseIndex(
          (previous) =>
            (previous + 1) % typewriterPhrases.length
        );
      } else {
        const nextLength = isDeleting
          ? displayText.length - 1
          : displayText.length + 1;

        setDisplayText(currentPhrase.substring(0, nextLength));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="contact-hero" ref={sectionRef}>
      <Fireflies count={20} variant="founders" />

      <div className="contact-hero-container">

        {/* EYEBROW */}

        <div className="contact-hero-eyebrow">
          <span className="contact-hero-line" />
          <span>01 / GET IN TOUCH</span>
        </div>

        {/* MAIN CONTENT */}

        <div className="contact-hero-main">

          <div className="contact-hero-heading">
            <span className="contact-hero-overline">
              EVERY GREAT PROJECT
            </span>

            <h1>
              Starts With
              <br />
              <em>A Conversation.</em>
            </h1>

            <div className="contact-hero-heading-bottom">
              <span className="contact-hero-heading-mark">
                S—DevWorks
              </span>

              <span>
                LET'S CREATE SOMETHING
                <br />
                MEANINGFUL TOGETHER.
              </span>
            </div>
          </div>

          {/* INTRODUCTION */}

          <div className="contact-hero-intro">

            <span
              className="contact-hero-intro-label"
              aria-label={typewriterPhrases[phraseIndex]}
            >
              <span aria-hidden="true">{displayText}</span>
              <span className="contact-typewriter-cursor" aria-hidden="true" />
            </span>

            <p className="contact-hero-description">
              Have a project in mind, a business challenge
              to solve, or simply an idea you'd like to
              explore? We'd love to hear about it.
            </p>

            <p className="contact-hero-secondary">
              Tell us a little about what you're looking
              to create. We'll take the time to understand
              your requirements and explore how we can
              bring your vision to life.
            </p>

            <a
              href="#contact-form"
              className="contact-hero-link"
            >
              <span>START A CONVERSATION</span>

              <span className="contact-hero-arrow">
                ↓
              </span>
            </a>

          </div>

        </div>

        {/* BOTTOM INFORMATION */}

        <div className="contact-hero-bottom">
          <span>PROJECT ENQUIRIES / COLLABORATIONS</span>
          <span>STANDARD DEVELOPMENT WORKS</span>
        </div>

      </div>

      <div className="contact-hero-number">01</div>

    </section>
  );
}

export default ContactHero;
