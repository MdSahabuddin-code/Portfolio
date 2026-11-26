
import { useLocation } from "react-router-dom";

import "../styles/admin-header.css";

function AdminHeader() {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/projects": "Projects",
    "/admin/categories": "Categories",
    "/admin/team": "Team Members",
    "/admin/media": "Media Library",
    "/admin/settings": "Settings",
  };

  const currentTitle = pageTitles[location.pathname] || "Admin";

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
      </div>
    </header>
  );
}

export default AdminHeader;
