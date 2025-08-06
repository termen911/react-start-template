import { useForm } from 'react-hook-form';
import { SigninDto } from './types';

export const useSigninForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninDto>({
    defaultValues: {
      email: '',
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
