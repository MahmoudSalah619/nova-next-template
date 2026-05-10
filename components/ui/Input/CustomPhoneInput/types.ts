import {
  Country,
  FeatureProps,
  FlagProps,
  Flags,
  Labels,
} from "react-phone-number-input";
import { GeneralInputProps, InputRef } from "../types";
import { JSX, Ref } from "react";

type Locale = string;
type Flag = (props: FlagProps) => JSX.Element;
type CountryOption = "XX" | "🌐" | "|" | "..." | "…" | Country;
type LocaleProperty = Locale | Locale[];

type ICustomPhoneInput = FeatureProps<GeneralInputProps> & {
  ref?: Ref<InputRef<"phone">>;
  type: "phone";
  className?: string;
  value: string;
  onChange: (value?: string) => void;
  onFocus?(event: React.FocusEvent<HTMLElement>): void;
  onBlur?(event: React.FocusEvent<HTMLElement>): void;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  initialValueFormat?: "national";
  defaultCountry?: Country;
  countries?: Country[];
  labels?: Labels;
  locales?: LocaleProperty;
  flagUrl?: string;
  flags?: Flags;
  flagComponent?: Flag;
  addInternationalOption?: boolean;
  internationalIcon?: React.ElementType;
  countryOptionsOrder?: CountryOption[];
  style?: object;
  countrySelectComponent?: React.ElementType;
  countrySelectProps?: object;
  inputComponent?: React.ElementType;
  numberInputProps?: object;
  containerComponent?: React.ElementType;
  containerComponentProps?: object;
  smartCaret?: boolean;
  international?: boolean;
  limitMaxLength?: boolean;
  countryCallingCodeEditable?: boolean;
  onCountryChange?(country?: Country): void;
  focusInputOnCountrySelection?: boolean;
};

export default ICustomPhoneInput;
