import { transactions } from './transactions';
import { Transaction, TransactionType } from './types';

// Локальный массив транзакций для имитации базы данных
let transactionsData = [...transactions];

// Данные для создания новой транзакции
export interface CreateTransactionData {
  type: TransactionType;
  amount: number;
  title: string;
  description: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  date: string;
  tags?: string[];
}

// Данные для обновления транзакции
export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: string;
}

// Утилитные функции для работы с транзакциями
export class MockAPI {
  // Получение всех транзакций
  static getAllTransactions(): Transaction[] {
    return [...transactionsData];
  }

  // Получение транзакции по ID
  static getTransactionById(id: string): Transaction | undefined {
    return transactionsData.find((transaction) => transaction.id === id);
  }

  // Создание новой транзакции
  static createTransaction(data: CreateTransactionData): Transaction {
    const now = new Date().toISOString();

    const newTransaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      amount: data.amount,
      title: data.title,
      description: data.description,
      categoryName: data.categoryName,
      categoryIcon: data.categoryIcon,
      categoryColor: data.categoryColor,
      date: data.date + 'T12:00:00.000Z', // Добавляем время
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now,
    };

    // Добавляем в начало массива (новые транзакции сверху)
    transactionsData.unshift(newTransaction);

    return newTransaction;
  }

  // Обновление транзакции
  static updateTransaction(id: string, data: UpdateTransactionData): Transaction | null {
    const index = transactionsData.findIndex((transaction) => transaction.id === id);

    if (index === -1) {
      return null;
    }

    const existingTransaction = transactionsData[index];
    const updatedTransaction: Transaction = {
      ...existingTransaction,
      ...data,
      date: data.date ? data.date + 'T12:00:00.000Z' : existingTransaction.date,
      updatedAt: new Date().toISOString(),
    };

    transactionsData[index] = updatedTransaction;

    return updatedTransaction;
  }

  // Удаление транзакции
  static deleteTransaction(id: string): boolean {
    const index = transactionsData.findIndex((transaction) => transaction.id === id);

    if (index === -1) {
      return false;
    }

    transactionsData.splice(index, 1);
    return true;
  }

  // Фильтрация транзакций
  static getTransactionsByType(type: 'income' | 'expense' | 'transfer'): Transaction[] {
    return transactionsData.filter((transaction) => transaction.type === type);
  }

  static getTransactionsByCategory(categoryName: string): Transaction[] {
    return transactionsData.filter((transaction) => transaction.categoryName === categoryName);
  }

  static getTransactionsByDateRange(startDate: string, endDate: string): Transaction[] {
    return transactionsData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });
  }

  // Сброс данных к первоначальному состоянию (для тестирования)
  static resetData(): void {
    transactionsData = [...transactions];
  }
}

// Экспорт всех типов и данных
export { transactions } from './transactions';
export * from './types';
