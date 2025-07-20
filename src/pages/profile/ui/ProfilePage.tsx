import { Flex, message, Typography } from 'antd';
import React, { useState } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { ProfileForm } from 'src/features/profileForm';
import type { ProfileFormData } from 'src/features/profileForm/model/types';
import { MainTitleWithTranslation } from 'src/shared';
import { MainLayout } from 'src/shared/ui/mainLayout';

const ProfilePage = () => {
  const { t } = useAppTranslation();
  const [loading, setLoading] = useState(false);

  // Пример начальных данных (в реальном проекте будут приходить с сервера)
  const defaultValues: Partial<ProfileFormData> = {
    nickname: '',
    about: '',
  };

  const handleSubmit = async (data: ProfileFormData) => {
    setLoading(true);

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Здесь должен быть реальный API вызов для сохранения данных
      console.log('Сохраняем данные профиля:', data);

      message.success(t('profile.messages.success'));
    } catch (error) {
      message.error(t('profile.messages.error'));
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <MainTitleWithTranslation title={t('profile.title')} />
      <Flex justify="center" style={{ minWidth: '500px' }}>
        <ProfileForm onSubmit={handleSubmit} initialData={defaultValues} loading={loading} />
      </Flex>
    </MainLayout>
  );
};

export default ProfilePage;
