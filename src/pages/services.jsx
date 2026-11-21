
import AboutBackground from "../components/AboutBackground";
import ServicesHero from "../section/services/ServicesHero";
import ServicesOverview from "../section/services/ServicesOverview";
import WebAppDevelopment from "../section/services/WebAppDevelopment";
import ProductsAndAcademic from "../section/services/ProductsAndAcademic";
import ProcessContact from "../section/services/ProcessContact";

function Services() {
  return (
    <main className="services-page">
      <AboutBackground />
      <ServicesHero />
      <ServicesOverview />
      <WebAppDevelopment />
      <ProductsAndAcademic />
      <ProcessContact />
    </main>
  );
}

export default Services;
