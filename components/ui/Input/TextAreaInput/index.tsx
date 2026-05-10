"use client";
import * as React from "react";
import { ChangeEvent } from "react";
import { TextAreaProps } from "./types";
import useAutoCompleteTranslation from "@/hooks/useAutoCompleteTranslation";
import Text from "@/components/ui/Text";
import { cn } from "@/utils/CN";

/**
 * ShadCN-style textarea input.
 * Replaces antd Input.TextArea with a native <textarea> styled with Tailwind.
 */
export default function TextAreaInput({
  ref,
  size,
  className,
  onResize,
  maxLength,
  value,
  onChange,
  i18nPlaceholder,
  placeholder,
  errorMsg,
  ...props
}: TextAreaProps) {
  const { t } = useAutoCompleteTranslation();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value: v } = e.target;
    if (v.length <= (maxLength ?? Infinity)) onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <textarea
        ref={ref}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? t(i18nPlaceholder ?? ("" as any))}
        className={cn(
          "flex min-h-[76px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-base shadow-sm transition-colors",
          "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y",
          "dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          errorMsg && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />

      {!!maxLength && (
        <Text
          variant="P11"
          className="text-end"
          text={`${value?.toString().length ?? 0}/${maxLength}`}
        />
      )}
    </div>
  );
}
