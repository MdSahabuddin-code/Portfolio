import MainLayout from "./layout/MainLayout";
import Hero from "./section/home/HeroSection";
import StudioIntro from "./section/home/StudioIntro";
function App() {
  return (
    <MainLayout>
      <Hero />
      <StudioIntro />
      <h1>Welcome to STUDIO NOIR</h1>
      <p>Two minds. One vision.</p>
    </MainLayout>
  );
}

export default App;