import { useForm } from 'react-hook-form';
import { LoginFormData } from 'src/shared';

export const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
  };
};
