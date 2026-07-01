"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { registerSchema, type RegisterFormValues } from "@/utils/validationSchemas";
import styles from "./RegisterForm.module.scss";

interface RegisterFormProps {
  lng: string;
}

export function RegisterForm({ lng }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // TODO: dispatch register action
    console.log(data);
  };

  return (
    <div className={styles.card}>
      <div className={styles.accent} />

      <div className={styles.body}>
        <div className={styles.brand}>
          <div className={styles.brandMark} />
          <Text variant="H6" tag="span" skipTranslate text="Nova" />
        </div>

        <Text variant="H4" tag="h1" text="CREATE_ACCOUNT" color="neutral900" className={styles.heading} />
        <Text variant="P11" text="CREATE_ACCOUNT_SUBTITLE" color="neutral900" className={styles.subtext} />

        <div className={styles.divider} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.fields}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  i18nLabel="FULL_NAME"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  errorMsg={errors.fullName?.message}
                />
              )}
            />

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
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  i18nLabel="PASSWORD"
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  errorMsg={errors.password?.message}
                />
              )}
            />
          </div>

          <div className={styles.submit}>
            <Button
              type="submit"
              variant="primary"
              title="SIGN_UP"
              isFullWidth
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className={styles.footer}>
          <Text variant="P12" tag="span" text="ALREADY_HAVE_ACCOUNT" color="neutral900" />
          <Link href={`/${lng}/login`} className={styles.loginLink}>
            <Text variant="P12" tag="span" text="SIGN_IN" color="neutral900" />
          </Link>
        </div>
      </div>
    </div>
  );
}
