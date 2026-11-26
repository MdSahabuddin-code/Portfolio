import AboutBackground from "../components/AboutBackground";
import AboutHero from "../section/about/AboutHero";
import OurStory from "../section/about/OurStory";
import Philosophy from "../section/about/Philosophy";
import HowWeWork from "../section/about/HowWeWork";
import WhatWeDo from "../section/about/WhatWeDo";
import OwnershipLeadership from "../section/about/OwnershipLeadership";
import CompanyTimeline from "../section/about/CompanyTimeline";
import AboutCta from "../section/about/AboutCta";

function About() {
  return (
    <main className="about-page">
      <AboutBackground />
      <AboutHero />
      <OurStory />
      <Philosophy />
      <HowWeWork />
      <WhatWeDo />
      <OwnershipLeadership />
      <CompanyTimeline />
      <AboutCta />
    </main>
  );
}

export default About;