import type { CategoryOption } from './types';

// Предустановленные категории для разных типов операций
export const INCOME_CATEGORIES: CategoryOption[] = [
  { name: 'transaction.form.categories.income.salary', icon: '💼', color: '#4CAF50' },
  { name: 'transaction.form.categories.income.freelance', icon: '💻', color: '#2E7D32' },
  { name: 'transaction.form.categories.income.investments', icon: '📈', color: '#1B5E20' },
  { name: 'transaction.form.categories.income.bonuses', icon: '🎁', color: '#388E3C' },
  { name: 'transaction.form.categories.income.other', icon: '💰', color: '#66BB6A' },
];

export const EXPENSE_CATEGORIES: CategoryOption[] = [
  { name: 'transaction.form.categories.expense.products', icon: '🛒', color: '#E64A19' },
  { name: 'transaction.form.categories.expense.restaurants', icon: '🍽️', color: '#D84315' },
  { name: 'transaction.form.categories.expense.gas', icon: '⛽', color: '#1976D2' },
  { name: 'transaction.form.categories.expense.utilities', icon: '⚡', color: '#5D4037' },
  { name: 'transaction.form.categories.expense.entertainment', icon: '🎬', color: '#9C27B0' },
  { name: 'transaction.form.categories.expense.transport', icon: '🚌', color: '#1565C0' },
  { name: 'transaction.form.categories.expense.health', icon: '💊', color: '#E91E63' },
  { name: 'transaction.form.categories.expense.shopping', icon: '🛍️', color: '#FF9800' },
  { name: 'transaction.form.categories.expense.education', icon: '📚', color: '#607D8B' },
  { name: 'transaction.form.categories.expense.rent', icon: '🔑', color: '#6D4C41' },
  { name: 'transaction.form.categories.expense.other', icon: '💸', color: '#9E9E9E' },
];

export const TRANSFER_CATEGORIES: CategoryOption[] = [
  { name: 'transaction.form.categories.transfer.transfer', icon: '💸', color: '#66BB6A' },
  { name: 'transaction.form.categories.transfer.investments', icon: '📈', color: '#1B5E20' },
  { name: 'transaction.form.categories.transfer.savings', icon: '💰', color: '#4CAF50' },
];
