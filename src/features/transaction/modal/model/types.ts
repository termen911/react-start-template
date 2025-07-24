import { Transaction } from 'src/shared';

// Режимы работы модального окна
export type TransactionModalMode = 'create' | 'edit';

// Пропсы модального окна транзакции
export interface TransactionModalProps {
  open: boolean;
  mode: TransactionModalMode;
  loading?: boolean;
  transaction?: Transaction | null; // Текущая транзакция для редактирования
  onCancel: () => void;
  onSubmit: (data: Transaction) => Promise<void>; // Используем Transaction вместо TransactionFormData
}

// Интерфейс для хуков управления модальным окном
export interface UseTransactionModalResult {
  isModalOpen: boolean;
  modalMode: TransactionModalMode;
  loading: boolean;
  editingTransactionId: string | null;
  currentTransaction: Transaction | null; // Добавлено - текущая транзакция для редактирования
  openCreateModal: () => void;
  openEditModal: (transactionId: string) => void;
  closeModal: () => void;
  handleSubmit: (data: Transaction) => Promise<void>; // Используем Transaction вместо TransactionFormData
}
