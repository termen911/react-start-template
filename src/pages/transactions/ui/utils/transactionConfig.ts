import { TransactionType } from 'src/shared/api/mock/types';

export interface TransactionTypeConfig {
  color: string;
  text: string;
  bgColor: string;
  borderColor: string;
}

export const getTransactionTypeConfig = (
  transactionType: TransactionType,
  token: any,
  t: (key: string) => string
): TransactionTypeConfig => {
  switch (transactionType) {
    case TransactionType.INCOME:
      return {
        color: 'success',
        text: t('transaction.card.income'),
        bgColor: token.colorBgContainer,
        borderColor: token.colorBorder,
      };
    case TransactionType.EXPENSE:
      return {
        color: 'error',
        text: t('transaction.card.expense'),
        bgColor: token.colorBgContainer,
        borderColor: token.colorBorder,
      };
    case TransactionType.TRANSFER:
      return {
        color: 'processing',
        text: t('transaction.card.transfer'),
        bgColor: token.colorBgContainer,
        borderColor: token.colorBorder,
      };
    default:
      return {
        color: 'default',
        text: t('transaction.card.unknown'),
        bgColor: token.colorBgContainer,
        borderColor: token.colorBorder,
      };
  }
};
