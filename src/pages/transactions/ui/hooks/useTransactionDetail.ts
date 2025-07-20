import { theme } from 'antd';
import { useNavigate } from 'react-router';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MockAPI } from 'src/shared/api/mock';
import { TransactionType } from 'src/shared/api/mock/types';
import { getTransactionTypeConfig } from '../utils/transactionConfig';

export const useTransactionDetail = (id: string | undefined) => {
  const { t, currentLang } = useAppTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const transaction = id ? MockAPI.getTransactionById(id) : undefined;

  const typeConfig = transaction ? getTransactionTypeConfig(transaction.type, token, t) : null;
  const displayAmount = transaction ? Math.abs(transaction.amount).toLocaleString('ru-RU') : '0';

  const isIncome = transaction?.type === TransactionType.INCOME;
  const isExpense = transaction?.type === TransactionType.EXPENSE;

  return {
    transaction,
    typeConfig,
    displayAmount,
    isIncome,
    isExpense,
    navigate,
    t,
    currentLang,
  };
};
