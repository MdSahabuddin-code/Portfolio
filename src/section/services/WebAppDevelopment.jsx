
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/services/web-app-development.css";
import "../../styles/fireflies.css";

const developmentServices = [
  {
    number: "01",
    category: "DIGITAL PRESENCE",
    title: "Web Development",
    description:
      "We design and develop responsive websites and web applications that give businesses a strong digital presence. From a simple portfolio to a complete business platform, every project is built around its purpose and audience.",
    capabilities: [
      "Business Websites",
      "Portfolio Websites",
      "E-commerce Platforms",
      "Custom Web Applications",
      "Admin Panels & Dashboards",
      "Website Redesign",
    ],
    preview: "web",
    reverse: false,
  },
  {
    number: "02",
    category: "APPLICATION EXPERIENCES",
    title: "Application Development",
    description:
      "We bring ideas to life through applications designed for everyday use. Whether the solution is mobile, desktop, or web-based, we focus on practical functionality, clear interfaces, and a smooth user experience.",
    capabilities: [
      "Android Applications",
      "iOS Applications",
      "Cross-platform Apps",
      "Desktop Applications",
      "Web-based Applications",
      "Application Improvements",
    ],
    preview: "app",
    reverse: true,
  },
  {
    number: "03",
    category: "BUSINESS AUTOMATION",
    title: "Custom Software Development",
    description:
      "Off-the-shelf software doesn't always fit the way a business works. We develop tailored systems that help organise operations, manage information, and reduce repetitive everyday tasks.",
    capabilities: [
      "Inventory Management",
      "Billing & Invoicing",
      "Stock Management",
      "POS Systems",
      "Employee Management",
      "Business Management Tools",
    ],
    preview: "software",
    reverse: false,
  },
];

function WebPreview() {
  return (
    <div className="development-preview web-preview">
      <div className="preview-window">
        <div className="preview-window-bar">
          <div className="preview-dots">
            <i />
            <i />
            <i />
          </div>
          <span>yourbusiness.com</span>
          <span className="preview-window-menu">···</span>
        </div>

        <div className="web-preview-content">
          <div className="web-preview-nav">
            <span className="web-preview-logo">STUDIO.</span>
            <div>
              <span>Home</span>
              <span>About</span>
              <span>Services</span>
            </div>
          </div>

          <div className="web-preview-hero">
            <div className="web-preview-copy">
              <span>DESIGNED FOR WHAT'S NEXT</span>
              <strong>
                Ideas into
                <br />
                <em>experiences.</em>
              </strong>
              <i />
              <small>Thoughtful digital solutions for modern businesses.</small>
              <b>EXPLORE MORE ↗</b>
            </div>

            <div className="web-preview-art">
              <div className="web-preview-orbit" />
              <div className="web-preview-art-core">S</div>
              <span>01</span>
            </div>
          </div>

          <div className="web-preview-footer">
            <span>CREATIVE DIRECTION</span>
            <span>DESIGN / DEVELOPMENT</span>
          </div>
        </div>
      </div>

      <span className="preview-caption">01 — DIGITAL EXPERIENCES</span>
    </div>
  );
}

function AppPreview() {
  return (
    <div className="development-preview app-preview">
      <div className="app-preview-glow" />

      <div className="app-phone">
        <div className="app-phone-notch" />

        <div className="app-phone-screen">
          <div className="app-phone-top">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>

          <div className="app-greeting">
            <span>GOOD MORNING</span>
            <strong>Welcome back.</strong>
            <small>Here's your daily overview.</small>
          </div>

          <div className="app-balance">
            <span>TOTAL OVERVIEW</span>
            <strong>₹ 48,250</strong>
            <small>+12.8% this month</small>
          </div>

          <div className="app-stats">
            <div>
              <span>Orders</span>
              <strong>128</strong>
            </div>
            <div>
              <span>Customers</span>
              <strong>64</strong>
            </div>
          </div>

          <div className="app-activity">
            <span>RECENT ACTIVITY</span>
            <i />
            <i />
            <i />
          </div>

          <div className="app-bottom-nav">
            <span>⌂</span>
            <span>▦</span>
            <span>◷</span>
            <span>○</span>
          </div>
        </div>
      </div>

      <div className="app-floating-card">
        <span>APPLICATION DESIGN</span>
        <strong>One experience.</strong>
        <strong>Every screen.</strong>
        <small>Mobile · Desktop · Web</small>
      </div>

      <span className="preview-caption">02 — APPLICATION EXPERIENCES</span>
    </div>
  );
}

