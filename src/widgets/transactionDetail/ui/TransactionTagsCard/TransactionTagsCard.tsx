import { Card, Space, Tag } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MockAPI } from 'src/shared/api/mock';

interface TransactionTagsCardProps {
  transactionId: string;
}

export const TransactionTagsCard: React.FC<TransactionTagsCardProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();

  const transaction = MockAPI.getTransactionById(transactionId);

  if (!transaction || !transaction.tags || transaction.tags.length === 0) return null;

  return (
    <Card title={t('transaction.tags')} style={{ marginTop: '24px' }}>
      <Space wrap>
        {transaction.tags.map((tag: string, index: number) => (
          <Tag key={index} color="blue">
            #{tag}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};
