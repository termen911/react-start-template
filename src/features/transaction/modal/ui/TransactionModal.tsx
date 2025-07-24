import { Modal } from 'antd';
import React, { useMemo } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { Transaction } from 'src/shared/types';
import { TransactionForm } from '../../form';
import { TransactionModalProps } from '../model/types';

export const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onCancel,
  onSubmit,
  mode,
  transaction,
  loading = false,
}) => {
  const { t } = useAppTranslation();

  const modalTitle = mode === 'create' ? t('transaction.modal.create.title') : t('transaction.modal.edit.title');

  const defaultValues = useMemo(() => {
    if (mode === 'edit' && transaction) {
      return {
        type: transaction.type,
        amount: transaction.amount,
        title: transaction.title,
        description: transaction.description,
        categoryName: transaction.categoryName,
        categoryIcon: transaction.categoryIcon,
        categoryColor: transaction.categoryColor,
        date: transaction.date.split('T')[0],
        tags: transaction.tags || [],
      };
    }
    return {};
  }, [mode, transaction]);

  const handleFormSubmit = (data: Transaction) => {
    onSubmit(data);
  };

  if (mode === 'edit' && !transaction) {
    return (
      <Modal title={t('transaction.modal.error.title')} open={open} onCancel={onCancel} footer={null} centered>
        <p>{t('transaction.modal.error.notFound')}</p>
      </Modal>
    );
  }

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      destroyOnHidden={true}
      maskClosable={false}
    >
      <TransactionForm onSubmit={handleFormSubmit} defaultValues={defaultValues} loading={loading} />
    </Modal>
  );
};
