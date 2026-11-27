
const AUTH_KEY = "sdevworks_admin_authenticated";

export function isAdminAuthenticated() {
  return (
    sessionStorage.getItem(AUTH_KEY) === "true" ||
    localStorage.getItem(AUTH_KEY) === "true"
  );
}

export function loginAdmin(rememberMe) {
  if (rememberMe) {
    localStorage.setItem(AUTH_KEY, "true");
    sessionStorage.removeItem(AUTH_KEY);
  } else {
    sessionStorage.setItem(AUTH_KEY, "true");
    localStorage.removeItem(AUTH_KEY);
  }
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
}
