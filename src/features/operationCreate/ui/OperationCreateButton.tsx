import React, { useState } from 'react';
import { Button } from 'antd';
import { OperationCreateModal } from './OperationCreateModal';
import { PlusOutlined } from '@ant-design/icons';

export const OperationCreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Добавить
      </Button>
      <OperationCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
