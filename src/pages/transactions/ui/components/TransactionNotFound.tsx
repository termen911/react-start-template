import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MainLayout } from 'src/shared/ui/mainLayout';

interface TransactionNotFoundProps {
  onBack: () => void;
}

export const TransactionNotFound: React.FC<TransactionNotFoundProps> = ({ onBack }) => {
  const { t } = useAppTranslation();
  return (
    <MainLayout>
      <Result
        status="404"
        title="404"
        subTitle={t('transaction.messages.notFound')}
        extra={
          <Button type="primary" icon={<ArrowLeftOutlined />} onClick={onBack}>
            {t('transaction.backToList')}
          </Button>
        }
      />
    </MainLayout>
  );
};
