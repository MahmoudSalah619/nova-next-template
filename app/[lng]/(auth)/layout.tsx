import { Text } from '@/components/ui/Text'
import { LangSwitch } from '@/components/ui/LangSwitch'
import styles from './layout.module.scss'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.brand}>
        <div className={styles.brandGlow} />
        <span className={styles.brandGhost}>N</span>

        <div className={styles.brandTop}>
          <div className={styles.brandMarkLarge} />
          <Text variant="H6" tag="span" skipTranslate text="Nova" color="primary" />
        </div>

        <div className={styles.brandContent}>
          <Text
            variant="H3"
            tag="h2"
            skipTranslate
            text="Your workspace, refined."
            className={styles.brandHeadline}
          />
          <Text
            variant="P8"
            tag="p"
            skipTranslate
            text="Everything your team needs — projects, docs, and people — in one place that actually makes sense."
            className={styles.brandSub}
          />

          <div className={styles.brandFeatures}>
            {["Collaborate in real time", "Ship faster with smart workflows", "Built for teams that care about craft"].map((f) => (
              <div key={f} className={styles.brandFeature}>
                <span className={styles.featureDot} />
                <Text variant="P11" tag="span" skipTranslate text={f} className={styles.brandSub} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.brandBottom}>
          <Text variant="P13" tag="span" skipTranslate text="© 2025 Nova, Inc." />
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.formHeader}>
          <LangSwitch />
        </div>
        {children}
      </div>
    </div>
  )
}
