import { Transaction } from 'src/shared';
import { baseApi } from 'src/shared/api/apiClients/baseApi';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await baseApi.get<Transaction[]>('/transactions');
  return response.data;
};

export const fetchTransactionById = async (id: string): Promise<Transaction> => {
  const response = await baseApi.get<Transaction>(`/transactions/${id}`);
  return response.data;
};
