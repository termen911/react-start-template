import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from 'src/shared';
import { fetchTransactionByIdThunk, fetchTransactionsThunk } from './thunks';
import { TransactionState } from './types';

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  isInitialized: false,
  error: null,
  status: 'idle',
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);

      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      state.transaction = action.payload;
    },
    clearTransaction: (state) => {
      state.transaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchTransactionsThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(fetchTransactionByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionByIdThunk.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchTransactionByIdThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setTransaction, clearTransaction, addTransaction, updateTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
