
import { Link } from "react-router-dom";

import "../styles/admin-dashboard.css";

function AdminDashboard() {
  const statistics = [
    {
      label: "Total Projects",
      value: "03",
      detail: "Projects in portfolio",
      icon: "▧",
    },
    {
      label: "Categories",
      value: "01",
      detail: "Active categories",
      icon: "◈",
    },
    {
      label: "Team Members",
      value: "02",
      detail: "People in our studio",
      icon: "♙",
    },
    {
      label: "Featured Projects",
      value: "01",
      detail: "Currently highlighted",
      icon: "✧",
    },
    {
      label: "Email Enquiries",
      value: "00",
      detail: "New website enquiries",
      icon: "✉",
    },
  ];

  const recentProjects = [
    {
      name: "Standard Metal Company",
      category: "Web Development",
      year: "2025",
      status: "Published",
    },
    {
      name: "Aurelia",
      category: "Web Development",
      year: "2025",
      status: "Concept",
    },
    {
      name: "Nexora",
      category: "Web Development",
      year: "2025",
      status: "Concept",
    },
  ];

  const quickActions = [
    {
      title: "Add New Project",
      description: "Add a project to your portfolio",
      icon: "+",
      path: "/admin/projects",
    },
    {
      title: "Manage Categories",
      description: "Organize your project categories",
      icon: "◈",
      path: "/admin/categories",
    },
    {
      title: "Manage Team",
      description: "Update your studio members",
      icon: "♙",
      path: "/admin/team",
    },
    {
      title: "View Email Enquiries",
      description: "Check messages from website visitors",
      icon: "✉",
      path: "/admin/emails",
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* WELCOME SECTION */}
      <section className="admin-welcome">
        <div>
          <span className="admin-section-eyebrow">
            WORKSPACE OVERVIEW
          </span>

          <h2>
            Welcome back, <span>Administrator.</span>
          </h2>

          <p>
            Here's what's happening across your creative workspace.
            Manage your projects, team, and digital presence from here.
          </p>
        </div>

        <div className="admin-welcome-decoration">
          <span>S</span>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="admin-statistics">
        {statistics.map((item) => (
          <div className="admin-stat-card" key={item.label}>
            <div className="admin-stat-top">
              <span className="admin-stat-label">
                {item.label}
              </span>

              <span className="admin-stat-icon">
                {item.icon}
              </span>
            </div>

            <h3>{item.value}</h3>

            <span className="admin-stat-detail">
              {item.detail}
            </span>
          </div>
        ))}
      </section>

      {/* MAIN DASHBOARD GRID */}
      <section className="admin-dashboard-grid">

        {/* RECENT PROJECTS */}
        <div className="admin-dashboard-panel admin-recent-projects">
          <div className="admin-panel-header">
            <div>
              <span className="admin-section-eyebrow">
                PORTFOLIO ACTIVITY
              </span>

              <h3>Recent Projects</h3>
            </div>

            <Link to="/admin/projects" className="admin-panel-link">
              View All ↗
            </Link>
          </div>

          <div className="admin-project-table">
            <div className="admin-table-heading">
              <span>PROJECT</span>
              <span>CATEGORY</span>
              <span>YEAR</span>
              <span>STATUS</span>
            </div>

            {recentProjects.map((project) => (
              <div
                className="admin-project-row"
                key={project.name}
              >
                <span className="admin-project-name">
                  {project.name}
                </span>

                <span className="admin-project-category">
                  {project.category}
                </span>

                <span className="admin-project-year">
                  {project.year}
                </span>

                <span
                  className={`admin-project-status ${
                    project.status === "Published"
                      ? "published"
                      : "concept"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="admin-dashboard-panel admin-quick-actions">
          <div className="admin-panel-header">
            <div>
              <span className="admin-section-eyebrow">
                SHORTCUTS
              </span>

              <h3>Quick Actions</h3>
            </div>
          </div>

          <div className="admin-actions-list">
            {quickActions.map((action) => (
              <Link
                to={action.path}
                className="admin-action-item"
                key={action.title}
              >
                <span className="admin-action-icon">
                  {action.icon}
                </span>

                <span className="admin-action-content">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>

                <span className="admin-action-arrow">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* RECENT EMAIL ENQUIRIES */}
      <section className="admin-dashboard-panel admin-email-panel">
        <div className="admin-panel-header">
          <div>
            <span className="admin-section-eyebrow">
              WEBSITE COMMUNICATION
            </span>

            <h3>Recent Email Enquiries</h3>
          </div>

          <Link to="/admin/emails" className="admin-panel-link">
            View All ↗
          </Link>
        </div>

        <div className="admin-email-empty">
          <div className="admin-email-empty-icon">
            ✉
          </div>

          <h4>No enquiries to display yet</h4>

          <p>
            Messages submitted through your website's contact form
            will appear here once the database is connected.
          </p>
        </div>
      </section>

      {/* BOTTOM NOTE */}
      <section className="admin-dashboard-footer">
        <div>
          <span className="admin-footer-dot" />
          <span>YOUR CREATIVE WORKSPACE</span>
        </div>

        <span>S-DEVWORKS · ADMINISTRATION</span>
      </section>

    </div>
  );
}

export default AdminDashboard;
