import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MainTitleWithTranslation } from 'src/shared';
import { MainLayout } from 'src/shared/ui/mainLayout';

const HomePage = () => {
  const { t } = useAppTranslation();

  return (
    <MainLayout>
      <MainTitleWithTranslation title={t('home.title')} />
    </MainLayout>
  );
};

export default HomePage;
