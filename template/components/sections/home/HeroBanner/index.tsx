import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { ASSETS_IMAGES } from "@/constants/assets";
import { HeroBannerProps } from "./types";
import styles from "./styles.module.scss";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroBanner({ lng }: HeroBannerProps) {
  return (
    <div className={styles.banner}>
      <Image src={ASSETS_IMAGES.space} alt="" fill priority className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.badge}>
          <Text
            variant="P13"
            tag="span"
            text="HOME_HERO_BADGE"
            color="text300"
          />
        </div>
        <Text
          variant="H1"
          tag="h1"
          text="HOME_HERO_TITLE"
          color="text300"
          className={styles.heading}
        />
        <Text
          variant="P3"
          tag="p"
          text="HOME_HERO_SUBTITLE"
          color="text300"
          className={styles.subtitle}
        />

        <div className={styles.cta}>
          <Link href={`/${lng}/register`}>
            <Button
              variant="primary"
              title="HOME_HERO_CTA_PRIMARY"
              size="large"
            />
          </Link>
          <Link href="#features">
            <Button
              variant="secondary"
              title="HOME_HERO_CTA_SECONDARY"
              size="large"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
