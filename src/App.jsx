import MainLayout from "./layout/MainLayout";
import Hero from "./section/home/HeroSection";
function App() {
  return (
    <MainLayout>
      <Hero />
      <h1>Welcome to STUDIO NOIR</h1>
      <p>Two minds. One vision.</p>
    </MainLayout>
  );
}

export default App;