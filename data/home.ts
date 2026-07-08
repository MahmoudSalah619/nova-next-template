import { ASSETS_IMAGES } from "@/constants/assets";

const FEATURES_DATA = [
  {
    titleKey: "FEATURE_1_TITLE",
    descKey: "FEATURE_1_DESC",
    image: ASSETS_IMAGES.ecosystemCard,
    icon: "Layers",
  },
  {
    titleKey: "FEATURE_2_TITLE",
    descKey: "FEATURE_2_DESC",
    image: ASSETS_IMAGES.insight,
    icon: "ChartColumnBig",
  },
  {
    titleKey: "FEATURE_3_TITLE",
    descKey: "FEATURE_3_DESC",
    image: ASSETS_IMAGES.space,
    icon: "Users",
  },
] as const;


export { FEATURES_DATA };
