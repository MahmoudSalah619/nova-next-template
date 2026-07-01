import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import styles from "./styles.module.scss";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Text variant="H1" skipTranslate>
        404
      </Text>
      <Text variant="H3" text="NOT_FOUND_TITLE" />
      <Text variant="P2" text="NOT_FOUND_SUBTITLE" />
      <Link href="/">
        <Button variant="primary" title="NOT_FOUND_BACK_HOME" />
      </Link>
    </div>
  );
}
