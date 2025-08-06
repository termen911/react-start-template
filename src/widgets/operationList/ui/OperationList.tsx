import { Flex } from 'antd';
import React from 'react';
import { OperationCreateButton } from 'src/features/operationCreate';
import { OperationInfiniteList } from 'src/features/operationList';

export const OperationList = () => {
  return (
    <Flex vertical gap={16}>
      <Flex justify="flex-end">
        <OperationCreateButton />
      </Flex>
      <OperationInfiniteList />
    </Flex>
  );
};
