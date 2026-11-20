
import { useEffect, useRef, useState } from "react";

import "../../styles/featured-projects.css";
import "../../styles/fireflies.css";

import Fireflies from "../../components/FireFlies";

import projectsBg from "../../assets/projects-img/project-bg.png";
import aureliaImage from "../../assets/projects-img/1.png";
import noireImage from "../../assets/projects-img/2.png";
import nexoraImage from "../../assets/projects-img/3.JPG";

const projects = [
  {
    number: "01",
    name: "AURELIA",
    category: "ARCHITECTURE & DESIGN",
    type: "WEBSITE DESIGN",
    year: "2026",
    description:
      "A refined digital experience for an architecture studio, where minimalism meets timeless design.",
    image: aureliaImage,
    imageAlt: "Aurelia architecture studio demo website",
  },
  {
    number: "02",
    name: "NOIRÉ",
    category: "FASHION & LIFESTYLE",
    type: "E-COMMERCE",
    year: "2026",
    description:
      "An elevated online shopping experience built around visual storytelling and effortless discovery.",
    image: noireImage,
    imageAlt: "Noiré fashion ecommerce demo website",
  },
  {
    number: "03",
    name: "NEXORA",
    category: "TECHNOLOGY",
    type: "WEB APPLICATION",
    year: "2026",
    description:
      "A modern analytics platform transforming complex information into clear, actionable insights.",
    image: nexoraImage,
    imageAlt: "Nexora analytics dashboard demo project",
  },
];

