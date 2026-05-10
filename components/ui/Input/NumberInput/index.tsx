"use client";
import * as React from "react";
import useAutoCompleteTranslation from "@/hooks/useAutoCompleteTranslation";
import { NumberInputProps } from "./types";
import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/CN";

/**
 * ShadCN-style number input.
 * Replaces antd InputNumber (rc-input-number) with a styled native <input type="number">.
 */
export default function NumberInput({
  ref,
  placeholder,
  i18nPlaceholder,
  className,
  errorMsg,
  size,
  prefixIcon,
  prefixIconSize,
  suffixIcon,
  suffixIconSize,
  ...props
}: NumberInputProps) {
  const { t } = useAutoCompleteTranslation();

  return (
    <div className="relative flex items-center">
      {prefixIcon && (
        <div className="pointer-events-none absolute left-3 flex items-center text-zinc-500">
          <Icon name={prefixIcon} size={prefixIconSize ?? (size === "small" ? 14 : 18)} />
        </div>
      )}

      <input
        ref={ref}
        type="number"
        placeholder={i18nPlaceholder ? t(i18nPlaceholder as any) : placeholder}
        className={cn(
          "flex w-full rounded-md border border-zinc-200 bg-transparent px-3 text-base shadow-sm transition-colors",
          "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // Hide native number spinners
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          "dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          size === "small" || !size ? "h-9 py-1" : "h-11 py-2",
          prefixIcon && "pl-10",
          suffixIcon && "pr-10",
          errorMsg && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />

      {suffixIcon && (
        <div className="pointer-events-none absolute right-3 flex items-center text-zinc-500">
          <Icon name={suffixIcon} size={suffixIconSize ?? (size === "small" ? 14 : 18)} />
        </div>
      )}
    </div>
  );
}
