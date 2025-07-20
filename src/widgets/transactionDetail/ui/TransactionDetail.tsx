import { Col, Row } from 'antd';
import React from 'react';
import { TransactionMainCard } from './TransactionMainCard';
import { TransactionDescriptionCard } from './TransactionDescriptionCard';
import { TransactionTagsCard } from './TransactionTagsCard';
import { TransactionDetailsPanel } from './TransactionDetailsPanel';
import { TransactionActionsPanel } from './TransactionActionsPanel';

interface TransactionDetailProps {
  transactionId: string;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({ transactionId }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <TransactionMainCard transactionId={transactionId} />
        <TransactionDescriptionCard transactionId={transactionId} />
        <TransactionTagsCard transactionId={transactionId} />
      </Col>

      <Col xs={24} lg={8}>
        <TransactionDetailsPanel transactionId={transactionId} />
        <TransactionActionsPanel transactionId={transactionId} />
      </Col>
    </Row>
  );
};
