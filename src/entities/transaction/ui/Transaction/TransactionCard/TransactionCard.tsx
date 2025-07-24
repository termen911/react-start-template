import { Avatar, Badge, Card, Space, Tag, Typography } from 'antd';
import React, { FC } from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { Transaction, TransactionType } from 'src/shared/types/transaction';

const { Text, Title } = Typography;

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: (id: string) => void;
}

export const TransactionCard: FC<TransactionCardProps> = ({ transaction, onClick }) => {
  const { t } = useAppTranslation();
  const isIncome = transaction.type === TransactionType.INCOME;
  const isExpense = transaction.type === TransactionType.EXPENSE;
  const displayAmount = `${Math.abs(transaction.amount).toLocaleString('ru-RU')} ₽`;

  const getTransactionTypeConfig = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return { color: 'green', text: t('transaction.card.income') };
      case TransactionType.EXPENSE:
        return { color: 'red', text: t('transaction.card.expense') };
      case TransactionType.TRANSFER:
        return { color: 'blue', text: t('transaction.card.transfer') };
      default:
        return { color: 'default', text: t('transaction.card.unknown') };
    }
  };

  const typeConfig = getTransactionTypeConfig(transaction.type);

  return (
    <Badge.Ribbon text={typeConfig.text} color={typeConfig.color}>
      <Card
        hoverable
        onClick={() => onClick?.(transaction.id)}
        style={{
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
        }}
        styles={{
          body: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        {/* Заголовок карточки */}
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="start" size="middle">
            <Avatar
              size={48}
              style={{
                backgroundColor: transaction.categoryColor + '20',
                border: `2px solid ${transaction.categoryColor}`,
                fontSize: '20px',
              }}
            >
              {transaction.categoryIcon}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                {transaction.title}
              </Title>
              <Tag color={transaction.categoryColor} style={{ margin: 0 }}>
                {transaction.categoryName}
              </Tag>
            </div>
          </Space>

          {/* Описание */}
          <Text
            type="secondary"
            style={{
              fontSize: '13px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '40px',
            }}
          >
            {transaction.description}
          </Text>

          {/* Нижняя часть - сумма и дата */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <Text
                strong
                style={{
                  fontSize: '18px',
                  color: isIncome ? '#52c41a' : isExpense ? '#f5222d' : '#1677ff',
                }}
              >
                {isIncome ? '+' : isExpense ? '-' : ''}
                {displayAmount}
              </Text>
            </div>

            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(transaction.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </div>
        </Space>
      </Card>
    </Badge.Ribbon>
  );
};
