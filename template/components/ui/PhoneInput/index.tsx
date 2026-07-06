"use client";

import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Text } from "@/components/ui/Text";
import { cn } from "@/utils/CN";
import styles from "./styles.module.scss";
import type { PhoneInputProps } from "./types";

export function PhoneInput({
  label,
  value,
  onChange,
  errorMsg,
  fullWidth,
  disabled,
  required,
  defaultCountry = "eg",
  className,
}: PhoneInputProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "common");

  return (
    <div className={cn(styles.wrapper, fullWidth && styles.fullWidth, className)}>
      {label && (
        <Text variant="L1">
          {t(label)}
          {required && <span className={styles.required}> *</span>}
        </Text>
      )}

      <PhoneInputLib
        country={defaultCountry}
        value={value}
        onChange={(phone) => onChange?.(phone)}
        disabled={disabled}
        containerClass={styles.container}
        inputClass={cn(styles.phoneInput, errorMsg && styles.error)}
      />

      {errorMsg && (
        <Text variant="P13" className={styles.errorMsg}>
          {t(errorMsg)}
        </Text>
      )}
    </div>
  );
}
