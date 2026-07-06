import { Ref, SelectHTMLAttributes } from "react";
import { SharedInputProps, InputRef } from "../types";
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
  "size" | "prefix" | "onChange" | "value"
> &
  SharedInputProps & {

    ref?: Ref<InputRef<"dropdown">>;
    type?: "dropdown";
    mode?: "multiple" | "tags" | undefined;

    options?: OptionType[];
    errorMsg?: string;
    onSearch?: (value: string) => void;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    value?: string | string[];
  };

