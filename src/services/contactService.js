const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

export async function submitContactForm(formData) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
  } catch {
    const networkError = new Error(
      "Unable to reach the server. Please check your connection and try again."
    );
    networkError.code = "NETWORK_ERROR";
    throw networkError;
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 400 && Array.isArray(result.errors)) {
      const validationError = new Error("Please check the information you entered.");
      validationError.fieldErrors = Object.fromEntries(
        result.errors.map((item) => [item.field, item.message])
      );
      throw validationError;
    }

    if (response.status === 429) {
      throw new Error(
        result.message || "Too many requests. Please try again later."
      );
    }

    if (response.status >= 500) {
      throw new Error(
        "Something went wrong on our side. Please try again shortly."
      );
    }

    throw new Error(
      result.message || "Something went wrong. Please try again."
    );
  }

  if (!result.success) {
    throw new Error(
      result.message || "We could not submit your message. Please try again."
    );
  }

  return result;
}