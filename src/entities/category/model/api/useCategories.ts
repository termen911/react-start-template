import { useInfiniteQuery } from '@tanstack/react-query';
import { GET } from 'src/shared/api/apiClients/apiFetch';
import { CategoriesResponse, Filters } from '../types';
import { categoryQueryKeys } from './query-keys';

const fetchCategories = async (filters: Filters): Promise<CategoriesResponse> => {
  const params = new URLSearchParams();

  if (filters.pagination) {
    params.append('pagination', JSON.stringify(filters.pagination));
  }
  if (filters.sorting) {
    params.append('sorting', JSON.stringify(filters.sorting));
  }
  if (filters.name) {
    params.append('name', filters.name);
  }
  if (filters.ids) {
    filters.ids.forEach((id) => params.append('ids', id));
  }
  if (filters.createdAt?.gte) params.append('createdAt.gte', filters.createdAt.gte);
  if (filters.createdAt?.lte) params.append('createdAt.lte', filters.createdAt.lte);
  if (filters.updatedAt?.gte) params.append('updatedAt.gte', filters.updatedAt.gte);
  if (filters.updatedAt?.lte) params.append('updatedAt.lte', filters.updatedAt.lte);

  const response = await GET<CategoriesResponse>(`/categories?${params.toString()}`);
  return response;
};

export const useCategories = (initialFilters: Filters = {}) => {
  return useInfiniteQuery({
    queryKey: categoryQueryKeys.list(initialFilters),
    queryFn: ({ pageParam = 1 }) => {
      const filtersWithPage = {
        ...initialFilters,
        pagination: {
          pageSize: initialFilters.pagination?.pageSize ?? 20,
          pageNumber: pageParam,
        },
      };
      return fetchCategories(filtersWithPage);
    },
    getNextPageParam: (lastPage) => {
      const hasNext = lastPage.pagination.pageNumber * lastPage.pagination.pageSize < lastPage.pagination.total;
      return hasNext ? lastPage.pagination.pageNumber + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
