import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSignupForm } from '../../model/useSignupForm';
import { SignupFormData } from 'src/shared';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  loading?: boolean;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, errors, isSubmitting } = useSignupForm();

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large">
      <Form.Item label="Логин" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined />}
              placeholder="Введите ваш email"
              status={errors.email ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Пароль" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <Controller
          name="password"
          control={control}
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
