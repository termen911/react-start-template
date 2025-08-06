import { useInfiniteQuery } from '@tanstack/react-query';
import { operationQueryKeys } from './query-keys';
import { Filters, OperationsResponse } from '../types';
import { GET } from 'src/shared/api/apiClients/apiFetch';

const buildQueryParams = (filters: Filters): string => {
  const params = new URLSearchParams();

  const addParam = (key: string, value: string | undefined | null) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  };

  if (filters.ids) {
    filters.ids.forEach((id) => params.append('ids', id));
  }
  addParam('name', filters.name);
  if (filters.categoryIds) {
    filters.categoryIds.forEach((category) => params.append('categoryIds', category.id));
  }
  addParam('type', filters.type);

  if (filters.date) {
    addParam('date.gte', filters.date.gte);
    addParam('date.lte', filters.date.lte);
  }
  if (filters.createdAt) {
    addParam('createdAt.gte', filters.createdAt.gte);
    addParam('createdAt.lte', filters.createdAt.lte);
  }
  if (filters.updatedAt) {
    addParam('updatedAt.gte', filters.updatedAt.gte);
    addParam('updatedAt.lte', filters.updatedAt.lte);
  }

  if (filters.pagination) {
    addParam('pagination', JSON.stringify(filters.pagination));
  }

  if (filters.sorting) {
    addParam('sorting', JSON.stringify(filters.sorting));
  }

  return params.toString();
};

export const useOperations = (initialFilters: Filters = {}) => {
  return useInfiniteQuery({
    queryKey: operationQueryKeys.list(initialFilters),
    queryFn: ({ pageParam = 1 }) => {
      const filtersWithPage = {
        ...initialFilters,
        pagination: {
          pageSize: initialFilters.pagination?.pageSize ?? 10,
          pageNumber: pageParam,
        },
      };

      const queryString = buildQueryParams(filtersWithPage);
      const endpoint = `/operations${queryString ? `?${queryString}` : ''}`;

      return GET<OperationsResponse>(endpoint);
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination.pageNumber;
      const totalPages = Math.ceil(lastPage.pagination.total / lastPage.pagination.pageSize);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 минут
    retry: 1,
  });
};
