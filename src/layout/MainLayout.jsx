
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CursorGlow from "../components/CursorGlow";

function MainLayout() {
  return (
    <>
      <CursorGlow />

      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default MainLayout;
