import { TransactionFormData } from '../../../../shared/lib/validation/transaction';

export interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  initialData?: Partial<TransactionFormData>;
  loading?: boolean;
  error?: string;
  mode?: 'create' | 'edit';
}

export interface TransactionFormState {
  isLoading: boolean;
  error: string | null;
}

export { TransactionFormData };
