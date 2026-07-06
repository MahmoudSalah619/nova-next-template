import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";

export type PhoneInputProps = {
  label?: TranslationKeyEnum;
  value?: string;
  onChange?: (value: string) => void;
  errorMsg?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  defaultCountry?: string;
  className?: string;
};
