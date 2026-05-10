import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";
import { SelectionInputAtomProps } from "./SelectionInput/types";
import { DatePickerInputProps } from "./DatePickerInput/types";
// import type { InputRef as AntdInputRef } from "antd";
import { RateInputProps } from "./RateInput/types";
import iconList from "../Icon/list";

export type InputType =
  | "text"
  | "number"
  | "textarea"
  | "password"
  | "date"
  | "phone"
  | "dropdown"
  | "rate";

export type InputSize = "small" | "large";

export type Label =
  | { label?: string; i18nLabel?: never }
  | { label?: never; i18nLabel?: TranslationKeyEnum };

export type Placeholder =
  | { placeholder?: string; i18nPlaceholder?: never }
  | { placeholder?: never; i18nPlaceholder?: TranslationKeyEnum };

export type PrefixIcon =
  | { prefixIcon: keyof typeof iconList; prefixIconSize?: number }
  | { prefixIcon?: never; prefixIconSize?: never };

export type SuffixIcon =
  | { suffixIcon: keyof typeof iconList; suffixIconSize?: number }
  | { suffixIcon?: never; suffixIconSize?: never };

type InputRefMap = {
  text: HTMLInputElement | null;
  password: HTMLInputElement | null;
  textarea: HTMLTextAreaElement | null;

  number: HTMLInputElement | null;
  date: HTMLInputElement | null;
  dropdown: HTMLSelectElement | null;
  phone: HTMLInputElement | null;
  otp: HTMLInputElement | null;
};

export type InputRef<T extends InputType> = T extends keyof InputRefMap
  ? InputRefMap[T]
  : never;

export interface BaseInputProps {
  name?: string;
  size?: InputSize;
  required?: boolean;
  disabled?: boolean;
  errorMsg?: string;
  debounceDelay?: number;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export type SharedInputProps = BaseInputProps &
  Label &
  Placeholder &
  PrefixIcon &
  SuffixIcon;

export type GeneralInputProps = SharedInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "onChange"> & {
    type?: Extract<InputType, "text" | "password" | "email" | "url" | "search" | "tel" | "rate">;
  };


export type InputProps =
  | GeneralInputProps
  | DatePickerInputProps
  | SelectionInputAtomProps
  | RateInputProps;



