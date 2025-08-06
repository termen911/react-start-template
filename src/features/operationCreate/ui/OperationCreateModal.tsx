import { Modal } from 'antd';
import React from 'react';
import { OperationForm } from './OperationForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OperationCreateModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal open={isOpen} onCancel={onClose} title="Новая операция" footer={null}>
      <OperationForm onSuccess={onClose} onCancel={onClose} />
    </Modal>
  );
};
