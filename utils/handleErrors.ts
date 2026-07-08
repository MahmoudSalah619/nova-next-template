import { ApiError } from "@/lib/api";
import showAuthToast from "./showAuthToast";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Surface an API failure as a toast. Understands the `ApiError` thrown by
 * `apiFetch`: network errors, string bodies, and DRF-style field-error objects
 * (`{ field: ["message"] }`).
 */
export default function handleErrors(error: unknown, autoClose = 3000) {
  if (!(error instanceof ApiError)) {
    showAuthToast({ title: "Unknown Error", autoClose });
    return;
  }

  if (error.isNetworkError) {
    showAuthToast({ title: "Connection Error", autoClose });
    return;
  }

  const { data } = error;

  if (typeof data === "string" && data) {
    showAuthToast({ title: data, autoClose });
    return;
  }

  if (Array.isArray(data)) {
    showAuthToast({ title: JSON.stringify(data), autoClose });
    return;
  }

  if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      showAuthToast({
        title: key,
        message: JSON.stringify(value),
        autoClose,
      });
    });
    return;
  }

  showAuthToast({ title: error.message || "Unknown Error", autoClose });
}
