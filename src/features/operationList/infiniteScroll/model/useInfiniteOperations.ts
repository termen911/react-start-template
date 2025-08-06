import { useOperations } from 'src/entities/operation/model/api/useOperations';
import { Filters } from 'src/entities/operation/model/types';

export const useInfiniteOperations = (filters?: Omit<Filters, 'pagination'>) => {
  return useOperations({
    sorting: { field: 'createdAt', type: 'DESC' },
    pagination: { pageSize: 10 },
    ...filters,
  });
};
