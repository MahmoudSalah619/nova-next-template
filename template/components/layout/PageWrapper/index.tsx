import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface PageWrapperProps {
  children?: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <main className={styles.wrapper}>{children}</main>;
}
