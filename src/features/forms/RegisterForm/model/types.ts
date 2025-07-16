import { RegisterFormData } from '../../../../shared/lib/validation/auth';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
  error?: string;
}

export interface RegisterState {
  isLoading: boolean;
  error: string | null;
}

export { RegisterFormData };
