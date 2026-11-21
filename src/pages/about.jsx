import AboutBackground from "../components/AboutBackground";
import AboutHero from "../section/about/AboutHero";
import OurStory from "../section/about/OurStory";

function About() {
  return (
    <main className="about-page">
      <AboutBackground />
      <AboutHero />
      <OurStory />
    </main>
  );
}

export default About;