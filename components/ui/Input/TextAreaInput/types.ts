import { TextareaHTMLAttributes, Ref } from "react";
import { GeneralInputProps, InputRef } from "../types";
import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> &
  GeneralInputProps & {
    ref?: Ref<InputRef<"textarea">>;
    type: "textarea";
    onResize?: (size: { width: number; height: number }) => void;
    errorMsg?: string;
    i18nPlaceholder?: TranslationKeyEnum;
  };
