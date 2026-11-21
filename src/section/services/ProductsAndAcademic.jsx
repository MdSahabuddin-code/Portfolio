
import { useEffect } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import Fireflies from "../../components/FireFlies";

import "../../styles/services/products-and-academic.css";
import "../../styles/fireflies.css";

const products = [
  {
    number: "01",
    name: "Inventory Management",
    description:
      "Organise products, monitor stock movements, manage suppliers, and keep business inventory under control.",
    status: "PRODUCT DIRECTION",
  },
  {
    number: "02",
    name: "Billing & POS",
    description:
      "Simplify everyday sales with billing, invoice generation, transaction records, and point-of-sale workflows.",
    status: "PRODUCT DIRECTION",
  },
  {
    number: "03",
    name: "Business Management",
    description:
      "Bring essential business operations together through practical tools for customers, employees, and daily records.",
    status: "FUTURE DEVELOPMENT",
  },
];

const academicServices = [
  "Final-year and academic software projects",
  "Java, Python and PHP development",
  "Database-driven applications",
  "Web, mobile and desktop projects",
  "Project planning and implementation guidance",
  "Documentation, demonstration and deployment support",
];

function ProductsAndAcademic() {
  const sectionRef = useSectionParallax(0.35);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("products-academic-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      className="products-academic"
      ref={sectionRef}
    >
      <Fireflies count={18} variant="founders" />

      <div className="products-academic-container">

        {/* SECTION HEADING */}
        <div className="products-academic-heading">
          <div className="products-academic-eyebrow">
            <span className="products-academic-line" />
            <span>04 / BEYOND CLIENT PROJECTS</span>
          </div>

          <h2>
            Building Beyond
            <br />
            <em>Custom Development.</em>
          </h2>

          <p>
            Our work doesn't stop at individual projects.
            We're also building reusable software solutions
            and helping students turn technical ideas into
            practical working applications.
          </p>
        </div>

        {/* SOFTWARE PRODUCTS */}
        <div className="products-area">
          <div className="products-area-heading">
            <div>
              <span className="products-area-label">
                01 / SOFTWARE PRODUCTS
              </span>

              <h3>
                Our Products.
                <br />
                <em>Made for Everyday Work.</em>
              </h3>
            </div>

            <p>
              We aim to develop practical software products
              that can serve different businesses without
              requiring every solution to start from scratch.
            </p>
          </div>

          <div className="product-list">
            {products.map((product) => (
              <article
                className="product-item"
                key={product.number}
              >
                <span className="product-number">
                  {product.number}
                </span>

                <div className="product-content">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>

                <span className="product-status">
                  {product.status}
                </span>

                <span className="product-arrow">↗</span>
              </article>
            ))}
          </div>

          <div className="products-note">
            <span className="products-note-dot" />
            <p>
              Product availability and features will be
              announced as each solution develops.
            </p>
          </div>
        </div>

        {/* ACADEMIC SUPPORT */}
        <div className="academic-area">
          <div className="academic-visual">
            <span className="academic-visual-index">
              02 / ACADEMIC SUPPORT
            </span>

            <div className="academic-visual-mark">
              <span>&lt;</span>
              <span>/</span>
              <span>&gt;</span>
            </div>

            <div className="academic-visual-bottom">
              <span>LEARN</span>
              <span>BUILD</span>
              <span>UNDERSTAND</span>
            </div>
          </div>

          <div className="academic-content">
            <span className="academic-label">
              LEARN THROUGH BUILDING
            </span>

            <h3>
              Academic Projects
              <br />
              <em>& Student Support.</em>
            </h3>

            <p className="academic-description">
              We help students approach software projects
              with practical guidance, technical support,
              and a focus on understanding how their
              applications work.
            </p>

            <div className="academic-list">
              {academicServices.map((service, index) => (
                <div
                  className="academic-list-item"
                  key={service}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{service}</p>
                  <span className="academic-list-arrow">↗</span>
                </div>
              ))}
            </div>

            <p className="academic-note">
              Our approach focuses on guidance and practical
              learning, helping students understand and take
              ownership of their own work.
            </p>
          </div>
        </div>

        {/* BOTTOM METADATA */}
        <div className="products-academic-bottom">
          <span>OUR PRODUCTS / YOUR IDEAS / PRACTICAL LEARNING</span>
          <span>STANDARD DEVELOPMENT WORKS</span>
        </div>

      </div>
    </section>
  );
}

export default ProductsAndAcademic;
