import { Col, Empty, Pagination, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppTranslation } from 'src/app/providers/i18n';
import { TransactionCard } from 'src/entities/transaction';
import { MockAPI } from 'src/shared/api/mock';
import { TransactionStats } from './TransactionStats';

export const TransactionsList = () => {
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Получаем все транзакции из MockAPI
  const allTransactions = MockAPI.getAllTransactions();

  if (allTransactions.length === 0) {
    return <Empty description={t('transaction.empty')} />;
  }

  // Сортируем по дате (новые сверху)
  const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Пагинация
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

  const handleCardClick = (id: string) => {
    navigate(`/transactions/${id}`);
  };

  return (
    <div>
      {/* Статистика */}
      <TransactionStats transactions={allTransactions} />

      {/* Сетка карточек транзакций */}
      <Row gutter={[16, 16]}>
        {currentTransactions.map((transaction) => (
          <Col xs={24} sm={12} lg={8} xl={8} key={transaction.id}>
            <TransactionCard transaction={transaction} onClick={handleCardClick} />
          </Col>
        ))}
      </Row>

      {/* Пагинация */}
      {allTransactions.length > pageSize && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Pagination
            current={currentPage}
            total={allTransactions.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={true}
            onShowSizeChange={(page, size) => setPageSize(size)}
            pageSizeOptions={[6, 12, 18, 24, 100]}
            showQuickJumper={false}
            showTotal={(total, range) =>
              t('transaction.pagination.titleOfPage', { viewed: range[0], all: range[1], total })
            }
          />
        </div>
      )}
    </div>
  );
};
