import { ComponentType } from "react";
import { File } from "./file";

export interface CustomIconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export const customIcons = {
  File,
} satisfies Record<string, ComponentType<CustomIconProps>>;

export type CustomIconName = keyof typeof customIcons;
