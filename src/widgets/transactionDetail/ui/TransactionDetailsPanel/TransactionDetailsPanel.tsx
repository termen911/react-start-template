import { CalendarOutlined } from '@ant-design/icons';
import { Card, Descriptions, Typography } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import { formatDateFull } from 'src/shared/lib/utils/date';
import { useSelector } from 'react-redux';
import { selectTransaction } from 'src/entities/transaction/model/selectors';

const { Text } = Typography;

interface TransactionDetailsPanelProps {
  transactionId: string;
}

export const TransactionDetailsPanel: React.FC<TransactionDetailsPanelProps> = ({ transactionId }) => {
  const { t, currentLang } = useAppTranslation();

  const transaction = useSelector(selectTransaction);

  if (!transaction) return null;

  return (
    <Card title={t('transaction.details')}>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="ID операции">
          <Text code copyable>
            {transaction.id}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> {t('transaction.dateOfOperation')}
            </>
          }
        >
          <Text strong>{formatDateFull(transaction.date, currentLang)}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={t('transaction.createdAt')}>
          <Text type="secondary">{formatDateFull(transaction.createdAt, currentLang)}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={t('transaction.updatedAt')}>
          <Text type="secondary">{formatDateFull(transaction.updatedAt, currentLang)}</Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
