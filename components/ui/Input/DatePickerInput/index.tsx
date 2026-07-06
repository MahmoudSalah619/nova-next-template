import { DatePickerInputProps } from "./types";
import { cn } from "@/utils/CN";

/**
 * ShadCN-style DatePicker input.
 * Replaces the Ant Design DatePicker (rc-picker) with a native <input type="date"> /
 * <input type="datetime-local"> styled with Tailwind.
 */
export function DatePickerInput({
  ref,
  format,
  placeholder,
  className,
  errorMsg,
  size,
  showTime,
  label,
  i18nLabel,
  required,
  prefixIcon,
  prefixIconSize,
  ...props
}: DatePickerInputProps) {
  const inputType = showTime ? "datetime-local" : "date";

  return (
    <input
      ref={ref}
      // @ts-ignore
      type={inputType}
      placeholder={placeholder ?? "DD/MM/YYYY"}
      className={cn(
        // Base ShadCN input styles
        "flex w-full rounded-md border border-zinc-200 bg-transparent px-3 text-base shadow-sm transition-colors",
        "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
        // Size variants
        size === "small" || !size ? "h-9 py-1" : "h-11 py-2",
        // Error state
        errorMsg && "border-red-500 focus-visible:ring-red-500",
        className
      )}
      {...props}
    />
  );
}
