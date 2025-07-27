import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { SignupFormData } from 'src/shared';
import { ErrorCode, ServerErrors } from 'src/shared/api/types/error';
import { useSignupForm } from '../../model/useSignupForm';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  loading?: boolean;
  serverError?: ServerErrors;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading, serverError }) => {
  const { control, handleSubmit, errors, isSubmitting, setError } = useSignupForm();

  useEffect(() => {
    console.log('serverError', serverError);
    if (serverError) {
      serverError.errors.map((error) => {
        if (error.extensions.code === ErrorCode.ERR_VALIDATION_ERROR) {
          setError('email', { message: error.message });
        }
        if (error.extensions.code === ErrorCode.ERR_FIELD_REQUIRED) {
          setError(error.fieldName as keyof SignupFormData, { message: error.message });
        }
        if (error.extensions.code === ErrorCode.ERR_INVALID_PASSWORD) {
          setError('password', { message: error.message });
        }
      });
    }
  }, [serverError, setError]);

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
