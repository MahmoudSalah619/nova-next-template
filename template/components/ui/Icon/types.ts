import { icons } from "lucide-react";
import { CustomIconName } from "./iconList";

export type LucideIconName = keyof typeof icons;
export type IconName = LucideIconName | CustomIconName;

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}
