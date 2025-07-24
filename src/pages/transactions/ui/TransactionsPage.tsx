import { Col, Flex, Row } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppTranslation } from 'src/app/providers/i18n';
import { useAppDispatch } from 'src/app/store';
import { selectProfileIsAdmin } from 'src/entities/profile/model/selectors';
import { selectTransactions } from 'src/entities/transaction/model/selectors';
import { fetchTransactionsThunk } from 'src/entities/transaction/model/thunks';
import { CreateTransactionButton, TransactionModal, useTransactionModal } from 'src/features/transaction';
import { MainLayout, MainTitle } from 'src/shared/ui';
import { TransactionsList } from 'src/widgets/transactionList';

const TransactionsPage = () => {
  const { t } = useAppTranslation();
  const { isModalOpen, modalMode, loading, currentTransaction, openCreateModal, closeModal, handleSubmit } =
    useTransactionModal();

  const dispatch = useAppDispatch();
  const isAdmin = useSelector(selectProfileIsAdmin);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    if (!transactions.length) {
      dispatch(fetchTransactionsThunk());
    }
  }, [dispatch, transactions]);

  return (
    <MainLayout>
      <Flex vertical gap={32}>
        <Row justify="space-between" align="middle">
          <Col>
            <MainTitle title={t('transaction.title')} level={3} />
          </Col>
          <Col>{isAdmin && <CreateTransactionButton onClick={openCreateModal} />}</Col>
        </Row>
        <TransactionsList />
      </Flex>

      <TransactionModal
        open={isModalOpen}
        onSubmit={handleSubmit}
        mode={modalMode}
        transaction={currentTransaction} // Исправлено: передаем объект транзакции вместо ID
        loading={loading}
        onCancel={closeModal}
      />
    </MainLayout>
  );
};

export default TransactionsPage;
