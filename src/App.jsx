
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Website Layout
import MainLayout from "./layout/MainLayout";

// Public Pages
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/Projects";
import Services from "./pages/services";
import Contact from "./pages/contact";

// Admin Dashboard
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==============================
            PUBLIC WEBSITE ROUTES
        ============================== */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ==============================
            ADMIN DASHBOARD ROUTES
        ============================== */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
