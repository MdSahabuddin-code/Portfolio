
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/admin-header.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/projects": "Projects",
    "/admin/categories": "Categories",
    "/admin/team": "Team Members",
    "/admin/media": "Media Library",
    "/admin/settings": "Settings",
    "/admin/emails": "Emails",
  };

  const currentTitle = pageTitles[location.pathname] || "Admin";

  async function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from the S-DevWorks Admin Dashboard?"
    );

    if (!confirmLogout) {
      return;
    }

    try {
      setLoggingOut(true);

      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Logout failed.");
      }

      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Admin logout failed:", error);

      window.alert(
        "Unable to logout because the server could not be reached. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="admin-header-breadcrumb">
          <span>ADMIN</span>
          <span className="admin-breadcrumb-separator">/</span>
          <span className="admin-breadcrumb-current">
            {currentTitle}
          </span>
        </div>

        <h1 className="admin-header-title">
          {currentTitle}
        </h1>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-status">
          <span className="admin-header-status-dot" />
          <span>Workspace Active</span>
        </div>

        <div className="admin-header-divider" />

        <div className="admin-header-profile">
          <div className="admin-profile-avatar">S</div>

          <div className="admin-profile-info">
            <span className="admin-profile-name">
              Administrator
            </span>

            <span className="admin-profile-role">
              SUPER ADMIN
            </span>
          </div>
        </div>

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
          disabled={loggingOut}
          title="Logout"
        >
          <span>↪</span>
          <span>{loggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
