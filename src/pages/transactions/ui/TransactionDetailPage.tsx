import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { selectTransaction } from 'src/entities/transaction/model/selectors';
import { MainLayout, MainTitleWithTranslation } from 'src/shared/ui';
import { TransactionDetail } from 'src/widgets/transactionDetail';
import { TransactionNotFound } from './components';
import { fetchTransactionByIdThunk } from 'src/entities/transaction/model/thunks';
import { useAppDispatch } from 'src/app/store';

const TransactionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const dispatch = useAppDispatch();
  const transaction = useSelector(selectTransaction);

  useEffect(() => {
    if (!transaction) {
      dispatch(fetchTransactionByIdThunk(id));
    }
  }, [transaction, id, dispatch]);

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