function SoftwarePreview() {
  return (
    <div className="development-preview software-preview">
      <div className="software-dashboard">
        <div className="software-sidebar">
          <div className="software-brand">S<span>.</span></div>
          <i className="active">▦</i>
          <i>▤</i>
          <i>◫</i>
          <i>◷</i>
          <i>⚙</i>
        </div>

        <div className="software-main">
          <div className="software-topbar">
            <span>BUSINESS OVERVIEW</span>
            <small>ADMIN PANEL</small>
          </div>

          <div className="software-heading">
            <strong>Dashboard</strong>
            <span>Welcome back</span>
          </div>

          <div className="software-metrics">
            <div>
              <span>TOTAL SALES</span>
              <strong>₹82,450</strong>
              <small>↗ 8.4%</small>
            </div>
            <div>
              <span>PRODUCTS</span>
              <strong>248</strong>
              <small>In inventory</small>
            </div>
            <div>
              <span>ORDERS</span>
              <strong>126</strong>
              <small>This month</small>
            </div>
          </div>

          <div className="software-chart">
            <div className="software-chart-heading">
              <span>SALES ACTIVITY</span>
              <small>THIS WEEK</small>
            </div>

            <div className="software-chart-bars">
              {[35, 55, 43, 75, 52, 88, 65].map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>

          <div className="software-table">
            <span>RECENT TRANSACTIONS</span>
            <div><i /> Order #1024 <b>Completed</b></div>
            <div><i /> Order #1025 <b>Processing</b></div>
          </div>
        </div>
      </div>

      <span className="preview-caption">03 — BUSINESS MANAGEMENT</span>
    </div>
  );
}

function DevelopmentPreview({ type }) {
  if (type === "web") return <WebPreview />;
  if (type === "app") return <AppPreview />;
  return <SoftwarePreview />;
}

function WebAppDevelopment() {
  const sectionRef = useSectionParallax(0.35);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("development-item-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = section.querySelectorAll(".development-item");

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section className="web-app-development" ref={sectionRef}>
      <Fireflies count={18} variant="founders" />

      <div className="development-container">
        <div className="development-section-heading">
          <div className="development-eyebrow">
            <span />
            <span>03 / WHAT WE BUILD</span>
          </div>

          <h2>
            From Digital Ideas
            <br />
            <em>To Real-World Solutions.</em>
          </h2>

          <p>
            Different challenges need different solutions.
            We combine design and development to build digital
            experiences and software that make a meaningful difference.
          </p>
        </div>

        <div className="development-list">
          {developmentServices.map((service) => (
            <article
              className={`development-item ${
                service.reverse ? "development-item-reverse" : ""
              }`}
              key={service.number}
            >
              <div className="development-visual">
                <DevelopmentPreview type={service.preview} />
              </div>

              <div className="development-information">
                <div className="development-category">
                  <span>{service.number}</span>
                  <i />
                  <span>{service.category}</span>
                </div>

                <h3>{service.title}</h3>

                <p className="development-description">
                  {service.description}
                </p>

                <div className="development-capabilities">
                  {service.capabilities.map((capability) => (
                    <span key={capability}>
                      <i />
                      {capability}
                    </span>
                  ))}
                </div>

                <div className="development-bottom-line">
                  <span>DESIGNED WITH PURPOSE</span>
                  <span>BUILT TO WORK ↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="development-section-footer">
          <span>DESIGN / ENGINEERING / INNOVATION</span>
          <span>STANDARD DEVELOPMENT WORKS</span>
        </div>
      </div>
    </section>
  );
}

export default WebAppDevelopment;
