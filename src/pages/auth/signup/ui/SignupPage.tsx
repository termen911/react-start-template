import { Button, Card, Flex, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from 'src/features/auth/ui/SignupForm';
import { MainLayout } from 'src/shared';

const { Text, Title } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();

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
              <Title level={2}>Регистрация</Title>
            </div>

            <SignupForm />

            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="small">
                <Text>
                  <Button type="link" disabled>
                    Забыли пароль?
                  </Button>
                </Text>
                <Text>
                  Уже есть аккаунт?{' '}
                  <Button type="link" onClick={() => navigate('/login')}>
                    Войти
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
export default SignupPage;
