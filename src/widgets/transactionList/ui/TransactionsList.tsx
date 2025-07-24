import { Alert, Col, Pagination, Row, Spin } from 'antd';
import { PaginationProps } from 'antd/lib';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { useAppDispatch } from 'src/app/store';
import { TransactionCard } from 'src/entities/transaction';
import {
  selectTransactions,
  selectTransactionsError,
  selectTransactionsStatus,
} from 'src/entities/transaction/model/selectors';
import { setTransaction } from 'src/entities/transaction/model/slice';
import { fetchTransactionsThunk } from 'src/entities/transaction/model/thunks';
import { TransactionStats } from './TransactionStats';

export const TransactionsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  // Получаем все транзакции из MockAPI
  const transactions = useSelector(selectTransactions);
  const transactionStatus = useSelector(selectTransactionsStatus);
  const transactionError = useSelector(selectTransactionsError);

  // Вычисляем текущие транзакции для отображения (с пагинацией)
  const currentTransactions = useMemo(() => {
    if (!transactions.length) return [];

    // Сортируем транзакции
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    // Применяем пагинацию
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;

    return sortedTransactions.slice(startIndex, endIndex);
  }, [transactions, pagination]);

  useEffect(() => {
    if (!transactions.length) {
      dispatch(fetchTransactionsThunk());
    }
  }, [transactions, dispatch]);

  // Обновляем total в пагинации когда получены транзакции
  useEffect(() => {
    if (transactionStatus === 'fulfilled') {
      setPagination((prev) => ({
        ...prev,
        total: transactions.length,
      }));
    }
  }, [transactionStatus, transactions.length]);

  const handleCardClick = (id: string) => {
    dispatch(setTransaction(transactions.find((transaction) => transaction.id === id) || null));
    navigate(`/transactions/${id}`);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  return (
    <Spin spinning={transactionStatus === 'loading'}>
      {transactionError && <Alert message={transactionError} type="error" showIcon />}

      {/* Статистика */}
      <TransactionStats transactions={transactions} />

      {/* Сетка карточек транзакций */}
      <Row gutter={[16, 16]}>
        {currentTransactions.map((transaction) => (
          <Col xs={24} sm={12} lg={8} xl={8} key={transaction.id}>
            <TransactionCard transaction={transaction} onClick={handleCardClick} />
          </Col>
        ))}
      </Row>

      {/* Пагинация */}
      {transactions.length > pagination.pageSize && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Pagination
            current={pagination.current}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handlePaginationChange}
            showSizeChanger={true}
            pageSizeOptions={['6', '12', '18', '24', '100']}
            showQuickJumper={false}
            showTotal={(total, range) =>
              t('transaction.pagination.titleOfPage', {
                viewed: range[0],
                all: range[1],
                total,
              })
            }
          />
        </div>
      )}
    </Spin>
  );
};
