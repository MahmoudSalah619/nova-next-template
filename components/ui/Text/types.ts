import { HTMLAttributes, ReactNode } from "react";
import COLORS from "@/constants/COLORS";

type TextContent =
  | { text?: string; children?: never }
  | { text?: never; children: ReactNode };

type BaseProps = {
  variant:
    | "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "H7"
    | "P1" | "P2" | "P3" | "P4" | "P5" | "P6" | "P7" | "P8" | "P9" | "P10" | "P11" | "P12" | "P13" | "P14" | "P15"
    | "B1" | "B2" | "B3"
    | "L1" | "L2" | "L3" | "L4"
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"; // Keep common HTML tags for fallback
  color?: keyof typeof COLORS;
  skipTranslate?: boolean;
};


export type TextProps = BaseProps &
  TextContent &
  HTMLAttributes<HTMLParagraphElement>;
