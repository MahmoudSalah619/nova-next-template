/**
 * Auth service — typed `fetch` wrappers around the auth endpoints.
 *
 * Callable from anywhere: Client Components, Server Components, Server Actions,
 * and Route Handlers. These functions only talk to the backend; persisting the
 * returned tokens is the caller's job (see `loginHandler`).
 */
import { apiMethods } from "@/lib/api";
import type { ApiFetchOptions } from "@/lib/api";
import type {
  AuthTokenResponse,
  CheckResetOtpBody,
  ForgotPasswordResponse,
  GetResetOtpBody,
  LoginBody,
  RefreshTokenResponse,
  ResetPassword,
  User,
} from "./types";

/** Exchange credentials for access + refresh tokens. */
export function login(body: LoginBody) {
  return apiMethods.post<AuthTokenResponse>("/auth/login", body, { auth: false });
}

/** Request a password-reset OTP for the given email. */
export function getResetOtp(body: GetResetOtpBody) {
  return apiMethods.post<ForgotPasswordResponse>("/auth/get-reset-otp", body, {
    auth: false,
  });
}

/** Validate a password-reset OTP. */
export function checkResetOtp(body: CheckResetOtpBody) {
  return apiMethods.post<{ detail: string }>("/auth/check-reset-otp", body, {
    auth: false,
  });
}

/** Set a new password using a validated OTP. */
export function resetPassword(body: ResetPassword) {
  return apiMethods.post<AuthTokenResponse>("/auth/reset-password", body, {
    auth: false,
  });
}

/** Exchange a refresh token for a fresh access token. */
export function refreshToken(refresh: string) {
  return apiMethods.post<RefreshTokenResponse>(
    "/token/refresh/",
    { refresh },
    { auth: false }
  );
}

/**
 * Fetch the currently authenticated user. Pass `next`/`cache` options when
 * calling from a Server Component to control caching and revalidation.
 */
export function getCurrentUser(options?: ApiFetchOptions) {
  return apiMethods.get<User>("/auth/me", options);
}

export type * from "./types";
