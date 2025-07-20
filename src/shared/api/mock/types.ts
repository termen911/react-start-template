export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
}

// Типы для моковой базы данных транзакций
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  title: string;
  description: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  date: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Типы для компонентов отображения операций
export interface TransactionBrief {
  id: string;
  amount: number;
  title: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  description: string;
  descriptionShort: string;
  type: TransactionType;
}

export interface TransactionFull {
  id: string;
  amount: number;
  title: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  description: string;
  date: string;
  type: TransactionType;
  tags?: string[];
}
