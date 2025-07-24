import { SliceStatus, Transaction } from 'src/shared';

export interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  isInitialized: boolean;
  error: string | null;
  status: SliceStatus;
}
