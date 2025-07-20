import { Col, Flex, Row } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { CreateTransactionButton, TransactionModal, useTransactionModal } from 'src/features/transaction';
import { MainLayout, MainTitle } from 'src/shared/ui';
import { TransactionsList } from 'src/widgets/transactionList';

const TransactionsPage = () => {
  const { t } = useAppTranslation();
  const { isModalOpen, modalMode, loading, editingTransactionId, openCreateModal, closeModal, handleSubmit } =
    useTransactionModal();

  return (
    <MainLayout>
      <Flex vertical gap={32}>
        <Row justify="space-between" align="middle">
          <Col>
            <MainTitle title={t('transaction.title')} level={3} />
          </Col>
          <Col>
            <CreateTransactionButton onClick={openCreateModal} />
          </Col>
        </Row>
        <TransactionsList />
      </Flex>

      <TransactionModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        transactionId={editingTransactionId || undefined}
        loading={loading}
      />
    </MainLayout>
  );
};

export default TransactionsPage;
