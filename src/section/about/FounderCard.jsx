import { useRef, useState } from "react";

const founderSections = ["ABOUT", "EXPERIENCE", "CONTACT"];

function FounderCard({ founder }) {
  const cardRef = useRef(null);
  const [activeSection, setActiveSection] = useState("ABOUT");

  const handlePointerMove = (event) => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--ownership-rotate-x", `${-y * 8}deg`);
    card.style.setProperty("--ownership-rotate-y", `${x * 10}deg`);
    card.style.setProperty("--ownership-glare-x", `${50 + x * 35}%`);
    card.style.setProperty("--ownership-glare-y", `${50 + y * 35}%`);
  };

  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--ownership-rotate-x", "0deg");
    card.style.setProperty("--ownership-rotate-y", "0deg");
    card.style.setProperty("--ownership-glare-x", "50%");
    card.style.setProperty("--ownership-glare-y", "50%");
  };

  return (
    <article
      className="ownership-card-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="ownership-card" ref={cardRef}>
        <div className="ownership-card-glow" aria-hidden="true" />
        <div className="ownership-card-glare" aria-hidden="true" />

        <header className="ownership-card-header">
          <div className="ownership-card-topline">
            <span className="ownership-card-status">
              <span className="ownership-card-status-dot" />
              Online
            </span>
            <span className="ownership-card-badge">PRO</span>
          </div>

          <div className="ownership-card-portrait">
            <img src={founder.avatarSrc} alt={`${founder.name} sample portrait`} />
          </div>

          <h3 className="ownership-card-name">{founder.name}</h3>
          <p className="ownership-card-role">{founder.role}</p>
          <div className="ownership-card-accent" aria-hidden="true" />
        </header>

        <div className="ownership-card-body">
          {activeSection === "ABOUT" && (
            <div className="ownership-card-panel">
              <span className="ownership-card-label">ABOUT</span>
              <p className="ownership-card-description">{founder.about}</p>
              <div className="ownership-card-focus">
                <span>FOCUS</span>
                <strong>{founder.focus}</strong>
              </div>
              <div className="ownership-card-socials" aria-label="Social profiles">
                <span aria-label="Facebook" title="Facebook">f</span>
                <span aria-label="Twitter" title="Twitter">♥</span>
                <span aria-label="Instagram" title="Instagram">◎</span>
                <span aria-label="LinkedIn" title="LinkedIn">in</span>
              </div>
            </div>
          )}

          {activeSection === "EXPERIENCE" && (
            <div className="ownership-card-panel ownership-card-timeline">
              <span className="ownership-card-label">WORK EXPERIENCE</span>
              {founder.experience.map((item) => (
                <div className="ownership-card-timeline-item" key={item.year}>
                  <span>{item.year}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "CONTACT" && (
            <div className="ownership-card-panel ownership-card-contact">
              <span className="ownership-card-label">CONTACT</span>
              <p>For projects, partnerships, and collaborations, use the public contact form.</p>
              <div className="ownership-card-contact-details">
                <span aria-hidden="true">⌖</span>
                <span>Kolkata, West Bengal, India</span>
              </div>
              <div className="ownership-card-contact-details">
                <span aria-hidden="true">✉</span>
                <a href="mailto:sdevworks.official@gmail.com">sdevworks.official@gmail.com</a>
              </div>
              <a href="/contact" className="ownership-card-contact-link">
                START A CONVERSATION <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>

        <nav className="ownership-card-tabs" aria-label={`${founder.name} profile sections`}>
          {founderSections.map((section) => (
            <button
              type="button"
              key={section}
              className={activeSection === section ? "is-active" : ""}
              onClick={() => setActiveSection(section)}
              aria-pressed={activeSection === section}
            >
              {section}
            </button>
          ))}
        </nav>
      </div>
    </article>
  );
}

export default FounderCard;
