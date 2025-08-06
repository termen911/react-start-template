import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppTranslation } from 'src/app/providers/i18n/useAppTranslation';
import { selectSessionUser } from 'src/entities/session/model/selectors';
import { Profile } from '../model/types';
import { useProfileForm } from '../model/useProfileForm';

export const ProfileForm = () => {
  const { t } = useAppTranslation();
  const user = useSelector(selectSessionUser);

  const { control, handleSubmit, errors, isSubmitting } = useProfileForm();

  const onFormSubmit = (formData: Profile) => {
    console.log(formData);
  };

  return (
    <Card style={{ width: '100%', margin: '0 auto' }}>
      <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
        <Form.Item label={t('profile.id.label')} validateStatus={errors.id ? 'error' : ''} help={errors.id?.message}>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <Input {...field} readOnly size="large" placeholder={t('profile.id.placeholder')} value={user?.id} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.name.label')}
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: t('profile.name.validation.required'),
              minLength: {
                value: 2,
                message: t('profile.name.validation.minLength'),
              },
              maxLength: {
                value: 50,
                message: t('profile.name.validation.maxLength'),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<UserOutlined />}
                placeholder={t('profile.name.placeholder')}
                allowClear
                value={user?.name}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.email.label')}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readOnly
                size="large"
                placeholder={t('profile.email.placeholder')}
                value={user?.email}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t('profile.signUpDate.label')}
          validateStatus={errors.signUpDate ? 'error' : ''}
          help={errors.signUpDate?.message}
          required
        >
          <Controller
            name="signUpDate"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                readOnly
                size="large"
                placeholder={t('profile.signUpDate.placeholder')}
                value={user?.signUpDate.toLocaleDateString()}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'end', marginTop: 32 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isSubmitting}
            disabled={isSubmitting}
            style={{ minWidth: 120 }}
          >
            {t('profile.buttons.save')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
