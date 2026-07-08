/**
 * Universal session helpers — safe to import from both Server and Client
 * Components. The auth token lives in a cookie (not `localStorage`) so that
 * Server Components can read it via `next/headers` during SSR.
 *
 * Reads work everywhere. Writes (`setSessionTokens` / `clearSession`) only run
 * in the browser — cookies cannot be mutated from a Server Component, only from
 * a Server Action or Route Handler.
 */
import { API_CONFIG, COOKIE_NAMES } from "./config";

const isServer = typeof window === "undefined";

/** One year, in seconds — default lifetime for the session cookies. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readClientCookie(name: string): string | null {
  if (isServer) return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeClientCookie(name: string, value: string): void {
  if (isServer) return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function deleteClientCookie(name: string): void {
  if (isServer) return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

async function readServerCookie(name: string): Promise<string | null> {
  // Imported lazily so `next/headers` never lands in the client bundle.
  const { cookies } = await import("next/headers");
  return (await cookies()).get(name)?.value ?? null;
}

/** Read the auth token from the request cookies (server or client). */
export async function getToken(): Promise<string | null> {
  return isServer
    ? readServerCookie(COOKIE_NAMES.token)
    : readClientCookie(COOKIE_NAMES.token);
}

/** Read the refresh token from the request cookies (server or client). */
export async function getRefreshToken(): Promise<string | null> {
  return isServer
    ? readServerCookie(COOKIE_NAMES.refreshToken)
    : readClientCookie(COOKIE_NAMES.refreshToken);
}

/** Read the active language, falling back to the configured default. */
export async function getLanguage(): Promise<string> {
  const value = isServer
    ? await readServerCookie(COOKIE_NAMES.language)
    : readClientCookie(COOKIE_NAMES.language);
  return value?.includes("ar") ? "ar" : API_CONFIG.fallbackLanguage;
}

/** Synchronous token read for client-only code (e.g. Redux store init). */
export function getClientToken(): string | null {
  return readClientCookie(COOKIE_NAMES.token);
}

/** Persist the session tokens as cookies. Browser-only. */
export function setSessionTokens(token: string, refreshToken?: string): void {
  if (token) writeClientCookie(COOKIE_NAMES.token, token);
  if (refreshToken) writeClientCookie(COOKIE_NAMES.refreshToken, refreshToken);
}

/** Remove the session tokens. Browser-only. */
export function clearSession(): void {
  deleteClientCookie(COOKIE_NAMES.token);
  deleteClientCookie(COOKIE_NAMES.refreshToken);
}
