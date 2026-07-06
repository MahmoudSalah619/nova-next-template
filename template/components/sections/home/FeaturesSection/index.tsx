"use client";

import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import { FEATURES_DATA } from "@/data/home";
import styles from "./styles.module.scss";

export function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Text variant="P13" tag="span" text="FEATURES_BADGE" color="primary" />
        </div>
        <Text variant="H2" tag="h2" text="FEATURES_TITLE" color="neutral900" className={styles.title} />
        <Text variant="P3" tag="p" text="FEATURES_SUBTITLE" color="neutral500" className={styles.subtitle} />
      </div>

      <div className={styles.grid}>
        {FEATURES_DATA.map(({ titleKey, descKey, image, icon }) => (
          <div key={titleKey} className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={image} alt="" fill className={styles.img} />
              <div className={styles.cardOverlay} />
              <div className={styles.iconWrap}>
                <Icon name={icon} size={20} color="#fff" />
              </div>
            </div>
            <div className={styles.cardBody}>
              <Text variant="H5" tag="h3" text={titleKey} color="neutral900" />
              <Text variant="P12" tag="p" text={descKey} color="neutral500" className={styles.desc} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
