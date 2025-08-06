import { useMutation, useQueryClient } from '@tanstack/react-query';
import { operationQueryKeys } from './query-keys';
import { Operation, CreateOperationDto } from '../types';
import { POST } from 'src/shared/api/apiClients/apiFetch';

export const useCreateOperation = () => {
  const queryClient = useQueryClient();

  return useMutation<Operation, unknown, CreateOperationDto>({
    mutationFn: (dto) => POST<CreateOperationDto, Operation>('/operations', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operationQueryKeys.lists() });
    },
  });
};
