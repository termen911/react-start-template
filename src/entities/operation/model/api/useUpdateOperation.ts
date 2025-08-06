import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PUT } from 'src/shared/api/apiClients/apiFetch';
import { EditOperationDto, Operation } from '../types';
import { operationQueryKeys } from './query-keys';

export const useUpdateOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: EditOperationDto }) =>
      PUT<EditOperationDto, Operation>(`/operations/${id}`, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
      queryClient.setQueryData(operationQueryKeys.detail(data.id), data);
    },
  });
};
