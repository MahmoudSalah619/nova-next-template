"use client";
import { TextProps } from "./types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

export default function Text({
  children,
  text,
  skipTranslate,
  className,
  color,
  variant,
  ...props
}: TextProps) {
  const { t } = useTranslation();
  return (
    <p
      {...props}
      className={`${styles[variant]} ${className} ${styles.text} ${color}Color`}
    >
      {skipTranslate ? text ?? children : t(text ?? "")}
    </p>
  );
}
