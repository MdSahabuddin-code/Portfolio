import AboutBackground from "../components/AboutBackground";
import AboutHero from "../section/about/AboutHero";
import OurStory from "../section/about/OurStory";
import Philosophy from "../section/about/Philosophy";

function About() {
  return (
    <main className="about-page">
      <AboutBackground />
      <AboutHero />
      <OurStory />
      <Philosophy />
    </main>
  );
}

export default About;