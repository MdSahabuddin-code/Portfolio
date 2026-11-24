
import AboutBackground from "../components/AboutBackground";
import ContactHero from "../section/contact/ContactHero";
import ContactForm from "../section/contact/ContactForm";

function Contact() {
  return (
    <main className="contact-page">
      <AboutBackground />

      <ContactHero />
      <ContactForm />

      {/* Contact form will be added in the next section */}
    </main>
  );
}

export default Contact;
