import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("INVALID_EMAIL").required("EMAIL_REQUIRED"),
  phone: yup.string().min(7, "PHONE_TOO_SHORT").required("PHONE_REQUIRED"),
  password: yup.string().min(8, "PASSWORD_MIN").required("PASSWORD_REQUIRED"),
});

export const registerSchema = yup.object({
  fullName: yup.string().min(2, "FULL_NAME_MIN").required("FULL_NAME_REQUIRED"),
  email: yup.string().email("INVALID_EMAIL").required("EMAIL_REQUIRED"),
  password: yup
    .string()
    .min(8, "PASSWORD_MIN")
    .matches(/[A-Z]/, "PASSWORD_UPPERCASE")
    .matches(/[0-9]/, "PASSWORD_NUMBER")
    .required("PASSWORD_REQUIRED"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type RegisterFormValues = yup.InferType<typeof registerSchema>;
