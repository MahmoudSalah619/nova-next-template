"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { cn } from "@/utils/CN";

interface LangSwitchProps {
  className?: string;
}

export function LangSwitch({ className }: LangSwitchProps) {
  const params = useParams();
  const pathname = usePathname();
  const lng = (params.lng as string) ?? "en";
  const otherLng = lng === "en" ? "ar" : "en";
  const switchPath = pathname.replace(`/${lng}`, `/${otherLng}`);

  return (
    <Link href={switchPath} className={cn(styles.btn, className)}>
      {otherLng.toUpperCase()}
    </Link>
  );
}
