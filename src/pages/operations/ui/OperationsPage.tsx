import { Col, Flex, Row } from 'antd';
import React from 'react';
import { MainLayout, MainTitle } from 'src/shared/ui';
import { OperationList } from 'src/widgets/operationList';

const OperationsPage = () => {
  return (
    <MainLayout>
      <Flex vertical>
        <Row justify="space-between" align="middle">
          <Col>
            <MainTitle title={'Список операций'} level={3} />
          </Col>
        </Row>
        <OperationList />
      </Flex>
    </MainLayout>
  );
};

export default OperationsPage;
