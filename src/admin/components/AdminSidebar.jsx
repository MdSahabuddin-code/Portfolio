
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo/S-DevWorks-Dark.png";

import "../styles/admin-sidebar.css";

function AdminSidebar() {
  const navigation = [
    {
      title: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          path: "/admin",
          icon: "◫",
        },
      ],
    },
    {
      title: "WORKSPACE",
      items: [
        {
          name: "Projects",
          path: "/admin/projects",
          icon: "▧",
        },
        {
          name: "Categories",
          path: "/admin/categories",
          icon: "◈",
        },
        {
          name: "Team Members",
          path: "/admin/team",
          icon: "♙",
        },
        {
          name: "Media Library",
          path: "/admin/media",
          icon: "▤",
        },
        {
          name: "Emails",
          path: "/admin/emails",
          icon: "✉",
        },
      ],
    },
    {
      title: "PREFERENCES",
      items: [
        {
          name: "Settings",
          path: "/admin/settings",
          icon: "⚙",
        },
      ],
    },
  ];

  return (
    <aside className="admin-sidebar">
      {/* BRAND */}
      <div className="admin-sidebar-brand">
        <div className="admin-brand-mark">
          <img src={logo} alt="S-DevWorks Logo" />
        </div>

        <div className="admin-brand-text">
          <h2>S-DEVWORKS</h2>
          <span>ADMINISTRATION</span>
        </div>
      </div>

      <div className="admin-sidebar-divider" />

      {/* NAVIGATION */}
      <nav className="admin-sidebar-navigation">
        {navigation.map((group) => (
          <div className="admin-nav-group" key={group.title}>
            <span className="admin-nav-heading">
              {group.title}
            </span>

            {group.items.map((item) => (
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active" : ""}`
                }
                key={item.path}
              >
                <span className="admin-nav-icon">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* BOTTOM */}
      <div className="admin-sidebar-bottom">
        <div className="admin-sidebar-status">
          <span className="admin-status-dot" />
          <span>System Online</span>
        </div>

        <div className="admin-sidebar-version">
          S-DEVWORKS ADMIN · V1.0
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
