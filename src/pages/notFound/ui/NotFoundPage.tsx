import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/shared/lib';
import { MainLayout } from 'src/shared/ui/mainLayout';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate(routes.HOME)}>
            Back Home
          </Button>
        }
      />
    </MainLayout>
  );
};

export default NotFoundPage;
