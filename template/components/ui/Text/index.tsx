"use client";
import React from "react";
import { useParams } from "next/navigation";
import { TextProps } from "./types";
import styles from "./styles.module.scss";
import { useTranslation } from "@/app/i18n/client";
import { cn } from "@/utils/CN";

export function Text({
  children,
  text,
  skipTranslate,
  className,
  color,
  variant,
  tag: Tag = "p",
  ...props
}: TextProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "common");
  const normalizedVariant = (variant.length <= 3 && variant.startsWith("h")) ? variant.toUpperCase() : variant;

  return (
    <Tag
      {...(props as React.HTMLAttributes<HTMLElement>)}
      className={cn(styles[normalizedVariant], className, styles.text, color && `${color}Color`)}
    >
      {skipTranslate ? (text || children) : t(text || "") || children}
    </Tag>
  );
}