function FeaturedProjects() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const activeIndexRef = useRef(0);
  const targetPositionRef = useRef(0);
  const currentPositionRef = useRef(0);

  const animationFrameRef = useRef(null);
  const gestureTimeoutRef = useRef(null);
  const gestureLockedRef = useRef(false);

  const touchStartRef = useRef(null);
  const touchMovedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // ========================================
  // CINEMATIC SECTION ENTRANCE
  // ========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      section.classList.add("projects-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("projects-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // ========================================
  // TRACK TRANSFORM
  // ========================================

  const applyTrackTransform = (position) => {
    const viewportWidth =
      viewportRef.current?.clientWidth || window.innerWidth;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${
        position * viewportWidth
      }px, 0, 0)`;
    }

    if (progressRef.current) {
      progressRef.current.style.width = `${
        ((activeIndexRef.current + 1) / projects.length) * 100
      }%`;
    }
  };

  // ========================================
  // SMOOTH PROJECT ANIMATION
  // ========================================

  const animateTrack = () => {
    if (animationFrameRef.current) return;

    const animate = () => {
      const current = currentPositionRef.current;
      const target = targetPositionRef.current;
      const difference = target - current;

      if (Math.abs(difference) < 0.01) {
        currentPositionRef.current = target;
      } else {
        currentPositionRef.current += difference * 0.1;
      }

      applyTrackTransform(currentPositionRef.current);

      if (
        Math.abs(target - currentPositionRef.current) >= 0.01
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // ========================================
  // CHANGE PROJECT
  // ========================================

  const changeProject = (direction) => {
    const nextIndex = Math.max(
      0,
      Math.min(
        projects.length - 1,
        activeIndexRef.current + direction
      )
    );

    if (nextIndex === activeIndexRef.current) return false;

    activeIndexRef.current = nextIndex;
    targetPositionRef.current = nextIndex;

    setActiveIndex(nextIndex);
    animateTrack();

    return true;
  };

  // ========================================
  // WHEEL + TOUCH NAVIGATION
  // ========================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    applyTrackTransform(currentPositionRef.current);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleResize = () => {
      applyTrackTransform(currentPositionRef.current);
    };

    window.addEventListener("resize", handleResize);

    if (reducedMotion.matches) {
      section.classList.add("projects-reduced-motion");

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const releaseGesture = () => {
      clearTimeout(gestureTimeoutRef.current);

      gestureTimeoutRef.current = setTimeout(() => {
        gestureLockedRef.current = false;
      }, 250);
    };

    const handleWheel = (event) => {
      const direction = event.deltaY > 0 ? 1 : -1;

      const canMove =
        direction > 0
          ? activeIndexRef.current < projects.length - 1
          : activeIndexRef.current > 0;

      if (!canMove) return;

      event.preventDefault();

      if (gestureLockedRef.current) {
        releaseGesture();
        return;
      }

      gestureLockedRef.current = true;

      changeProject(direction);
      releaseGesture();
    };

    // ========================================
    // TOUCH START
    // ========================================

    const handleTouchStart = (event) => {
      const touch = event.touches[0];

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };

      touchMovedRef.current = false;
    };

    // ========================================
    // TOUCH MOVE
    // ========================================

    const handleTouchMove = (event) => {
      if (!touchStartRef.current) return;

      const touch = event.touches[0];

      const deltaY = Math.abs(
        touch.clientY - touchStartRef.current.y
      );

      const deltaX = Math.abs(
        touch.clientX - touchStartRef.current.x
      );

      if (deltaY > 12 && deltaY > deltaX) {
        const direction =
          touch.clientY < touchStartRef.current.y ? 1 : -1;

        const canMove =
          direction > 0
            ? activeIndexRef.current < projects.length - 1
            : activeIndexRef.current > 0;

        if (canMove) {
          event.preventDefault();
          touchMovedRef.current = true;
        }
      }
    };

    // ========================================
    // TOUCH END
    // ========================================

    const handleTouchEnd = (event) => {
      if (!touchStartRef.current) return;

      const touch = event.changedTouches[0];

      const deltaY =
        touch.clientY - touchStartRef.current.y;

      const deltaX =
        touch.clientX - touchStartRef.current.x;

      if (
        touchMovedRef.current &&
        Math.abs(deltaY) > 45 &&
        Math.abs(deltaY) > Math.abs(deltaX) &&
        !gestureLockedRef.current
      ) {
        gestureLockedRef.current = true;

        changeProject(deltaY < 0 ? 1 : -1);
        releaseGesture();
      }

      touchStartRef.current = null;
      touchMovedRef.current = false;
    };

    // ========================================
    // EVENT LISTENERS
    // ========================================

    section.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    section.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    section.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    section.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      window.removeEventListener("resize", handleResize);

      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);

      clearTimeout(gestureTimeoutRef.current);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // ========================================
  // JSX
  // ========================================

  return (
    <section
      className="featured-projects"
      id="projects"
      ref={sectionRef}
    >
      <div className="projects-stage">

        {/* FULL SECTION BACKGROUND */}

        <div className="projects-background">

          <img
            src={projectsBg}
            alt=""
            className="projects-background-image"
            aria-hidden="true"
          />

          <div className="projects-background-overlay" />

          {/* ANIMATED GOLD WAVES */}

          <svg
            className="projects-gold-wave"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="projectsGoldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#9B7942"
                  stopOpacity="0"
                />

                <stop
                  offset="30%"
                  stopColor="#D6BD8B"
                  stopOpacity="0.7"
                />

                <stop
                  offset="55%"
                  stopColor="#F3DFB2"
                  stopOpacity="0.95"
                />

                <stop
                  offset="80%"
                  stopColor="#D6BD8B"
                  stopOpacity="0.55"
                />

                <stop
                  offset="100%"
                  stopColor="#9B7942"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            <g className="projects-gold-wave-lines">

              <path d="M-200 500 C150 250 350 750 650 470 S1150 220 1800 500" />

              <path
                className="projects-gold-wave-dark-line"
                d="M-200 550 C180 300 380 800 700 520 S1200 280 1800 550"
              />

              <path d="M-200 450 C180 200 400 700 720 420 S1200 180 1800 450" />

              <path d="M-200 600 C180 350 400 850 750 570 S1200 330 1800 600" />

            </g>
          </svg>
        </div>

        {/* FIREFLIES */}

        <Fireflies count={16} variant="projects" />

        {/* HEADER */}

        <div className="projects-header">
          <span>04 / SELECTED WORK</span>
          <span>OUR PROJECTS</span>
        </div>

        {/* PROJECT VIEWPORT */}

        <div
          className="projects-viewport"
          ref={viewportRef}
        >
          <div
            className="projects-track"
            ref={trackRef}
          >
            {projects.map((project, index) => (
              <article
                className={`project-panel ${
                  index % 2 !== 0 ? "reverse" : ""
                } ${
                  activeIndex === index ? "active" : ""
                }`}
                key={project.number}
              >
                <div className="project-panel-inner">

                  {/* PROJECT INFORMATION */}

                  <div className="project-information">

                    <span className="project-number">
                      PROJECT / {project.number}
                    </span>

                    <span className="project-category">
                      {project.category}
                    </span>

                    <h2 className="project-title">
                      {project.name}
                    </h2>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="project-meta">

                      <div>
                        <span>DISCIPLINE</span>
                        <strong>{project.type}</strong>
                      </div>

                      <div>
                        <span>YEAR</span>
                        <strong>{project.year}</strong>
                      </div>

                    </div>

                    <a
                      href="#contact"
                      className="project-link"
                    >
                      START A PROJECT <span>↗</span>
                    </a>

                  </div>

                  {/* PROJECT IMAGE */}

                  <div className="project-visual">
                    <div className="project-image-wrapper">

                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="project-image"
                      />

                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FOOTER */}

        <div className="projects-footer">

          <div className="projects-progress">
            <div
              className="projects-progress-fill"
              ref={progressRef}
            />
          </div>

          <span className="projects-counter">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>

          <span className="projects-scroll-hint">
            SCROLL TO EXPLORE
          </span>

        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
