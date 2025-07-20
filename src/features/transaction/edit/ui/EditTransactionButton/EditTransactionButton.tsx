import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';

interface EditTransactionButtonProps {
  transactionId: string;
  block?: boolean;
  onClick?: (transactionId: string) => void;
}

export const EditTransactionButton: React.FC<EditTransactionButtonProps> = ({
  transactionId,
  block = false,
  onClick,
}) => {
  const { t } = useAppTranslation();

  const handleEdit = () => {
    if (onClick) {
      onClick(transactionId);
    }
  };

  return (
    <Button type="primary" block={block} icon={<EditOutlined />} onClick={handleEdit}>
      {t('transaction.edit')}
    </Button>
  );
};
