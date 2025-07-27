import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { LoginFormData } from 'src/shared';
import { useLoginForm } from '../../model/useLoginForm';

interface AuthFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

export const LoginForm: React.FC<AuthFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, errors, isSubmitting } = useLoginForm();

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large">
      <Form.Item label="Логин" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Логин обязателен для заполнения',
            minLength: {
              value: 3,
              message: 'Логин должен содержать минимум 3 символа',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined />}
              placeholder="Введите ваш логин"
              status={errors.username ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Пароль" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Пароль обязателен для заполнения',
            minLength: {
              value: 6,
              message: 'Пароль должен содержать минимум 6 символов',
            },
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              prefix={<LockOutlined />}
              placeholder="Введите ваш пароль"
              status={errors.password ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading || isSubmitting} size="large">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
