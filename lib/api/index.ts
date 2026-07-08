/**
 * Public entry point for the `fetch`-based API layer.
 *
 * ```ts
 * import { apiMethods, ApiError } from "@/lib/api";
 * ```
 */
export { apiMethods, apiFetch } from "./client";
export type { ApiFetchOptions, QueryParams } from "./client";
export { ApiError } from "./ApiError";
export { API_CONFIG, COOKIE_NAMES } from "./config";
export {
  getToken,
  getRefreshToken,
  getLanguage,
  getClientToken,
  setSessionTokens,
  clearSession,
} from "./session";
