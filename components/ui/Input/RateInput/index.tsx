"use client";
import * as React from "react";
import { useState } from "react";
import { RateInputProps } from "./types";
import { cn } from "@/utils/CN";

const STAR_FILLED = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="size-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

/**
 * ShadCN-style star rating input.
 * Replaces antd Rate with a fully accessible, styled native implementation.
 */
export default function RateInput({
  ref,
  count = 5,
  value,
  defaultValue = 0,
  allowHalf,
  disabled,
  onChange,
  character,
  className,
  ...props
}: RateInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  const display = hovered ?? current;

  const handleClick = (star: number) => {
    if (disabled) return;
    setInternalValue(star);
    onChange?.(star);
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="radiogroup"
      aria-label="Star rating"
      className={cn("flex gap-0.5 text-[#6e6bcf]", className)}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const star = i + 1;
        const isFilled = display >= star;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={current === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            disabled={disabled}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseLeave={() => !disabled && setHovered(null)}
            className={cn(
              "size-8 p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e6bcf]/60",
              isFilled ? "text-[#6e6bcf]" : "text-zinc-300 dark:text-zinc-600",
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {character ?? STAR_FILLED}
          </button>
        );
      })}
    </div>
  );
}
