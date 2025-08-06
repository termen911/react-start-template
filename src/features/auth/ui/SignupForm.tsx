import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { setToken } from 'src/entities/session/model/slice';
import { ErrorDisplay } from 'src/shared';
import { ServerErrors } from 'src/shared/api/types/error';
import { useSignupMutation } from '../api/useSignupMutation';
import { SignupDto } from '../model/types';
import { useSignupForm } from '../model/useSignupForm';

export const SignupForm = () => {
  const { control, handleSubmit, errors, isSubmitting } = useSignupForm();

  const { mutate, isPending, isError, error, isSuccess, data } = useSignupMutation();

  const [localError, setLocalError] = useState<ServerErrors | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      setLocalError(error as unknown as ServerErrors);
      setTimeout(() => {
        setLocalError(null);
      }, 5000);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      setLocalError(null);
    }
  }, [isSuccess]);

  const onSubmit = (formData: SignupDto) => {
    mutate(formData);
  };

  useEffect(() => {
    if (data) {
      dispatch(setToken(data.token as string));
      navigate('/profile');
    }
  }, [data, dispatch, navigate]);

  return (
    <Form layout="vertical" disabled={isPending} onFinish={handleSubmit(onSubmit)} size="large">
      {isError && localError ? (
        <Form.Item>
          <ErrorDisplay error={localError} type="error" showIcon={true} />
        </Form.Item>
      ) : null}
      <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email обязателен для заполнения',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Неверный формат email',
            },
          }}
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
        <Button type="primary" htmlType="submit" loading={isSubmitting} block size="large">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
