const COLORS = {
    // Semantic palette (CSS var-based)
    primary: "primary",
    secondary: "secondary",
    error: "error",
    warning: "warning",
    info: "info",
    success: "success",
    // Primary palette
    primary400: "primary400",
    primary500: "primary500",
    primary700: "primary700",
    // Neutral palette
    neutral0: "neutral0",
    neutral50: "neutral50",
    neutral100: "neutral100",
    neutral200: "neutral200",
    neutral300: "neutral300",
    neutral400: "neutral400",
    neutral500: "neutral500",
    neutral600: "neutral600",
    neutral700: "neutral700",
    neutral800: "neutral800",
    neutral900: "neutral900",
    // Text palette
    text50: "text50",
    text100: "text100",
    text200: "text200",
    text300: "text300",
    // Danger palette
    danger700: "danger700",
    danger800: "danger800",
    danger900: "danger900",
};
export type ColorsType = keyof typeof COLORS;
export default COLORS;
