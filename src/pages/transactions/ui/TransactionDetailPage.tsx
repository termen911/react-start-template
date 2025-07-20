import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MainLayout, MainTitleWithTranslation } from 'src/shared/ui';
import { TransactionDetail } from 'src/widgets/transactionDetail';
import { TransactionNotFound } from './components';

const TransactionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useAppTranslation();

  if (!id) {
    return <TransactionNotFound onBack={() => navigate('/transactions')} />;
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <MainTitleWithTranslation
          title={t('transaction.details')}
          onBack={() => navigate('/transactions')}
          backTextKey="transaction.backToList"
        />
        <TransactionDetail transactionId={id} />
      </div>
    </MainLayout>
  );
};

export default TransactionDetailPage;
