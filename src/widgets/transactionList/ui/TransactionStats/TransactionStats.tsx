import { Card, Col, Row, Typography } from 'antd';
import React, { FC } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { Transaction, TransactionType } from 'src/shared/api/mock/types';

const { Text, Title } = Typography;

interface TransactionStatsProps {
  transactions: Transaction[];
}

export const TransactionStats: FC<TransactionStatsProps> = ({ transactions }) => {
  const { t } = useAppTranslation();
  const income = transactions.filter((t) => t.type === TransactionType.INCOME).reduce((sum, t) => sum + t.amount, 0);

  const expenses = Math.abs(
    transactions.filter((t) => t.type === TransactionType.EXPENSE).reduce((sum, t) => sum + t.amount, 0)
  );

  const totalTransactions = transactions.length;

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Row gutter={16} align="middle">
        <Col span={8}>
          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={{ margin: 0, color: '#52c41a' }}>
              {income.toLocaleString('ru-RU')} ₽
            </Title>
            <Text type="secondary">{t('transaction.stats.income')}</Text>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={{ margin: 0, color: '#f5222d' }}>
              {expenses.toLocaleString('ru-RU')} ₽
            </Title>
            <Text type="secondary">{t('transaction.stats.expenses')}</Text>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>
              {totalTransactions}
            </Title>
            <Text type="secondary">{t('transaction.stats.total')}</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
