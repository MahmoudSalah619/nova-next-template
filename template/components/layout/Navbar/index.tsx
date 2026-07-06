"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { LangSwitch } from "@/components/ui/LangSwitch";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import logoutHandler from "@/utils/logoutHandler";
import { cn } from "@/utils/CN";
import { NAV_LINKS } from "@/data/navigation";
import { LangProps } from "@/types/common";
import styles from "./styles.module.scss";

export function Navbar({ lng }: LangProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useGetUserInfo();

  const handleLogout = () => {
    logoutHandler();
    router.push(`/${lng}/login`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href={`/${lng}`} className={styles.logo}>
          <div className={styles.logoMark} />
          <Text variant="H6" tag="span" skipTranslate text="Nova" color="primary" />
        </Link>

        <div className={styles.nav}>
          {NAV_LINKS.map(({ key, href }) => {
            const fullHref = `/${lng}${href}`;
            const isActive = pathname === fullHref;
            return (
              <Link key={key} href={fullHref} className={cn(styles.navLink, isActive && styles.active)}>
                <Text variant="P11" tag="span" text={key} color={isActive ? "primary" : "neutral700"} />
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <LangSwitch />
          {isLoggedIn ? (
            <Button variant="primary" title="SIGN_OUT" size="small" onClick={handleLogout} />
          ) : (
            <Link href={`/${lng}/login`}>
              <Button variant="primary" title="SIGN_IN" size="small" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
