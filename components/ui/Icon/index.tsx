import { icons, HelpCircle } from "lucide-react";
import { IconProps } from "./types";
import { cn } from "@/utils/CN";

export function Icon({
  name,
  color,
  size = 20,
  strokeWidth = 2,
  className,
  onClick,
}: IconProps) {
  const LucideIcon = icons[name] || HelpCircle;

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

