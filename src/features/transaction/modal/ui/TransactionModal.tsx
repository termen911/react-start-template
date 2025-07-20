import { Modal } from 'antd';
import React, { useMemo } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MockAPI, Transaction } from 'src/shared/api/mock';
import { TransactionForm, TransactionFormData } from '../../form';
import { TransactionModalProps } from '../model/types';

export const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onClose,
  onSubmit,
  mode,
  transactionId,
  loading = false,
}) => {
  const { t } = useAppTranslation();

  // Получаем данные транзакции для редактирования
  const transaction: Transaction | undefined = useMemo(() => {
    if (mode === 'edit' && transactionId) {
      return MockAPI.getTransactionById(transactionId);
    }
    return undefined;
  }, [mode, transactionId]);

  // Заголовок модального окна
  const modalTitle = mode === 'create' ? t('transaction.modal.create.title') : t('transaction.modal.edit.title');

  // Формируем defaultValues для формы при редактировании
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
        date: transaction.date.split('T')[0], // Преобразуем ISO дату в YYYY-MM-DD
        tags: transaction.tags || [],
      };
    }
    return {};
  }, [mode, transaction]);

  // Обработчик отправки формы
  const handleFormSubmit = (data: TransactionFormData) => {
    onSubmit(data);
  };

  // Если редактируем, но транзакция не найдена
  if (mode === 'edit' && transactionId && !transaction) {
    return (
      <Modal title={t('transaction.modal.error.title')} open={open} onCancel={onClose} footer={null} centered>
        <p>{t('transaction.modal.error.notFound')}</p>
      </Modal>
    );
  }

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onClose}
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
