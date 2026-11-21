
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/services/services-overview.css";
import "../../styles/fireflies.css";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "We create thoughtful, responsive websites and web experiences that help businesses establish their digital presence and turn ideas into functional online solutions.",
    capabilities: [
      "Business & Corporate Websites",
      "Portfolio Websites",
      "E-commerce Websites",
      "Custom Web Applications",
      "Admin Panels & Dashboards",
      "Website Redesign & Maintenance",
    ],
  },
  {
    number: "02",
    title: "Application Development",
    description:
      "From mobile experiences to desktop tools, we develop applications designed around practical needs, usability, and the way people work.",
    capabilities: [
      "Android Applications",
      "iOS Applications",
      "Cross-platform Applications",
      "Desktop Applications",
      "Web-based Applications",
      "Application Maintenance",
    ],
  },
  {
    number: "03",
    title: "Custom Software",
    description:
      "Every business has its own workflow. We build tailored software solutions that simplify operations, organise information, and make everyday tasks easier to manage.",
    capabilities: [
      "Inventory Management",
      "Billing & Invoicing",
      "Stock Management",
      "Point of Sale Systems",
      "Employee Management",
      "Business Management Tools",
    ],
  },
  {
    number: "04",
    title: "Academic Projects",
    description:
      "We support students in turning academic ideas into working software through practical development assistance, technical guidance, and project mentoring.",
    capabilities: [
      "Final-year Software Projects",
      "Java & Python Projects",
      "PHP & Database Projects",
      "Web & Mobile Applications",
      "Project Documentation",
      "Demonstration & Deployment Support",
    ],
  },
];

function ServicesOverview() {
  const sectionRef = useSectionParallax(0.45);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("services-overview-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="services-overview" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="services-overview-container">
        <div className="services-overview-heading">
          <div className="services-overview-eyebrow">
            <span className="services-overview-line" />
            <span>02 / OUR EXPERTISE</span>
          </div>

          <div className="services-overview-intro">
            <h2>
              Solutions Built
              <br />
              <em>Around Your Needs.</em>
            </h2>

            <p>
              Every idea deserves the right approach. We bring
              together design, development, and practical
              problem-solving to create digital solutions
              that serve a real purpose.
            </p>
          </div>
        </div>

        <div className="services-overview-list">
          {services.map((service) => (
            <article
              className="service-overview-item"
              key={service.number}
            >
              <div className="service-overview-number">
                {service.number}
              </div>

              <div className="service-overview-content">
                <div className="service-overview-title-row">
                  <h3>{service.title}</h3>
                  <span className="service-overview-arrow">
                    ↗
                  </span>
                </div>

                <p className="service-overview-description">
                  {service.description}
                </p>

                <div className="service-overview-tags">
                  {service.capabilities.map((capability) => (
                    <span key={capability}>
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="services-overview-bottom">
          <span>THOUGHTFUL DESIGN. PRACTICAL DEVELOPMENT.</span>
          <span>BUILT WITH PURPOSE — S-DEVWORKS</span>
        </div>
      </div>
    </section>
  );
}

export default ServicesOverview;
