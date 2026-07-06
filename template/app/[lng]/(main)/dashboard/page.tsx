import { Text } from "@/components/ui/Text";
import { PageWrapper } from "@/components/layout/PageWrapper";
import styles from "./styles.module.scss";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className={styles.page}>
        <Text variant="H4" tag="h1" text="DASHBOARD" />
        <div className={styles.grid}>
          <div className={styles.card}>
            <Text variant="P13" tag="p" text="TOTAL_PROJECTS" color="secondary" />
            <Text variant="H5" tag="p" skipTranslate text="12" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
