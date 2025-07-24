import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Popconfirm, Space } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppTranslation } from 'src/app/providers/i18n/useAppTranslation';
import { selectProfileUser } from 'src/entities/profile/model/selectors';
import type { ProfileFormData, ProfileFormProps } from '../model/types';

const { TextArea } = Input;

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData = {}, loading = false }) => {
  const { t } = useAppTranslation();
  const user = useSelector(selectProfileUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      nickname: initialData.nickname || '',
      about: initialData.about || '',
    },
    mode: 'onChange',
  });

  const onFormSubmit = (data: ProfileFormData) => {
    onSubmit?.(data);
  };

  return (
    <Card style={{ width: '100%', margin: '0 auto' }}>
      <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
        <Form.Item
          label={t('profile.nickname.label')}
          validateStatus={errors.nickname ? 'error' : ''}
          help={errors.nickname?.message}
          required
        >
          <Controller
            name="nickname"
            control={control}
            rules={{
              required: t('profile.nickname.validation.required'),
              minLength: {
                value: 2,
                message: t('profile.nickname.validation.minLength'),
              },
              maxLength: {
                value: 50,
                message: t('profile.nickname.validation.maxLength'),
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ0-9_-]+$/,
                message: t('profile.nickname.validation.pattern'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<UserOutlined />}
                placeholder={t('profile.nickname.placeholder')}
                allowClear
                value={user?.nickname}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.about.label')}
          validateStatus={errors.about ? 'error' : ''}
          help={errors.about?.message}
        >
          <Controller
            name="about"
            control={control}
            rules={{
              maxLength: {
                value: 500,
                message: t('profile.about.validation.maxLength'),
              },
            }}
            render={({ field }) => (
              <TextArea
                {...field}
                size="large"
                placeholder={t('profile.about.placeholder')}
                autoSize={{ minRows: 4, maxRows: 8 }}
                showCount
                maxLength={500}
                allowClear
                value={user?.about}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'end', marginTop: 32 }}>
          <Space>
            <Popconfirm title={t('profile.buttons.reset.confirm')} onConfirm={() => reset()} disabled={!isDirty}>
              <Button type="text" danger size="large" disabled={!isDirty}>
                {t('profile.buttons.reset')}
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              disabled={!isValid}
              style={{ minWidth: 120 }}
            >
              {t('profile.buttons.save')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
