import PhoneInput, { Country } from "react-phone-number-input";
import styles from "./styles.module.scss";
import { getCountryCallingCode, getCountries } from "react-phone-number-input";
import useAutoCompleteTranslation from "@/hooks/useAutoCompleteTranslation";
import ICustomPhoneInput from "./types";

const allCountries = getCountries();

const optionLabels: Record<Country, string> = allCountries.reduce(
  (acc, country) => {
    acc[country] = `${country} +${getCountryCallingCode(country)}`;
    return acc;
  },
  {} as Record<Country, string>
);

export default function CustomPhoneInput({
  ref,
  className,
  errorMsg,
  disabled,
  placeholder,
  value,
  i18nPlaceholder,
  defaultCountry = "EG",
  international = false,
  onChange,
  ...props
}: ICustomPhoneInput) {
  const { t } = useAutoCompleteTranslation();

  return (
    <div className={`${styles.phoneInputContainer} ${className}`}>
      <PhoneInput
        ref={ref as any}
        defaultCountry={defaultCountry}
        onChange={onChange}
        className={`${styles.phoneInput} ${disabled ? styles.disabled : ""} ${
          errorMsg ? styles.phoneInputError : ""
        }`}
        labels={optionLabels}
        disabled={disabled}
        placeholder={placeholder || t(i18nPlaceholder ?? "")}
        value={value}
        international={international}
        {...props}
      />
    </div>
  );
}
