import { Ref, SelectHTMLAttributes } from "react";
import { GeneralInputProps, InputRef } from "../types";
import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";

export type OptionType = {
  value?: string | number | null;
  label?: React.ReactNode;
  /** i18n label key — takes precedence over label when set */
  i18Label?: TranslationKeyEnum;
  disabled?: boolean;
};

export type SelectionInputAtomProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "prefix"
> &
  GeneralInputProps & {
    ref?: Ref<InputRef<"dropdown">>;
    type: "dropdown";
    mode?: "multiple" | "tags" | undefined;
    options?: OptionType[];
    errorMsg?: string;
    onSearch?: (value: string) => void;
  };
