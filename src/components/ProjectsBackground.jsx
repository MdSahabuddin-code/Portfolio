
import "../styles/projects/projects-background.css";

function ProjectsBackground() {
  return (
    <div className="projects-background" aria-hidden="true">
      <svg
        className="projects-background-art"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="projects-gold-curve"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#8F6835" stopOpacity="0.08" />
            <stop offset="48%" stopColor="#D6BD8B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5B84C" stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id="projects-gold-light">
            <stop offset="0%" stopColor="#FFD88A" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#D6BD8B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D6BD8B" stopOpacity="0" />
          </radialGradient>

          <filter
            id="projects-curve-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>

          <filter
            id="projects-star-glow"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Large flowing circular geometry */}
        <g className="projects-curves">
          <circle cx="1190" cy="65" r="270" />
          <circle
            cx="1190"
            cy="65"
            r="270"
            className="projects-curve-highlight"
          />

          <circle cx="1190" cy="500" r="270" />
          <circle
            cx="1190"
            cy="500"
            r="270"
            className="projects-curve-highlight"
          />

          <path d="M -100 840 C 240 580, 430 1060, 760 790 S 1250 580, 1540 760" />
          <path d="M -100 910 C 260 650, 450 1110, 800 840 S 1250 650, 1540 830" />

          <path d="M 150 1050 C 390 760, 600 850, 830 570 S 1160 280, 1510 350" />
          <path d="M 80 180 C 350 320, 470 80, 740 240 S 1120 460, 1510 250" />
        </g>

        {/* Soft glow along selected curves */}
        <g className="projects-curve-glows">
          <circle cx="1190" cy="65" r="270" />
          <circle cx="1190" cy="500" r="270" />
          <path d="M -100 840 C 240 580, 430 1060, 760 790 S 1250 580, 1540 760" />
        </g>

        {/* Glowing intersection points */}
        <g className="projects-light-points">
          <circle
            cx="1190"
            cy="335"
            r="55"
            fill="url(#projects-gold-light)"
          />
          <circle cx="1190" cy="335" r="5" />

          <circle
            cx="760"
            cy="790"
            r="65"
            fill="url(#projects-gold-light)"
          />
          <circle cx="760" cy="790" r="4" />

          <circle
            cx="350"
            cy="740"
            r="55"
            fill="url(#projects-gold-light)"
          />
          <circle cx="350" cy="740" r="3" />

          <circle
            cx="1010"
            cy="190"
            r="45"
            fill="url(#projects-gold-light)"
          />
          <circle cx="1010" cy="190" r="3" />
        </g>
      </svg>

      <div className="projects-background-glow projects-glow-one" />
      <div className="projects-background-glow projects-glow-two" />
      <div className="projects-background-vignette" />
    </div>
  );
}

export default ProjectsBackground;
