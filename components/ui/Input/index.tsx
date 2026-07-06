"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import debounce from "@/utils/debounce";
import { cn } from "@/utils/CN";
import styles from "./styles.module.scss";
import { GeneralInputProps } from "./types";

function DefaultInput({
  type = "text",
  label,
  i18nLabel,
  placeholder,
  i18nPlaceholder,
  required,
  errorMsg,
  fullWidth,
  size = "small",
  debounceDelay = 0,
  onChange,
  className,
  prefixIcon,
  prefixIconSize,
  suffixIcon,
  suffixIconSize,
  ...props
}: GeneralInputProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "common");
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const handleOnChange = React.useMemo(() => {
    if (debounceDelay > 0 && onChange) {
      return debounce(onChange, debounceDelay);
    }
    return onChange;
  }, [onChange, debounceDelay]);

  const resolvedLabel = i18nLabel ? t(i18nLabel) : label;
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;
  const iconSize = size === "small" ? 16 : 18;

  return (
    <div className={cn(styles.inputContainer, fullWidth && styles.fullWidth)}>
      {resolvedLabel && (
        <Text variant="L1" color="neutral900">
          {resolvedLabel}
          {required && <span className={styles.required}> *</span>}
        </Text>
      )}

      <div className={styles.fieldWrapper}>
        {prefixIcon && (
          <div className={styles.prefix}>
            <Icon name={prefixIcon} size={prefixIconSize ?? iconSize} />
          </div>
        )}

        <input
          type={resolvedType}
          placeholder={placeholder ?? t(i18nPlaceholder ?? "")}
          onChange={handleOnChange}
          className={cn(
            styles.textInput,
            styles[size],
            prefixIcon && styles.hasPrefix,
            (suffixIcon || isPassword) && styles.hasSuffix,
            errorMsg && styles.error,
            className
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            className={styles.passwordToggle}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={iconSize} />
          </button>
        ) : suffixIcon && (
          <div className={styles.suffix}>
            <Icon name={suffixIcon} size={suffixIconSize ?? iconSize} />
          </div>
        )}
      </div>

      {errorMsg && (
        <Text variant="P13" className={styles.errorMsg}>
          {t(errorMsg)}
        </Text>
      )}
    </div>
  );
}

export { DefaultInput as Input }
