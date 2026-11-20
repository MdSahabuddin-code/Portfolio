import MainLayout from "./layout/MainLayout";
import Hero from "./section/home/HeroSection";
import StudioIntro from "./section/home/StudioIntro";
import Founders from "./section/home/Founders";
import FeaturedProjects from "./section/home/FeaturedProjects";

function App() {
  return (
    <MainLayout>
      <Hero />
      <StudioIntro />
      <Founders />
      <FeaturedProjects />
      <h1>Welcome to STUDIO NOIR</h1>
      <p>Two minds. One vision.</p>
    </MainLayout>
  );
}

export default App;