import { InputHTMLAttributes, Ref } from "react";
import { SharedInputProps, InputRef } from "../types";

export type DatePickerInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "required" | "type" | "size" | "prefix" | "onChange" | "value"
> &
  Omit<SharedInputProps, "suffixIcon"> & {

    ref?: Ref<InputRef<"date">>;
    type?: "date";

    /** Displayed format string (cosmetic only — native input uses YYYY-MM-DD internally) */
    format?: string;
    showTime?: boolean;
    errorMsg?: string;
  };
