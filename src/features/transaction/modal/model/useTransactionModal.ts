import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { CreateTransactionData, MockAPI, UpdateTransactionData } from 'src/shared/api/mock';
import { TransactionFormData } from '../../form';
import { TransactionModalMode, UseTransactionModalResult } from './types';

export const useTransactionModal = (): UseTransactionModalResult => {
  const { t } = useAppTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TransactionModalMode>('create');
  const [loading, setLoading] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);

  // Функция для парсинга хеша
  const parseHash = (hash: string) => {
    if (hash === '#create') {
      return { mode: 'create' as TransactionModalMode, id: null };
    }

    const editMatch = hash.match(/^#edit\/(.+)$/);
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
      // Удаляем хеш без перезагрузки страницы
      const url = window.location.pathname + window.location.search;
      window.history.replaceState({}, document.title, url);
    }
  };

  // Эффект для отслеживания изменений хеша при загрузке и navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const parsedHash = parseHash(hash);

      if (parsedHash) {
        if (parsedHash.mode === 'create') {
          setModalMode('create');
          setEditingTransactionId(null);
          setIsModalOpen(true);
        } else if (parsedHash.mode === 'edit' && parsedHash.id) {
          // Проверяем, существует ли транзакция с таким ID
          const transaction = MockAPI.getTransactionById(parsedHash.id);
          if (transaction) {
            setModalMode('edit');
            setEditingTransactionId(parsedHash.id);
            setIsModalOpen(true);
          } else {
            // Если транзакция не найдена, показываем ошибку и удаляем хеш
            message.error(t('transaction.modal.error.notFound'));
            clearHash();
          }
        }
      } else if (hash === '') {
        // Если хеш удален, закрываем модальное окно
        setIsModalOpen(false);
        setEditingTransactionId(null);
        setTimeout(() => {
          setModalMode('create');
        }, 300);
      }
    };

    // Проверяем хеш при первой загрузке
    handleHashChange();

    // Слушаем изменения хеша
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [t]);

  // Открытие модального окна для создания транзакции
  const openCreateModal = () => {
    setModalMode('create');
    setEditingTransactionId(null);
    setIsModalOpen(true);
    updateHash('create');
  };

  // Открытие модального окна для редактирования транзакции
  const openEditModal = (transactionId: string) => {
    setModalMode('edit');
    setEditingTransactionId(transactionId);
    setIsModalOpen(true);
    updateHash('edit', transactionId);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransactionId(null);
    clearHash();
    // Небольшая задержка перед сбросом состояния для плавной анимации
    setTimeout(() => {
      setModalMode('create');
    }, 300);
  };

  // Обработчик отправки формы
  const handleSubmit = async (data: TransactionFormData): Promise<void> => {
    setLoading(true);

    try {
      // Имитируем задержку API запроса
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (modalMode === 'create') {
        // Создаем новую транзакцию через API
        const createData: CreateTransactionData = {
          type: data.type,
          amount: data.amount,
          title: data.title,
          description: data.description,
          categoryName: data.categoryName,
          categoryIcon: data.categoryIcon,
          categoryColor: data.categoryColor,
          date: data.date,
          tags: data.tags,
        };

        const newTransaction = MockAPI.createTransaction(createData);
        console.log('Создана новая транзакция:', newTransaction);
        message.success(t('transaction.modal.messages.createSuccess'));
      } else if (modalMode === 'edit' && editingTransactionId) {
        // Обновляем существующую транзакцию через API
        const updateData: UpdateTransactionData = {
          id: editingTransactionId,
          type: data.type,
          amount: data.amount,
          title: data.title,
          description: data.description,
          categoryName: data.categoryName,
          categoryIcon: data.categoryIcon,
          categoryColor: data.categoryColor,
          date: data.date,
          tags: data.tags,
        };

        const updatedTransaction = MockAPI.updateTransaction(editingTransactionId, updateData);

        if (updatedTransaction) {
          console.log('Обновлена транзакция:', updatedTransaction);
          message.success(t('transaction.modal.messages.updateSuccess'));
        } else {
          throw new Error('Транзакция не найдена');
        }
      }

      closeModal();

      // Принудительно обновляем страницу для отображения изменений
      // В реальном приложении лучше использовать state management или callback
      window.location.reload();
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
  };

  return {
    isModalOpen,
    modalMode,
    loading,
    editingTransactionId,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
  };
};
