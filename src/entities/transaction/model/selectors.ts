import type { RootState } from 'src/app/store';

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransaction = (state: RootState) => state.transactions.transaction;
export const selectTransactionsStatus = (state: RootState) => state.transactions.status;
export const selectTransactionsError = (state: RootState) => state.transactions.error;
