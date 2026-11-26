
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/Projects";
import Services from "./pages/services";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />}/>
          <Route path="/contact" element={<Contact />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
