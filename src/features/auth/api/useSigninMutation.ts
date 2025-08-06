import { useMutation } from '@tanstack/react-query';
import { signin } from './authApi';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: signin,
  });
};
