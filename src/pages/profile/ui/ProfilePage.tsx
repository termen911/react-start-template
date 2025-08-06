import { Flex } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { ProfileForm } from 'src/features/profileForm';
import { MainTitleWithTranslation } from 'src/shared';
import { MainLayout } from 'src/shared/ui/mainLayout';

const ProfilePage = () => {
  const { t } = useAppTranslation();

  return (
    <MainLayout>
      <MainTitleWithTranslation title={t('profile.title')} />
      <Flex justify="center" style={{ minWidth: '500px' }}>
        <ProfileForm />
      </Flex>
    </MainLayout>
  );
};

export default ProfilePage;
