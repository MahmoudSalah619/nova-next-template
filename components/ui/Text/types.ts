import { HTMLAttributes, ReactNode } from "react";
import COLORS from "@/constants/COLORS";

type TextContent =
  | { text?: string; children?: never }
  | { text?: never; children: ReactNode };

type BaseProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "a";
  color?: keyof typeof COLORS;
  skipTranslate?: boolean;
};

export type TextProps = BaseProps &
  TextContent &
  HTMLAttributes<HTMLParagraphElement>;
