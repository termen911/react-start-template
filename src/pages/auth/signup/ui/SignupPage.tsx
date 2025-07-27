import { Button, Card, Flex, Space, Spin, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from 'src/shared';
import { ErrorDisplay } from 'src/shared/ui/errorDisplay/ui/ErrorDisplay';
import { useSignupPage } from '../model/useSignupPage';
import { SignupForm } from './SignupForm';

const { Text, Title } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();

  const { error, isLoading, onSubmit } = useSignupPage();

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
              {error ? <ErrorDisplay error={error} type="error" showIcon={true} /> : null}
            </div>

            <Spin spinning={isLoading}>
              <SignupForm onSubmit={onSubmit} />
            </Spin>

            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="small">
                <Text>
                  <Button type="link" disabled>
                    Забыли пароль?
                  </Button>
                </Text>
                <Text>
                  Уже есть аккаунт?{' '}
                  <Button type="link" onClick={() => navigate('/signin')}>
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
