import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Divider, Flex, Form, Input, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { clearProfile } from 'src/entities/profile/model/slice';
import { selectSessionError, selectSessionIsAuthenticated, selectSessionLastRedirect } from 'src/entities/session';
import { loginThunk } from 'src/entities/session/model/thunks';
import { LoginFormData } from 'src/shared';

const { Title, Text } = Typography;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectSessionIsAuthenticated);
  const errorAuthentication = useSelector(selectSessionError);
  const lastRedirect = useSelector(selectSessionLastRedirect);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearProfile());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginThunk(data));
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  useEffect(() => {
    if (errorAuthentication) {
      setError(errorAuthentication);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [errorAuthentication]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(lastRedirect || '/profile');
    }
  }, [isAuthenticated, navigate, lastRedirect]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Вход в систему</Title>
            {error ? (
              <Alert message={error} type="error" showIcon />
            ) : (
              <Flex vertical justify="center" align="center">
                <Title level={5}>Логины и пароли для тестирования</Title>
                <Flex align="center">
                  <Text type="secondary" copyable>
                    admin
                  </Text>
                  <Divider type="vertical" />
                  <Text type="secondary" copyable>
                    123456
                  </Text>
                </Flex>
                <Flex align="center">
                  <Text type="secondary" copyable>
                    user
                  </Text>
                  <Divider type="vertical" />
                  <Text type="secondary">&lt;любой пароль&gt;</Text>
                </Flex>
              </Flex>
            )}
          </div>

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
              <Button type="primary" htmlType="submit" block loading={isSubmitting} size="large">
                Войти
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Space direction="vertical" size="small">
              <Text>
                <Button type="link" disabled>
                  Забыли пароль?
                </Button>
              </Text>
              <Text>
                Нет аккаунта?{' '}
                <Button type="link" disabled>
                  Зарегистрироваться
                </Button>
              </Text>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};
export default LoginPage;
