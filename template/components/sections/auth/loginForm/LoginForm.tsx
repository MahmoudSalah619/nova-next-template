"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Text } from "@/components/ui/Text";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/api/services/auth";
import loginHandler from "@/utils/loginHandler";
import { loginSchema, type LoginFormValues } from "@/utils/validationSchemas";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  lng: string;
}

export function LoginForm({ lng }: LoginFormProps) {
  const router = useRouter();
  const { t } = useTranslation(lng, "common");
  const [loginUser] = useLoginUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", phone: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // const result = await loginUser({ email: data.email, password: data.password }).unwrap();
      // loginHandler({ token: result.access_token, refreshToken: result.refresh_token });
      loginHandler({ token: "aaaaaaaaaaaaaaaa", refreshToken: "aaaaaaaaaaaa" });
      toast.success(t("LOGIN_SUCCESS"));
      router.push(`/${lng}`);
    } catch {
      toast.error(t("SIGN_IN_FAILED"));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.accent} />

      <div className={styles.body}>
        <div className={styles.brand}>
          <div className={styles.brandMark} />
          <Text variant="H6" tag="span" skipTranslate text="Nova" />
        </div>

        <Text
          variant="H4"
          tag="h1"
          text="SIGN_IN"
          color="neutral900"
          className={styles.heading}
        />
        <Text
          variant="P11"
          text="SIGN_IN_SUBTITLE"
          color="neutral900"
          className={styles.subtext}
        />

        <div className={styles.divider} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.fields}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  i18nLabel="EMAIL_ADDRESS"
                  placeholder="name@example.com"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  errorMsg={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  label="PHONE_NUMBER"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  errorMsg={errors.phone?.message}
                />
              )}
            />

            <div className={styles.passwordRow}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    i18nLabel="PASSWORD"
                    placeholder="••••••••"
                    fullWidth
                    value={field.value}
                    onChange={field.onChange}
                    errorMsg={errors.password?.message}
                  />
                )}
              />
              <Link
                href={`/${lng}/forgot-password`}
                className={styles.forgotLink}
              >
                <Text
                  variant="P13"
                  tag="span"
                  text="FORGOT_PASSWORD"
                  color="neutral900"
                />
              </Link>
            </div>
          </div>

          <div className={styles.submit}>
            <Button
              type="submit"
              variant="primary"
              title="SIGN_IN"
              isFullWidth
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className={styles.footer}>
          <Text
            variant="P12"
            tag="span"
            text="DONT_HAVE_ACCOUNT"
            color="neutral900"
          />
          <Link href={`/${lng}/register`} className={styles.signupLink}>
            <Text
              variant="P12"
              tag="span"
              text="CREATE_ACCOUNT"
              color="neutral900"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
