import { theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { TransactionType } from 'src/shared/types';
import { getTransactionTypeConfig } from '../utils/transactionConfig';
import { fetchTransactionById } from 'src/entities';

export const useTransactionDetail = async (id: string | undefined) => {
  const { t, currentLang } = useAppTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const transaction = id ? await fetchTransactionById(id) : undefined;

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
