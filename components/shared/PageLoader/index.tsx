"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/CN";
import styles from "./styles.module.scss";
import { ASSETS_SVGS } from "@/constants/assets";

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const isFirstMount = useRef(true);

  const startHide = () => {
    setFading(true);
    setTimeout(() => setVisible(false), 400);
  };

  // Initial load
  useEffect(() => {
    const t = setTimeout(startHide, 700);
    return () => clearTimeout(t);
  }, []);

  // Route changes (skip first mount — handled above)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setVisible(true);
    setFading(false);
    const t = setTimeout(startHide, 700);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className={cn(styles.overlay, fading && styles.fadeOut)}>
      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <Image
            src={ASSETS_SVGS.nextLogo}
            alt="OZ"
            width={160}
            height={32}
            priority
            style={{ height: "auto" }}
          />
        </div>

        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
