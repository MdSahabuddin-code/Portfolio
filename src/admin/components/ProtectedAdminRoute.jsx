
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

function ProtectedAdminRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAdminSession() {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (isMounted) {
            setAuthenticated(false);
          }
          return;
        }

        const result = await response.json();

        if (isMounted) {
          setAuthenticated(result.success === true);
        }
      } catch (error) {
        console.error("Admin session verification failed:", error);

        if (isMounted) {
          setAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    verifyAdminSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-auth-loading">
        <p>Verifying administrator access...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
