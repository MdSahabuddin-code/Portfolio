
import { useEffect, useRef, useState } from "react";

import "../styles/footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`site-footer ${visible ? "footer-visible" : ""}`}
    >
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-container">

        {/* TOP BAR */}
        <div className="footer-top">
          <a href="/" className="footer-logo">
            S<span>—</span>DEVWORKS
          </a>

          <span className="footer-top-label">
            INDEPENDENT DIGITAL STUDIO
          </span>
        </div>

        {/* NAVIGATION */}
        <div className="footer-links">

          {/* EXPLORE */}
          <div className="footer-link-column">
            <span className="footer-column-title">
              EXPLORE
            </span>

            <a href="/" className="footer-nav-link">Home</a>
            <a href="/projects" className="footer-nav-link">Projects</a>
            <a href="/services" className="footer-nav-link">Services</a>
            <a href="/about" className="footer-nav-link">About</a>
            <a href="/contact" className="footer-nav-link">Contact</a>
          </div>

          {/* CONNECT */}
          <div className="footer-link-column">
            <span className="footer-column-title">
              CONNECT
            </span>

            <a
              href="YOUR_GITHUB_PROFILE_1"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
            >
              GitHub — MD. Sahabuddin ↗
            </a>

            <a
              href="YOUR_GITHUB_PROFILE_2"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
            >
              GitHub — Debjit Das ↗
            </a>

            <a
              href="YOUR_LINKEDIN_PROFILE_1"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
            >
              LinkedIn — MD. Sahabuddin ↗
            </a>

            <a
              href="YOUR_LINKEDIN_PROFILE_2"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
            >
              LinkedIn — Debjit Das ↗
            </a>

            <a
              href="mailto:YOUR_STUDIO_EMAIL"
              className="footer-nav-link"
            >
              Email Us ↗
            </a>
          </div>

          {/* OUR APPROACH */}
          <div className="footer-link-column footer-studio-info">
            <span className="footer-column-title">
              OUR APPROACH
            </span>

            <p>
              Design with intention.
              <br />
              Develop with purpose.
              <br />
              Create with meaning.
            </p>
          </div>

        </div>

        {/* OVERSIZED BRAND SIGNATURE */}
        <div className="footer-signature">
          <span>S—DEVWORKS</span>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">

          <span className="footer-copyright">
            © {currentYear} S—DEVWORKS. ALL RIGHTS RESERVED.
          </span>

          <span className="footer-bottom-center">
            DESIGN · DEVELOPMENT · DIGITAL EXPERIENCES
          </span>

          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
          >
            BACK TO TOP
            <span>↑</span>
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
