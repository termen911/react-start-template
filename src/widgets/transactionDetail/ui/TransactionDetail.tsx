import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfileIsAdmin } from 'src/entities/profile/model/selectors';
import { TransactionActionsPanel } from './TransactionActionsPanel';
import { TransactionDescriptionCard } from './TransactionDescriptionCard';
import { TransactionDetailsPanel } from './TransactionDetailsPanel';
import { TransactionMainCard } from './TransactionMainCard';
import { TransactionTagsCard } from './TransactionTagsCard';

interface TransactionDetailProps {
  transactionId: string;
}

export const TransactionDetail: React.FC<TransactionDetailProps> = ({ transactionId }) => {
  const isAdmin = useSelector(selectProfileIsAdmin);

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <TransactionMainCard transactionId={transactionId} />
        <TransactionDescriptionCard transactionId={transactionId} />
        <TransactionTagsCard transactionId={transactionId} />
      </Col>

      <Col xs={24} lg={8}>
        <TransactionDetailsPanel transactionId={transactionId} />
        {isAdmin ? <TransactionActionsPanel transactionId={transactionId} /> : null}
      </Col>
    </Row>
  );
};
