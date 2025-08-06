import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from 'src/shared/api/apiClients/apiFetch';
import { Category, UpdateCategoryDto } from '../types';
import { categoryQueryKeys } from './query-keys';

export const usePatchCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoryDto }) =>
      PATCH<UpdateCategoryDto, Category>(`/categories/${id}`, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      queryClient.setQueryData(categoryQueryKeys.detail(data.id), data);
    },
  });
};
