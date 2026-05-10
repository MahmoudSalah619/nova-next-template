import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}
