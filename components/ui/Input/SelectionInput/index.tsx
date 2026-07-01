"use client";
import * as React from "react";
import { SelectionInputAtomProps } from "./types";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { useMemo, useRef, ChangeEvent } from "react";
import debounce from "@/utils/debounce";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/CN";
import { Text } from "../../Text";

/**
 * ShadCN-style Select (dropdown) input.
 * Replaces the Ant Design Select (rc-select) with a styled native <select>.
 *
 * Note: `mode="multiple"` maps to the native `multiple` attribute.
 * `onSearch` is wired to a search <input> rendered above the select when provided.
 */
export function SelectionInput({
  ref,
  options,
  placeholder,
  i18nPlaceholder,
  errorMsg,
  label,
  prefixIcon,
  prefixIconSize,
  suffixIcon,
  suffixIconSize,
  className,
  onSearch,
  mode,
  size,
  onChange,
  value,
  ...props
}: SelectionInputAtomProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "common");
  const resolvedPlaceholder = placeholder ?? t(i18nPlaceholder ?? ("SELECT" as string));

  const debouncedSearchHandler = useMemo(
    () => debounce((e: string) => onSearch?.(e), 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const translatedOptions = useMemo(
    () =>
      options?.map((option) => ({
        ...option,
        value: option.value?.toString() ?? "",
        label: option.i18Label ? t(option.i18Label as string) : option.label,
      })) ?? [],
    [options, t]
  );

  return (
    <div className="relative flex flex-col gap-1">
      {/* Optional search input */}
      {onSearch && (
        <input
          type="search"
          className={cn(
            "flex w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
            "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
            "dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
            size === "small" || !size ? "h-8" : "h-10"
          )}
          placeholder="Search…"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            debouncedSearchHandler(e.target.value)
          }
        />
      )}

      {/* Wrapper for prefix icon + select + suffix icon */}
      {label && <Text variant="P1">{label}</Text>}
      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-zinc-500">
            <Icon name={prefixIcon} size={prefixIconSize ?? (size === "small" ? 14 : 18)} />
          </div>
        )}

        <select
          ref={ref}
          multiple={mode === "multiple" || mode === "tags"}
          value={value as string | string[] | undefined}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
          className={cn(
            // Base ShadCN styles
            "flex w-full appearance-none rounded-md border border-zinc-200 bg-transparent pr-8 text-base shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "dark:border-zinc-800 dark:focus-visible:ring-zinc-300",
            // Size
            size === "small" || !size ? "h-9 px-3 py-1" : "h-11 px-3 py-2",
            // Prefix offset
            prefixIcon && "pl-10",
            // Error state
            errorMsg && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        >
          {/* Blank placeholder option */}
          <option value="" disabled>
            {resolvedPlaceholder}
          </option>

          {translatedOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label as string}
            </option>
          ))}
        </select>

        {/* Suffix / chevron icon */}
        <div className="pointer-events-none absolute right-3 flex items-center text-zinc-500">
          {suffixIcon ? (
            <Icon name={suffixIcon} size={suffixIconSize ?? (size === "small" ? 14 : 18)} />
          ) : (
            <Icon name="ChevronDown" size={size === "small" ? 14 : 18} />
          )}

        </div>
      </div>

      {/* Clear button — only for single-value select */}
      {mode !== "multiple" && mode !== "tags" && value && (
        <button
          type="button"
          className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          onClick={() => {
            // Synthesise a change event that sets value to ""
            const nativeEvent = { target: { value: "" } } as unknown as ChangeEvent<HTMLSelectElement>;
            (onChange as React.ChangeEventHandler<HTMLSelectElement>)?.(nativeEvent);
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
