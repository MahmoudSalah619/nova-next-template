"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { Text } from "../Text";
import styles from "./styles.module.scss";
import { CustomButtonProps } from "./types";
import { Icon } from "../Icon";
import { cn } from "@/utils/CN";

export function Button({
  title,
  variant = "primary",
  size = "large",
  className,
  isFullWidth,
  onClick,
  prefixIcon,
  prefixIconSize,
  suffixIcon,
  suffixIconSize,
  disabled,
  icon,
  iconSize: iconSizeProp,
  fontColor,
  iconButtonType,
  fontVariant,
  children,
  ...otherProps
}: CustomButtonProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "common");
  const iconSize = size === "large" ? 16 : 12;
  const textSize = size === "large" ? "P11" : "P9";

  return (
    <button
      {...otherProps}
      onClick={onClick}
      className={cn(
        styles.btn,
        isFullWidth && styles.isFullWidth,
        styles[variant],
        styles[size],
        iconButtonType && styles[iconButtonType],
        icon && styles.iconButton,
        className,
      )}
      disabled={disabled}
    >
      {icon ? (
        <Icon name={icon} size={iconSizeProp ?? 16} />
      ) : (
        <>
          {prefixIcon && (
            <Icon name={prefixIcon} size={prefixIconSize ?? iconSize} />
          )}

          {title && (
            <Text variant={fontVariant ?? textSize} color={fontColor}>
              {t(title)}
            </Text>
          )}

          {children}

          {suffixIcon && (
            <Icon name={suffixIcon} size={suffixIconSize ?? iconSize} />
          )}
        </>
      )}
    </button>
  );
}
