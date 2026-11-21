
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../styles/navbar.css";

import darkLogo from "../assets/logo/S-DevWorks-Dark.png";
import lightLogo from "../assets/logo/S-DevWorks-Light.png";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  function toggleTheme(isLightMode) {
    setDarkMode(!isLightMode);

    document.documentElement.setAttribute(
      "data-theme",
      isLightMode ? "light" : "dark"
    );
  }

  return (
    <header className="navbar">

      {/* Dynamic Logo */}
      <Link to="/" className="navbar-logo">
        <img
          src={darkMode ? darkLogo : lightLogo}
          alt="S-DevWorks"
        />
      </Link>

      {/* Navigation Links */}
      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Animated Theme Switch */}
      <label className="switch">
        <input
          type="checkbox"
          checked={!darkMode}
          onChange={(e) => toggleTheme(e.target.checked)}
          aria-label="Toggle light and dark theme"
        />

        <span className="slider">
          <span className="star star_1"></span>
          <span className="star star_2"></span>
          <span className="star star_3"></span>

          <svg
            className="cloud"
            viewBox="0 0 100 60"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#fff"
              d="M25 48 C10 48 8 30 20 24 C23 10 44 8 51 22 C65 10 85 20 82 37 C99 43 91 55 77 55 H25 Z"
            />
          </svg>
        </span>
      </label>

    </header>
  );
}

export default Navbar;
