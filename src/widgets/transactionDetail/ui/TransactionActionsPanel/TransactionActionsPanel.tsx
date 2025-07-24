import { Card, Space } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import {
  DeleteTransactionButton,
  EditTransactionButton,
  TransactionModal,
  useTransactionModal,
} from 'src/features/transaction';

interface TransactionActionsPanelProps {
  transactionId: string;
}

export const TransactionActionsPanel: React.FC<TransactionActionsPanelProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();
  const { isModalOpen, modalMode, loading, currentTransaction, openEditModal, closeModal, handleSubmit } =
    useTransactionModal();

  const handleEditClick = () => {
    openEditModal(transactionId);
  };

  return (
    <>
      <Card title={t('transaction.actions')} style={{ marginTop: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <EditTransactionButton transactionId={transactionId} block onClick={handleEditClick} />
          <DeleteTransactionButton transactionId={transactionId} block />
        </Space>
      </Card>

      <TransactionModal
        open={isModalOpen}
        onCancel={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        transaction={currentTransaction}
        loading={loading}
      />
    </>
  );
};
