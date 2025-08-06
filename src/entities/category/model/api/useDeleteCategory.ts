import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DELETE } from 'src/shared/api/apiClients/apiFetch';
import { categoryQueryKeys } from './query-keys';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DELETE(`/categories/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      queryClient.removeQueries({ queryKey: categoryQueryKeys.detail(id) });
    },
  });
};
