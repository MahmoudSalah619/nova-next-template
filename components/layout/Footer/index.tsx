import Link from "next/link";
import { Text } from "@/components/ui/Text";
import {
  FOOTER_PRODUCT_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/data/navigation";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoMark} />
              <Text variant="H6" tag="span" skipTranslate text="Nova" color="primary" />
            </div>
            <Text variant="P12" tag="p" text="FOOTER_TAGLINE" color="neutral500" className={styles.tagline} />
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <Text variant="L2" tag="p" text="FOOTER_PRODUCT" color="neutral900" className={styles.colTitle} />
              {FOOTER_PRODUCT_LINKS.map(({ key, href }) => (
                <Link key={key} href={href} className={styles.link}>
                  <Text variant="P12" tag="span" text={key} color="neutral500" />
                </Link>
              ))}
            </div>

            <div className={styles.column}>
              <Text variant="L2" tag="p" text="FOOTER_COMPANY" color="neutral900" className={styles.colTitle} />
              {FOOTER_COMPANY_LINKS.map(({ key, href }) => (
                <Link key={key} href={href} className={styles.link}>
                  <Text variant="P12" tag="span" text={key} color="neutral500" />
                </Link>
              ))}
            </div>

            <div className={styles.column}>
              <Text variant="L2" tag="p" text="FOOTER_LEGAL" color="neutral900" className={styles.colTitle} />
              {FOOTER_LEGAL_LINKS.map(({ key, href }) => (
                <Link key={key} href={href} className={styles.link}>
                  <Text variant="P12" tag="span" text={key} color="neutral500" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <Text variant="P13" tag="span" text="COPYRIGHT" color="neutral400" />
        </div>
      </div>
    </footer>
  );
}
