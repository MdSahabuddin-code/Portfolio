
import AboutBackground from "../components/AboutBackground";
import ServicesHero from "../section/services/ServicesHero";
import ServicesOverview from "../section/services/ServicesOverview";
import WebAppDevelopment from "../section/services/WebAppDevelopment";

function Services() {
  return (
    <main className="services-page">
      <AboutBackground />
      <ServicesHero />
      <ServicesOverview />
      <WebAppDevelopment />
    </main>
  );
}

export default Services;
