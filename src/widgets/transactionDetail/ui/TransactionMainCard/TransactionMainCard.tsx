import { TagOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Space, Statistic, Tag, theme, Typography } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { getTransactionTypeConfig } from 'src/pages/transactions/ui/utils/transactionConfig';
import { MockAPI } from 'src/shared/api/mock';
import { TransactionType } from 'src/shared/api/mock/types';

const { Title } = Typography;

interface TransactionMainCardProps {
  transactionId: string;
}

export const TransactionMainCard: React.FC<TransactionMainCardProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();
  const { token } = theme.useToken();

  const transaction = MockAPI.getTransactionById(transactionId);

  if (!transaction) return null;

  const typeConfig = getTransactionTypeConfig(transaction.type, token, t);
  const displayAmount = Math.abs(transaction.amount).toLocaleString('ru-RU');

  const isIncome = transaction.type === TransactionType.INCOME;
  const isExpense = transaction.type === TransactionType.EXPENSE;

  return (
    <Card
      style={{
        background: typeConfig.bgColor,
        borderColor: typeConfig.borderColor,
      }}
    >
      <Row align="middle" gutter={24}>
        <Col>
          <Avatar
            size={80}
            style={{
              backgroundColor: transaction.categoryColor + '20',
              border: `3px solid ${transaction.categoryColor}`,
              fontSize: '32px',
            }}
          >
            {transaction.categoryIcon}
          </Avatar>
        </Col>
        <Col flex="1">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
              <Title level={3} style={{ margin: 0, marginBottom: '8px' }}>
                {transaction.title}
              </Title>
              <Tag color={typeConfig.color} style={{ fontSize: '14px', padding: '4px 12px', borderRadius: '20px' }}>
                <TagOutlined /> {typeConfig.text}
              </Tag>
              <Tag
                color={transaction.categoryColor}
                style={{
                  fontSize: '14px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginLeft: '8px',
                }}
              >
                {transaction.categoryName}
              </Tag>
            </div>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Statistic
            title={t('transaction.amount')}
            value={displayAmount}
            suffix="₽"
            prefix={isIncome ? '+' : isExpense ? '−' : ''}
            valueStyle={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: isIncome ? '#52c41a' : isExpense ? '#f5222d' : '#1677ff',
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};
