import { LoginFormData } from '../../../../shared/lib/validation/auth';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string;
}

export interface LoginState {
  isLoading: boolean;
  error: string | null;
}

export { LoginFormData };
