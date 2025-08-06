import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from './authApi';
import { operationQueryKeys } from 'src/entities/operation';

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.all });
    },
  });
};
