import { Button, message, Popconfirm } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppTranslation } from 'src/app/providers/i18n';

interface DeleteTransactionButtonProps {
  transactionId: string;
  block?: boolean;
  onSuccess?: () => void;
}

export const DeleteTransactionButton: React.FC<DeleteTransactionButtonProps> = ({
  transactionId,
  block = false,
  onSuccess,
}) => {
  const { t } = useAppTranslation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log('handleDelete transactionId', transactionId);
    try {
      // Здесь будет вызов API для удаления транзакции
      // await MockAPI.deleteTransaction(transactionId);

      message.success(t('transaction.messages.deleteSuccess'));

      if (onSuccess) {
        onSuccess();
      } else {
        // Если не передан onSuccess, перенаправляем к списку
        navigate('/transactions');
      }
    } catch (error) {
      message.error(t('transaction.messages.deleteError'));
    }
  };

  return (
    <Popconfirm
      title={t('transaction.messages.confirmDelete')}
      description={t('transaction.messages.deleteWarning')}
      okButtonProps={{ danger: true }}
      okText={t('common.delete')}
      cancelText={t('common.cancel')}
      onConfirm={handleDelete}
    >
      <Button danger block={block}>
        {t('transaction.delete')}
      </Button>
    </Popconfirm>
  );
};
