import { useForm } from 'react-hook-form';
import { Profile } from './types';
import { COMMAND_ID } from 'src/shared/lib/consts/api.consts';

export const useProfileForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Profile>({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      signUpDate: new Date(),
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
