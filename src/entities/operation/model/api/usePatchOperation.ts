import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from 'src/shared/api/apiClients/apiFetch';
import { Operation, UpdateOperationDto } from '../types';
import { operationQueryKeys } from './query-keys';

export const usePatchOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateOperationDto }) =>
      PATCH<UpdateOperationDto, Operation>(`/operations/${id}`, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
      queryClient.setQueryData(operationQueryKeys.detail(data.id), data);
    },
  });
};
