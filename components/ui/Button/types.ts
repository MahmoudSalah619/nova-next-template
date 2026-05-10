import { ButtonHTMLAttributes } from "react";
import COLORS from "@/constants/COLORS";
import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";
import iconList from "@/src/components/Atoms/Icon/list";

type ButtonVariant = "primary" | "secondary" | "danger" | "noStyle";
export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: keyof typeof iconList;
  iconSize?: number;
  iconButtonType?: "square" | "round";
  title?: TranslationKeyEnum;
  size?: "small" | "large";
  variant?: ButtonVariant;
  isFullWidth?: boolean;
  prefixIcon?: keyof typeof iconList;
  prefixIconSize?: number;
  suffixIcon?: keyof typeof iconList;
  suffixIconSize?: number;
  disabled?: boolean;
  fontVariant?: TextVariant;
  fontColor?: keyof typeof COLORS;
  children?: React.ReactNode;
  onClick?: () => void;
}
