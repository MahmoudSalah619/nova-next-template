'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import styles from './styles.module.scss';

interface ErrorViewProps {
  reset: () => void;
}

export function ErrorView({ reset }: ErrorViewProps) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, 'common');

  return (
    <div className={styles.wrapper}>
      <Text variant="H2" skipTranslate>
        {t('ERROR_TITLE')}
      </Text>
      <Button variant="primary" onClick={reset}>
        {t('TRY_AGAIN')}
      </Button>
    </div>
  );
}
