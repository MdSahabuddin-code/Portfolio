
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo/S-Devworks-Dark.png";

import "../styles/admin-login.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Check whether an admin session already exists.
  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok && isMounted) {
          navigate("/admin", { replace: true });
          return;
        }
      } catch (error) {
        console.error("Session verification failed:", error);
      } finally {
        if (isMounted) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Handle admin login.
  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          rememberMe,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed.");
      }

      // The backend sets the HTTP-only authentication cookie.
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin login failed:", error);

      setError(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-container">
          <p>Verifying admin session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-background">
        <div className="admin-login-orb admin-login-orb-one" />
        <div className="admin-login-orb admin-login-orb-two" />
      </div>

      <section className="admin-login-container">
        <div className="admin-login-brand">
          <div className="admin-login-logo">
            <img src={logo} alt="S-DevWorks Logo" />
          </div>

          <span>ADMINISTRATION PORTAL</span>
        </div>

        <div className="admin-login-card">
          <div className="admin-login-heading">
            <span>WELCOME BACK</span>
            <h2>Admin Sign In</h2>
            <p>Enter your administrator credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-login-field">
              <label htmlFor="adminEmail">EMAIL ADDRESS</label>

              <input
                id="adminEmail"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="adminPassword">PASSWORD</label>

              <div className="admin-login-password-wrapper">
                <input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="admin-login-error"
                role="alert"
                style={{
                  color: "#e58b83",
                  fontSize: "12px",
                  marginTop: "12px",
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            <div className="admin-login-options">
              <label className="admin-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              <span className="admin-login-secure">
                <span className="admin-secure-dot" />
                SECURE SESSION
              </span>
            </div>

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              <span>{loading ? "..." : "↗"}</span>
            </button>
          </form>

          <div className="admin-login-card-footer">
            AUTHORIZED PERSONNEL ONLY
          </div>
        </div>

        <p className="admin-login-copyright">
          © {new Date().getFullYear()} S-DevWorks. All rights reserved.
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;
