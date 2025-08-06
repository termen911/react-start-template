import { Category } from 'src/entities/category/model';

export type Operation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  amount: number;
  category: Category;
  commandId: string;
  type: 'Cost' | 'Profit';
};

export type Filters = {
  ids?: string[];
  name?: string;
  categoryIds?: Category[];
  type?: 'Cost' | 'Profit';
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  date?: {
    gte?: string;
    lte?: string;
  };
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  updatedAt?: {
    gte?: string;
    lte?: string;
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type OperationsResponse = {
  data: Operation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export type CreateOperationDto = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: 'Profit' | 'Cost';
  categoryId: string;
};

export type EditOperationDto = CreateOperationDto;
export type UpdateOperationDto = Partial<CreateOperationDto>;
