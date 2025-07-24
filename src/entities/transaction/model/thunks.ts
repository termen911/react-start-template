import { createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction } from 'src/shared';
import { fetchTransactionById, fetchTransactions } from '../api/transactionApi';

export const fetchTransactionsThunk = createAsyncThunk<Transaction[], void, { rejectValue: string }>(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTransactions();
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTransactionByIdThunk = createAsyncThunk<Transaction, string, { rejectValue: string }>(
  'transactions/fetchTransactionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchTransactionById(id);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
