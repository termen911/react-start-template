import { Card, Typography } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { MockAPI } from 'src/shared/api/mock';

const { Paragraph } = Typography;

interface TransactionDescriptionCardProps {
  transactionId: string;
}

export const TransactionDescriptionCard: React.FC<TransactionDescriptionCardProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();

  const transaction = MockAPI.getTransactionById(transactionId);

  if (!transaction || !transaction.description) return null;

  return (
    <Card title={t('transaction.description')} style={{ marginTop: '24px' }}>
      <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{transaction.description}</Paragraph>
    </Card>
  );
};
