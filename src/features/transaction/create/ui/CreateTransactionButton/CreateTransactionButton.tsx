import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';

interface CreateTransactionButtonProps {
  onClick?: () => void;
  size?: 'small' | 'middle' | 'large';
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
}

export const CreateTransactionButton: React.FC<CreateTransactionButtonProps> = ({
  onClick,
  size = 'large',
  type = 'primary',
}) => {
  const { t } = useAppTranslation();

  return (
    <Button type={type} size={size} icon={<PlusOutlined />} onClick={onClick}>
      {t('transaction.create')}
    </Button>
  );
};
