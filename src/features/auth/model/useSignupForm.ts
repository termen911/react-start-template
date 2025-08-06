import { useForm } from 'react-hook-form';
import { SignupDto } from './types';
import { COMMAND_ID } from 'src/shared/lib/consts/api.consts';

export const useSignupForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupDto>({
    defaultValues: {
      email: '',
      password: '',
      commandId: COMMAND_ID,
    },
  });

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    setError,
  };
};
