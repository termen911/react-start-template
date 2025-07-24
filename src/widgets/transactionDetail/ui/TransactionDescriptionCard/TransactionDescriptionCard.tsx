import { Card, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppTranslation } from 'src/app/providers/i18n';
import { selectTransaction } from 'src/entities/transaction/model/selectors';

const { Paragraph } = Typography;

interface TransactionDescriptionCardProps {
  transactionId: string;
}

export const TransactionDescriptionCard: React.FC<TransactionDescriptionCardProps> = ({ transactionId }) => {
  const { t } = useAppTranslation();

  const transaction = useSelector(selectTransaction);

  if (!transaction || !transaction.description) return null;

  return (
    <Card title={t('transaction.description')} style={{ marginTop: '24px' }}>
      <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{transaction.description}</Paragraph>
    </Card>
  );
};
