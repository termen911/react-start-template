import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST } from 'src/shared/api/apiClients/apiFetch';
import { Category, CreateCategoryDto } from '../types';
import { categoryQueryKeys } from './query-keys';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => POST<CreateCategoryDto, Category>('/categories', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
    },
  });
};
