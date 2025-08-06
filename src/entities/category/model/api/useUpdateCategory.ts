import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT } from 'src/shared/api/apiClients/apiFetch';
import { Category, EditCategoryDto } from '../types';
import { categoryQueryKeys } from './query-keys';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: EditCategoryDto }) =>
      PUT<EditCategoryDto, Category>(`/categories/${id}`, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      queryClient.setQueryData(categoryQueryKeys.detail(data.id), data);
    },
  });
};
