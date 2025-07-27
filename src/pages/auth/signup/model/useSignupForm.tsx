import { useForm } from 'react-hook-form';
import { SignupFormData } from 'src/shared';

export const useSignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
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
