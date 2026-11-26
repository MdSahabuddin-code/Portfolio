import { useEffect, useRef } from "react";

import Fireflies from "../../components/FireFlies";
import FounderCard from "./FounderCard";
import sampleFounderImage from "../../assets/Founders/1.jpeg";
import "../../styles/about/ownership-leadership.css";
import "../../styles/fireflies.css";

const founders = [
  {
    initials: "MS",
    avatarSrc: sampleFounderImage,
    name: "MD. Sahabuddin",
    role: "CO-FOUNDER / DEVELOPER",
    focus: "Product thinking & creative development",
    about:
      "Brings ideas, product thinking, and development together to create useful digital experiences with clarity, character, and purpose.",
    experience: [
      {
        year: "01",
        title: "Co-founded S-DevWorks",
        description: "Started building a studio where thoughtful ideas become practical digital products.",
      },
      {
        year: "02",
        title: "Built across the stack",
        description: "Works across interface, application, and delivery layers to keep the experience connected.",
      },
      {
        year: "03",
        title: "Design-led development",
        description: "Turns complex requirements into clear, approachable experiences for real users.",
      },
    ],
  },
  {
    initials: "DD",
    avatarSrc: sampleFounderImage,
    name: "Debjit Das",
    role: "CO-FOUNDER / DEVELOPER",
    focus: "Technical strategy & reliable systems",
    about:
      "Leads technical direction, backend architecture, integrations, and maintainable delivery across the studio's digital work.",
    experience: [
      {
        year: "01",
        title: "Co-founded S-DevWorks",
        description: "Joined a shared ambition to build meaningful opportunities through technology and collaboration.",
      },
      {
        year: "02",
        title: "Engineering reliable systems",
        description: "Builds APIs, data flows, and responsive applications with future maintenance in mind.",
      },
      {
        year: "03",
        title: "Quality-focused delivery",
        description: "Connects implementation, testing, and deployment so work performs beyond the first demo.",
      },
    ],
  },
];

function OwnershipLeadership() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("ownership-leadership-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ownership-leadership" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="ownership-leadership-container">
        <header className="ownership-leadership-header">
          <div className="ownership-leadership-eyebrow">
            <span className="ownership-leadership-line" />
            <span>06 / OWNERSHIP &amp; LEADERSHIP</span>
          </div>
          <h2>
            The Founders &amp; Owners
            <br />
            <em>Behind S-DevWorks.</em>
          </h2>
          <p>
            S-DevWorks is built and operated by its founders. Every project receives
            direct attention from the people responsible for the thinking, design,
            development, and delivery.
          </p>
        </header>

        <div className="founder-card-grid">
          {founders.map((founder) => (
            <FounderCard founder={founder} key={founder.name} />
          ))}
        </div>
      </div>

      <div className="ownership-leadership-number" aria-hidden="true">
        06
      </div>
    </section>
  );
}

export default OwnershipLeadership;
