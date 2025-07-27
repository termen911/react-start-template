import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppTranslation } from 'src/app/providers/i18n';
import { useAppDispatch } from 'src/app/store';
import { selectTransaction, selectTransactions } from 'src/entities/transaction/model/selectors';
import { fetchTransactionByIdThunk } from 'src/entities/transaction/model/thunks';
import { Transaction } from 'src/shared';
import { TransactionModalMode, UseTransactionModalResult } from './types';
import { addTransaction, updateTransaction } from 'src/entities/transaction/model/slice';

// Функция для парсинга хеша
const parseHash = (hash: string) => {
  const cleanHash = hash.replace('#', '');

  if (cleanHash === 'create') {
    return { mode: 'create' as TransactionModalMode, id: null };
  }

  const editMatch = cleanHash.match(/^edit\/(.+)$/);
  if (editMatch) {
    return { mode: 'edit' as TransactionModalMode, id: editMatch[1] };
  }

  return null;
};

// Функция для обновления хеша
const updateHash = (mode: TransactionModalMode, id?: string) => {
  if (mode === 'create') {
    window.location.hash = 'create';
  } else if (mode === 'edit' && id) {
    window.location.hash = `edit/${id}`;
  }
};

// Функция для удаления хеша
const clearHash = () => {
  if (window.location.hash) {
    const url = window.location.pathname + window.location.search;
    window.history.replaceState({}, document.title, url);
  }
};

export const useTransactionModal = (): UseTransactionModalResult => {
  const { t } = useAppTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TransactionModalMode>('create');
  const [loading, setLoading] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const transactionFromStore = useSelector(selectTransaction);
  const transactions = useSelector(selectTransactions);

  // Обработчик открытия модального окна для редактирования
  const handleOpenEdit = useCallback(
    async (transactionId: string) => {
      setLoading(true);
      try {
        // Проверяем, есть ли транзакция в сторе
        const transactionInStore = transactions.find((t) => t.id === transactionId);

        if (!transactionInStore) {
          // Если транзакции нет в сторе, загружаем её
          await dispatch(fetchTransactionByIdThunk(transactionId));
        }

        setModalMode('edit');
        setEditingTransactionId(transactionId);
        setIsModalOpen(true);
        updateHash('edit', transactionId);
      } catch (error) {
        message.error(t('transaction.modal.error.notFound'));
        clearHash();
      } finally {
        setLoading(false);
      }
    },
    [dispatch, transactions, t]
  );

  // Закрытие модального окна
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTransactionId(null);
    clearHash();

    // Небольшая задержка перед сбросом состояния для плавной анимации
    setTimeout(() => {
      setModalMode('create');
    }, 300);
  }, []);

  // Обработчик открытия модального окна для создания
  const handleOpenCreate = useCallback(() => {
    setModalMode('create');
    setEditingTransactionId(null);
    setIsModalOpen(true);
    updateHash('create');
  }, []);

  // Эффект для отслеживания изменений хеша
  useEffect(() => {
    const handleHashChange = () => {
      const parsedHash = parseHash(window.location.hash);

      if (parsedHash) {
        if (parsedHash.mode === 'create') {
          handleOpenCreate();
        } else if (parsedHash.mode === 'edit' && parsedHash.id) {
          handleOpenEdit(parsedHash.id);
        }
      } else {
        handleCloseModal();
      }
    };

    // Проверяем хеш при первой загрузке
    handleHashChange();

    // Слушаем изменения хеша
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleCloseModal, handleOpenCreate, handleOpenEdit]);

  // Получаем текущую транзакцию для редактирования
  const getCurrentTransaction = useCallback(() => {
    if (modalMode === 'edit' && editingTransactionId) {
      // Сначала ищем в основном списке транзакций
      const transactionInList = transactions.find((t) => t.id === editingTransactionId);
      if (transactionInList) return transactionInList;

      // Если не нашли в списке, проверяем отдельную загруженную транзакцию
      if (transactionFromStore?.id === editingTransactionId) {
        return transactionFromStore;
      }
    }
    return null;
  }, [modalMode, editingTransactionId, transactions, transactionFromStore]);

  // Обработчик отправки формы
  const handleSubmit = useCallback(
    async (data: Transaction): Promise<void> => {
      setLoading(true);

      try {
        if (modalMode === 'create') {
          // Создаем новую транзакцию
          const createData: Transaction = {
            ...data,
            id: `tx-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          await dispatch(addTransaction(createData));
          message.success(t('transaction.modal.messages.createSuccess'));
        } else if (modalMode === 'edit' && editingTransactionId) {
          // Обновляем существующую транзакцию
          const updateData: Transaction = {
            ...data,
            id: editingTransactionId,
            updatedAt: new Date().toISOString(),
          };
          console.log(33, updateData);

          await dispatch(updateTransaction(updateData));
          message.success(t('transaction.modal.messages.updateSuccess'));
        }

        handleCloseModal();
      } catch (error) {
        console.error('Ошибка при сохранении транзакции:', error);

        const errorMessage =
          modalMode === 'create'
            ? t('transaction.modal.messages.createError')
            : t('transaction.modal.messages.updateError');

        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [modalMode, editingTransactionId, dispatch, handleCloseModal, t]
  );

  return {
    isModalOpen,
    modalMode,
    loading,
    editingTransactionId,
    currentTransaction: getCurrentTransaction(),
    openCreateModal: handleOpenCreate,
    openEditModal: handleOpenEdit,
    closeModal: handleCloseModal,
    handleSubmit,
  };
};
