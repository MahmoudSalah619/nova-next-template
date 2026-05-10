import api from "..";
import {
  AuthTokenResponse,
  CheckResetOtpBody,
  GetResetOtpBody,
  ResetPassword,
  ForgotPasswordResponse,
} from "../types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getResetOtp: builder.mutation<ForgotPasswordResponse, GetResetOtpBody>({
      query: (body) => ({
        url: "/auth/get-reset-otp",
        method: "POST",
        body,
      }),
    }),
    checkResetOtp: builder.mutation<{ detail: string }, CheckResetOtpBody>({
      query: (body) => ({
        url: "/auth/check-reset-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<AuthTokenResponse, ResetPassword>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetResetOtpMutation,
  useCheckResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
