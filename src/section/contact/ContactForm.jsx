
import { useEffect, useRef, useState } from "react";

import useSectionParallax from "../../hooks/useSectionParallax";
import { submitContactForm } from "../../services/contactService";
import Fireflies from "../../components/FireFlies";

import "../../styles/contact/contact-form.css";
import "../../styles/fireflies.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const FIELD_NAMES = ["name", "email", "phone", "message"];
const MAX_MESSAGE_LENGTH = 1000;

function validateField(field, value) {
  const trimmedValue = value.trim();

  switch (field) {
    case "name":
      if (!trimmedValue) return "Please enter your name.";
      if (trimmedValue.length > 100) {
        return "Name cannot exceed 100 characters.";
      }
      return "";

    case "email":
      if (!trimmedValue) return "Please enter your email address.";
      if (trimmedValue.length > 254) {
        return "Email cannot exceed 254 characters.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
        return "Please enter a valid email address.";
      }
      return "";

    case "phone":
      if (trimmedValue.length > 20) {
        return "Phone number cannot exceed 20 characters.";
      }
      if (trimmedValue && !/^[0-9+\-\s()]+$/.test(trimmedValue)) {
        return "Please enter a valid phone number.";
      }
      return "";

    case "message":
      if (!trimmedValue) return "Please tell us about your project.";
      if (trimmedValue.length < 5) {
        return "Message must contain at least 5 characters.";
      }
      if (trimmedValue.length > MAX_MESSAGE_LENGTH) {
        return "Message cannot exceed 1000 characters.";
      }
      return "";

    default:
      return "";
  }
}

function ContactForm() {
  const sectionRef = useSectionParallax(0.3);
  const fieldRefs = useRef({});

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Reveal section when it enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("contact-form-visible");
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitStatus(null);

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setActiveField(null);

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    FIELD_NAMES.forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched(Object.fromEntries(FIELD_NAMES.map((field) => [field, true])));

    const firstInvalidField = FIELD_NAMES.find((field) => newErrors[field]);
    if (firstInvalidField) {
      requestAnimationFrame(() => {
        fieldRefs.current[firstInvalidField]?.focus();
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      setSubmitStatus({
        type: "success",
        message:
          result.message ||
          "Your message has been received. Thank you!",
      });

      setFormData(initialForm);
      setErrors({});
      setTouched({});
      setActiveField(null);
    } catch (error) {
      if (error.fieldErrors) {
        setErrors((previous) => ({
          ...previous,
          ...error.fieldErrors,
        }));

        setTouched(Object.fromEntries(FIELD_NAMES.map((field) => [field, true])));

        const firstInvalidField = FIELD_NAMES.find(
          (field) => error.fieldErrors[field]
        );
        if (firstInvalidField) {
          requestAnimationFrame(() => {
            fieldRefs.current[firstInvalidField]?.focus();
          });
        }
      }

      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClass = (field) => {
    const classes = ["contact-field"];

    if (field === "phone" || field === "message") {
      classes.push("contact-field-full");
    }

    if (activeField === field) {
      classes.push("is-active");
    }

    if (formData[field].length > 0) {
      classes.push("has-value");
    }

    if (errors[field] && touched[field]) {
      classes.push("has-error");
    }

    return classes.join(" ");
  };

  return (
    <section
      className="contact-form-section"
      id="contact-form"
      ref={sectionRef}
    >
      {/* Background fireflies */}
      <Fireflies count={18} variant="founders" />

      {/* Ambient decorative lighting */}
      <div className="contact-form-ambient contact-form-ambient-one" />
      <div className="contact-form-ambient contact-form-ambient-two" />

      <div className="contact-form-container">
        <div className="contact-form-heading">
          <div className="contact-form-eyebrow">
            <span className="contact-form-heading-line" />
            <span>02 / YOUR MESSAGE</span>
          </div>

          <h2>
            Tell Us About
            <br />
            <em>Your Project.</em>
          </h2>

          <p>
            Every meaningful collaboration starts with
            understanding. Share your idea, requirements,
            or challenge with us.
          </p>

          <div className="contact-form-note">
            <span className="contact-form-note-mark">S—DevWorks</span>
            <span>
              A LITTLE ABOUT YOUR IDEA.
              <br />
              A LOT OF POSSIBILITIES AHEAD.
            </span>
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-card-top">
            <span>PROJECT ENQUIRY</span>
            <span>ALL FIELDS MARKED * ARE REQUIRED</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-input-grid">
              {/* NAME */}
              <div className={getFieldClass("name")}>
                <label htmlFor="contact-name">
                  Full Name <span>*</span>
                </label>

                <input
                  id="contact-name"
                  ref={(element) => {
                    fieldRefs.current.name = element;
                  }}
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField("name")}
                  onBlur={handleBlur}
                  maxLength={100}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />

                {errors.name && touched.name && (
                  <span
                    className="contact-field-error"
                    id="contact-name-error"
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              {/* EMAIL */}
              <div className={getFieldClass("email")}>
                <label htmlFor="contact-email">
                  Email Address <span>*</span>
                </label>

                <input
                  id="contact-email"
                  ref={(element) => {
                    fieldRefs.current.email = element;
                  }}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField("email")}
                  onBlur={handleBlur}
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />

                {errors.email && touched.email && (
                  <span
                    className="contact-field-error"
                    id="contact-email-error"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              {/* PHONE */}
              <div className={getFieldClass("phone")}>
                <label htmlFor="contact-phone">
                  Phone Number{" "}
                  <span className="optional-label">(OPTIONAL)</span>
                </label>

                <input
                  id="contact-phone"
                  ref={(element) => {
                    fieldRefs.current.phone = element;
                  }}
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveField("phone")}
                  onBlur={handleBlur}
                  maxLength={20}
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "contact-phone-error" : undefined
                  }
                />

                {errors.phone && touched.phone && (
                  <span
                    className="contact-field-error"
                    id="contact-phone-error"
                  >
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* MESSAGE */}
              <div className={getFieldClass("message")}>
                <div className="contact-message-label">
                  <label htmlFor="contact-message">
                    Tell Us About Your Project <span>*</span>
                  </label>

                  <span className="contact-character-count">
                    {formData.message.length} / {MAX_MESSAGE_LENGTH}
                  </span>
                </div>

                <textarea
                  id="contact-message"
                  ref={(element) => {
                    fieldRefs.current.message = element;
                  }}
                  name="message"
                  placeholder="Tell us what you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={handleBlur}
                  minLength={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />

                {errors.message && touched.message && (
                  <span
                    className="contact-field-error"
                    id="contact-message-error"
                  >
                    {errors.message}
                  </span>
                )}
              </div>
            </div>

            {submitStatus && (
              <div
                className={`contact-submit-alert ${submitStatus.type}`}
                role={
                  submitStatus.type === "error" ? "alert" : "status"
                }
                aria-live="polite"
              >
                <span className="contact-alert-symbol">
                  {submitStatus.type === "success" ? "✓" : "!"}
                </span>

                <span>{submitStatus.message}</span>
              </div>
            )}

            <div className="contact-form-submit-row">
              <p>
                Your information will only be used to respond
                to your enquiry.
              </p>

              <button
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting ? "SENDING..." : "SEND YOUR MESSAGE"}
                </span>

                <span className="contact-submit-arrow">
                  {isSubmitting ? "..." : "↗"}
                </span>
              </button>
            </div>
          </form>

          <div className="contact-form-card-bottom">
            <span>STANDARD DEVELOPMENT WORKS</span>
            <span>WE LOOK FORWARD TO HEARING FROM YOU.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
