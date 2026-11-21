import AboutBackground from "../components/AboutBackground";
import AboutHero from "../section/about/AboutHero";
import OurStory from "../section/about/OurStory";
import Philosophy from "../section/about/Philosophy";
import HowWeWork from "../section/about/HowWeWork";
import WhatWeDo from "../section/about/WhatWeDo";

function About() {
  return (
    <main className="about-page">
      <AboutBackground />
      <AboutHero />
      <OurStory />
      <Philosophy />
      <HowWeWork />
      <WhatWeDo />
    </main>
  );
}

export default About;