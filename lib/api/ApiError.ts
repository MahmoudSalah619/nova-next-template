/**
 * Typed error thrown by `apiFetch` for any non-2xx response or network failure.
 *
 * - `status` is the HTTP status code (`0` for a network / connection error).
 * - `data` is the parsed response body (JSON object, string, or the raw cause).
 *
 * Catch it and pass it to `handleErrors` to surface a toast, or narrow with
 * `error instanceof ApiError` to read `status` / `data` directly.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    // Restore prototype chain when targeting ES5 output.
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /** True when the request never reached the server (offline, DNS, CORS, abort). */
  get isNetworkError(): boolean {
    return this.status === 0;
  }
}
