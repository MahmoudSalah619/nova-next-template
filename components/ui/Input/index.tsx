"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Icon from "@/components/ui/Icon";
import debounce from "@/utils/debounce";
import InputProps from "./types";
import { cn } from "@/utils/CN";

/**
 * Shadcn-style base input component using Tailwind CSS.
 */
const BaseInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
BaseInput.displayName = "BaseInput";

/**
 * Unified Input component following Shadcn/ui patterns.
 * Replaces Ant Design dependency with native Tailwind-styled elements.
 */
export function Input({
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
}: InputProps) {
  const { t } = useTranslation();

  // Handle debounced onChange if delay is provided
  const handleOnChange = React.useMemo(() => {
    if (debounceDelay > 0) {
      return debounce(onChange as (...e: any[]) => void, debounceDelay);
    }
    return onChange;
  }, [onChange, debounceDelay]);

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {/* Label section */}
      {(!!label || !!i18nLabel) && (
        <label className="text-sm font-medium leading-none text-zinc-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-50">
          {label ?? t(i18nLabel ?? "")}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className="absolute left-3 flex items-center justify-center text-zinc-500 pointer-events-none">
            <Icon name={prefixIcon} size={prefixIconSize ?? (size === "small" ? 14 : 18)} />
          </div>
        )}

        <BaseInput
          type={type}
          placeholder={placeholder ?? t(i18nPlaceholder ?? "")}
          onChange={handleOnChange}
          className={cn(
            size === "small" ? "h-9" : "h-11",
            prefixIcon && "pl-10",
            suffixIcon && "pr-10",
            errorMsg && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />

        {/* Suffix Icon */}
        {suffixIcon && (
          <div className="absolute right-3 flex items-center justify-center text-zinc-500 pointer-events-none">
            <Icon name={suffixIcon} size={suffixIconSize ?? (size === "small" ? 14 : 18)} />
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <p className="text-[0.8rem] font-medium text-red-500">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
