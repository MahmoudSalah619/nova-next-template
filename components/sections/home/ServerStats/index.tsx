import { Text } from "@/components/ui/Text";
import { STATS_DATA } from "@/data/home";
import styles from "./styles.module.scss";

export function ServerStats() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Text
            variant="P13"
            tag="span"
            text="SERVER_STATS_BADGE"
            color="primary"
          />
        </div>
        <Text
          variant="H2"
          tag="h2"
          text="SERVER_STATS_TITLE"
          color="neutral900"
          className={styles.title}
        />
        <Text
          variant="P3"
          tag="p"
          text="SERVER_STATS_SUBTITLE"
          color="neutral500"
          className={styles.subtitle}
        />
      </div>

      <div className={styles.grid}>
        {STATS_DATA.map((stat) => (
          <div key={stat.labelKey} className={styles.card}>
            <Text
              variant="H2"
              tag="span"
              skipTranslate
              text={stat.value}
              color="primary"
            />
            <Text
              variant="P12"
              tag="span"
              text={stat.labelKey}
              color="neutral500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
