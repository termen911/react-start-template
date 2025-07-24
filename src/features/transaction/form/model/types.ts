import { TransactionType } from 'src/shared/types';

// Данные формы для создания/редактирования транзакции
export interface TransactionFormData {
  type: TransactionType;
  amount: number;
  title: string;
  description: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  date: string;
  tags?: string[];
}

// Пропсы компонента формы
export interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  defaultValues?: Partial<TransactionFormData>;
  loading?: boolean;
}

// Опции для категорий
export interface CategoryOption {
  name: string;
  icon: string;
  color: string;
}
