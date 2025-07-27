import { Alert, Button, Card, Divider, Flex, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { clearProfile } from 'src/entities/profile/model/slice';
import { selectSessionError, selectSessionIsAuthenticated, selectSessionLastRedirect } from 'src/entities/session';
import { loginThunk } from 'src/entities/session/model/thunks';
import { LoginFormData, MainLayout } from 'src/shared';
import { LoginForm } from './LoginForm';

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(loginThunk(data));
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  useEffect(() => {
    // if (errorAuthentication) {
    //   setError(errorAuthentication);
    //   setTimeout(() => {
    //     setError(null);
    //   }, 3000);
    // }
  }, [errorAuthentication]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(lastRedirect || '/profile');
    }
  }, [isAuthenticated, navigate, lastRedirect]);

  return (
    <MainLayout>
      <Flex justify="center" align="center" style={{ minHeight: '90vh' }}>
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

            <LoginForm onSubmit={onSubmit} />

            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="small">
                <Text>
                  <Button type="link" disabled>
                    Забыли пароль?
                  </Button>
                </Text>
                <Text>
                  Нет аккаунта?{' '}
                  <Button type="link" onClick={() => navigate('/signup')}>
                    Зарегистрироваться
                  </Button>
                </Text>
              </Space>
            </div>
          </Space>
        </Card>
      </Flex>
    </MainLayout>
  );
};
export default LoginPage;
