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
      body: JSON.stringify(formData),
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your connection and try again."
    );
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

    throw new Error(
      result.message || "Something went wrong. Please try again."
    );
  }

  return result;
}