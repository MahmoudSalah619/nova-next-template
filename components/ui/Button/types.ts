import { ButtonHTMLAttributes } from "react";
import { TranslationKeyEnum } from "@/types/TranslationKeyEnum";
import { IconName } from "../Icon/types";
import { TextVariant } from "../Text/types";
import Colors from "@/constants/Colors";


type ButtonVariant = "primary" | "secondary" | "danger" | "noStyle";
export interface CustomButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {

  icon?: IconName;
  iconSize?: number;
  iconButtonType?: "square" | "round";
  title?: TranslationKeyEnum;
  size?: "small" | "large";
  variant?: ButtonVariant;
  isFullWidth?: boolean;
  prefixIcon?: IconName;
  prefixIconSize?: number;
  suffixIcon?: IconName;
  suffixIconSize?: number;
  disabled?: boolean;
  fontVariant?: TextVariant;
  fontColor?: keyof typeof Colors;

  children?: React.ReactNode;
  onClick?: () => void;
}
