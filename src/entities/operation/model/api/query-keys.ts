import { Filters } from '../types';

export const operationQueryKeys = {
  all: ['operations'] as const,
  lists: () => [...operationQueryKeys.all, 'list'] as const,
  list: (filters: Filters) => [...operationQueryKeys.lists(), { filters }] as const,
  details: () => [...operationQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...operationQueryKeys.details(), id] as const,
};
