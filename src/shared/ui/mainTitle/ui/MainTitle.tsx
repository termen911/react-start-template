import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import type { MainTitleProps } from '../model';

const { Title } = Typography;

export const MainTitle: React.FC<MainTitleProps> = ({
  title,
  onBack,
  backText = 'Назад',
  actions,
  level = 2,
  style,
}) => {
  const containerStyle: React.CSSProperties = {
    marginBottom: '24px',
    ...style,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    display: 'inline',
  };

  const backButtonStyle: React.CSSProperties = {
    marginRight: '16px',
  };

  return (
    <Row justify="space-between" align="middle" style={containerStyle}>
      <Col>
        {onBack && (
          <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={backButtonStyle}>
            {backText}
          </Button>
        )}
        <Title level={level} style={titleStyle}>
          {title}
        </Title>
      </Col>
      {actions && <Col>{actions}</Col>}
    </Row>
  );
};
