/**
 * Central configuration for the `fetch`-based API layer.
 *
 * All requests are built as: `${baseUrl}/${lang}/api/${path}`.
 * Set the backend origin with the `NEXT_PUBLIC_API_URL` env var
 * (leave empty to send same-origin relative requests). See `.env.example`.
 */
export const API_CONFIG = {
  /** Backend origin, e.g. `https://api.example.com`. Empty = same-origin. */
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  /** Language used when no cookie/override is present. */
  fallbackLanguage: "en",
  /** Auth scheme prefix sent in the `Authorization` header. */
  authScheme: "Token",
} as const;

/** Cookie names shared by the server and client session helpers. */
export const COOKIE_NAMES = {
  token: "token",
  refreshToken: "refreshToken",
  /** Reused from the i18n setup so the API language matches the UI. */
  language: "i18next",
} as const;
