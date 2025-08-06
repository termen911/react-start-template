import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from 'src/shared/api/apiClients/apiFetch';
import { operationQueryKeys } from './query-keys';

export const useDeleteOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DELETE(`/operations/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
      queryClient.removeQueries({ queryKey: operationQueryKeys.detail(id) });
    },
  });
};
