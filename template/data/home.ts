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

const STATS_DATA = [
  { value: "10K+", labelKey: "STAT_USERS_LABEL" },
  { value: "500+", labelKey: "STAT_PROJECTS_LABEL" },
  { value: "99.9%", labelKey: "STAT_UPTIME_LABEL" },
  { value: "150+", labelKey: "STAT_COUNTRIES_LABEL" },
] as const;

export { FEATURES_DATA, STATS_DATA };
