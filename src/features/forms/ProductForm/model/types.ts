import { ProductFormData } from '../../../../../shared/lib/validation/product';

export interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
  loading?: boolean;
  error?: string;
  mode?: 'create' | 'edit';
}

export interface ProductFormState {
  isLoading: boolean;
  error: string | null;
}

export { ProductFormData };
