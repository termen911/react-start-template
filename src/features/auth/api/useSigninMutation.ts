import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signin } from './authApi';
import { operationQueryKeys } from 'src/entities/operation';

export const useSigninMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.all });
    },
  });
};
