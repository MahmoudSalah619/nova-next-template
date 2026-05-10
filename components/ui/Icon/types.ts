import iconList from "./list";
import COLORS from "@/constants/COLORS";

export interface IconProps {
  name: keyof typeof iconList;
  color?: keyof typeof COLORS;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}
