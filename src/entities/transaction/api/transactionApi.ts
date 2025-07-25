import { Transaction } from 'src/shared';
import { transactions } from './mockData';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 300);
  });
};

export const fetchTransactionById = async (id: string): Promise<Transaction> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const transaction = transactions.find((transaction) => transaction.id === id);
      if (transaction) {
        resolve(transaction);
      } else {
        reject(new Error('Transaction not found'));
      }
    }, 300);
  });
};
