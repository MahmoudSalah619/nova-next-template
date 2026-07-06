import { useTranslation } from "@/app/i18n/client";
import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";

export default function useAutoCompleteTranslation() {
  const { t: defaultT } = useTranslation(undefined, "common");

  const t = (key: TranslationKeyEnum | string) => {
    return defaultT(key as TranslationKeyEnum);
  };

  return { t };
}
