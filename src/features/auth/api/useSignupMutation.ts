import { useMutation } from '@tanstack/react-query';
import { signup } from './authApi';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
