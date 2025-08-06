import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Dropdown, Flex, Modal, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { OperationForm } from 'src/features/operationCreate/ui/OperationForm';
import { Operation } from '../model';
import { useDeleteOperation } from '../model/api/useDeleteOperation';

const { Text } = Typography;

type OperationCardProps = {
  operation: Operation;
};

export const OperationCard: React.FC<OperationCardProps> = ({ operation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteOperation, isPending: isDeleting } = useDeleteOperation();

  const menu = {
    items: [
      {
        key: 'edit',
        icon: <EditOutlined />,
        label: 'Редактировать',
        onClick: () => setIsModalOpen(true),
      },
      {
        key: 'delete',
        icon: <DeleteOutlined />,
        label: 'Удалить',
        danger: true,
        onClick: () => deleteOperation(operation.id),
      },
    ],
  };

  return (
    <Spin spinning={isDeleting} tip="Удаление...">
      <Card
        hoverable
        style={{ marginBottom: 16, height: '100%' }}
        title={operation.name}
        extra={
          <Dropdown menu={menu} trigger={['click']}>
            <Button size="small" type="text">
              ...
            </Button>
          </Dropdown>
        }
      >
        <Flex vertical gap={8}>
          <Flex>
            <Typography.Text type="secondary">{operation.category.name}</Typography.Text>
          </Flex>
          <Flex>
            <Text strong>{operation.amount} ₽</Text>
            <Divider type="vertical" />
            <Text type={operation.type === 'Cost' ? 'danger' : 'success'}>
              {operation.type === 'Cost' ? 'Расход' : 'Доход'}
            </Text>
          </Flex>
          <p>{operation.desc}</p>
          <Text type="secondary">Дата: {new Date(operation.createdAt).toLocaleDateString()}</Text>
        </Flex>
      </Card>

      <Modal
        title="Редактировать операцию"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <OperationForm
          operation={operation}
          onSuccess={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Spin>
  );
};
