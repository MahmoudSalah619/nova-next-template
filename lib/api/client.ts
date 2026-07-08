/**
 * Core `fetch` client — works in Server Components, Client Components, Route
 * Handlers, and Server Actions. Replaces RTK Query's `baseQuery`.
 *
 * ```ts
 * // Server Component (cached + tagged for revalidation)
 * const user = await apiMethods.get<User>("/auth/me", {
 *   next: { revalidate: 60, tags: ["user"] },
 * });
 *
 * // Client Component (no cache, abortable)
 * const data = await apiMethods.get<Product[]>("/products", {
 *   cache: "no-store",
 *   signal: controller.signal,
 * });
 * ```
 */
import { API_CONFIG } from "./config";
import { ApiError } from "./ApiError";
import { getLanguage, getToken } from "./session";

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  /** JSON body (auto-stringified) or `FormData` (sent as-is). */
  body?: unknown;
  /** Query-string params; `null` / `undefined` values are skipped. */
  params?: QueryParams;
  /** Attach the auth token. Defaults to `true`; set `false` for public routes. */
  auth?: boolean;
  /** Override the auth token (e.g. inside a Server Action). */
  token?: string | null;
  /** Override the request language (defaults to the language cookie). */
  language?: string;
}

/**
 * Resolve the origin every request is prefixed with.
 *
 * - `NEXT_PUBLIC_API_URL` set → use it (typical for a real backend).
 * - Otherwise on the client → `""` so the browser resolves relative URLs.
 * - Otherwise on the server → derive an absolute origin from the request host,
 *   because Server Component `fetch` cannot use relative URLs. This is what
 *   lets same-origin Route Handlers be fetched during SSR.
 */
async function resolveBaseUrl(): Promise<string> {
  if (API_CONFIG.baseUrl) return API_CONFIG.baseUrl.replace(/\/$/, "");

  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const requestHeaders = await headers();
    const host =
      requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    if (host) {
      const proto = requestHeaders.get("x-forwarded-proto") ?? "http";
      return `${proto}://${host}`;
    }
  }

  return "";
}

function buildUrl(
  base: string,
  path: string,
  lang: string,
  params?: QueryParams
): string {
  const cleanPath = path.replace(/^\//, "");
  let url = `${base}/${lang}/api/${cleanPath}`;

  if (params) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        search.append(key, String(value));
      }
    }
    const query = search.toString();
    if (query) url += `?${query}`;
  }

  return url;
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }
  const text = await response.text().catch(() => "");
  return text || null;
}

/**
 * Low-level request. Prefer the `apiMethods.get/post/...` helpers below.
 * Resolves with the parsed body typed as `T`; throws `ApiError` otherwise.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const {
    body,
    params,
    auth = true,
    token,
    language,
    headers,
    ...init
  } = options;

  const lang = language ?? (await getLanguage());
  const base = await resolveBaseUrl();
  const url = buildUrl(base, path, lang, params);

  const finalHeaders = new Headers(headers);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isFormData && !finalHeaders.has("Content-Type")) {
    finalHeaders.set("Content-Type", "application/json");
  }
  if (auth) {
    const authToken = token !== undefined ? token : await getToken();
    if (authToken) {
      finalHeaders.set("Authorization", `${API_CONFIG.authScheme} ${authToken}`);
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: finalHeaders,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
    });
  } catch (cause) {
    // Network failure, DNS error, CORS, or aborted request.
    throw new ApiError(
      cause instanceof Error ? cause.message : "Network request failed",
      0,
      cause
    );
  }

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.statusText || "Request failed", response.status, data);
  }

  return data as T;
}

type BodyOptions = Omit<ApiFetchOptions, "body" | "method">;
type NoBodyOptions = Omit<ApiFetchOptions, "method">;

/** Ergonomic verb helpers around `apiFetch`. */
export const apiMethods = {
  get: <T>(path: string, options?: NoBodyOptions) =>
    apiFetch<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: BodyOptions) =>
    apiFetch<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: BodyOptions) =>
    apiFetch<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: BodyOptions) =>
    apiFetch<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: NoBodyOptions) =>
    apiFetch<T>(path, { ...options, method: "DELETE" }),
} as const;
