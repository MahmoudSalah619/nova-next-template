"use client";
import { TextProps } from "./types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/CN";

export function Text({
  children,
  text,
  skipTranslate,
  className,
  color,
  variant,
  ...props
}: TextProps) {
  const { t } = useTranslation();
  const normalizedVariant = (variant.length <= 3 && variant.startsWith("h")) ? variant.toUpperCase() : variant;

  return (
    <p
      {...props}
      className={cn(styles[normalizedVariant], className, styles.text, color && `${color}Color`)}
    >
      {skipTranslate ? (text || children) : t(text || "") || children}
    </p>
  );
}
