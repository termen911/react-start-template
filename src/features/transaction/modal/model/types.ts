import { TransactionFormData } from '../../form';

// Режимы работы модального окна
export type TransactionModalMode = 'create' | 'edit';

// Пропсы модального окна транзакции
export interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  mode: TransactionModalMode;
  transactionId?: string; // Для редактирования
  loading?: boolean;
}

// Интерфейс для хуков управления модальным окном
export interface UseTransactionModalResult {
  isModalOpen: boolean;
  modalMode: TransactionModalMode;
  loading: boolean;
  editingTransactionId: string | null;
  openCreateModal: () => void;
  openEditModal: (transactionId: string) => void;
  closeModal: () => void;
  handleSubmit: (data: TransactionFormData) => Promise<void>;
}
