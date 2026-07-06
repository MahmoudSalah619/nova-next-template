import { icons, HelpCircle } from "lucide-react";
import { IconProps } from "./types";
import { customIcons } from "./iconList";
import { cn } from "@/utils/CN";

export function Icon({
  name,
  color,
  size = 20,
  strokeWidth = 2,
  className,
  onClick,
}: IconProps) {
  if (name in customIcons) {
    const CustomIcon = customIcons[name as keyof typeof customIcons];
    return (
      <CustomIcon
        size={size}
        color={color}
        className={cn("shrink-0", className)}
        onClick={onClick}
      />
    );
  }

  const LucideIcon = icons[name as keyof typeof icons] || HelpCircle;
  return (
    <LucideIcon
      color={color}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      onClick={onClick}
    />
  );
}
