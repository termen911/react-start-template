import { Card, Space, Tag } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { useSelector } from 'react-redux';
import { selectTransaction } from 'src/entities/transaction/model/selectors';

interface TransactionTagsCardProps {
  transactionId: string;
}

export const TransactionTagsCard: React.FC<TransactionTagsCardProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();

  const transaction = useSelector(selectTransaction);

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
