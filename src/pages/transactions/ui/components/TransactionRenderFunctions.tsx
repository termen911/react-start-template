import { ArrowLeftOutlined, CalendarOutlined, EditOutlined, TagOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  message,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { formatDateFull } from 'src/shared/lib/utils/date';

import { Transaction } from 'src/shared/types';
import { TransactionTypeConfig } from '../utils/transactionConfig';

const { Title, Text, Paragraph } = Typography;

interface RenderProps {
  transaction: Transaction;
  typeConfig: TransactionTypeConfig;
  displayAmount: string;
  isIncome: boolean;
  isExpense: boolean;
  t: (key: string) => string;
  currentLang: string;
  navigate: (path: string) => void;
}

export const renderPageHeader = ({ t, navigate }: Pick<RenderProps, 't' | 'navigate'>) => (
  <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
    <Col>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/transactions')} style={{ marginRight: '16px' }}>
        {t('transaction.backToList')}
      </Button>
      <Title level={2} style={{ margin: 0, display: 'inline' }}>
        {t('transaction.details')}
      </Title>
    </Col>
  </Row>
);

export const renderMainCard = ({
  transaction,
  typeConfig,
  displayAmount,
  isIncome,
  isExpense,
  t,
}: Pick<RenderProps, 'transaction' | 'typeConfig' | 'displayAmount' | 'isIncome' | 'isExpense' | 't'>) => (
  <Card
    style={{
      background: typeConfig.bgColor,
      borderColor: typeConfig.borderColor,
    }}
  >
    <Row align="middle" gutter={24}>
      <Col>
        <Avatar
          size={80}
          style={{
            backgroundColor: transaction.categoryColor + '20',
            border: `3px solid ${transaction.categoryColor}`,
            fontSize: '32px',
          }}
        >
          {transaction.categoryIcon}
        </Avatar>
      </Col>
      <Col flex="1">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Title level={3} style={{ margin: 0, marginBottom: '8px' }}>
              {transaction.title}
            </Title>
            <Tag color={typeConfig.color} style={{ fontSize: '14px', padding: '4px 12px', borderRadius: '20px' }}>
              <TagOutlined /> {typeConfig.text}
            </Tag>
            <Tag
              color={transaction.categoryColor}
              style={{ fontSize: '14px', padding: '4px 12px', borderRadius: '20px', marginLeft: '8px' }}
            >
              {transaction.categoryName}
            </Tag>
          </div>
        </Space>
      </Col>
    </Row>

    <Row style={{ marginTop: '24px' }}>
      <Col span={24}>
        <Statistic
          title={t('transaction.amount')}
          value={displayAmount}
          suffix="₽"
          prefix={isIncome ? '+' : isExpense ? '−' : ''}
          valueStyle={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: isIncome ? '#52c41a' : isExpense ? '#f5222d' : '#1677ff',
          }}
        />
      </Col>
    </Row>
  </Card>
);

export const renderDescriptionCard = ({ transaction, t }: Pick<RenderProps, 'transaction' | 't'>) => (
  <Card title={t('transaction.description')} style={{ marginTop: '24px' }}>
    <Paragraph style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{transaction.description}</Paragraph>
  </Card>
);

export const renderTagsCard = ({ transaction, t }: Pick<RenderProps, 'transaction' | 't'>) => {
  if (!transaction.tags?.length) return null;

  return (
    <Card title={t('transaction.tags')} style={{ marginTop: '24px' }}>
      <Space wrap>
        {transaction.tags.map((tag: string, index: number) => (
          <Tag key={index} color="blue">
            #{tag}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};

export const renderDetailsPanel = ({
  transaction,
  t,
  currentLang,
}: Pick<RenderProps, 'transaction' | 't' | 'currentLang'>) => (
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

export const renderActionsPanel = ({ t }: Pick<RenderProps, 't'>) => (
  <Card title={t('transaction.actions')} style={{ marginTop: '24px' }}>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" block icon={<EditOutlined />}>
        {t('transaction.edit')}
      </Button>
      <Popconfirm
        title={t('transaction.delete')}
        okButtonProps={{ danger: true }}
        onConfirm={() => message.success(t('transaction.messages.success'))}
      >
        <Button danger block>
          {t('transaction.delete')}
        </Button>
      </Popconfirm>
    </Space>
  </Card>
);
